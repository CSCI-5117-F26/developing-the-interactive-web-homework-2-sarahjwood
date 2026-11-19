<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="centered">
	<h1>Purchased Items</h1>

	<ul class="items">
		{#each [...data.items].reverse() as item (item.id)}
			{#if item.purchased}
				<li>
					<form method="POST" action="?/delete" use:enhance class="item-form">
						<input type="hidden" name="id" value={item.id} />
						<span>{item.description}</span>
					</form>
				</li>
			{/if}
		{/each}
	</ul>
</div>
