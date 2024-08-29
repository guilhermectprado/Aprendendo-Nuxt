<template>
  <div class="flex justify-center">
    <ul class="flex flex-col gap-4 text-white">
      <li class="hover:text-emerald-500">
        <NuxtLink to="/contatos"> Básico - CRUD Contatos </NuxtLink>
      </li>
      <li class="hover:text-emerald-500">
        <NuxtLink to="/requisicoes">
          Requisições - useFetch, AsyncData e OFetch
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
useHead({
  title: "Nome  do Site",
  meta: [
    { name: "descricao", content: "conteudo do site?" },
    { name: "twitter:title", content: "Nome  do Site" },
    // Metas tags especificas por Ex: Para o Twitter
    { property: "og:title", content: "Nome  do Site" },
    // General SEO pro Google em especifico (open graph)
  ],
});
</script>

<style scoped>
ul > li {
  list-style-type: disc;
}
</style>
