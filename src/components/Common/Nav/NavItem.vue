<template>
	<li>
		<a
			:class="[
				'block cursor-pointer hover:text-red-500',
				isActive ? active : '',
			]"
		>
			<slot></slot>
		</a>
	</li>
</template>

<script>
export default {
	props: {
		isActive: Boolean
	},
	data() {
		return {
			active: 'text-red-500 bg-red-200 border border-red-300 rounded-l-full rounded-r-full px-2'
		}
	}
}
</script>