// infer play tabs from pages in /play/
import { useRouter, useRoute } from "vue-router";

export function usePlayTabs() {
  const router = useRouter();
  const route = useRoute();

  // sort tabs
  const order = [
    "intro",
    "definition",
    "current_disinformation",
    "audiovisual_disinformation",
    "analysis",
    "tipps",
  ];

  // filter only those /play/ routes with a meta.title
  const playRoutes = router
    .getRoutes()
    .filter((r) => r.path.startsWith("/play/") && r.meta?.title);
  // turn them into { path, label } objects
  const tabs = computed(() => {
    return (
      playRoutes
        .map((r) => ({
          path: r.path,
          label: String(r.meta!.title).replace(/_/g, "").toUpperCase(),
        }))
        // sort them by the order defined above
        .sort((a, b) => {
          // get the last part of the path (the key) , removing "/play/"
          const aKey = a.path.split("/").pop();
          const bKey = b.path.split("/").pop();
          return order.indexOf(aKey!) - order.indexOf(bKey!);
        })
    );
  });
  // current vue-route path
  const currentPath = computed(() => route.path);
  // helper fn to navigate
  function go(path: string) {
    return router.push(path);
  }
  return { tabs, currentPath, go };
}
