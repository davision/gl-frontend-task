<script setup lang="ts">
interface Option {
  id: string;
  label: string;
}

interface Question {
  id: string;
  title: string;
  options: Option[];
}

defineProps<{ questions: Question[]; currentQuestion: Question }>();
</script>

<template>
  <ul class="w-full flex justify-between">
    <li
      v-for="(question, index) in questions"
      :key="question.id"
      class="flex flex-col md:flex-row items-center gap-4"
    >
      <div
        class="size-8 md:size-10 rounded-full flex items-center justify-center text-center border border-white-100"
        :class="{
          'bg-(--brass) text-yellow-900 border-0':
            currentQuestion.id === question.id,
        }"
      >
        {{ (index as number) + 1 }}
      </div>
      <div class="text-center text-sm md:ont-bold capitalize">
        {{ question.id }}
      </div>
    </li>
  </ul>
</template>
