<template>
  <div
    class="mx-auto my-4 flex flex-col text-center text-primary italic md:my-8"
  >
    <div class="text-fsize-h3"><span>«</span><slot /><span>»</span></div>
    <LinkPreview class="text-fsize-p text-secondary" :url="props.src">{{
      props.srcName
    }}</LinkPreview>
  </div>
</template>

<script setup lang="ts">
import LinkPreview from "../ui/link-preview/LinkPreview.vue";

const props = defineProps<{
  src: string;
  srcName: string;
}>();
</script>
