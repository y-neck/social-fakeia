<template>
  <div class="flex min-h-screen flex-col bg-background font-atkinson text-text">
    <Header class="px-site-spacing" preload/>
    <slot
      
    ></slot>
    <Footer class="px-site-spacing" loading="lazy"/>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/LazyFooter.vue";
</script>
