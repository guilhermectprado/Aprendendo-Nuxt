<template>
  <div class="flex justify-center text-white">
    <ul class="flex flex-col gap-4 text-white">
      <li class="hover:text-emerald-500">
        <NuxtLink to="/requisicoes/useFetch"> useFetch </NuxtLink>
      </li>
      <li class="hover:text-emerald-500">
        <NuxtLink to="/requisicoes/useAsyncData"> useAsyncData </NuxtLink>
      </li>
      <li class="hover:text-emerald-500">
        <NuxtLink to="/requisicoes/OFetch"> OFetch </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul > li {
  list-style-type: disc;
}
</style>
