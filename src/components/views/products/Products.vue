<template> 
    <header>
        <router-link style=" text-decoration: none;" to="/products">Produits</router-link><br>
        <router-link style=" text-decoration: none;" to="/categories">Categories</router-link><br>
        <router-link style=" text-decoration: none;" to="/profile">Mon Profile</router-link><br>
        <div><button style="float: right;" @click="logout">Logout</button></div>
    </header>
    <h1 style="text-align: center;">Listing Produits</h1>
    <div class="first-head">
        <div><router-link to="products/store"><button class="btn">store</button></router-link></div>
        <div></div>
        <!-- <div><input @keydown="getProductFromCategory" type="text" placeholder="search"></div> -->
    </div><br>
    <div class="listing-categories">
        <div v-for="categorie in categories" :key="categorie.id">
            <input v-model="selectedCategories" :value="categorie.name" type="checkbox" :id="categorie.id">{{ categorie.name }}</input>
        </div>
    </div>
    <div class="container"> 
        
        <tbody class="listing-products" v-for="product in filteredProducts" :key="product.id">
            <div class="product">
                <img :src="getImageUrl(product.image)" alt="" /> 
                <p>id_produit: {{ product.id }} </p>
                <p>Nom: {{ product.name }} </p>
                <p>Description: {{ product.description }} </p>
                <p>Price: {{ product.price }} euros </p>
                <p>Stock: {{ product.stock }} produits restants </p>
                <p>Categorie(s):</p>
                <div v-for="categories in product.categorie">
                     {{ categories }}
                </div>
                 
            </div> 
            <div class="btns">
                <button class="btn-delete" @click="deleteProduct(product.id)">Supprimer</button>
                <router-link style="text-decoration: none;" :to="{path: '/products/update/'+ product.id}"><button class="btn-edit">Modifier</button></router-link>
                <router-link style="text-decoration: none;" :to="{name:'ShowProduct' , params: { id : product.id }}"><button class="btn-show">Afficher produit</button></router-link>
                <!-- <router-link :to="{ path:'/products/'+ product.id }"><button>Visualiser</button></router-link> -->
            </div>
        </tbody>
    </div>
    <router-view />
</template>

<script>

import axios from 'axios';

export default {
    
    data(){
        return {
            products:[],
            categories:[],
            selectedCategories: [],
            authenticated : false,
        } 
    },

    mounted() {
        this.getCategories();
        this.getProducts() ;
    },

    computed: {
    filteredProducts () {
        console.log('ok');
        if (this.selectedCategories.length === 0) {
            return this.products ;
        }else{
            return this.products.filter(product => { 
                return product.categorie.some(categorie => this.selectedCategories.includes(categorie)) ; 
             });
        }
    },
    },   
methods :{
    
    logout(){
        localStorage.removeItem('token');
        this.$router.push('/login');
    },

    getProducts(){
    axios
    .get("http://127.0.0.1:8000/api/v1/products", {
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            "Content-Type": 'application/json',
        }
    })
    .then((response)=>{
        console.log(response);
        this.products = response.data ;
    })
    .catch((error)=>{
        console.error("Une erreur s'est produite");
    }) 
    },

    getProductData(productId){
        axios.
        get(`http://127.0.0.1:8000/api/v1/products/${productId}` ,{
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": 'application/json',
        }
    })
            .then((response)=>{
                console.log(response);
            })
    },

    deleteProduct(productId){
        axios
        .delete(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": 'application/json',
            }
        })
        .then((response)=>{ 
            this.getProducts();
        });
    },

    fileImg(event){
        this.product.image = event.target.files[0];
    },

    getImageUrl(image){
        if (image) {
            return 'http://127.0.0.1:8000/' + image ;
        }
    },

    getCategories(){
        axios
        .get(`http://127.0.0.1:8000/api/v1/categories`, {
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            "Content-Type": 'application/json',
        }
    })
        .then((response)=>{
            console.log(response);
            this.categories = response.data ;
        });
    },
  },
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-evenly;
}
.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
    align-items: center;
    justify-content: center;
    gap: 2em;
}
.first-head{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 4em;
}
.listing-products{
    display: flex;
    flex-direction: column;
    gap: 1em;
    overflow: hidden;
}
.product{
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    text-align: center;
    width: 320px;
    height: 450px;
    border-radius: 10px;
    padding: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.btns{
    display: flex;
    justify-content: center;
    justify-content: space-between;
}
.listing-categories{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 25px;
}
.btn{
    width: 200px;
    height: 30px;
}
button{
    border: none;
    color:white;
    padding: 5px;
    background-color: rgb(219, 153, 22);
    border-radius: 5px;
}
img{
    width:300px ;
    height: 200px;
    border-radius: 10px;
}
.product p{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.btn-delete{
    background-color: red;
}
.btn-show{
    background-color: green;
}
.btn-edit{
    background-color: rgb(0, 36, 128);
}
</style>