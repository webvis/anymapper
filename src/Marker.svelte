<script>
    import { current_layer, user_transform, zoom } from './stores.js'

    export let position

    $: lod_range = 'lodrange' in position ? position.lodrange.map(d => d == 'Infinity' ? Infinity : d) : [0, Infinity]
    $: lod_visible = $user_transform.k >= lod_range[0] && $user_transform.k <= lod_range[1]
</script>

<style>
</style>

{#if position.layers.has($current_layer.name) && lod_visible}
<g class="selectable marker" transform="translate({position.x},{position.y}) scale({1/$zoom})" on:click>
    <g class="marker_content">
        <slot></slot>
    </g>
</g>
{/if}