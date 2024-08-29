<template>
  <div class="flex flex-col gap-4 text-white">
    <ListItems v-for="contact in contacts" :key="contact.id">
      <!-- como tem um slot default, é só por aqui, nao precisa por o template -->
      <p class="text-md font-semibold">
        {{ contact.nome }} | {{ contact.email }} | {{ contact.telefone }}
      </p>

      <template #actions>
        <div class="flex flex-row justify-around">
          <button @click="editContact(contact.id)">Editar</button>
          <button @click="removeContact(contact.id)">Excluir</button>
        </div>
      </template>
    </ListItems>
  </div>

  <UIButton @click="addContact" class="w-full"> Adicionar Contato </UIButton>
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
  router.push({ path: "/contatos/formulario", query: { id } });
};

const addContact = () => {
  router.push("/contatos/formulario");
};

const removeContact = (id) => {
  deleteContact(id);
};
</script>
