<script setup>
const { data, status, error } = await useFetch("/api/assessment");

const {
  questions,
  currentQuestion,
  answers,
  showResults,
  recommendation,
  goNext,
  isFirst,
  goBack,
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

        <QuestionNumbers
          :questions="questions"
          :current-question="currentQuestion"
        />
        <template v-if="!showResults && currentQuestion">
          <Transition name="reveal" mode="out-in">
            <div
              :key="currentQuestion.id"
              class="flex w-full flex-col items-center min-h-68"
            >
              <div class="text-center font-bold text-2xl mt-16 mb-8">
                {{ currentQuestion.title }}
              </div>

              <QuestionOptions
                :name="currentQuestion.id"
                :options="currentQuestion.options"
                v-model="answers[currentQuestion.id]"
                @update:model-value="goNext"
              />

              <button
                v-if="!isFirst"
                type="button"
                class="hover:bg-white/10 text-white/60 cursor-pointer px-4 py-2 rounded-md border border-white/20 disabled:opacity-40 mt-16"
                @click="goBack"
              >
                Go back
              </button>
            </div>
          </Transition>
        </template>
        <CasinoCard v-else-if="recommendation" :casino="recommendation" />
      </div>
    </section>
  </main>
</template>
