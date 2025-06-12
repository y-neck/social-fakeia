<!-- Google for Developers. (n.d.). YouTube Player API Reference for iframe Embeds | YouTube IFrame Player API. https://developers.google.com/youtube/iframe_api_reference -->

<template>
  <div :class="['video-frame', props.styling]">
    <div ref="playerContainer" class="aspect-video w-full"></div>
    <div class="video-information flex h-fit min-h-8 w-full">
      <span
        v-for="(comment, i) in visibleComments"
        :key="i"
        class="video-information-content border-l-2 border-accent px-4"
        >{{ comment.text }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps<{
  videoId: string;
  scriptPath?: string;
  styling?: string;
}>();
const playerContainer = ref<HTMLElement | null>(null);
let player: YT.Player;

/* JSON timestamps */
const comments = ref<Array<{ time: number; text: string }>>([]); // construct comments as array
const visibleComments = ref<Array<{ time: number; text: string }>>([]);

let intervalId: number;

// load comments from json
async function loadComments() {
  if (!props.scriptPath) {
    // DEBUG:
    console.log("No scriptPath provided; skipping comments.");

    comments.value = [];
    return;
  }
  const response = await fetch(props.scriptPath); /* fetch comments */
  comments.value = await response.json();
}

/* Player */
// initialize player
function initPlayer() {
  if (playerContainer.value && !player) {
    player = new YT.Player(playerContainer.value, {
      videoId: props.videoId, // video ID
      playerVars: {
        /* https://developers.google.com/youtube/player_parameters#Parameters */
        autoplay: 0,
        playsinline: 1, // play inline instead of fullscreen on mobile devices
        cc_lang_pref: "de", // CC Language
        enablejsapi: 1, // enable JS API control
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
}
function handleApiReady() {
  initPlayer();
}

// enable polling to check currentTime
function startPolling() {
  // set polling interval in ms for retrieving comments
  intervalId = window.setInterval(() => {
    const currentTime = player.getCurrentTime();
    // filter comments to show those that should be visible within a 4-second window
    visibleComments.value = comments.value.filter(
      (comment) =>
        currentTime >= comment.time && currentTime < comment.time + 4,
    );
  }, 500);
}

// initialize player once
onMounted(async () => {
  await loadComments();
  // load video player
  window.addEventListener("yt-api-ready", handleApiReady);
  // if API already loaded before mounting
  if ((window as any).YT?.Player) initPlayer();
});
// avoid stale instances
onBeforeUnmount(() => {
  window.removeEventListener("yt-api-ready", handleApiReady);
  if (player) {
    player.destroy();
    player = undefined!;
  }
});

// call function when video player is ready
function onPlayerReady(event: any) {
  event.target.playVideo();
}

// call function when player's state changes
function onPlayerStateChange(event: any) {
  if (event.data === YT.PlayerState.PLAYING) {
    if (!intervalId) startPolling();
  } else {
    clearInterval(intervalId);
    intervalId = 0;
  }
}
</script>

<style scoped>
.ytp-player {
  background-color: var(--color-secondary-transparent) !important;
}
.ytp-chrome-bottom,
.ytp-chrome-top {
  background-color: var(--color-secondary-transparent) !important;
  color: var(--color-accent) !important;
}
</style>
