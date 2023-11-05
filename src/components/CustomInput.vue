<template>
  <div class="input-container">
    <label :for="'input-' + name">{{ title }}</label>
    <input
      v-if="type != 'textarea'"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      :id="'input-' + name"
      :type="type"
      :name="name"
      :required="required === true"
      :minlength="minLength"
      :maxlength="maxLength"
    />
    <textarea
      v-else
      :value="value"
      @input="onInput"
      @blur="onBlur"
      :id="'input-' + name"
      :name="name"
      :minlength="minLength"
      :maxlength="maxLength"
      required
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  value: String,
  title: String,
  type: String,
  name: String,
  minLength: {
    type: Number,
    default: null
  },
  maxLength: {
    type: Number,
    default: null
  },
  required: Boolean
});

const onInput = (event) => {
  const targetElement = event.target;
  const value = targetElement.value;

  if (value.length === 0) targetElement.classList.remove("not-empty");
  else targetElement.classList.add("not-empty");

  this.emitValueUpdate(value);
};
const onBlur = (event) => {
  this.emitValueUpdate(event.target.value);
};
const emitValueUpdate = (value) => {
  this.$emit("update:value", value);
};
</script>

<style lang="scss">
.input-container {
  @apply relative flex w-full flex-col justify-start gap-1;

  label {
    @apply absolute left-2 top-2.5 px-1 text-sm text-primary-100;

    translate: 0;
    transition: translate 0.2s ease-out;

    &:has(+ input:focus),
    &:has(+ input.not-empty) {
      @apply z-10 bg-primary-900;

      translate: 0 -1.25rem;
    }

    &:has(+ textarea:focus),
    &:has(+ textarea.not-empty) {
      @apply z-10 bg-primary-900;

      translate: 0 -3rem;
    }
  }

  input,
  textarea {
    @apply relative rounded-xl border-2 border-solid border-primary-700 bg-transparent px-3 py-2 font-text text-sm focus:outline-none;
  }

  textarea {
    @apply max-h-[400px] min-h-[100px] resize-y;
  }
}
</style>
