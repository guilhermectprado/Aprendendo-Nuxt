<template>
  <div>
    <fieldset class="w-full p-1 flex flex-col gap-2 my-2">
      <label :for="props.label" class="text-lg">
        {{ props.label }}
        <input
          :id="props.label"
          :type="props.type"
          :value="props.modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-full py-2 px-4 border border-gray-500 rounded"
        />
      </label>
    </fieldset>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
</script>
