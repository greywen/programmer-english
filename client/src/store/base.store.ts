import { observable } from 'mobx'

export class BaseStore {
    @observable
    loading: boolean = true
}