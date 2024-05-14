<template>
<header>
    <router-link to="/products">Produits</router-link><br>
    <router-link to="/categories">Categories</router-link><br>
    <router-link to="/profile">Mon Profile</router-link><br>
</header>
<h1 style="text-align: center;">Mon profile</h1>
<div class="container">
    <form @submit.prevent="updateUser">
        <div>
            <label for="name">Nom: </label>
            <input type="text" id="name" v-model="user.name" required>
        </div>
        <div>
            <label for="email">Email: </label>
            <input type="email" id="email" v-model="user.email" required>
        </div>
        <div>
            <label for="password">New Password: </label>
            <input type="password" id="password" v-model="user.password" required>
        </div>
        <!-- <div>
            <label for="passwordConfirmation">Password Confirmation: </label>
            <input type="password" id="passwordConfirmation" v-model="user.passwordConfirmation" required>
        </div> -->
        <div><button type="submit">Modifier</button></div>
    </form>
</div>
</template>

<script >
import axios from 'axios';

export default{
    data() {
        return {
            user : {
                // id:'',
                // name:'',
                // email:'',
                // password:'',
            },
        }
    },
    mounted() {
        this.checkUser();
        this.getUserData(); 
    },
    methods: {
        checkUser(){
            const id = localStorage.getItem('userId');
            if (id) {
                this.userId = localStorage.getItem('userId');
            }
        },
        getUserData(){
            
            axios
            .get(`http://127.0.0.1:8000/api/v1/users/${this.userId}`,{
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
            })
            .then((response)=>{
                console.log(response);
                this.user = response.data ;
            })
        },
        updateUser(){

            let data = new FormData();

            data.append('name', this.user.name);
            data.append('email', this.user.email);
            data.append('password', this.user.password);

            axios
            .post(`http://127.0.0.1:8000/api/v1/users/${this.userId}?_method=PUT`,data,{
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
            })
            .then((response)=>{
                console.log('ok');
                this.$router.push('/products');
            })
        }
        
    },
}
</script>

<style scoped>
.container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
html,body{margin:0;padding:0}
section{height:100vh;display:grid;justify-items:center;padding-top:40px}
div{margin:24px auto}
label{font-weight:bolder;display:block;margin-bottom:4px}
form{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
input{
    display: flex;
    width: 440px;
}
button{
    display: flex;
    background-color: orange;
    border: none;
    border-radius: 5px;
    width: 150px;
    height: 25px;
}
</style>