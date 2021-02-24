<script>
    import { clearSelection } from './stores.js'

    import { Content, Actions, ActionIcons } from '@smui/card'
    import IconButton from '@smui/icon-button'

    export let title = 'Title'
    export let subtitle = ''
</script>

<style>
    h2, h3 {
        margin: 0;
        font-weight: normal;
    }
</style>

<div style="position: absolute; top: 2px; right: -4px;">
    <Actions>
        <ActionIcons>
            <IconButton class="material-icons" on:click={clearSelection} style="color: var(--primary-fg-color);" title="Close">close</IconButton>
        </ActionIcons>
    </Actions>
</div>
<Content style="background: var(--primary-bg-color); color: var(--primary-fg-color);">
    <h2 class="mdc-typography--headline6">{title}</h2>
    <h3 class="mdc-typography--subtitle2">{subtitle}</h3>
</Content>