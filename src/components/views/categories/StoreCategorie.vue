<template>
    <h1>Créer categorie</h1>
    <div>
        <form @submit.prevent="storeCategorie" enctype="multipart/form-data">
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

</script>

<style scoped>

</style>