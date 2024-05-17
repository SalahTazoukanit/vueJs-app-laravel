<template>
    <header>
        <router-link style="text-decoration: none;" to="/">Welcome</router-link>
        <router-link style="text-decoration: none;" to="/Login">Login</router-link>
    </header>
    <h1 style="text-align: center;">Register now </h1>
    <form @submit.prevent="createUser">
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
            <label for="passwordConfirmation">Password confirmation: </label>
            <input type="password" id="passwordConfirmation" v-model="user.passwordConfirmation" required>
        </div>
        <div>
            <button class="btn" type="submit">Enregistrer</button>
        </div>
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
            },
        }
    },
    // mounted() {
    //     createUser();
    // },
    methods: {
        createUser(){
            let data = new FormData();
            data.append('name',this.user.name);
            data.append('email',this.user.email);
            data.append('password',this.user.password);
            data.append('password_confirmation',this.user.passwordConfirmation);

            axios
            .post('http://127.0.0.1:8000/api/v1/register', data)
            .then((response)=>{
                console.log(response);
                this.$router.push({ name: 'welcome' });
                alert("Vous étes bien enregistré") ;
            })
        }
    },
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-evenly;
}
html,body{
    margin:0;padding:0
}
section{
    height:100vh;
    display:grid;
    justify-items:center;
    padding-top:40px;
}
div{
    margin:24px auto;
}
label{
    font-weight:bolder;
    display:block;
    margin-bottom:4px;
}
form{
    display: flex;
    flex-direction: column;
}
input{
    width: 300px;
}
.btn{
    width:150px ;
    height: 20px;
}
</style>