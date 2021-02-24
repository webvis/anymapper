<script>
    import { Media } from '@smui/card'

    export let src = null
    export let size = 'cover'
    export let aspectRatio = "16x9"
    export let positionX = 'center'
    export let positionY = 'center'
</script>

<style>
</style>

<Media style="background: url({src}), linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(245,245,245,1) 100%); background-size: {size}; background-position-x: {positionX}; background-position-y: {positionY}; background-repeat: no-repeat;" aspectRatio={aspectRatio}>
</Media>
