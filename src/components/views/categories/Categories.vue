<template>
    <header>
        <router-link style=" text-decoration: none;" to="/products">Produits</router-link><br>
        <router-link style=" text-decoration: none;" to="/categories">Categories</router-link><br>
        <router-link style=" text-decoration: none;" to="/profile">Mon Profile</router-link><br>
    </header><br>
    <div>
        <div>
            <h1 style="text-align: center;">Listing Categories</h1>
            <div style="display: flex; justify-content: center;"><router-link to="categories/store"><button id="store">Créer categorie</button></router-link></div>
        </div><br>
        <div class="listing-categories">
        <div class="categories" v-for="categorie in categories" :key="categorie.id">
            <div class="categorie">
                <p>{{ categorie.name }}</p>
                <p>{{ categorie.description }}</p>
                <div class="btns">
                    <router-link style="text-decoration: none;" :to="{path: '/categories/update/'+ categorie.id}"><button class="btn-edit">Modifier</button></router-link>
                    <button class="btn-delete" @click="deleteCategorie(categorie.id)">Supprimer</button>
                </div>
            </div>
            
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            categories : {
                // name: '',
                // description :'',
        },
        }
    },
    mounted (){
        this.getCategories();
    },
    methods :{
        getCategories(){
            axios
            .get('http://127.0.0.1:8000/api/v1/categories', {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    // "Content-Type": 'application/json',
                }
            })
            .then((response)=>{
                console.log(response);
                this.categories = response.data ;
            })
        },

        deleteCategorie(categorieId){
            axios
            .delete(`http://127.0.0.1:8000/api/v1/categories/${categorieId}`, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    // "Content-Type": 'application/json',
                }
            })
            .then((response)=>{
                this.getCategories();
            })
        }
    }
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-evenly;
}
.listing-categories{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1em;
}
.categories{
    /* display: flex; */
    border-radius: 3px;
    /* background-color: black; */
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;    padding: 15px;
}
#store{
    width: 200px;
}
.btns{
    display: flex;
    gap: 3em;
}
button{
    border: none;
    color:white;
    background-color: orange;
    border-radius: 5px;
    padding: 10px;
}
.btn-delete{
    background-color: red;
}
.btn-edit{
    background-color: rgb(0, 36, 128);
}
</style>