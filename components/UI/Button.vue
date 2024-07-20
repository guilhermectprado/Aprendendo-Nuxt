<template>
  <button
    class="w-full p-4 mt-8 border bg-blue-500 rounded text-white text-center"
    :type="props.type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
const emits = defineEmits(["click"]);

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
});

const handleClick = () => {
  emits("click");
};
</script>
