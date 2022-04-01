<script>
    export let fg = 'white'
    export let bg = '#7b5b5b'
    export let icon = null
    export let icon_set = null
    export let text = null
    export let shape = 'circle'
    export let icon_spacing = 0

    $: icons = icon === null ? [] : icon.split(',')
    $: width = 8 - icon_spacing + Math.max(1, icons.length) * (20+icon_spacing)
</script>

<style>
.label {
    font-size: 18px;
    font-weight: bold;
}
</style>

<g class="mark">
    {#if shape == 'circle'}
        <circle r="14" cy="2" opacity="0.35" stroke="black" stroke-width="2"/>
        <circle r="14" fill={bg} stroke={fg} stroke-width="2"/>
    {:else if shape == 'square'}
        <rect width={width} height="28" x={-width/2} y="-12" rx="4" ry="4" opacity="0.35" stroke="black" stroke-width="2"/>
        <rect width={width} height="28" x={-width/2} y="-14" rx="4" ry="4" fill={bg} stroke={fg} stroke-width="2"/>
    {/if}

    {#if text}
        <text class="label" fill={fg} text-anchor="middle" dy=".35em">{text}</text>
    {:else if icon}
        <text class="material-icons{icon_set ? '-'+icon_set : ''}" fill={fg} transform="scale(0.8)" text-anchor="middle" dy=".5em" dx="{icon_spacing/2}px" style="letter-spacing: {icon_spacing}px;">
            {#each icons as icon}
                <tspan>{icon}</tspan>
            {/each}
        </text>
    {/if}
</g>