<!-- Shadcn-vue.com. (n.d.). Skeleton. https://www.shadcn-vue.com/docs/components/skeleton-->

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
interface SkeletonProps {
  class?: HTMLAttributes["class"];
}
const props = defineProps<SkeletonProps>();
</script>

<template>
  <div
    data-slot="skeleton"
    :class="cn('animate-pulse rounded-md bg-primary-transparent', props.class)"
  />
</template>
