<template>
  <header
    class="h-20 bg-emerald-500 flex items-center pl-8 shadow-xl text-white"
  >
    <h1 class="text-2xl font-bold cursor-pointer" @click="paraInicio">
      Inicio
    </h1>
  </header>
  <main
    class="flex flex-row justify-center items-center py-8 text-white overflow-x-hidden overflow-y-auto px-4"
  >
    <div class="w-full max-w-4xl">
      <NuxtPage />
    </div>
  </main>
</template>

<script setup>
const router = useRouter();

const paraInicio = () => {
  router.push("/");
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100dvw;
  height: 100dvh;
  background-color: #55595f;
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #ffffff;
}

::-webkit-scrollbar-thumb {
  background: #10b981;
}

::-webkit-scrollbar-thumb:hover {
  background: #0a704e;
}
</style>
