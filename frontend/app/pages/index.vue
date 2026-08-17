<script setup>
const { data, status, error } = await useFetch("/api/assessment");

const {
  questions,
  currentQuestion,
  answers,
  showResults,
  recommendation,
  goNext,
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
          <div class="text-center font-bold text-2xl mt-16 mb-8">
            {{ currentQuestion.title }}
          </div>

          <QuestionOptions
            :key="currentQuestion.id"
            :name="currentQuestion.id"
            :options="currentQuestion.options"
            v-model="answers[currentQuestion.id]"
            @update:model-value="goNext"
          />
        </template>

        <template v-else-if="recommendation"> </template>
      </div>
    </section>
  </main>
</template>
