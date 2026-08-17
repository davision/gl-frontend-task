export function useCasinoFinder(payload) {
  const questions = computed(() => payload.value?.questions ?? []);

  const currentIndex = ref(0);
  const answers = ref({});
  const showResults = ref(false);

  const currentQuestion = computed(
    () => questions.value[currentIndex.value] ?? null,
  );

  const currentAnswer = computed(() =>
    currentQuestion.value ? answers.value[currentQuestion.value.id] : undefined,
  );

  const recommendation = computed(() => []);

  const canGoNext = computed(() => Boolean(currentAnswer.value));
  const isLast = computed(
    () => currentIndex.value === questions.value.length - 1,
  );

  function goNext() {
    setTimeout(() => {
      if (!canGoNext.value) return;
      if (isLast.value) {
        showResults.value = true;
        return;
      }

      currentIndex.value += 1;
    }, 200);
  }

  return {
    questions,
    currentIndex,
    currentQuestion,
    answers,
    showResults,
    recommendation,
    goNext,
  };
}
