<template>
  <div>
    <Header class="px-site-spacing" />
    <slot class="bg-background font-atkinson text-text"></slot>
    <Footer class="px-site-spacing"/>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
</script>
