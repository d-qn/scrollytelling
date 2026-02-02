<script lang="ts">
	import type { StoryStep } from '$lib/types';
	import VizContainer from './VizContainer.svelte';
	import DatawrapperChart from './DatawrapperChart.svelte';

	export let steps: StoryStep[] = [];
	export let format: 'standalone' | 'embed' = 'standalone';

	// On ne garde que les charts uniques pour la logique de chargement si besoin,
	// mais ici on va afficher les graphiques directement dans le flux.
</script>

<div class="w-full bg-theme-bg">
	{#each steps as step, i}
		<section
			class="flex flex-col {format === 'standalone'
				? 'md:flex-row'
				: ''} min-h-[60vh] border-b border-theme-border/10"
		>
			<!-- Partie Graphique -->
			<div
				class="w-full {format === 'standalone'
					? 'md:w-3/5 md:order-2'
					: ''} h-[400px] md:h-[600px] sticky top-0 md:relative"
			>
				<div class="w-full h-full p-2 md:p-6">
					<div
						class="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden border border-theme-border/20"
					>
						{#if step.vizType === 'datawrapper'}
							<DatawrapperChart chartId={step.vizProps.chartId} />
						{:else}
							<VizContainer {step} />
						{/if}
					</div>
				</div>
			</div>

			<!-- Partie Texte -->
			<div
				class="w-full {format === 'standalone'
					? 'md:w-2/5 md:order-1'
					: ''} flex items-center p-6 md:p-12"
			>
				<div class="max-w-lg mx-auto md:mx-0">
					<div class="prose prose-lg text-theme-text font-light leading-relaxed">
						{@html step.content}
					</div>
				</div>
			</div>
		</section>
	{/each}
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}

	/* Assure que les titres dans le JSON sont beaux */
	:global(h2) {
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-weight: 500;
		color: theme('colors.theme-primary');
		margin-bottom: 1rem;
	}
</style>
