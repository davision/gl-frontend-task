<script setup>
const { data, status, error } = await useFetch("/api/assessment");

const {
  questions,
  currentQuestion,
  answers,
  showResults,
  recommendation,
  goNext,
  canGoNext,
  isFirst,
  goBack,
  startOver,
} = useCasinoFinder(data);
</script>

<template>
  <main class="page" aria-labelledby="page-title">
    <section class="page-content mx-auto">
      <div v-if="status === 'pending'">Loading...</div>
      <div v-else-if="error">Something went wrong: {{ error.message }}</div>

      <div v-else class="flex flex-col items-center">
        <h1 class="text-center text-4xl! font-bold">Casino Finder</h1>
        <div class="w-36 h-px bg-(--brass) my-16"></div>

        <template v-if="!showResults && currentQuestion">
          <QuestionNumbers
            :questions="questions"
            :current-question="currentQuestion"
          />

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

          <div class="mt-12 flex items-center gap-4">
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
        </template>

        <template v-else-if="recommendation">
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
        </template>
      </div>
    </section>
  </main>
</template>
