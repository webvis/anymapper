<script>
    import { onMount, createEventDispatcher } from 'svelte'

    import { MDCListFoundation } from '@material/list'
    
    import List from '@smui/list'

    const dispatch = createEventDispatcher()

    let self
    let foundation = null

    onMount(async function() {
        let ctx = self.$$.ctx // WARNING this is a hack
        
        // search for the list component's foundation
        ctx.forEach((item) => {
            if (item instanceof MDCListFoundation) {
                foundation = item
            }
        })
    })

    export function focus(){
        if(foundation !== null) {
            foundation.adapter.focusItemAtIndex(0)
        }
	}

    function handleKeyDown(event) {
        if(foundation !== null && event.key === 'ArrowUp') {
            let focused_index = foundation.adapter.getFocusedElementIndex()
            if(focused_index == 0) {
                dispatch('cursorexit')
            }
        }
    }
</script>

<style>
</style>


<List bind:this={self} singleSelection on:keydown={handleKeyDown}>
    <slot></slot>
</List>
