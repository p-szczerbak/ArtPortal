<template>
  <div class="posts">
    <v-toolbar app>

      <v-toolbar-title class="headline text-uppercase">
        <span>Art</span>
        <span class="font-weight-light">PORTAL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href=""
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <ul id="example-1">
      <li v-for="post in posts" :key="post">
        <!--<Post> </Post>-->
        {{ post.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'posts',
  data () {
    return {
      posts: [{
        'message': 'dcfd'
      }, {
        'message': 'cdfcd'
      }, {
        'message': 'dccdfcvdffd'
      }
      ]
    }
  }
}
</script>
