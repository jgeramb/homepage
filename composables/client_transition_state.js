const transitionState = reactive({
  transitionComplete: false
});

export const useClientTransitionState = () => {
  const setTransitionComplete = (newValue) => {
    transitionState.transitionComplete = newValue;
  };

  return {
    transitionState,
    setTransitionComplete
  };
};
