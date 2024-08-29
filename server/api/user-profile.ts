// Criação de APIs/Endpoints ou algo do lado do servidor no Nuxt, 
// temos que exportar a seguinte função
// dentro do event vem a request, os headers, tudo

export default defineEventHandler((event) => {

  const authHeader = getHeader(event, "Authorization")

  if (!authHeader || authHeader !== "Bearer xyz") {
    return sendError(event, createError({
      statusCode: 401, statusMessage: "Unauthorized"  
    }))
  } 

  return {
    id: 1,
    name: 'Guilherme Prado',
    email: "guilherme@prado.com",
    idade: 10,
  }
})