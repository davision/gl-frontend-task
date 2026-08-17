<script setup>
const { data, status, error } = await useFetch("/api/assessment");

const questions = computed(() => data.value?.questions ?? []);
const currentQuestion = ref(questions.value[0]);
const answers = ref({});
</script>

<template>
  <main class="page" aria-labelledby="page-title">
    <section class="page-content mx-auto">
      <div v-if="status === 'pending'">Loading...</div>
      <div v-else-if="error">Something went wrong: {{ error.message }}</div>

      <div v-else class="flex flex-col items-center">
        <QuestionNumbers
          :questions="questions"
          :current-question="currentQuestion"
        />

        <div class="w-36 h-px bg-(--brass) mt-16"></div>
        <div class="text-center font-bold text-2xl mt-16 mb-8">
          {{ currentQuestion.title }}
        </div>

        <QuestionOptions :options="currentQuestion.options" />
      </div>
    </section>
  </main>
</template>
