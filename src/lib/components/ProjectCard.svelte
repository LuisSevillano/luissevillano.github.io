<script>
	import { formatDate } from '$lib/content/projects.js';

	let { project, variant = 'default', eager = false } = $props();
</script>

<article class={`project-card project-card-${variant}`}>
	<a class="project-media" href={`/work/${project.slug}`}>
		<span class="media-frame">
			{#if project.mediaType === 'video' && project.mediaSource}
				<video
					data-lazy-video
					autoplay
					loop
					muted
					playsinline
					preload="none"
					poster={project.thumbnail}
					aria-label={project.thumbnailAlt}
				>
					<source data-src={`${project.mediaSource}.webm`} type="video/webm" />
					<source data-src={`${project.mediaSource}.mp4`} type="video/mp4" />
				</video>
			{:else}
				<img
					src={project.thumbnail}
					alt={project.thumbnailAlt}
					loading={eager ? 'eager' : 'lazy'}
					decoding="auto"
				/>
			{/if}
		</span>
		<span class="year-pill">{new Date(project.date).getFullYear()}</span>
	</a>
	<div class="project-content">
		<div class="meta">{project.client} · {formatDate(project.date)}</div>
		<h3>{project.title}</h3>
		<p>{project.excerpt}</p>
		<div class="pill-row">
			<span class="pill">{project.type}</span>
		</div>
		<div class="cta-row">
			<a class="btn" href={`/work/${project.slug}`}>View case study</a>
		</div>
	</div>
</article>
