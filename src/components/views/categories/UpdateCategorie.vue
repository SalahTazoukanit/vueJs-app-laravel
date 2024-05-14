<template>
    <div>
        <h1>Modifier la categorie</h1>
    </div>
    <div>
        <form @submit.prevent="updateCategorie" enctype="multipart/form-data">
            <div>
                <label for="name">Nom: </label>
                <input type="text" id="name" v-model="categorie.name">
            </div>
            <div>
                <label for="description">Description: </label>
                <textarea id="description" rows="6" cols="22" v-model="categorie.description"></textarea>
            </div>
            <!-- <div><input type="file" ref="file" @change="fileImg" required></div> -->
            <button type="submit">Modifier</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            categorie:{

            }
        }
    },
    mounted(){
        this.getCategorieData(this.$route.params.id);
    },
    methods: {
        getCategorieData(categorieId){
            
            axios
            .get('http://127.0.0.1:8000/api/v1/categories/'+categorieId, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then((response)=>{
                this.categorie = response.data ;
            })
        },
        updateCategorie(){
            const categorieId = this.$route.params.id ;

            let data = new FormData();
            data.append('name', this.categorie.name);
            data.append('description', this.categorie.description);

            axios
            .post(`http://127.0.0.1:8000/api/v1/categories/${categorieId}?_method=PUT`, data  , {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
                })
            .then((response)=>{
                this.$router.push('/categories')
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
</style>