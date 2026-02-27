import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const WORK_DIR = path.resolve('src/content/work');

function stripFrontmatter(markdown) {
	return markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
}

function stripJekyllIncludes(markdown) {
	return markdown.replace(/\{%\s*include\s+[\s\S]*?%\}\n?/g, '');
}

function findMatchingDivEnd(input, startIndex) {
	const tagMatcher = /<\/?div\b[^>]*>/gi;
	tagMatcher.lastIndex = startIndex;

	let depth = 0;
	for (let match = tagMatcher.exec(input); match; match = tagMatcher.exec(input)) {
		const tag = match[0];
		const isClosingTag = tag.startsWith('</');

		if (isClosingTag) {
			depth -= 1;
		} else {
			depth += 1;
		}

		if (depth === 0) {
			return tagMatcher.lastIndex;
		}
	}

	return -1;
}

function protectStandaloneDivBlocks(markdown) {
	const protectedBlocks = [];
	let output = '';
	let cursor = 0;

	while (cursor < markdown.length) {
		const nextDivIndex = markdown.indexOf('<div', cursor);

		if (nextDivIndex === -1) {
			output += markdown.slice(cursor);
			break;
		}

		const lineStart = markdown.lastIndexOf('\n', nextDivIndex) + 1;
		const beforeTag = markdown.slice(lineStart, nextDivIndex);

		if (/\S/.test(beforeTag)) {
			output += markdown.slice(cursor, nextDivIndex + 4);
			cursor = nextDivIndex + 4;
			continue;
		}

		const blockEnd = findMatchingDivEnd(markdown, nextDivIndex);

		if (blockEnd === -1) {
			output += markdown.slice(cursor);
			break;
		}

		const blockHtml = markdown.slice(nextDivIndex, blockEnd);
		const placeholder = `@@HTML_BLOCK_${protectedBlocks.length}@@`;

		protectedBlocks.push(blockHtml);
		output += markdown.slice(cursor, nextDivIndex);
		output += `${placeholder}\n`;
		cursor = blockEnd;
	}

	return {
		markdown: output,
		protectedBlocks
	};
}

function restoreProtectedBlocks(renderedHtml, protectedBlocks) {
	let html = renderedHtml;

	protectedBlocks.forEach((blockHtml, index) => {
		const placeholder = `@@HTML_BLOCK_${index}@@`;
		html = html
			.replace(`<p>${placeholder}</p>`, blockHtml)
			.replace(placeholder, blockHtml);
	});

	return html;
}

function renderMarkdown(markdown) {
	if (!markdown.trim()) return '';
	const normalizedMarkdown = markdown
		.replace(/\]\((assets\/images\/[^)]+)\)/g, '](/$1)')
		.replace(/src="assets\/images\//g, 'src="/assets/images/')
		.replace(/data-src="assets\/images\//g, 'data-src="/assets/images/');

	const { markdown: markdownWithPlaceholders, protectedBlocks } =
		protectStandaloneDivBlocks(normalizedMarkdown);

	const rendered = marked.parse(markdownWithPlaceholders, {
		gfm: true,
		breaks: true,
		headerIds: false,
		mangle: false
	});

	return restoreProtectedBlocks(rendered, protectedBlocks);
}

function resolveSourcePath(slug) {
	const directPath = path.join(WORK_DIR, `${slug}.md`);
	if (fs.existsSync(directPath)) return directPath;

	const lowerSlug = slug.toLowerCase();
	const files = fs.readdirSync(WORK_DIR).filter((file) => file.toLowerCase() === `${lowerSlug}.md`);
	if (!files.length) return null;
	return path.join(WORK_DIR, files[0]);
}

export function getWorkContentBySlug(slug) {
	const sourcePath = resolveSourcePath(slug);
	if (!sourcePath) return null;

	const markdown = fs.readFileSync(sourcePath, 'utf8');
	const body = stripJekyllIncludes(stripFrontmatter(markdown));
	const splitMatch = /^##\s+/m.exec(body);
	const splitIndex = splitMatch?.index ?? -1;

	const storyMarkdown = splitIndex === -1 ? '' : body.slice(0, splitIndex).trim();
	const howMarkdown = splitIndex === -1 ? body.trim() : body.slice(splitIndex).trim();


	return {
		storyMarkdown,
		storyHtml: renderMarkdown(storyMarkdown),
		howMarkdown,
		howHtml: renderMarkdown(howMarkdown)
	};
}
