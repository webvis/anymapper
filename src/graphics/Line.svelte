<script>
    export let points = []
    export let fill = "rgb(0, 178, 251)"
    export let stroke = "rgb(0, 105, 205)"
    export let width = 6
    export let border = 2

    $: d = "M"+points.map(point => `${point.x} ${point.y}`).join('L')
</script>

<style>
    path {
        fill: none;
        vector-effect: non-scaling-stroke;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>

<g>
    <path {d} stroke={stroke} stroke-width={width+2*border}/>
    <path {d} stroke={fill} stroke-width={width}/>
</g>