export const useEventListener = (event, listener, passive = false, element = window) => {
  const getElement = () => (element.__v_isRef ? element.value : element);

  onMounted(() => getElement()?.addEventListener(event, listener, passive));
  onUnmounted(() => getElement()?.removeEventListener(event, listener, passive));
};
