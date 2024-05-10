<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <div>
            <label for="name">Nom: </label>
            <input type="text" id="name" v-model="user.name" required>
        </div>
        <div>
            <label for="email">Email: </label>
            <input type="email" id="email" v-model="user.email" required>
        </div>
        <div>
            <label for="password">Password: </label>
            <input type="password" id="password" v-model="user.password" required>
        </div>
        <div>
            <label for="passwordConfirmation">Password Confirmation: </label>
            <input type="password" id="passwordConfirmation" v-model="user.passwordConfirmation" required>
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script >
import axios from 'axios';

export default {
    data() {
        return {
            user : {
                name :"",
                email : "",
                password :"",
                passwordConfirmation :"",
            }
        }
    },
    methods : {
        login(){
            let data = new FormData();
            data.append('name',this.user.name);
            data.append('email',this.user.email);
            data.append('password',this.user.password);
            data.append('password_confirmation',this.user.passwordConfirmation);

            axios
            .post('http://127.0.0.1:8000/api/v1/login', data)
            .then((response)=>{
                console.log(response);
                this.$router.push({ name: 'products' });
            })
        }
    }
}
</script>

<style scoped>

</style>