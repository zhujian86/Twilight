<script lang="ts">
import { onMount } from "svelte";

import type { NavbarLink } from "@/types/config";
import { url } from "@utils/url";
import { onClickOutside } from "@utils/widget";


interface Props {
    links: NavbarLink[];
}

let { links }: Props = $props();
let isOpen = $state(false);

function togglePanel() {
    isOpen = !isOpen;
}

// 点击外部关闭面板
function handleClickOutside(event: MouseEvent) {
    if (!isOpen) return;
    onClickOutside(event, "nav-menu-panel", "nav-menu-switch", () => {
        isOpen = false;
    });
}

onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
});
</script>

<div class="relative md:hidden">
    <button aria-label="Menu" name="Nav Menu" class="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90" 
        id="nav-menu-switch"
        onclick={togglePanel}
    >
        <svg class="text-[1.25rem]" width="24" height="24"><use href="/assets/icons.svg#icon-menu-rounded"></use></svg>
    </button>
    <div id="nav-menu-panel" 
        class="float-panel fixed transition-all right-4 px-2 py-2 max-h-[80vh] overflow-y-auto"
        class:float-panel-closed={!isOpen}
    >
        {#each links as link}
            <div class="mobile-menu-item">
                <a href={link.external ? link.url : url(link.url)} 
                    class="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-(--btn-plain-bg-hover) active:bg-(--btn-plain-bg-active) transition"
                    target={link.external ? "_blank" : null}
                >
                    <div class="flex items-center transition text-black/75 dark:text-white/75 font-bold group-hover:text-(--primary) group-active:text-(--primary)">
                        {#if link.icon}
                            <svg class="text-[1.1rem] mr-2" width="18" height="18">
                                <use href={"/assets/icons.svg#icon-" + link.icon.replace('fa6-brands:', '').replace('fa6-solid:', '').replace('fa6-regular:', '').replace('material-symbols:', '').replace('mdi:', '')}></use>
                            </svg>
                        {/if}
                        {link.name}
                    </div>
                    {#if !link.external}
                        <svg class="transition text-[1.25rem] text-(--primary)" width="24" height="24"><use href="/assets/icons.svg#icon-chevron-right-rounded"></use></svg>
                    {:else}
                        <svg class="transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1" width="12" height="12"><use href="/assets/icons.svg#icon-external"></use></svg>
                    {/if}
                </a>
            </div>
        {/each}
    </div>
</div>