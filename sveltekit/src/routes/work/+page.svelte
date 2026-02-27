<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getProjects } from '$lib/content/projects.js';

	const projects = getProjects();
</script>

<main class="page-wrap work-wrap">
	<section class="section-head section-head-lined section-head-block">
		<h1>Work</h1>
		<div class="section-rule"></div>
	</section>
	<div class="project-grid project-grid-dense">
		{#each projects as project}
			<ProjectCard {project} compact={true} />
		{/each}
	</div>
</main>
