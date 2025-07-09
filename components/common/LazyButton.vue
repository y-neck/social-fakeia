<!-- Aceternity UI. (n. d.). Tailwind CSS buttons. https://ui.aceternity.com/components/tailwindcss-buttons -->

<template>
  <div>
    <button
      class="group relative inline-block cursor-pointer rounded-full bg-background p-px text-xs leading-6 font-semibold text-text no-underline shadow-2xl shadow-zinc-900"
      role="button"
      :aria-label="`${props.content}`"
    >
      <span class="absolute inset-0 overflow-hidden rounded-full">
        <span
          class="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ></span>
      </span>
      <div
        class="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10"
      >
        <span class="text-fsize-button" :class="[` ${props.textStyling}`]">
          {{ props.content }}
        </span>
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span
        class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
  textStyling?: string;
}>();
</script>
