<!-- Audio Player embed from audio.com -->

<template>
  <div>
    <ClientOnly>
      <div
        style="height: 228px; width: 100%"
        class="audioplayer"
        id="production_voiceover"
        ref="audioPlayer"
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
        ></iframe>
      </div>
      <Skeleton v-if="!audioPlayer || !props.src" class="h-56 w-full" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Skeleton from "../ui/skeleton/Skeleton.vue";
const props = defineProps<{ src: string }>();
const audioPlayer = ref<HTMLElement | null>(null);
</script>

<style scoped></style>
