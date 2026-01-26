<script lang="ts">
	export let chartId: string;

	let iframe: HTMLIFrameElement;
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<iframe
		bind:this={iframe}
		title="Datawrapper Chart"
		src="https://datawrapper.dwcdn.net/{chartId}/"
		class="w-full h-full border-0"
		allowfullscreen
		scrolling="no"
	></iframe>
</div>
