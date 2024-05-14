<template>
    <h1 style="text-align: center;">Créer categorie</h1>
    <div class="container-form">
        <form @submit.prevent="createCategorie" enctype="multipart/form-data">
            <div>
                <label for="name">Nom: </label>
                <input type="text" id="name" v-model="categorie.name">
            </div>
            <div>
                <label for="description">Description: </label>
                <textarea id="description" rows="6" cols="22" v-model="categorie.description"></textarea>
            </div>
            <!-- <div><input type="file" ref="file" @change="fileImg" required></div> -->
            <button type="submit">Créer categorie</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            categorie :{
                name : '',
                description : '',
            }
        }
    },
    // mounted() {
    //     // this.storeCategorie();
    // },
    methods: {
        createCategorie(){

            let data = new FormData();
            data.append('name',this.categorie.name);
            data.append('description',this.categorie.description);

            axios
            .post('http://127.0.0.1:8000/api/v1/categories',data, {
            headers  :{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
            })
            .then((response)=>{
            this.$router.push('/categories');
            }) 
        }
        
    },
}
</script>

<style scoped>
html,body{margin:0;padding:0}
section{height:100vh;display:grid;justify-items:center;padding-top:40px}
div{margin:24px auto}
label{font-weight:bolder;display:block;margin-bottom:4px}
.container-form{
    display: flex;
    justify-content: center;
}
</style>