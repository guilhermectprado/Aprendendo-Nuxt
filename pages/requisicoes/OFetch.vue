<template>
  <div class="text-white flex flex-col gap-4">
    <p>
      <NuxtLink to="/requisicoes" class="hover:text-emerald-500">
        Voltar
      </NuxtLink>
    </p>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <div class="flex flex-row items-center justify-between">
      <h1 class="text-lg">OFetch</h1>
      <UIButton type="button" @click="fetchUserProducts" class="w-40">
        Buscar Produtos
      </UIButton>
    </div>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <div class="flex flex-col gap-4">
      <p>Dados do Usuário</p>
      <div v-if="status === 'pending'">Carregando...</div>
      <div v-else-if="error">Erro: {{ error.message }}</div>
      <div v-else>
        <pre>{{ userProfile }}</pre>
      </div>
    </div>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <div v-if="isLoadingProducts">Carregando...</div>
    <div v-else-if="userProducts.length > 0">
      <ul>
        <li v-for="product in userProducts" :key="product.id">
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserProduct } from "~/services/user/types";

// useNuxtApp é um composable que retorna a instancia do Nuxt
const { $http } = useNuxtApp();

const {
  data: userProfile,
  status,
  error,
} = await useAsyncData("get-user-profile", () => $http.user.getUserProfile());

// --------------------------------------

const isLoadingProducts = ref(false);
const userProducts = ref<IUserProduct[]>([]);

const fetchUserProducts = async () => {
  try {
    isLoadingProducts.value = true;
    userProducts.value = await $http.user.getUserProducts();
  } catch (error: any) {
    alert(error.message);
  } finally {
    isLoadingProducts.value = false;
  }
};

// async function fetchUserProducts() {
//   try {
//     isLoadingProducts.value = true;

//     userProducts.value = await $http.user.getUserProducts();
//   } catch (error: any) {
//     alert(error.message);
//   } finally {
//     isLoadingProducts.value = false;
//   }
// }
</script>

<!-- 

Imagine que uma API precisa que tenha um token na header ou um USER ID pra saber quem tá fazendo 
a requisição, e ainda tem que fazer uma tratativa de erro (401, 403), da pra fazer usando 
useAsyncData, mas teria que ficar alterando cada header de cada request no useAsync, e não é 
recomendado que se faça, e fere boas práticas de programação que é repetição.

Para isso o Nuxt 3 permite criar um Plugin para esse tipo de requisição.

Se quiser inserir tipagem, tem que 'reinstalar' ele novamente.
npm i -D ofetch 
(o uso do -D faz com que a lib seja instalada apenas como dependencia de desenvolvimento)
exemplo da tipagem ta no arquivo services/user/index

Após instalado criar uma pasta chamada 'plugins' na raiz do projeto e gerar um arquivo TS
Se um Plugin estiver na raiz do projeto não há necessidade de declarar ele no nuxt.config
Só precisa fazer isso se ele estiver em uma subpasta


-->
