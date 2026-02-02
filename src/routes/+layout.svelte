<script>
	import '../app.css';
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/500.css';
	import { onMount } from 'svelte';

	onMount(async () => {
		const pymModule = await import('pym.js');
		const PymChild = pymModule.default.Child;
		const child = new PymChild({ polling: 500 });

		// Debug height
		setInterval(() => {
			const height = document.documentElement.scrollHeight;
			console.log('Current body height:', height);
		}, 2000);
	});
</script>

<svelte:head>
	<!-- Adding this as a backup script for environments blocking npm imports -->
	<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
</svelte:head>

<slot />
