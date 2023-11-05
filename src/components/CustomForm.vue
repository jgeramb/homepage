<template>
  <form class="mx-6 flex max-w-md flex-col items-start gap-5 rounded-xl bg-primary-900 p-8" :class="large ? 'w-full' : ''" @click.stop>
    <h1 class="font-title text-2xl">{{ title }}</h1>
    <slot />
    <CustomButton type="submit">{{ submitText }}</CustomButton>
  </form>
</template>

<script setup>
import CustomButton from "@/components/CustomButton.vue";

defineProps({ title: String, submitText: String, large: Boolean });
</script>
