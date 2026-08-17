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
  score: number;
}

defineProps<{
  casino: Casino;
}>();
</script>

<template>
  <div
    class="max-w-xs border-2 border-(--brass) rounded-xl p-3 bg-white text-black drop-shadow-amber-300/20 drop-shadow-2xl"
  >
    <div class="bg-gray-300/40 rounded-md p-4 text-3xl text-center relative">
      <div class="font-black">{{ casino.name }}</div>
      <div class="text-sm text-gray-500 leading-tight mt-2">
        {{ casino.description }}
      </div>
    </div>

    <div class="flex gap-3 py-3">
      <div
        v-for="feature in casino.features"
        :key="feature"
        class="bg-gray-300/30 rounded-md px-4 py-2 text-center text-sm leading-tight"
      >
        {{ feature }}
      </div>
    </div>

    <div
      class="bg-yellow-300/20 border-dashed border-2 border-yellow-800/80 rounded-md p-4 text-center text-yellow-800/80"
    >
      <div class="font-bold text-lg">{{ casino.bonus.title }}</div>
    </div>

    <div class="text-xs text-gray-500 leading-tight p-4 text-center">
      {{ casino.bonus.terms }}
    </div>

    <a
      :href="casino.bonus.ctaUrl"
      class="block text-white font-bold text-center text-lg bg-emerald-400 rounded-md p-2"
    >
      {{ casino.bonus.ctaLabel }}
    </a>
  </div>
</template>
