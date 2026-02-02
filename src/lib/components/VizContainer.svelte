<script lang="ts">
	import type { StoryStep } from '$lib/types';
	export let step: StoryStep;
</script>

<div class="w-full h-full relative overflow-hidden bg-theme-bg">
	{#if step.vizType === 'custom'}
		<div class="w-full h-full flex items-center justify-center text-theme-primary font-medium">
			Custom Component: {step.vizProps.component}
		</div>
	{:else if step.vizType === 'image'}
		<img
			src={step.vizProps.src}
			alt=""
			class="w-full h-full object-cover"
			loading="lazy"
			decoding="async"
		/>
	{:else}
		<div
			class="w-full h-full bg-theme-bg flex items-center justify-center text-theme-subtext font-light"
		>
			<!-- Empty State -->
			No Visualization
		</div>
	{/if}
</div>
