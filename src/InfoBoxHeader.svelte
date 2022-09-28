<script>
    import { clearSelection } from './stores.ts'

    import { Content, Actions, ActionIcons } from '@smui/card'
    import IconButton from '@smui/icon-button'

    export let title = 'Title'
    export let subtitle = ''
    export let iconSet = 'material-symbols-outlined'
    export let closeIcon = 'close'
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
            <IconButton class={iconSet} on:click={clearSelection} style="color: var(--anymapper-primary-fg-color);" title="Close">{closeIcon}</IconButton>
        </ActionIcons>
    </Actions>
</div>
<Content style="background: var(--anymapper-primary-bg-color); color: var(--anymapper-primary-fg-color);">
    <h2 class="mdc-typography--headline6">{title}</h2>
    <h3 class="mdc-typography--subtitle2">{subtitle}</h3>
</Content>