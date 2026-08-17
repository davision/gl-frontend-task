<script setup lang="ts">
const props = defineProps<{
  currentIndex: number;
  totalQuestions: number;
}>();

const progress = computed(() => {
  return ((props.currentIndex + 1) / props.totalQuestions) * 100;
});
</script>

<template>
  <div class="w-full h-1 bg-amber-600/10 rounded-full">
    <div
      class="h-full bg-(--brass) transition-all duration-300"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
