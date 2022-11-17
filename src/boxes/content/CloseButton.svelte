<script>
    import { clearSelection } from '../../stores.ts'

    import { Actions, ActionIcons } from '@smui/card'
    import IconButton from '@smui/icon-button'

    export let iconSet = 'material-symbols-outlined'
    export let closeIcon = 'close'
</script>

<style>
</style>

<div style="position: absolute; top: 2px; right: -4px;">
    <Actions>
        <ActionIcons>
            <IconButton class={iconSet} on:click={clearSelection} style="color: var(--anymapper-primary-fg-color);" title="Close">{closeIcon}</IconButton>
        </ActionIcons>
    </Actions>
</div>