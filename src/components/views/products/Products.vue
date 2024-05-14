<template> 
    <header>
        <router-link to="/products">Produits</router-link><br>
        <router-link to="/categories">Categories</router-link><br>
        <router-link to="/profile">Mon Profile</router-link><br>
    </header>
    <div><button style="float: right;" @click="logout">Logout</button></div>
    <h1>Listing Produits</h1>
    <div class="first-head">
        <div><router-link to="products/store"><button class="btn">store</button></router-link></div>
        <div></div>
        <!-- <div><input @keydown="getProductFromCategory" type="text" placeholder="search"></div> -->
    </div><br>
    <div class="listing-categories">
        <div class="categorie" v-for="categorie in categories" :key="categorie.id">
            <input type="checkbox" @change="getProductByCategorie">{{ categorie.name }}</input>
        </div>
    </div>
    <div class="container"> 
        
        <tbody class="listing-products" v-for="product in products" :key="product.id">
            <div class="product">
                <img :src="getImageUrl(product.image)" alt="" /> 
                <p>id_produit: {{ product.id }} </p>
                <p>Nom: {{ product.name }} </p>
                <p>Description: {{ product.description }} </p>
                <p>Price: {{ product.price }} euros </p>
                <p>Stock: {{ product.stock }} produits restants </p>
                Categorie:
                <div v-for="categories in product.categorie">
                     {{ categories }}
                </div>
                 
            </div> 
            <div class="btns">
                <button @click="deleteProduct(product.id)">Supprimer</button>
                <router-link style="text-decoration: none;" :to="{path: '/products/update/'+ product.id}"><button>Modifier</button></router-link>
                <router-link style="text-decoration: none;" :to="{name:'ShowProduct' , params: { id : product.id }}"><button>Afficher produit</button></router-link>
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

            ],
            authenticated : false,
        } 
    },

    mounted() {
    this.getProducts() ;
    this.getCategories();
    // this.getImageUrl();
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
    // getProductByCategorie(){
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
    overflow: hidden;
}
.product{
    border: solid;
    text-align: center;
    width: 320px;
    height: 450px;
    border-radius: 10px;
    padding: 5px;
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
.categorie{

}
</style>