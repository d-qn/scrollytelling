<script lang="ts">
	import type { StoryStep } from '$lib/types';
	import DatawrapperChart from './DatawrapperChart.svelte';

	export let step: StoryStep;
</script>

<div class="w-full h-full relative overflow-hidden bg-theme-bg border-l border-theme-border/20">
	{#if step.vizType === 'datawrapper' && step.vizProps.chartId}
		<!-- Key block ensures re-mount if chartId changes, but we want to keep it alive if only state changes? 
          Actually, if chartId changes we typically want a new iframe.
          If chartId is same but vizState changes, DatawrapperChart handles it.
     -->
		{#key step.vizProps.chartId}
			<DatawrapperChart chartId={step.vizProps.chartId} />
		{/key}
	{:else if step.vizType === 'custom'}
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
