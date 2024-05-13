<template>
    <h1 style="text-align: center;">Login</h1>
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
        <!-- <div>
            <label for="passwordConfirmation">Password Confirmation: </label>
            <input type="password" id="passwordConfirmation" v-model="user.passwordConfirmation" required>
        </div> -->
        <div><button class="btn" type="submit">Login</button></div>
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
                // passwordConfirmation :"",
            }
        }
    },
    methods : {
        login(){
            let data = new FormData();
            data.append('name',this.user.name);
            data.append('email',this.user.email);
            data.append('password',this.user.password);
            // data.append('password_confirmation',this.user.passwordConfirmation);

            axios
            .post('http://127.0.0.1:8000/api/v1/login', data)
            .then((response)=>{
                console.log(response);
                const token = response.data.token ;
                localStorage.setItem('token', token);
                this.$router.push('/products' );
            }).catch(error => console.log(error)); 
        }
    }
}
</script>

<style scoped>
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