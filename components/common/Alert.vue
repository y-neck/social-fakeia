<template>
  <div
    class="alert-backdrop fixed inset-0 flex h-full w-full items-center justify-center bg-black/50"
  >
    <div
      class="alert-box flex h-fit w-1/2 flex-col gap-2 rounded-2xl border-2 bg-background p-4"
    >
      <div class="alert-description">{{ alertDescription }}</div>
      <div class="alert-btn-section flex flex-col md:flex-row items-center flex-1 gap-2">
        <button class="cancel-btn" @click="cancelBtnAction">
          {{ cancelBtnText }}
        </button>
        <button class="confirm-btn" @click="confirmBtnAction">
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  alertDescription: string;
  cancelBtnText: string;
  confirmBtnText: string;
  cancelBtnAction: () => void;
  confirmBtnAction: () => void;
}>();
</script>

<style scoped>
.alert-backdrop {
  z-index: 50; /* ensure it's above other content */
}
/* Button styling */
button {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--color-secondary);
  color: var(--color-text-invert);
  width: fit-content;
  height: fit-content;
  transition: background-color 0.2s;
}
button:hover {
  background-color: var(--color-accent);
}
</style>
