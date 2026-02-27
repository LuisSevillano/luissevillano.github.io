import generatedProjects from './projects.generated.json';

const overrides = {
	'paiporta-simulation': {
		howUrl: '/work/paiporta-simulation/how-it-was-done',
		content: {
			how: {
				stack: ['Svelte', 'QGIS', 'R', 'Video export pipeline'],
				summary:
					'This technical note explains how simulation data was transformed into a minute-by-minute visual narrative.',
				pipeline: [
					'Prepared simulation layers and synchronized them by timestamp.',
					'Produced media sequences optimized for progressive loading.',
					'Connected visual states to narrative milestones in the page flow.'
				],
				performance: [
					'Used lazy loading for heavy media and image posters as fallback.',
					'Prioritized first viewport readability for mobile and desktop screens.'
				]
			}
		}
	}
};

const projects = generatedProjects.map((project) => {
	const override = overrides[project.slug];
	if (!override) return project;

	const merged = {
		...project,
		...(override || {})
	};

	return {
		...merged,
		content: {
			...project.content,
			...(override?.content || {})
		}
	};
});

export function getProjects() {
	return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getFeaturedProjects() {
	return getProjects().filter((project) => project.featured).slice(0, 6);
}

export function getProjectBySlug(slug) {
	return projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
}

export function formatDate(value) {
	return new Date(value).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
