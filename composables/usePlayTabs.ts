// infer play tabs from pages in /play/
import { useRouter, useRoute } from "vue-router";

export function usePlayTabs() {
  const router = useRouter();
  const route = useRoute();

  // only those /play/ routes with a meta.title
  const playRoutes = router
    .getRoutes()
    .filter((r) => r.path.startsWith("/play/") && r.meta?.title);

  // turn them into { path, label } objects
  const tabs = computed(() =>
    playRoutes.map((r) => ({
      path: r.path,
      label: String(r.meta!.title).replace(/_/g, "").toUpperCase(),
    })),
  );

  // current vue-route path
  const currentPath = computed(() => route.path);

  // helper fn to navigate
  function go(path: string) {
    return router.push(path);
  }

  return { tabs, currentPath, go };
}
