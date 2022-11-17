<script>
    import { Content } from '@smui/card'

    export let title = 'Title'
    export let subtitle = ''
</script>

<style>
    h2, h3 {
        margin: 0;
        font-weight: normal;
    }
</style>

<Content style="background: var(--anymapper-primary-bg-color); color: var(--anymapper-primary-fg-color);">
    <h2 class="mdc-typography--headline6">{title}</h2>
    <h3 class="mdc-typography--subtitle2">{subtitle}</h3>
</Content>