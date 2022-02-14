<script>
    import { viewport } from './stores.js'
</script>

<style>
    .tracing_paper {
        fill: white;
        fill-opacity: 0.75;
    }
</style>

<rect
    class="tracing_paper"
    x={ $viewport.x }
    y={ $viewport.y }
    width={ $viewport.width }
    height={ $viewport.height }
/>