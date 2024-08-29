<template>
  <div class="text-white flex flex-col gap-4">
    <p>
      <NuxtLink to="/requisicoes" class="hover:text-emerald-500">
        Voltar
      </NuxtLink>
    </p>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <div class="flex flex-row items-center justify-between">
      <h1 class="text-lg">Use Fetch</h1>
      <UIButton type="button" @click="refresh" class="w-40">
        Recarregar Dados
      </UIButton>
    </div>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <select v-model="selectedPokemon" class="text-black">
      <option value="charmander">Charmander</option>
      <option value="bulbasaur">Bulbasauro</option>
      <option value="pikachu">Pikachu</option>
    </select>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <div v-if="status === 'pending'">Carregando...</div>
    <div v-else-if="error">Erro: {{ error }}</div>
    <div v-else>
      <pre>{{ charmander }}</pre>
    </div>
  </div>
</template>

<script setup>
const selectedPokemon = ref("charmander");

const endpoint = computed(() => {
  return `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.value}`;
});

const {
  error,
  status,
  data: charmander,
  refresh,
} = await useLazyFetch(endpoint, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  transform: (data) => ({
    id: data.id,
    nome: data.name,
    image: data.sprites.front_default,
  }),
  // pick: ["id", "name"],
});

// useFetch: não deixa renderizar a tela (bloqueia a navegação) enquanto está sendo feito a requisição
// useLazyFetch: NÃO bloqueia a navegação enquanto está sendo feito a requisição

// propriedade ERROR, indica se houve algum erro
// propriedade STATUS, é o status da request, ela retorna uma string (IDLE, PENDING, SUCCESS ou ERROR)
// propriedade DATA, é o retorno da request e pode ser renomeado usando :
// propriedade execute, é uma função para executar a requisição onde METHOD, URL, BODY podem ser diferentes
// propriedade refresh, é uma função para executar a requisição novamente usando os mesmos parâmetros

// transform: permite manipular o data e pegar apenas propriedades que quer usar, no caso usado está retornando apenas um objeto
// pick: é a mesma coisa do transform, com diferença que ele nao acessa variáveis de objetos

// Quando a request está em um CONST e pelo fato de estar usando COMPOSITION API, ele requisita assim que a página é acessada
// Se quiser fazer a request por meio de função, logo tem que se fazer uma função async.
</script>

<!-- 
useFetch: A Ferramenta para Interações Cliente-Servidor

Não permite requisição composta (Promisse.all[])

Flexibilidade: O useFetch é mais flexível e permite realizar qualquer tipo de requisição HTTP, incluindo POST, GET, PATCH e DELETE.

Interações dinâmicas: É ideal para interações do usuário, como criar, atualizar ou excluir dados.

Atualizações em tempo real: Pode ser usado para implementar funcionalidades como autocompletar, carregamento infinito e 
outras interações que exigem atualizações frequentes da interface do usuário.

Em resumo: Use useFetch quando você precisar interagir com o servidor após o carregamento inicial da página, por exemplo, 
para enviar formulários, buscar mais dados ou atualizar a interface do usuário.
-->
