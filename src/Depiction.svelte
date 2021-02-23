<script>
    import { Media } from '@smui/card'

    export let src = null
    export let size = 'cover'
    export let aspectRatio = "16x9"
</script>

<style>
</style>

<Media style="background: url({src}), linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(245,245,245,1) 100%); background-size: {size}; background-position-x: center; background-position-y: center; background-repeat: no-repeat;" aspectRatio={aspectRatio}>
</Media>
