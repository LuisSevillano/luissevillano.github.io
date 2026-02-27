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

function renderMarkdown(markdown) {
	if (!markdown.trim()) return '';
	const normalizedMarkdown = markdown
		.replace(/\]\((assets\/images\/[^)]+)\)/g, '](/$1)')
		.replace(/src="assets\/images\//g, 'src="/assets/images/');

	return marked.parse(normalizedMarkdown, {
		gfm: true,
		breaks: true,
		headerIds: false,
		mangle: false
	});
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
		howHtml: renderMarkdown(howMarkdown),
		sourcePath
	};
}
