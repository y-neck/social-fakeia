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
import { useRouter, useRoute } from "vue-router";

// collect routes
const router = useRouter();
const route = useRoute();

const playRoutes = router
  .getRoutes()
  .filter((route) => route.path.startsWith("/play/") && route.meta?.title);

// create TabsItem array
const tabs = playRoutes.map((route) => ({
  path: route.path,
  label: (route.meta.title as string).replace(/_/g, "").toUpperCase(),
}));

// navigation
function go(path: string) {
  router.push(path);
}

// track current page
const currentPath = computed(() => route.path);
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
