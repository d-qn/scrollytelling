<script lang="ts">
	import { onMount } from 'svelte';
	import ScrollySection from '$lib/components/ScrollySection.svelte';
	import storyData from '../data/story.json'; // Importing JSON requires resolveJsonModule which is default in recent TS setup
	import type { StoryData } from '$lib/types';

	const story = storyData as unknown as StoryData;

	onMount(() => {
		if (story.format === 'embed') {
			document.documentElement.classList.add('embed-mode');
			document.body.classList.add('embed-mode');
		}
	});
</script>

<svelte:head>
	<title>{story.title}</title>
	<meta name="description" content={story.intro} />
</svelte:head>

<main
	class="w-full min-h-screen text-theme-text font-sans selection:bg-theme-water selection:text-white"
>
	{#if story.format !== 'embed'}
		<header
			class="w-full flex flex-col items-center justify-center min-h-[50vh] p-8 md:p-12 max-w-4xl mx-auto text-center"
		>
			<h1 class="text-4xl md:text-6xl font-medium mb-6 tracking-tight">{story.title}</h1>
			<p
				class="text-xl md:text-2xl font-light text-theme-subtext leading-relaxed max-w-2xl text-balance"
			>
				{story.intro}
			</p>
		</header>
	{/if}

	<ScrollySection steps={story.steps} format={story.format} />

	{#if story.format !== 'embed'}
		<footer
			class="py-24 px-12 text-center text-theme-subtext text-xs border-t border-theme-border/20 mt-12"
		>
			<p>&copy; 2024 Scrollytelling Boilerplate. All rights reserved.</p>
		</footer>
	{/if}
</main>
