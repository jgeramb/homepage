const { transitionState } = useClientTransitionState();

export const useTransitionListener = (listener) => {
  if (process.server) return;

  const readyListener = () => {
    if (document.readyState === "complete") listener();
    else document.addEventListener("readystatechange", readyListener);
  };

  onMounted(() => {
    if (transitionState.transitionComplete) readyListener();

    watch(
      () => transitionState.transitionComplete,
      (newValue) => {
        if (!newValue) return;

        readyListener();
      }
    );
  });
};
