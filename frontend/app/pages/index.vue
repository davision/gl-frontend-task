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

        <div class="flex flex-wrap justify-center items-center gap-4">
          <label
            v-for="option in currentQuestion.options"
            :key="option.id"
            class="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md has-checked:ring-(--brass) has-checked:ring-2 hover:bg-yellow-500/20 transition-colors"
          >
            <input
              type="radio"
              class="peer sr-only"
              :name="currentQuestion.id"
              :value="option.id"
              v-model="answers[currentQuestion.id]"
            />
            <span
              class="size-5 shrink-0 rounded-full border-2 border-(--brass) grid place-items-center after:content-[''] after:size-2.5 after:rounded-full after:bg-(--brass) after:scale-0 after:transition-transform peer-checked:after:scale-100"
            />
            <span class="text-lg">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </section>
  </main>
</template>
