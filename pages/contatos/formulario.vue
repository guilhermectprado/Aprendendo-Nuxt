<template>
  <form @submit.prevent="saveContact">
    <UIInput label="Nome" type="texto" v-model="contato.nome" />
    <UIInput label="Email" type="mail" v-model="contato.email" />
    <UIInput label="Telefone" type="phone" v-model="contato.telefone" />
    <UIButton type="submit" class="w-full"> Salvar Contato </UIButton>
  </form>
</template>

<script setup>
const { createContact, getContact, updateContact } = useContacts();
const route = useRoute(); //pega info da rota atual que ta sendo usada
const router = useRouter(); // só para redirecionamento

const contato = reactive({
  id: "",
  nome: "",
  email: "",
  telefone: "",
});

onMounted(() => {
  const id = route.query.id;

  if (id) {
    const { nome, email, telefone } = getContact(id);

    contato.id = id;
    contato.nome = nome;
    contato.email = email;
    contato.telefone = telefone;
  }
});

const saveContact = () => {
  if (contato.id) {
    updateContact(contato.id, contato);
  } else {
    createContact(contato);
  }

  router.push("/contatos");
};
</script>
