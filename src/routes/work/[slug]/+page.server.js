import { error } from '@sveltejs/kit';
import { getProjectBySlug, getProjects } from '$lib/content/projects.js';
import { getWorkContentBySlug } from '$lib/server/work-content.js';

function hasHowContent(project, workContent) {
	return Boolean(project?.content?.how || project?.content?.howHtml || workContent?.howHtml);
}

export function entries() {
	return getProjects().map((project) => ({ slug: project.slug }));
}

export function load({ params }) {
	const baseProject = getProjectBySlug(params.slug);

	if (!baseProject) {
		throw error(404, 'Project not found');
	}

	const workContent = getWorkContentBySlug(baseProject.slug);
	if (!workContent) {
		const howUrl = hasHowContent(baseProject, null)
			? baseProject.howUrl || `/work/${baseProject.slug}/how-it-was-done`
			: '';

		return {
			project: {
				...baseProject,
				howUrl
			}
		};
	}

	const howUrl = hasHowContent(baseProject, workContent)
		? baseProject.howUrl || `/work/${baseProject.slug}/how-it-was-done`
		: '';

	return {
		project: {
			...baseProject,
			howUrl,
			content: {
				...baseProject.content,
				howHtml: workContent.howHtml,
				howMarkdown: workContent.howMarkdown
			}
		}
	};
}
