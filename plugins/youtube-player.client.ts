export default defineNuxtPlugin(() => {
  // Define the callback before loading the script
  (window as any).onYouTubeIframeAPIReady = () => {
    // Emit an event when API is ready, so your component can listen
    window.dispatchEvent(new Event("yt-api-ready"));
  };
  // Attach to window globally
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
});
