<template>
  <div class="w-full h-full">
    <header class="w-full h-20 border bg-gray-500 flex items-center pl-8">
      <h1 class="text-2xl font-bold cursor-pointer" @click="paraInicio">
        Inicio
      </h1>
    </header>
    <main class="w-full h-full pt-4 px-4">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const router = useRouter();

const paraInicio = () => {
  router.push("/");
};
</script>
