import { v4 as uuid } from "uuid";

export default () => {
  // nuxt3 tem composable nativo para gerenciamento de estado global semelhante ao vuex/pinia
  // só que de modo mais simples

  //indica uma chave, como se fosse o index pra acessar e
  // pode por valor padrao é um array vazio (tem q passar como função)
  const contactList = () => useState("contact_list", () => []);

  const createContact = ({ nome, email, telefone }) => {
    const id = uuid();

    contactList().value.push({ id, nome, email, telefone });
    // tem que por value porque o contactList é como se fosse um ref/reactive
  };

  const updateContact = (id, { nome, email, telefone }) => {
    contactList().value = contactList().value.map((contact) => {
      if (contact.id === id) {
        return { id, nome, email, telefone };
        // se ele existe ai sim altera as informações dele
      }

      return contact;
    });
  };

  const deleteContact = (id) => {
    contactList().value = contactList().value.filter(
      (contact) => contact.id !== id
    );
  };

  const getContact = (id) => {
    return contactList().value.find((contact) => contact.id === id);
  };

  return {
    contactList,
    createContact,
    updateContact,
    deleteContact,
    getContact,
  };
};
