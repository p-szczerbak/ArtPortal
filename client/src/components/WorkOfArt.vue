<!--Vue.component('WorkOfArt', {-->
  <!--props: ['title'],-->
  <!--template: '<v-layout>-->
    <!--<v-flex xs12 sm6 offset-sm3>-->
      <!--<v-card>-->
        <!--<v-img-->
          <!--src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"-->
          <!--aspect-ratio="2.75"-->
        <!--&gt;</v-img>-->

        <!--<v-card-title primary-title>-->
          <!--<div>-->
            <!--<h3 class="headline mb-0">Kangaroo Valley Safari</h3>-->
            <!--<div> {{ title }} </div>-->
          <!--</div>-->
        <!--</v-card-title>-->

        <!--<v-card-actions>-->
          <!--<v-btn flat color="orange">Share</v-btn>-->
          <!--<v-btn flat color="orange">Explore</v-btn>-->
        <!--</v-card-actions>-->
      <!--</v-card>-->
    <!--</v-flex>-->
  <!--</v-layout>'-->
<!--})-->
<template>
  <v-layout>
    <!--<v-flex xs12 sm6 offset-sm3>-->
    <v-flex md12 xl6 offset-xl3 >
      <v-card class="card" hover to=LogIn>
        <v-img
          :src="require('../assets/sculpture.jpg')"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{title}}</h3>
            <div> {{author}}  </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="blue">More</v-btn>
          <v-btn flat color="blue">Add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import LogIn from './LogIn.vue'
export default {
  components: LogIn,
  name: 'WorkOfArt',
  props: ['title', 'description', 'image', 'author'],
  data: () => ({
  })
}
</script>

<style>
  .card {
    margin: 20px;
  }
</style>
