<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<div class="centered">
	<h1>My Christmas List</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form method="POST" action="?/create" use:enhance>
		<label for="description">Add an item:</label>
		<div class="add-row">
			<input
				id="description"
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				required
			/>
			<button class="add-btn" type="submit">Add</button>
		</div>
	</form>

	<ul class="items">
		{#each [...data.items].reverse() as item (item.id)}
			<li>
				<form method="POST" action="?/toggle" use:enhance class="item-form">
					<input type="hidden" name="id" value={item.id} />
					<span>{item.description}</span>
					<button aria-label="purchased">Purchased</button>
				</form>
			</li>
		{/each}
	</ul>
</div>
