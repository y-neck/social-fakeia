<template>
  <header
    class="z-100 my-4 h-fit w-full bg-background text-fsize-h2 text-primary"
  >
    <nav class="flex gap-xl">
      <NuxtImg
        src="/img/favicon_text.webp"
        alt="Logo Social Fakeia"
        height="32"
        width="58"
        format="webp"
        preload
        class="object-contain"
      />
      <NuxtLink to="/" class="nav-item">Home</NuxtLink>
      <NuxtLink to="/about" class="nav-item">Projekt</NuxtLink>
    </nav>
  </header>
</template>
