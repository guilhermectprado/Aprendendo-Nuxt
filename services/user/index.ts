import type { $Fetch } from 'ofetch'
import type { IUserProduct, IUserProfile } from './types'

export default class UserServices {

  private fetch: $Fetch // tipagem, motivo da 're-instalacao' do oFetch

  constructor(fetch: any) { 
    // aqui nao pode ser $Fetch por que no http.ts o $fetch.create de lá tem tipagem diferente,
    // retornando 'unknow' e 'NitroFetch' e não se tem acesso a elas, entao bota any
    this.fetch = fetch
  }

  async getUserProfile() {
    const result = await this.fetch<IUserProfile>('/user-profile', {
      method: "GET"
    })

    return result
  }

  async getUserProducts() {
    const result = await this.fetch<IUserProduct[]>('/user-products', {
      method: "GET"
    })

    return result
  }
}