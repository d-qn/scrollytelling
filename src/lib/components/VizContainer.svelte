<script lang="ts">
	import type { StoryStep } from '$lib/types';
	import DatawrapperChart from './DatawrapperChart.svelte';

	export let step: StoryStep;
</script>

<div class="w-full h-full relative overflow-hidden bg-lt-bg border-l border-lt-border/20">
	{#if step.vizType === 'datawrapper' && step.vizProps.chartId}
		<!-- Key block ensures re-mount if chartId changes, but we want to keep it alive if only state changes? 
          Actually, if chartId changes we typically want a new iframe.
          If chartId is same but vizState changes, DatawrapperChart handles it.
     -->
		{#key step.vizProps.chartId}
			<DatawrapperChart chartId={step.vizProps.chartId} vizState={step.vizProps.state} />
		{/key}
	{:else if step.vizType === 'custom'}
		<div class="w-full h-full flex items-center justify-center text-lt-main-blue font-medium">
			Custom Component: {step.vizProps.component}
		</div>
	{:else if step.vizType === 'image'}
		<img src={step.vizProps.src} alt="" class="w-full h-full object-cover" />
	{:else}
		<div class="w-full h-full bg-lt-bg flex items-center justify-center text-lt-subtext font-light">
			<!-- Empty State -->
			No Visualization
		</div>
	{/if}
</div>
