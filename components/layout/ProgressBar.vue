<!-- Nuxt UI (n.d.) Tabs. https://ui.nuxt.com/components/tabs. -->
<template>
  <nav class="flex">
    <button
      v-for="item in tabs"
      :key="item.path"
      @click="go(item.path)"
      class="h-1 flex-1 cursor-pointer rounded-full px-0 py-0 transition-colors lg:h-auto lg:rounded-md"
      :class="[
        currentPath === item.path
          ? 'bg-secondary text-text-invert'
          : 'bg-bg-transparent hover:bg-accent hover:text-text-invert',
      ]"
      :aria-label="item.label"
    >
      <span
        class="tab-label hidden min-h-1 max-md:hover:block lg:inline-block"
        :aria-label="item.label"
        :data-tooltip="item.label"
        >{{ item.label }}</span
      >
    </button>
  </nav>
</template>

<script setup lang="ts">
import { usePlayTabs } from "~/composables/usePlayTabs";
const { tabs, currentPath, go } = usePlayTabs();
</script>

<style scoped>
.button {
  background-color: var(--color-text-invert);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  position: relative;
}
.button:hover {
  background-color: var(--color-primary);
}
.button[aria-selected="true"] {
  background-color: var(--color-secondary);
  font-weight: bold;
  color: var(--color-text);
}
/* Expand the clickable area invisibly around the button */
@media (pointer: coarse) {
  .button::after {
    content: "";
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    right: -0.5rem;
    bottom: -0.5rem;
  }
}
</style>
