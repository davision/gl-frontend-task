<script setup>
const { data, status, error } = await useFetch("/api/assessment");

const {
  questions,
  currentQuestion,
  currentIndex,
  answers,
  showResults,
  recommendation,
  goNext,
  canGoNext,
  isFirst,
  goBack,
  startOver,
  isEmpty,
} = useCasinoFinder(data);
</script>

<template>
  <main class="page" aria-labelledby="page-title">
    <section class="page-content mx-auto">
      <div v-if="status === 'pending'">Loading...</div>
      <div v-else-if="error">Something went wrong: {{ error.message }}</div>
      <div v-else-if="isEmpty" class="text-center text-(--muted)">
        No questions or casinos are available right now.
      </div>

      <div v-else class="flex flex-col items-center">
        <h1
          id="page-title"
          class="text-center text-4xl! font-bold text-(--brass)"
        >
          Online Casino Finder
        </h1>
        <div
          class="mt-6 w-full border border-(--brass) rounded-xl bg-amber-600/10"
        >
          <Transition name="reveal" mode="out-in">
            <div class="w-full" v-if="!showResults && currentQuestion">
              <div
                class="relative p-6 border-b border-(--brass) bg-amber-600/10"
              >
                <QuestionNumbers
                  :questions="questions"
                  :current-question="currentQuestion"
                />
                <div class="absolute w-full bottom-0 left-0">
                  <ProgressBar
                    :current-index="currentIndex"
                    :total-questions="questions.length"
                  />
                </div>
              </div>

              <Transition name="reveal" mode="out-in">
                <div
                  :key="currentQuestion.id"
                  class="flex w-full flex-col items-center"
                >
                  <div class="text-center font-bold text-2xl mt-16 mb-8">
                    {{ currentQuestion.title }}
                  </div>

                  <QuestionOptions
                    :name="currentQuestion.id"
                    :options="currentQuestion.options"
                    v-model="answers[currentQuestion.id]"
                  />
                </div>
              </Transition>

              <div class="mt-12 flex items-center gap-4 justify-center p-6">
                <button
                  v-if="!isFirst"
                  type="button"
                  class="px-4 py-2 flex items-center gap-2 text-white/60 cursor-pointer rounded-md border border-white/20 disabled:opacity-40"
                  :disabled="isFirst"
                  @click="goBack"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="cursor-pointer px-4 py-2 rounded-md bg-(--brass) text-yellow-900 font-bold disabled:opacity-40"
                  :disabled="!canGoNext"
                  @click="goNext"
                >
                  {{ isLast ? "See recommendation" : "Next" }}
                </button>
              </div>
            </div>

            <div
              v-else-if="recommendation"
              class="flex flex-col items-center w-full p-6"
            >
              <h3 class="text-center text-3xl! font-bold mb-12">
                Based on your answers, we recommend you to try:
              </h3>

              <CasinoCard :casino="recommendation" />

              <div class="mt-8">
                <button
                  type="button"
                  class="cursor-pointer px-4 py-2 flex items-center gap-2 rounded-md bg-(--brass) text-yellow-900 font-bold disabled:opacity-40"
                  @click="startOver"
                >
                  <ArrowBack class="w-4 h-4" />
                  Start over
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </main>
</template>
