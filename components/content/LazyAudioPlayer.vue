<!-- Audio Player embed from audio.com -->

<template>
  <div>
    <ClientOnly
      ><div
        style="height: 228px; width: 100%"
        class="audioplayer"
        id="production_voiceover"
      >
        <iframe
          :src="`https://audio.com/embed/audio/${props.src}?theme=dark`"
          style="
            display: block;
            border-radius: 1px;
            border: none;
            height: 204px;
            width: 100%;
          "
        ></iframe></div
    ></ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ src: string }>();
</script>

<style scoped></style>

<!-- TODO: Add skeleton -->
