<script>
    export let fg = 'white'
    export let bg = '#7b5b5b'
    export let icon = null
    export let text = null
    export let shape = 'circle'
</script>

<style>
.label {
    font-size: 80px;
    font-weight: bold;
}
</style>

<g class="mark">
    {#if shape == 'circle'}
        <circle r="62" fill="#777" stroke="#777" stroke-width="5" cy="5"/>
        <circle r="62" fill={bg} stroke={fg} stroke-width="7.5"/>
    {:else if shape == 'square'}
        <rect width="124" height="124" x="-62" y="-57" rx="16" ry="16" fill="#777" stroke="#777" stroke-width="5"/>
        <rect width="124" height="124" x="-62" y="-62" rx="16" ry="16" fill={bg} stroke={fg} stroke-width="7.5"/>
    {/if}

    {#if text}
        <text class="label" fill={fg} text-anchor="middle" dy=".4em">{text}</text>
    {:else if icon}
        <text class="material-icons" fill={fg} transform="scale(3.5)" text-anchor="middle" dy=".5em">{icon}</text>
    {/if}
</g>