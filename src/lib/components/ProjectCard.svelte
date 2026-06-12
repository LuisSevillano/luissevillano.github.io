<script>
	import { formatDate } from '$lib/content/projects.js';

	let { project, variant = 'default', eager = false } = $props();

	// Single stretched link per card: the title's <a> covers the whole article
	// via ::after, so the media is decorative-from-the-link's-perspective.
	// Halves the keyboard tab-stops and removes the duplicate-href confusion.
</script>

<article class={`project-card project-card-${variant}`}>
	<span class="project-media">
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
					decoding="async"
				/>
			{/if}
		</span>
		<span class="year-pill">{new Date(project.date).getFullYear()}</span>
	</span>
	<div class="project-content">
		<p class="meta">
			{project.client} ·
			<time datetime={project.date}>{formatDate(project.date)}</time>
		</p>
		<h3>
			<a class="card-title-link" href={`/work/${project.slug}`}>{project.title}</a>
		</h3>
		<p>{project.excerpt}</p>
		<div class="pill-row">
			<span class="pill">{project.type}</span>
		</div>
	</div>
</article>

<style>
	/* Stretched-link pattern: the inline <a> in <h3> covers the whole card. */
	article.project-card {
		position: relative;
	}
	.card-title-link::after {
		content: '';
		position: absolute;
		inset: 0;
	}
	/* The title-stretched anchor mustn't paint the ring on itself; the global
	   :has() rule in app.css moves the ring onto the article. */
</style>
