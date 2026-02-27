import fs from 'node:fs';
import path from 'node:path';

const WORK_DIR = path.resolve('src/content/work');

function toParagraphHtml(markdown) {
	return markdown
		.split(/\n\s*\n/g)
		.map((block) => block.trim())
		.filter(Boolean)
		.map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
		.join('\n');
}

export function getWorkContentBySlug(slug) {
	const sourcePath = path.join(WORK_DIR, `${slug}.md`);
	if (!fs.existsSync(sourcePath)) return null;

	const markdown = fs.readFileSync(sourcePath, 'utf8');
	const splitIndex = markdown.indexOf('\n## ');

	if (splitIndex === -1) {
		return {
			storyMarkdown: markdown,
			storyHtml: toParagraphHtml(markdown),
			howMarkdown: '',
			howHtml: '',
			sourcePath
		};
	}

	const storyMarkdown = markdown.slice(0, splitIndex).trim();
	const howMarkdown = markdown.slice(splitIndex).trim();

	return {
		storyMarkdown,
		storyHtml: toParagraphHtml(storyMarkdown),
		howMarkdown,
		howHtml: toParagraphHtml(howMarkdown),
		sourcePath
	};
}
