export default class User {
    constructor({ email, password }) {
        if(!this.email.includes('@')) {
            throw new Error();
        }
        this.email = email;
        this.password = password;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }
}