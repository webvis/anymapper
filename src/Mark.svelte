<script>
    export let fg = 'white'
    export let bg = '#7b5b5b'
    export let icon = null
    export let text = null
    export let shape = 'circle'
</script>

<style>
.label {
    font-size: 18px;
    font-weight: bold;
}
</style>

<g class="mark">
    {#if shape == 'circle'}
        <circle r="14" fill="#777" stroke="#777" stroke-width="1" cy="1"/>
        <circle r="14" fill={bg} stroke={fg} stroke-width="2"/>
    {:else if shape == 'square'}
        <rect width="28" height="28" x="-14" y="-12" rx="4" ry="4" opacity="0.35" stroke="black" stroke-width="2"/>
        <rect width="28" height="28" x="-14" y="-14" rx="4" ry="4" fill={bg} stroke={fg} stroke-width="2"/>
    {/if}

    {#if text}
        <text class="label" fill={fg} text-anchor="middle" dy=".35em">{text}</text>
    {:else if icon}
        <text class="material-icons" fill={fg} transform="scale(0.9)" text-anchor="middle" dy=".5em">{icon}</text>
    {/if}
</g>