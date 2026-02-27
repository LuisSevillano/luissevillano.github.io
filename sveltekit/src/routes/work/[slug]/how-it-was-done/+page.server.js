import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/content/projects.js';
import { getWorkContentBySlug } from '$lib/server/work-content.js';

function hasHowContent(project, workContent) {
	return Boolean(project?.content?.how || project?.content?.howHtml || workContent?.howHtml);
}

export function load({ params }) {
	const baseProject = getProjectBySlug(params.slug);

	if (!baseProject) {
		throw error(404, 'Project not found');
	}

	const workContent = getWorkContentBySlug(baseProject.slug);

	if (!hasHowContent(baseProject, workContent)) {
		throw error(404, 'How it was done not available');
	}

	return {
		project: {
			...baseProject,
			content: {
				...baseProject.content,
				howHtml: workContent?.howHtml || baseProject.content?.howHtml || '',
				howMarkdown: workContent?.howMarkdown || '',
				sourcePath: workContent?.sourcePath
			}
		}
	};
}
