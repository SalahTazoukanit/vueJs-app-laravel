<template>
    <!-- <p><router-link to="products/store">Store</router-link></p> -->
    <h1 style="text-align: center;">Creér un produit</h1>
    <div>
        <section>
            <form @submit.prevent="createProduct" enctype="multipart/form-data">
                <div>
                    <label for="name">Nom produit: </label>
                    <input type="text" id="name" v-model="product.name">
                </div>
                <div>
                    <label for="price">Prix: </label>
                    <input type="text" id="price" v-model="product.price">
                </div>
                <div>
                    <label for="stock">Stock: </label>
                    <input type="text" id="stock" v-model="product.stock">
                </div>
                <div class="listing-categories">
                    <div class="categorie" v-for="categorie in categories" :key="categorie.id">
                        <input type="checkbox" :value="categorie.id" v-model="selectedCategories">{{ categorie.name }}
                    </div>
                </div>
                <div>
                    <label for="description">Description: </label>
                    <textarea id="description" rows="6" cols="22" v-model="product.description"></textarea>
                </div>
                <div><input type="file" ref="file" @change="fileImg" required></div>
                <button>Ajouter le produit</button>
            </form>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product : {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categories: [],
        image:'',
      },
      selectedCategories :[],
      categories:[],
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {

    createProduct() {
        console.log(this.product.image);
        
        let data = new FormData();
        data.append('name', this.product.name)
        data.append('description', this.product.description)
        data.append('price', this.product.price)
        data.append('stock', this.product.stock)
        data.append('categories',JSON.stringify(this.selectedCategories))
        data.append('image', this.product.image)
		
        axios
        .post('http://127.0.0.1:8000/api/v1/products', data, {
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then((response) => console.log(response))
        console.log(this.product.image);

        this.$router.push("/products");

	},
    getImageUrl(image){
        if (image) {
            return 'http://127.0.0.1:8000/' + image ;
        }
    },
    fileImg(event){
        this.product.image = event.target.files[0];
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
    }
}
</script>

<style scoped>
html,body{margin:0;padding:0}
section{height:100vh;display:grid;justify-items:center;padding-top:40px}
div{margin:24px auto}
label{font-weight:bolder;display:block;margin-bottom:4px}
</style>