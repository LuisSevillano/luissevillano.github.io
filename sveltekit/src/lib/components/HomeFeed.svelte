<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getFeaturedProjects, getProjects } from '$lib/content/projects.js';

	let {
		heroTitle = 'Maps, data, and visual stories from my daily work',
		heroCopy = 'Here I collect newsroom stories, independent projects, and open-source tools and experiments.',
		heroTech = '`visual reporting`'
	} = $props();

	const projects = getProjects();
	const otherWorkSlugs = new Set([
		'ai2html-workshop',
		'QGIS-for-journalists',
		'qgis-tile-writer',
		'catastro-coruna',
		'combine-csv-headers-in-R'
	]);

	const otherWorkProjects = projects.filter((project) => otherWorkSlugs.has(project.slug));
	const coreProjects = projects.filter((project) => !otherWorkSlugs.has(project.slug));
	const featuredProjects = getFeaturedProjects().filter(
		(project) => !otherWorkSlugs.has(project.slug)
	);
	const selectedProjects =
		featuredProjects.length >= 5 ? featuredProjects.slice(0, 5) : coreProjects.slice(0, 5);
	const selectedSlugs = new Set(selectedProjects.map((project) => project.slug));
	const latestProjects = coreProjects
		.filter((project) => !selectedSlugs.has(project.slug))
		.slice(0, 9);
	const latestSlugs = new Set(latestProjects.map((project) => project.slug));
	const archiveProjects = coreProjects.filter(
		(project) => !selectedSlugs.has(project.slug) && !latestSlugs.has(project.slug)
	);
</script>

<main>
	<section class="hero hero-pro">
		<p class="eyebrow">DATA JOURNALISM, VISUAL STORIES, AND TOOLS</p>
		<p class="hero-tech">{heroTech}</p>
		<h1 class="hero-title">{heroTitle}</h1>
		<p class="hero-copy">{heroCopy}</p>
		<div class="cta-row cta-tight">
			<a class="btn" href="/about" data-sveltekit-reload>About me</a>
		</div>
	</section>

	<section id="selected-work">
		<div class="section-head section-head-lined">
			<p class="section-index">01</p>
			<h2>Selected Work</h2>
			<div class="section-rule"></div>
		</div>
		<div class="selected-grid">
			<div class="selected-top">
				{#if selectedProjects[0]}
					<ProjectCard project={selectedProjects[0]} variant="lead" eager={true} />
				{/if}
				{#if selectedProjects[1]}
					<ProjectCard project={selectedProjects[1]} variant="default" compact={true} />
				{/if}
			</div>
			<div class="selected-bottom">
				{#each selectedProjects.slice(2, 5) as project}
					<ProjectCard {project} compact={true} />
				{/each}
			</div>
		</div>
	</section>

	<section>
		<div class="section-head section-head-lined">
			<p class="section-index">02</p>
			<h2>Recent Work</h2>
			<div class="section-rule"></div>
		</div>
		<div class="project-grid project-grid-dense">
			{#each latestProjects as project}
				<ProjectCard {project} compact={true} />
			{/each}
		</div>
	</section>

	{#if archiveProjects.length > 0}
		<section>
			<div class="section-head section-head-lined">
				<p class="section-index">03</p>
				<h2>Archive</h2>
				<div class="section-rule"></div>
			</div>
			<div class="project-grid project-grid-dense">
				{#each archiveProjects as project}
					<ProjectCard {project} compact={true} />
				{/each}
			</div>
			<p class="more-link"><a href="/work">View the full archive</a></p>
		</section>
	{/if}

	{#if otherWorkProjects.length > 0}
		<section>
			<div class="section-head section-head-lined">
				<p class="section-index">04</p>
				<h2>Other Work</h2>
				<div class="section-rule"></div>
			</div>
			<div class="project-grid project-grid-dense">
				{#each otherWorkProjects as project}
					<ProjectCard {project} compact={true} />
				{/each}
			</div>
		</section>
	{/if}
</main>
