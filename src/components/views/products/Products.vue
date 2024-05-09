<template> 
    <h1>Listing Produits</h1>
    <div class="first-head">
        <div><router-link to="products/store">Store</router-link></div>
        <div></div>
        <!-- <div><input @keydown="getProductFromCategory" type="text" placeholder="search"></div> -->
    </div><br>
   
    <div class="container"> 
        <div class="listing-categories" v-for="categorie in categories" :key="categorie.id">
            <div><input type="checkbox" class="categorie">{{ categorie.name }}</input></div>
        </div>
        <tbody class="listing-products" v-for="product in products" :key="product.id">
            <div class="product">
                <p>id_produit: {{ product.id }} </p>
                <p>Nom: {{ product.name }} </p>
                <p>Description: {{ product.description }} </p>
                <p>Price: {{ product.price }} euros </p>
                <p>Stock: {{ product.stock }} produits restants </p>
                <div v-for="categories in product.categorie">
                    Categorie: {{ categories }}
                </div>
                <img ref="file" :src="product.image" v-bind:src="image_url" alt="" />
                
            </div> 
            <div class="btns">
                <button @click="deleteProduct(product.id)">Supprimer</button>
                <router-link :to="{path: '/products/update/'+ product.id}"><button>Modifier</button></router-link>
                <router-link :to="{name:'ShowProduct' , params: { id : product.id }}"><button @click="getProductData(product.id)">Afficher produit</button></router-link>
                <!-- <router-link :to="{ path:'/products/'+ product.id }"><button>Visualiser</button></router-link> -->
            </div>
        </tbody>
    </div>
    <router-view />
</template>

<script>

import axios from 'axios';

export default {
    // props: ["image_url"],
    data(){
        return {
            products:[

            ],
            categories:[

            ]
        } 
    },

    mounted() {
    this.getProducts() ;
    this.getCategories();
    },

methods :{
    getProducts(){
    axios
    .get("http://127.0.0.1:8000/api/v1/products")
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
            get(`http://127.0.0.1:8000/api/v1/products/${productId}`)
            .then((response)=>{
                console.log(response);
            })
    },

    deleteProduct(productId){
        axios
        .delete(`http://127.0.0.1:8000/api/v1/products/${productId}`)
        .then((response)=>{ 
            alert("Vous avez supprimé l'article") ;
            this.getProducts();

        });
    },

    fileImg(event){
        this.product.image = event.target.files[0];
    },

    getCategories(){
        axios
        .get(`http://127.0.0.1:8000/api/v1/categories`)
        .then((response)=>{
            console.log(response);
            this.categories = response.data ;
        });
    }
    // getProductFromCategory(){
    //     console.log('ok');
    //     axios.
    //     get()
    //     then((response)=>{
    //         console.log("ok");
    //     })
    // },
  },
}
</script>

<style scoped>
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
}
.product{
    border: solid;
    text-align: center;
    width: 300px;
    height: 250px;
    border-radius: 10px;
}
.btns{
    display: flex;
    justify-content: center;
    justify-content: space-between;
}
.listing-categories{
    display: flex;
    flex-direction: column;
}
/* .categorie{

} */
</style>