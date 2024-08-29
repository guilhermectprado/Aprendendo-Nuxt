import UserServices from "@/services/user"

interface IHttp {
  user: UserServices
}

export default defineNuxtPlugin(() => {
  const fetcher = $fetch.create({
    baseURL: '/api',
    onRequest({request, options}) {
      const authHeader ={ Authorization: 'Bearer xyz' } // normalmente se pega o token/id do Pinia ou localStorage
      options.headers = Object.assign(authHeader, options.headers) //mesclar o que veio da requisicao com o header de autorização
      // se passar o authHeader quando chamar o Plugin nas telas/componentes, 
      // esse authHeader será sobrescrito, no caso o options.headers do plugin tem prioridade
    }
  })

  const httpServices: IHttp = {
    user: new UserServices(fetcher)
  }

  // quando se cria Plugins no Nuxt, temos como injetar esse Plugin na instancia do Nuxt
  // sendo feito da seguinte maneira:
  return {
    provide: {
      http: httpServices //o http nas telas/componentes conseguimos usar por meio de $http
    }
  }

})

// toda vez que o nuxt iniciar ele ira gerar uma instancia desse plugin e repassar as configurações
// para todas as services, onde cada services recebe ela no seu construtor, faz a requisição
// e se espera que retorne dados igual aos da interface

// para cada service criada, é preciso inserir na interface do IHttp, e aumentar uma 
// instancia na const httpServices

// para usar as requisições usamos diretamente as services