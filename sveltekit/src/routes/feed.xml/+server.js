import { getProjects } from '$lib/content/projects.js';

const SITE_URL = 'https://luissevillano.net';
const FEED_TITLE = 'Luis Sevillano | Work Feed';
const FEED_DESCRIPTION =
	'Latest case studies and visual storytelling projects by Luis Sevillano.';

export const prerender = true;

function escapeXml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function toUtcDate(value) {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return new Date().toUTCString();
	return parsed.toUTCString();
}

export function GET() {
	const projects = getProjects().slice(0, 50);

	const items = projects
		.map((project) => {
			const link = `${SITE_URL}/work/${project.slug}`;
			return [
				'<item>',
				`<title>${escapeXml(project.title)}</title>`,
				`<description>${escapeXml(project.excerpt || project.seoDescription || '')}</description>`,
				`<link>${escapeXml(link)}</link>`,
				`<guid isPermaLink="true">${escapeXml(link)}</guid>`,
				`<pubDate>${escapeXml(toUtcDate(project.date))}</pubDate>`,
				'</item>'
			].join('');
		})
		.join('');

	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'<channel>',
		`<title>${escapeXml(FEED_TITLE)}</title>`,
		`<description>${escapeXml(FEED_DESCRIPTION)}</description>`,
		`<link>${escapeXml(SITE_URL)}</link>`,
		`<atom:link href="${escapeXml(`${SITE_URL}/feed.xml`)}" rel="self" type="application/rss+xml" />`,
		`<lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>`,
		items,
		'</channel>',
		'</rss>'
	].join('');

	return new Response(body, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}
