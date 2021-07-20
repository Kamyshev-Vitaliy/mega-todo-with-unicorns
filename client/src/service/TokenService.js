export default class TokenService {

    constructor(key = 'jwt') {
        this.tokenStorage = this._initStorage()
        this.key = key
        this.subscribers = []
    }

    _initStorage() {
        return this._checkDefaultStorage() === 'local' ? localStorage : sessionStorage
    }

    _checkDefaultStorage() {
        return localStorage.getItem('tokenStorage')
    }

    getToken() {
        return this.tokenStorage.getItem(this.key)
    }

    _changeTokenStorage(remember) {
        if (remember) {
            localStorage.setItem('tokenStorage', 'local')
            this.tokenStorage = localStorage
            return
        }
        localStorage.setItem('tokenStorage', 'session')
        this.tokenStorage = sessionStorage
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber)
        return this.getToken()
    }

    setToken(token) {
        this.tokenStorage.setItem(this.key, token);
        this.subscribers.forEach((subscriber) => subscriber(token))
    }

    removeToken() {
        this.tokenStorage.removeItem(this.key);
        this.subscribers.forEach((subscriber) => subscriber(null))
    }

    setTokenStorage(remember) {
        const token = this.getToken();
        this.tokenStorage.removeItem(this.key)
        this._changeTokenStorage(remember)
        this.tokenStorage.setItem(this.key, token);
    }
}

