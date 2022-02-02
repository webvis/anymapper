<script>
    import { viewport } from './stores.js'
</script>

<style>
</style>

<rect
    fill="white"
    fill-opacity="0.7"
    x={ $viewport.x }
    y={ $viewport.y }
    width={ $viewport.width }
    height={ $viewport.height }
/>