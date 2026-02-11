<template>
  <div class="flex gap-2">
    <svg
      v-for="index in 5"
      :key="index"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="size-6 shrink-0 rounded-md"
      :class="
        decimalPlaces !== 0 && index === Math.ceil(rating)
          ? `from-accent to-primary-800 bg-linear-to-r`
          : index <= rating
            ? 'bg-accent'
            : 'bg-primary-800'
      "
      :style="{ '--tw-gradient-from-position': starPortion, '--tw-gradient-to-position': starPortion }"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2C12.3806 2 12.7283 2.2161 12.8967 2.55743L15.3091 7.44542L20.7033 8.22924C21.08 8.28398 21.3929 8.54782 21.5106 8.90983C21.6282 9.27184 21.5301 9.66924 21.2575 9.93493L17.3542 13.7397L18.2757 19.1121C18.34 19.4873 18.1858 19.8664 17.8779 20.0902C17.5699 20.3139 17.1616 20.3434 16.8247 20.1663L12 17.6298L7.17527 20.1663C6.83835 20.3434 6.43009 20.3139 6.12215 20.0902C5.8142 19.8664 5.65998 19.4873 5.72432 19.1121L6.64576 13.7397L2.74248 9.93493C2.4699 9.66924 2.37181 9.27184 2.48943 8.90983C2.60706 8.54782 2.92 8.28398 3.29669 8.22924L8.6909 7.44542L11.1033 2.55743C11.2717 2.2161 11.6194 2 12 2Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const { rating } = defineProps<{ rating: number }>();
const decimalPlaces = computed(() => rating % 1);
const starPortion = computed(() => `${decimalPlaces.value * 100}%`);
</script>
