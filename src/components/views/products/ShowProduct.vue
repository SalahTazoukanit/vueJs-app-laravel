<template>
    <div>
        <!-- <h1 style="text-align: center;">Le produit</h1> -->
        <div class="container">
            <p v-if="product.name"><h1>{{ product.name }}</h1></p>
            <div>
                <img v-if="product.image" :src="getImageUrl(product.image)"></img>
            </div>
            <div>
                <p v-if="product.description">{{ product.description }}</p>
                <p v-if="product.price">Prix: {{ product.price }} euros</p>
                <p v-if="product.stock">Pieces restants: {{ product.stock }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

// constante token à rajouter dans les requests 
const headers = {
'Authorization': 'Bearer ' + localStorage.getItem('token'),
'Content-Type': 'application/json'
};

export default {
    data() {
        return {
            product :{

            }
        }
    },
    mounted() {
        this.getProductData(this.$route.params.id);
    },
    methods : {
        getProductData(productId){
            axios.
            get(`http://127.0.0.1:8000/api/v1/products/${productId}`, { headers })
            .then((response)=>{
                console.log(response.data);
                this.product = response.data;
            })
            .catch((error)=>{
                console.error("Une erreur s'est produite");
            })
        },
        getImageUrl(image){
        if (image) {
            return 'http://127.0.0.1:8000/' + image ;
        }
    },
    fileImg(event){
        this.product.image = event.target.files[0];
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
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;
   text-align: center;
}
.container img{
    width: 40%;
    max-height: 30%;
}
</style>