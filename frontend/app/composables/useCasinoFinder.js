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

  return {
    questions,
    currentIndex,
    currentQuestion,
    answers,
    showResults,
    recommendation,
  };
}
