<template>
  <div
    class="w-full p-4 border border-gray-200 rounded flex items-center justify-between"
  >
    <span class="text-xl font-semibold">
      <slot />
    </span>

    <div class="w-32 space-x-2">
      <slot name="actions" />
    </div>
  </div>
</template>
