import { observable } from 'mobx';
import { isAuthorized } from '../utils/loginUtils';

class AuthorizationStore {
    @observable
    isAuthorized: boolean = isAuthorized();

    update = () => {
        this.isAuthorized = isAuthorized();
    }
}

export default new AuthorizationStore()