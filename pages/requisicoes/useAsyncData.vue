<template>
  <div class="text-white flex flex-col gap-4">
    <p>
      <NuxtLink to="/requisicoes" class="hover:text-emerald-500">
        Voltar
      </NuxtLink>
    </p>

    <div class="w-full bg-black opacity-20 h-1 rounded-full"></div>

    <div class="flex flex-row items-center justify-between">
      <h1 class="text-lg">Use AsyncData</h1>
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

const {
  data: charmander,
  status,
  error,
  refresh,
} = await useAsyncData(
  "chave-unica", // poderia ser 'pokemon-info'
  async () => {
    const [pokemonData, speciesData] = await Promise.all([
      $fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.value}`),
      $fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.value}`
      ),
    ]);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      habitat: speciesData.habitat?.name,
      shape: speciesData.shape?.name,
    };
  },
  {
    watch: [selectedPokemon],
    lazy: true,
  }
);

// useAsyncData: não deixa renderizar a tela (bloqueia a navegação) enquanto está sendo feito a requisição
// useLazyAsyncData: NÃO bloqueia a navegação enquanto está sendo feito a requisição
// Também existe uma propriedade 'lazy: true' no ato da requisição ao invéz de usar useLazyAsync

// Obrigado a passar uma chave unica não podendo repetir em toda a aplicação, especificando bem o contexto da requisição.
// Com essa chave o Nuxt vai saber distinguir essa requisição das outras.
// Após disparada pelo lado do servidor, por meio dessa chave, ele reconhece no lado do client pega os dados do Server
// e simplesmente passa pro lado do cliente, para não refazer a requisição.

// Computed não funciona devido ter duas requisições ocorrendo simultaneamente, então pra isso existe a propriedade WATCH
// No Watch, da para inserir variaveis que ficarão sendo assistidas, cada variavel que mudar irá refazer a request com essa variavel
</script>

<!-- 
useAsyncData: A Ponte entre Servidor e Cliente

Permite requisição composta "Promisse.all(['req 1', 'req 2'])"

Ele roda useFetch por baixo dos panos
Cada $fetch do promisse.all é possível ser modificada e usado modelo de requisição igual do useFetch e do OFetch

Hidratação: O useAsyncData é ideal para buscar dados no servidor e hidratar o HTML antes de enviar para o cliente. 
Isso significa que o cliente recebe uma página já preenchida com os dados, proporcionando uma experiência de usuário mais rápida e 
suave.

Em resumo: Use useAsyncData quando você precisar de dados do servidor para renderizar a página inicial ou 
qualquer outra página que exija dados pré-carregados. 
-->
