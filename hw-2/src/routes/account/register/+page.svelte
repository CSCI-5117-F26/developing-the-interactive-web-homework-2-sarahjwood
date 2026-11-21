<script lang="ts">
	import { authClient } from '#lib/auth.client.ts';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const session = authClient.useSession();

	$effect(() => {
		if ($session.data) {
			goto(resolve('/todos'));
		}
	});

	let name = $state('');
	let email = $state('');
	let pass = $state('');
	let remember_me = $state(false);
</script>

<div>
	{#if $session.data}
		<div>
			<p>{$session.data.user.name}</p>
			<button
				onclick={async () => {
					await authClient.signOut();
					await goto(resolve('/'), { invalidateAll: true });
				}}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<h1>Sign up</h1>
		<input bind:value={name} placeholder="name" />
		<input bind:value={email} placeholder="email" />
		<input bind:value={pass} placeholder="password" type="password" />
		<input type="checkbox" bind:checked={remember_me} />
		<button
			onclick={async () => {
				const { error } = await authClient.signUp.email({
					name,
					email,
					password: pass,
					rememberMe: remember_me
				});
				if (!error) {
					await goto(resolve('/todos'), { invalidateAll: true });
				}
			}}
		>
			Sign up
		</button>
		<p>Already have an account? <a href={resolve('/account')}>Sign in</a></p>
	{/if}
</div>