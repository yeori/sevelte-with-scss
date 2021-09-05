<script>
	import './assets/common.scss';
</script>

<main>
	<h1>Svelte with Scss</h1>
	<img src={ '/images/sky.jpg' } alt="sky" width="400px">
	<div class="common"><span class="title">READY TO DEPLOY</span></div>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		
			h1 {
				color: #ff3e00;
				text-transform: uppercase;
				font-size: 4em;
				font-weight: 100;
			}
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>