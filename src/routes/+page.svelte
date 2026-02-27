<script>
	import HomeFeed from '$lib/components/HomeFeed.svelte';

	const siteUrl = 'https://luissevillano.net';
	const pageUrl = `${siteUrl}/`;
	const ogImage = `${siteUrl}/assets/og/site-default.jpg`;
	const title = 'Luis Sevillano | Visual Storytelling and Geospatial Development';
	const description =
		'Portfolio of Luis Sevillano, featuring geospatial investigations, visual journalism projects, and interactive storytelling work.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={pageUrl} />
	<meta property="og:site_name" content="Luis Sevillano" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<HomeFeed />
