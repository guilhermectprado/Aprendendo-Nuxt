<template>
  <div
    class="w-full p-4 border border-gray-200 rounded flex items-center justify-between"
  >
    <div class="w-[85%]">
      <slot />
    </div>

    <div class="w-[15%]">
      <slot name="actions" />
    </div>
  </div>
</template>
