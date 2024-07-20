<template>
  <div class="w-full px-2">
    <ListItems v-for="contact in contacts" :key="contact.id">
      {{ contact.nome }}
      <!-- como tem um slot default, é só por aqui, nao precisa por o template -->

      <template #actions>
        <button @click="editContact(contact.id)">Editar</button>
        <button @click="removeContact(contact.id)">Excluir</button>
      </template>
    </ListItems>
  </div>

  <UIButton @click="addContact"> Adicionar Contato </UIButton>
</template>

<!-- O Nuxt importa automatico, nao precisa por o import -->

<script setup>
const router = useRouter();
const { contactList, deleteContact } = useContacts();

useHead({
  title: "Nome  do Site",
  meta: [
    { name: "descricao", content: "conteudo do site?" },
    // Metas tags especificas por Ex: Para o Twitter
    { name: "twitter:title", content: "Nome  do Site" },
    // General SEO pro Google em especifico (open graph)
    { property: "og:title", content: "Nome  do Site" },
  ],
});

const contacts = contactList();

const editContact = (id) => {
  router.push({ path: "/formulario", query: { id } });
};

const addContact = () => {
  router.push("/formulario");
};

const removeContact = (id) => {
  deleteContact(id);
};
</script>
