import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const WORK_DIR = path.resolve('src/content/work');
const REPO_ROOT = path.resolve('..');
const INCLUDES_DIR = path.join(REPO_ROOT, '_includes');

function stripFrontmatter(markdown) {
	return markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
}

function parseIncludeArgs(rawArgs = '') {
	const args = {};
	const attrRegex = /([\w-]+)\s*=\s*"([^"]*)"/g;
	let match = attrRegex.exec(rawArgs);
	while (match) {
		args[match[1]] = match[2];
		match = attrRegex.exec(rawArgs);
	}
	return args;
}

function renderMediaInclude(args) {
	const mediaType = args.media_type || 'img';
	const mediaSource = args.media_source || '';
	const mediaCaption = args.media_caption || '';
	const className = args.class_names || '';

	if (!mediaSource) return '';

	if (mediaType === 'video') {
		const isDirectVideo = /\.(mp4|webm|ogv)$/i.test(mediaSource);
		const sources = isDirectVideo
			? `<source src="${mediaSource}" type="video/${mediaSource.split('.').pop()}" />`
			: `<source src="${mediaSource}.webm" type="video/webm" />\n<source src="${mediaSource}.mp4" type="video/mp4" />`;

		return `<figure class="legacy-media media-column ${className}">\n<video autoplay loop muted playsinline preload="metadata">\n${sources}\n</video>${mediaCaption ? `\n<figcaption>${mediaCaption}</figcaption>` : ''}\n</figure>`;
	}

	return `<figure class="legacy-media media-column ${className}">\n<img src="${mediaSource}" alt="${mediaCaption || 'Project media'}" loading="lazy" decoding="auto" />${mediaCaption ? `\n<figcaption>${mediaCaption}</figcaption>` : ''}\n</figure>`;
}

function resolveJekyllIncludes(markdown) {
	return markdown.replace(/\{%\s*include\s+([^\s%]+)([\s\S]*?)%\}/g, (_, includePath, rawArgs) => {
		if (includePath === 'media.html') {
			return renderMediaInclude(parseIncludeArgs(rawArgs));
		}

		const resolvedPath = path.join(INCLUDES_DIR, includePath);
		if (!fs.existsSync(resolvedPath)) return '';
		return fs.readFileSync(resolvedPath, 'utf8');
	});
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
	const body = resolveJekyllIncludes(stripFrontmatter(markdown));
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
