<template>
  <div>
    <Header class="sticky top-0 px-site-spacing" />
    <slot
      class="flex min-h-screen flex-col bg-background px-site-spacing font-atkinson text-text"
    ></slot>
    <Footer />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/LazyFooter.vue";
</script>
