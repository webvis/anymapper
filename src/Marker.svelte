<script>
    import { current_layer, current_transform, semantic_zoom } from './stores.js'

    export let position

    $: scale_extent = 'scaleExtent' in position ? position.scaleExtent.map(d => d == 'Infinity' ? Infinity : d) : [0, Infinity]
    $: lod_visible = $current_transform.k >= scale_extent[0] && $current_transform.k <= scale_extent[1]
</script>

<style>


@media only screen and (max-width: 600px) {
    .marker_content {
        transform: scale(2);
    }
}
</style>

{#if position.layers.has($current_layer.name) && lod_visible}
<g class="selectable marker" transform="translate({position.x},{position.y}) scale({$semantic_zoom})" on:click>
    <g class="marker_content">
        <slot></slot>
    </g>
</g>
{/if}