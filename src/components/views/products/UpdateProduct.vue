<template>
    <h1 style="text-align: center;">Modifier le produit</h1>
    <div>
        <section>
            <form @submit.prevent="updateProduct" enctype="multipart/form-data">
                <!-- <div>
                    <label for="productId">product_id:</label>
                    <input type="text" id="productId" v-model="product.id">
                </div> -->
                <div>
                    <label for="name">Nom produit: </label>
                    <input type="text" id="name" v-model="product.name" >
                </div>
                <div>
                    <label for="name">Prix: </label>
                    <input type="text" id="price" v-model="product.price">
                </div>
                <div>
                    <label for="name">Stock: </label>
                    <input type="text" id="stock" v-model="product.stock">
                </div>
                <!-- <div>
                    <label for="name">Categories: </label>
                    <input type="text" id="name" v-model="product.categorie">
                </div> -->
                <div>
                    <label for="description">Description: </label>
                    <textarea id="description" rows="6" cols="22" v-model="product.description"></textarea>
                </div>
                <div><input type="file" ref="file" @change="fileImg" required></div>
                <button>Modifier le produit</button>
            </form>
        </section>
    </div>
</template>

<script >
import axios from 'axios';

export default {
    //creation d'un objet product qui a comme parametres les valeurs recuperées avec this.$route.params dans l'url ;
    data(){
        return {
            product:{
                
            }
        } 
    },
    //fonction pour recuperer l'id du produit et aprés l'assigner a la fonction suivante ;
    mounted(){
        this.getProductData(this.$route.params.id);
    },

 methods: {
    //recuperer les données du produit pour les afficher dans les champs a rentrer/modifier ;
    getProductData(productId){
        
        axios
        .get(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then((response)=>{
            this.product = response.data;
            console.log(response.data);
        }) ;
    },
    //request pour mettre à jour le produit ;
    updateProduct(){
        const productId = this.$route.params.id ;

        const header = {

            'contentType':'multipart/form-data'
        }
        //creation d'une istance pour pouvoir organiser les valeur rentrées dans les v-model dans un format acceptés par le server et les passer dans la request avec la variable data;
        let data = new FormData();
        data.append('name', this.product.name)
        data.append('description', this.product.description)
        data.append('price', this.product.price)
        data.append('stock', this.product.stock)
        data.append('image', this.product.image)
        // data.append('image', this.product.categorie)

        axios
        .post(`http://127.0.0.1:8000/api/v1/products/${productId}?_method=PUT`, data  , {
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
        }, header)
        .then((response) => console.log(response));
        this.$router.push("/products");
    },
    //pour inserer correctement les images ;
    fileImg(event){
        this.product.image = event.target.files[0];
    },
    getImageUrl(image){
        if (image) {
            return 'http://128.0.0.1:8000' + image ;
        }
    } 
 }
   
  }

</script>

<style scoped>
html,body{margin:0;padding:0}
section{height:100vh;display:grid;justify-items:center;padding-top:40px}
div{margin:24px auto}
label{font-weight:bolder;display:block;margin-bottom:4px}
</style>