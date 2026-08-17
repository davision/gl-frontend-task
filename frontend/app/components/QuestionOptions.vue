<script setup lang="ts">
interface Option {
  id: string;
  label: string;
}

defineProps<{
  options: Option[];
  name: string;
}>();

const selected = defineModel<string>({ default: "" });
</script>

<template>
  <div class="flex flex-col md:flex-row justify-center items-center gap-4">
    <label
      v-for="option in options"
      :key="option.id"
      class="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md has-checked:ring-(--brass) has-checked:ring-2 hover:bg-yellow-500/20"
    >
      <input
        type="radio"
        class="peer sr-only"
        :name="name"
        :value="option.id"
        v-model="selected"
      />
      <span
        class="size-5 shrink-0 rounded-full border-2 border-(--brass) grid place-items-center after:content-[''] after:size-2.5 after:rounded-full after:bg-(--brass) after:scale-0 after:transition-transform peer-checked:after:scale-100"
      />
      <span class="text-lg">{{ option.label }}</span>
    </label>
  </div>
</template>
