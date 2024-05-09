<template>
    <div>
        <h1 style="text-align: center;">Le produit</h1>
        <div class="container">
            <p v-if="product.id">{{ product.id }}</p>
            <p v-if="product.name">{{ product.name }}</p>
            <p v-if="product.description">{{ product.description }}</p>
            <p v-if="product.price">{{ product.price }}</p>
            <p v-if="product.stock">{{ product.stock }}</p>
            <p v-if="product.image">{{ product.image }}</p>
        </div>
        
       
    </div>
</template>

<script>
 import axios from 'axios';
 
export default {
    data() {
        return {
            product :{

            }
        }
    },
    methods : {
        getProductData(productId){
            axios.
            get(`http://127.0.0.1:8000/api/v1/products/${productId}`)
            .then((response)=>{
                console.log(response.data);
                this.product = response.data;
            })
            .catch((error)=>{
                console.error("Une erreur s'est produite");
            })
        }
    },
    mounted() {
        this.getProductData(this.$route.params.id);
    }

}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;
   text-align: center;
}
</style>