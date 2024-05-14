<template>
    <div>
        <h1>Modifier la categorie</h1>
    </div>
    <div>
        <form @submit.prevent="updateCategorie" enctype="multipart/form-data">
                <!-- <div>
                    <label for="productId">product_id:</label>
                    <input type="text" id="productId" v-model="product.id">
                </div> -->
                <div>
                    <label for="name">Nom categorie: </label>
                    <input type="text" id="name" v-model="categorie.name">
                </div>
                <div>
                    <label for="description">Description: </label>
                    <textarea id="description" rows="6" cols="22" v-model="categorie.description"></textarea>
                </div>
                <!-- <div><input type="file" ref="file" @change="fileImg" required></div> -->
                <button>Modifier</button>
            </form>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>