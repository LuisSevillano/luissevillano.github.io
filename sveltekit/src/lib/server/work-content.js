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

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function normalizeAssetPath(source = '') {
	if (!source) return '';
	if (source.startsWith('/')) return source;
	if (source.startsWith('assets/')) return `/${source}`;
	return source;
}

function normalizeLegacyMediaClasses(rawClasses = '') {
	const mappedClasses = rawClasses
		.split(/\s+/)
		.filter(Boolean)
		.map((className) => (className === 'fixed_width' ? 'media-wide' : className));

	if (!mappedClasses.includes('legacy-media')) {
		mappedClasses.unshift('legacy-media');
	}

	return mappedClasses.join(' ');
}

function renderLegacyMediaInclude(attributes = {}) {
	const mediaType = (attributes.media_type || '').toLowerCase();
	const source = normalizeAssetPath(attributes.media_source || attributes.src || '');
	if (!source) return '';

	const classes = normalizeLegacyMediaClasses(attributes.class_names || '');
	const caption = attributes.media_caption || attributes.caption || '';
	const captionHtml = caption ? `<em>${escapeHtml(caption)}</em>` : '';

	if (mediaType === 'video') {
		const webmSource = source.endsWith('.webm') ? source : source.replace(/\.[a-z0-9]+$/i, '.webm');
		const mp4Source = source.endsWith('.mp4') ? source : source.replace(/\.[a-z0-9]+$/i, '.mp4');
		const resolvedWebm = /\.[a-z0-9]+$/i.test(source) ? webmSource : `${source}.webm`;
		const resolvedMp4 = /\.[a-z0-9]+$/i.test(source) ? mp4Source : `${source}.mp4`;

		return `<div class="video-asset ${classes}" data-legacy-media="video"><video data-lazy-video autoplay loop playsinline muted preload="none"><source data-src="${escapeHtml(resolvedWebm)}" type="video/webm" /><source data-src="${escapeHtml(resolvedMp4)}" type="video/mp4" />Your browser does not support the video tag.</video>${captionHtml}</div>`;
	}

	return `<figure class="${classes}" data-legacy-media="image"><img src="${escapeHtml(source)}" alt="${escapeHtml(caption || 'Project media')}" loading="lazy" decoding="auto" />${captionHtml}</figure>`;
}

function resolveLegacyMediaIncludes(markdown) {
	return markdown.replace(/\{%\s*include\s+media\.html([\s\S]*?)%\}/g, (_fullMatch, rawAttributes) => {
		const attributes = {};
		rawAttributes.replace(/(\w+)="([^"]*)"/g, (_attributeMatch, key, value) => {
			attributes[key] = value;
			return _attributeMatch;
		});

		return renderLegacyMediaInclude(attributes);
	});
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
	const body = stripJekyllIncludes(resolveLegacyMediaIncludes(stripFrontmatter(markdown)));
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
