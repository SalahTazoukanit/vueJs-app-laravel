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
                    <router-link style="text-decoration: none;" :to="{path: '/categories/update/'+ categorie.id}"><button>Modifier</button></router-link>
                    <button @click="deleteCategorie(categorie.id)">Supprimer</button>
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
    background-color: black;
    color: white;
    padding: 15px;
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
    background-color: rgb(219, 153, 22);
    border-radius: 5px;
    padding: 10px;
}
</style>