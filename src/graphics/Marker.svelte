<script>
    import { onMount } from 'svelte'

    export let fg_color = null // defaults to anymapper global CSS var
    export let bg_color = null // defaults to anymapper global CSS var
    export let outline_color = 'white'
    export let outline_width = 2
    export let outline_brightness = 1.0
    export let iconSet = 'material-symbols-outlined'
    export let icon = null
    export let text = null
    export let shape = 'circle'
    export let shadow = false
    export let icon_spacing = null
    export let scale = 1

    $: icons = icon === null || icon === undefined ? [] : icon.split(',')
    $: actual_outline_width = outline_width / scale
    $: actual_icon_spacing = icon_spacing ? icon_spacing : 0
    $: width = 8 - actual_icon_spacing + Math.max(1, icons.length) * (20+actual_icon_spacing)
    $: shadow_offset = 2 / scale

    const PIN_D = 'M -0.64019711,-0.2956675 C -1.2209976,-0.8293218 -5.9552623,-9.1635097 -9.1320615,-15.244729 -14.703276,-25.90949 -17.594023,-33.501024 -17.590039,-37.456633 c 0.0069,-6.462469 3.71629,-12.576105 9.4258042,-15.533539 2.7082627,-1.402842 5.0884766,-1.988303 8.11060396,-1.994976 3.09596704,-0.0072 5.46376434,0.567925 8.21767004,1.99472 5.7102168,2.958489 9.4194808,9.071246 9.4259928,15.533795 0.0034,3.94629 -2.904594,11.591053 -8.4440082,22.193833 C 5.9655518,-9.1751947 1.2246711,-0.8331741 0.64000901,-0.2956675 0.44014188,-0.1119163 0.19786774,0 0,0 -0.19782487,0 -0.44026137,-0.1119722 -0.64019711,-0.2956675 Z'

    let self

    onMount(() => {
        // set defaults for colors that have not been specified
        if(fg_color === null || fg_color === undefined) {
            fg_color = window.getComputedStyle(self).getPropertyValue('--anymapper-primary-fg-color')
        }
        if(bg_color === null || bg_color === undefined) {
            bg_color = window.getComputedStyle(self).getPropertyValue('--anymapper-primary-bg-color')
        }
    })
</script>

<style>
.label {
    font-size: 18px;
    font-weight: bold;
}
text {
    pointer-events: none;
}
</style>

<g bind:this={self} class="mark" transform="scale({scale})">
    <!-- shadow -->
    {#if shadow}
        {#if shape == 'circle'}
            <circle r="14" cy={shadow_offset} opacity="0.35" stroke="black" stroke-width={actual_outline_width}/>
        {:else if shape == 'square'}
            <rect width={width} height="28" x={-width/2} y={-14+shadow_offset} rx="4" ry="4" opacity="0.35" stroke="black" stroke-width={actual_outline_width}/>
        {:else if shape == 'pin'}
            <path opacity="0.35" stroke="black" stroke-width={actual_outline_width} transform="translate(0,{shadow_offset})" d={PIN_D}/>
        {/if}
    {/if}

    {#if shape == 'circle'}
        <circle r="14" fill={bg_color}/>
        <circle r="14" fill="transparent" stroke={outline_color} stroke-width={actual_outline_width} style="filter: brightness({outline_brightness});"/>
    {:else if shape == 'square'}
        <rect width={width} height="28" x={-width/2} y="-14" rx="4" ry="4" fill={bg_color}/>
        <rect width={width} height="28" x={-width/2} y="-14" rx="4" ry="4" fill="transparent" stroke={outline_color} stroke-width={actual_outline_width} style="filter: brightness({outline_brightness});"/>
    {:else if shape == 'pin'}
        <path fill={bg_color} d={PIN_D}/>
        <path fill="transparent" stroke={outline_color} stroke-width={actual_outline_width} style="filter: brightness({outline_brightness});" d={PIN_D}/>
    {/if}

    {#if text}
        <text class="label" fill={fg_color} text-anchor="middle" dy=".35em" y={shape == 'pin' ? -36 : 0}>{text}</text>
    {:else if icon}
        <text class={iconSet} fill={fg_color} transform="scale(0.8)" text-anchor="middle" dy=".5em" dx="{actual_icon_spacing/2}px" y={shape == 'pin' ? -47 : 0} style="letter-spacing: {actual_icon_spacing}px;">
            {#each icons as icon}
                <tspan>{icon}</tspan>
            {/each}
        </text>
    {/if}
</g>