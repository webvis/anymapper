<script>
    import { clearSelection } from './stores.js'

    import { Content, Media, MediaContent, Actions, ActionIcons } from '@smui/card'
    import IconButton from '@smui/icon-button'

    export let title = 'Title'
    export let subtitle = 'Subtitle'
    export let depiction = null
    export let depictionSize = 'cover'
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
{#if depiction}
    <Media style="background: {depiction}, linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(245,245,245,1) 100%); background-size: {depictionSize}; background-position-x: center; background-position-y: center; background-repeat: no-repeat;" aspectRatio="16x9">
    </Media>
{/if}