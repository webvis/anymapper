<script>
    export let fg_color = 'white'
    export let bg_color = '#7b5b5b'
    export let outline_color = 'white'
    export let outline_width = 2
    export let icon = null
    export let icon_set = null
    export let text = null
    export let shape = 'circle'
    export let shadow = false
    export let icon_spacing = 0
    export let scale = 1

    $: icons = icon === null ? [] : icon.split(',')
    $: width = 8 - icon_spacing + Math.max(1, icons.length) * (20+icon_spacing)
    $: actual_outline_width = outline_width / scale

    const PIN_D = 'M -0.64019711,-0.2956675 C -1.2209976,-0.8293218 -5.9552623,-9.1635097 -9.1320615,-15.244729 -14.703276,-25.90949 -17.594023,-33.501024 -17.590039,-37.456633 c 0.0069,-6.462469 3.71629,-12.576105 9.4258042,-15.533539 2.7082627,-1.402842 5.0884766,-1.988303 8.11060396,-1.994976 3.09596704,-0.0072 5.46376434,0.567925 8.21767004,1.99472 5.7102168,2.958489 9.4194808,9.071246 9.4259928,15.533795 0.0034,3.94629 -2.904594,11.591053 -8.4440082,22.193833 C 5.9655518,-9.1751947 1.2246711,-0.8331741 0.64000901,-0.2956675 0.44014188,-0.1119163 0.19786774,0 0,0 -0.19782487,0 -0.44026137,-0.1119722 -0.64019711,-0.2956675 Z'
</script>

<style>
.label {
    font-size: 18px;
    font-weight: bold;
}
</style>

<g class="mark" transform="scale({scale})">
    <!-- shadow -->
    {#if shadow}
        {#if shape == 'circle'}
            <circle r="14" cy="2" opacity="0.35" stroke="black" stroke-width={actual_outline_width}/>
        {:else if shape == 'square'}
            <rect width={width} height="28" x={-width/2} y="-12" rx="4" ry="4" opacity="0.35" stroke="black" stroke-width={actual_outline_width}/>
        {:else if shape == 'pin'}
            <path opacity="0.35" stroke="black" stroke-width={actual_outline_width} transform="translate(0,2)" d={PIN_D}/>
        {/if}
    {/if}

    {#if shape == 'circle'}
        <circle r="14" fill={bg_color} stroke={outline_color} stroke-width={actual_outline_width}/>
    {:else if shape == 'square'}
        <rect width={width} height="28" x={-width/2} y="-14" rx="4" ry="4" fill={bg_color} stroke={outline_color} stroke-width={actual_outline_width}/>
    {:else if shape == 'pin'}
        <path fill={bg_color} stroke={outline_color} stroke-width={actual_outline_width} d={PIN_D}/>
    {/if}

    {#if text}
        <text class="label" fill={fg_color} text-anchor="middle" dy=".35em" y={shape == 'pin' ? -36 : 0}>{text}</text>
    {:else if icon}
        <text class="material-icons{icon_set ? '-'+icon_set : ''}" fill={fg_color} transform="scale(0.8)" text-anchor="middle" dy=".5em" dx="{icon_spacing/2}px" y={shape == 'pin' ? -47 : 0} style="letter-spacing: {icon_spacing}px;">
            {#each icons as icon}
                <tspan>{icon}</tspan>
            {/each}
        </text>
    {/if}
</g>