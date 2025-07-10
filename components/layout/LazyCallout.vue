<!-- Use Vue with... (n.d.). Font Awesome Docs. https://docs.fontawesome.com/web/use-with/vue/use-with -->
<template>
  <div
    class="flex flex-col gap-md rounded-[16px] border-1 border-text bg-bg-transparent p-4 text-text"
  >
    <div v-if="icon || title" class="flex gap-md">
      <span v-if="icon" class="callout-icon text-fsize-h2">
        <font-awesome-icon :icon="icon" style="font-size: 1.5rem" />
      </span>
      <h2 v-if="title" class="callout-title text-fsize-h2 text-primary">
        {{ props.title }}
      </h2>
    </div>
    <slot class="gap-md text-text"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon?: string;
  title?: string;
}>();
</script>
