<script>
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
	let theme = $state('dark');
	const currentYear = new Date().getFullYear();

	function applyTheme(nextTheme) {
		theme = nextTheme;
		document.documentElement.classList.toggle('darkmode', nextTheme === 'dark');
		document.documentElement.classList.toggle('lightmode', nextTheme === 'light');
		document.documentElement.style.colorScheme = nextTheme;
	}

	function toggleTheme() {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		applyTheme(nextTheme);
		localStorage.setItem('theme', nextTheme);
	}

	function setupLazyVideos(root = document) {
		if (!root || !('IntersectionObserver' in window)) return;

		const loadVideo = (video) => {
			if (!video || video.dataset.lazyLoaded) return;
			video.querySelectorAll('source[data-src]').forEach((source) => {
				source.src = source.dataset.src;
			});
			video.load();
			video.dataset.lazyLoaded = 'true';
		};

		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					loadVideo(entry.target);
					obs.unobserve(entry.target);
				});
			},
			{ rootMargin: '200px', threshold: 0.01 }
		);

		root.querySelectorAll('video[data-lazy-video]').forEach((video) => {
			if (video.dataset.lazyLoaded) return;
			observer.observe(video);
		});

		return () => observer.disconnect();
	}

	function setupLazyImages(root = document) {
		if (!root) return;

		root.querySelectorAll('img').forEach((img) => {
			if (!img.getAttribute('loading')) {
				img.setAttribute('loading', 'lazy');
			}
			img.setAttribute('decoding', 'auto');
		});
	}

	onMount(() => {
		const stored = localStorage.getItem('theme');
		const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		applyTheme(stored || preferred);

		setupLazyImages(document);
		let cleanup = setupLazyVideos(document);
		const disposeNavigate = afterNavigate(() => {
			if (cleanup) cleanup();
			setupLazyImages(document);
			cleanup = setupLazyVideos(document);
		});

		return () => {
			if (cleanup) cleanup();
			disposeNavigate();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		try {
			var storedTheme = localStorage.getItem('theme');
			var initialTheme =
				storedTheme ||
				(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
			document.documentElement.classList.toggle('darkmode', initialTheme === 'dark');
			document.documentElement.classList.toggle('lightmode', initialTheme === 'light');
			document.documentElement.style.colorScheme = initialTheme;
		} catch (e) {}
	</script>
	<title>Luis Sevillano | Visual Storytelling and Geospatial Development</title>
	<meta
		name="description"
		content="Portfolio of Luis Sevillano, featuring geospatial investigations, data journalism projects, and interactive storytelling work."
	/>
	<link rel="alternate" type="application/rss+xml" title="Work feed" href="/feed.xml" />
</svelte:head>

<div class="site-shell">
	<header class="site-header">
		<a class="brand" href="/">Luis Sevillano</a>
		<nav>
			<a href="/work">Work</a>
			<a href="/about" data-sveltekit-reload>About</a>
			<button class="theme-toggle" type="button" onclick={toggleTheme} aria-label="Toggle theme">
				{#if theme === 'dark'}
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M12 4.5a1 1 0 0 1 1 1v1.4a1 1 0 0 1-2 0V5.5a1 1 0 0 1 1-1Zm0 12.6a1 1 0 0 1 1 1v1.4a1 1 0 0 1-2 0v-1.4a1 1 0 0 1 1-1Zm7.5-6.3a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1.4a1 1 0 0 1 0-2ZM6.4 11.8a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1 1 1 0 0 1 1-1Zm9.6-4.4a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1-1.4 1.4l-1-1a1 1 0 0 1 0-1.4Zm-9.4 9.4a1 1 0 0 1 1.4 0l1 1a1 1 0 1 1-1.4 1.4l-1-1a1 1 0 0 1 0-1.4Zm11.8 1.4a1 1 0 0 1-1.4 0l-1-1a1 1 0 1 1 1.4-1.4l1 1a1 1 0 0 1 0 1.4ZM9 8.4A1 1 0 0 1 7.6 8l-1-1A1 1 0 1 1 8 5.6l1 1a1 1 0 0 1 0 1.4ZM12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"
							fill="currentColor"
						/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M20.4 14.1a1 1 0 0 0-1.2-.4 6.9 6.9 0 0 1-2.6.5 7.2 7.2 0 0 1-7.2-7.2c0-.9.2-1.8.5-2.6a1 1 0 0 0-1.2-1.3A9.3 9.3 0 1 0 21 15.3a1 1 0 0 0-.6-1.2Z"
							fill="currentColor"
						/>
					</svg>
				{/if}
				<span class="sr-only">Toggle theme</span>
			</button>
		</nav>
	</header>
	{@render children()}
	<footer class="site-footer">
		<div class="footer-top">
			<section class="footer-col footer-intro">
				<a class="footer-brand" href="/">Luis Sevillano</a>
				<p>Data journalism and interactive geospatial storytelling.</p>
			</section>

			<section class="footer-col">
				<p class="footer-label">[connect]</p>
				<div class="footer-links">
					<a href="https://x.com/sepirdata" target="_blank" rel="noreferrer">Twitter</a>
					<a href="https://github.com/LuisSevillano" target="_blank" rel="noreferrer">GitHub</a>
					<a href="mailto:luissevillanopires@gmail.com">Email</a>
				</div>
			</section>

			<section class="footer-col">
				<p class="footer-label">[colophon]</p>
				<ul class="footer-colophon">
					<li>Built with SvelteKit and Love</li>
					<li>Hosted on GitHub Pages</li>
				</ul>
			</section>
		</div>
	</footer>
</div>
