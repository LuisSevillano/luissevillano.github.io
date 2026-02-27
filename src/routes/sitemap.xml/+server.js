import { getProjects } from '$lib/content/projects.js';
import { getWorkContentBySlug } from '$lib/server/work-content.js';

const SITE_URL = 'https://luissevillano.net';

export const prerender = true;

function escapeXml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function toIsoDate(value) {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return null;
	return parsed.toISOString();
}

function hasHowContent(project) {
	const workContent = getWorkContentBySlug(project.slug);
	return Boolean(project?.content?.how || project?.content?.howHtml || workContent?.howHtml);
}

function buildUrlEntry(pathname, lastmod = null, changefreq = null) {
	const xml = [
		'<url>',
		`<loc>${escapeXml(`${SITE_URL}${pathname}`)}</loc>`
	];

	if (lastmod) {
		xml.push(`<lastmod>${escapeXml(lastmod)}</lastmod>`);
	}

	if (changefreq) {
		xml.push(`<changefreq>${escapeXml(changefreq)}</changefreq>`);
	}

	xml.push('</url>');
	return xml.join('');
}

export function GET() {
	const projects = getProjects();

	const staticUrls = [
		buildUrlEntry('/', null, 'weekly'),
		buildUrlEntry('/work', null, 'weekly'),
		buildUrlEntry('/about', null, 'monthly')
	];

	const projectUrls = projects.map((project) => {
		const lastmod = toIsoDate(project.date);
		return buildUrlEntry(`/work/${project.slug}`, lastmod, 'monthly');
	});

	const howUrls = projects
		.filter((project) => hasHowContent(project))
		.map((project) => {
			const lastmod = toIsoDate(project.date);
			return buildUrlEntry(`/work/${project.slug}/how-this-project-was-made`, lastmod, 'monthly');
		});

	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...staticUrls,
		...projectUrls,
		...howUrls,
		'</urlset>'
	].join('');

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
