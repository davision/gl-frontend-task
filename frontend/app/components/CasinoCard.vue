<script setup lang="ts">
interface Casino {
  id: string;
  name: string;
  description: string;
  features: string[];
  bonus: {
    title: string;
    terms: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  matchingAnswers: string[];
}

defineProps<{
  casino: Casino;
}>();
</script>

<template>
  <div class="flex flex-col items-center">
    <p class="text-center font-bold text-2xl mt-16 mb-4">
      {{ casino.name }}
    </p>
    <p class="text-center text-(--muted) max-w-xl">
      {{ casino.description }}
    </p>
    <p class="mt-6 font-bold text-(--brass)">
      {{ casino.bonus.title }}
    </p>
  </div>
</template>
