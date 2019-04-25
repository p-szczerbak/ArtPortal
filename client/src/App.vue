<template>
  <v-app>
    <!--<v-toolbar app>-->

      <!--<v-toolbar-title class="headline text-uppercase">-->
        <!--<span>Art</span>-->
        <!--<span class="font-weight-light">PORTAL</span>-->
      <!--</v-toolbar-title>-->
      <!--<v-spacer></v-spacer>-->
      <!--<v-btn-->
        <!--flat-->
        <!--href=""-->
        <!--target="_blank"-->
      <!--&gt;-->
        <!--<span class="mr-2">Latest Release</span>-->
      <!--</v-btn>-->
    <!--</v-toolbar>-->
      <v-container>
        <v-content>
          <router-view/>
        </v-content>
      </v-container>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import LogIn from './components/LogIn'

export default {
  name: 'App',
  components: {
    HelloWorld,
    LogIn
  },
  data () {
    return {
      //
    }
  }
}
</script>
