<script>
    import { selection, semantic_zoom } from './stores.js'
    
    export let icon
</script>

<style>
.placemark {
    /*pointer-events: none;*/
}
.arrow {
    fill: var(--primary-bg-color);
    stroke: rgba(0,0,0,0.3);
    stroke-width: 10px;
}
.circle {
    fill: var(--primary-fg-color);
}
.arrow, .circle, text {
    transform: scale(0.75);
}
text {
    font-size: 160px;
    text-anchor: middle;
}

@media only screen and (max-width: 600px) {
    .arrow, .circle, text {
        transform: scale(1.5);
    }
}
</style>


<g class="placemark" transform="translate({$selection.position.x} {$selection.position.y}) scale({$semantic_zoom})">
    <path class="arrow" d="M -5.3702482,-2.4743486 C -10.242286,-6.9402679 -49.955599,-76.685953 -76.604136,-127.57734 c -46.734054,-89.24931 -70.983044,-152.78 -70.949634,-185.88301 0.0573,-54.08193 31.17406,-105.24462 79.068234,-129.9943 22.718226,-11.73981 42.684617,-16.63934 68.03569057,-16.69515 25.97047543,-0.0574 45.83270943,4.7527 68.93380743,16.69303 47.900068,24.75844 79.015178,75.91384 79.069808,129.99642 0.0289,33.02505 -24.36515,97.00116 -70.832446,185.73178 C 50.041984,-76.783702 10.273172,-6.9725157 5.3687427,-2.4743486 3.6921601,-0.93661741 1.6598472,0 3.6115871e-5,0 -1.659415,0 -3.6930899,-0.9370493 -5.3702482,-2.4743486 Z"/>
    <path class="circle" d="m 107.93742,-315.29401 a 107.93743,107.93743 0 1 1 -215.87485,0 107.93743,107.93743 0 1 1 215.87485,0 z"/>
    {#if icon}
        <text class="material-icons" y="-240">{icon}</text>
    {/if}
</g>