<template>
  <Header class="px-site-spacing" />
  <div
    class="bottom-0 gap-md bg-background px-site-spacing font-atkinson text-text"
  >
    <ProgressBar />
    <div id="wrapper" class="flex flex-col gap-md md:flex-row md:gap-0">
      <div id="content" ref="contentRef" class="flex flex-1 flex-col md:w-4/5">
        <slot></slot>
      </div>
      <nav
        id="nav-bar"
        class="sticky top-2 h-fit self-start rounded-lg p-4 text-primary max-sm:hidden md:w-1/5"
      >
        <!-- Dynamic table of contents -->
        <ul>
          <li
            v-for="item in toc"
            :key="item.id"
            :style="{ paddingLeft: item.level * 1 + 'rem' }"
          >
            <a :href="'#' + item.id" :class="{ active: item.active }">{{
              item.text
            }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/LazyFooter.vue";
import ProgressBar from "~/components/layout/ProgressBar.vue";

const contentRef = ref<HTMLElement | null>(null);
const toc = reactive<
  { id: string; text: string; level: number; active: boolean }[]
>([]);

/**
 * build the table of contents scanning slot contentRef for h1, h2, h3
 * auto-assign ids as slugified texts
 * @var {HTMLElement | null} headings – reference headings from slot element
 * @var {Array<{ id: string; text: string; level: number; active: boolean }>} toc – table of contents inferred from reactive
 * @returns void
 */
function buildToc() {
  toc.length = 0;
  const headings = contentRef.value!.querySelectorAll("h2, h3");
  headings.forEach((element) => {
    if (!element.id)
      element.id =
        element.textContent?.trim().toLowerCase().replace(/\s+/g, "-") || "";
    toc.push({
      id: element.id,
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1)) - 1,
      active: false,
    });
  });
}

let observer: any;
/**
 * set up an Intersection Observer to track activation of headings (h1, h2, h3).
 * @type {Object} IntersectionObserverOptions
 * @property {HTMLElement | null} root - root element for the observer. If null, the viewport is used.
 * @property {string} rootMargin - margin around  root. Values similar to CSS margin property.
 * @property {Array<number>} threshold - array of threshold values indicating the percentage of target visibility required to trigger the callback.
 */
function setupObserver() {
  const options = {
    root: null,
    rootMargin: "0px 0px -80% 0px",
    threshold: [0],
  };
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const item = toc.find((x) => x.id === e.target.id);
      if (item) item.active = e.isIntersecting;
    });
  }, options);
  toc.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  });
}

onMounted(() => {
  buildToc();
  setupObserver();
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
#nav-bar a {
  color: var(--color-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
#nav-bar a.active {
  color: var(--color-primary);
  font-weight: bold;
}
#nav-bar a:hover {
  color: var(--color-accent);
  text-decoration-line: underline;
}
</style>
