<!-- Nuxt UI (n.d.) Tabs. https://ui.nuxt.com/components/tabs. -->
<template>
  <nav class="flex">
    <button
      v-for="item in tabs"
      :key="item.path"
      @click="go(item.path)"
      class="flex-1 cursor-pointer rounded-md px-4 py-1 transition-colors"
      :class="[
        currentPath === item.path
          ? 'bg-secondary text-text-invert'
          : 'bg-bg-transparent hover:bg-accent hover:text-text-invert',
      ]"
    >
      {{ item.label }}
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
}
.button:hover {
  background-color: var(--color-primary);
}
.button[aria-selected="true"] {
  background-color: var(--color-secondary);
  font-weight: bold;
  color: var(--color-text);
}
</style>
<!-- FIXME: Order of tabs -->
<!-- FIXME: Responsiveness for mobile, change default height -->
