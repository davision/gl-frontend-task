export function useCasinoFinder(payload) {
  const questions = computed(() => payload.value?.questions ?? []);
  const casinos = computed(() => payload.value?.casinos ?? []);

  const currentIndex = ref(0);
  const answers = ref({});
  const showResults = ref(false);

  const currentQuestion = computed(
    () => questions.value[currentIndex.value] ?? null,
  );
  const currentAnswer = computed(() =>
    currentQuestion.value ? answers.value[currentQuestion.value.id] : undefined,
  );

  const canGoNext = computed(() => Boolean(currentAnswer.value));
  const isFirst = computed(() => currentIndex.value === 0);
  const isLast = computed(
    () => currentIndex.value === questions.value.length - 1,
  );

  function goNext() {
    if (!canGoNext.value) return;
    if (isLast.value) {
      showResults.value = true;
      return;
    }

    currentIndex.value++;
  }

  function goBack() {
    if (showResults.value) {
      showResults.value = false;
      return;
    }

    if (isFirst.value) {
      return;
    }

    currentIndex.value--;
  }

  const isComplete = computed(
    () =>
      questions.value.length > 0 &&
      questions.value.every((question) => Boolean(answers.value[question.id])),
  );

  const rankedCasinos = computed(() => {
    return recommendCasinos(casinos.value, Object.values(answers.value));
  });

  const recommendation = computed(() => {
    return isComplete.value ? (rankedCasinos.value[0] ?? null) : null;
  });

  return {
    questions,
    currentIndex,
    currentQuestion,
    answers,
    isFirst,
    isLast,
    showResults,
    recommendation,
    goNext,
    goBack,
  };
}
