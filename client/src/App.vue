<template>
  <v-app>
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
import WorkOfArtList from './components/WorkOfArtList'
import AddWorkOfArt from './components/AddWorkOfArt'

export default {
  name: 'App',
  components: {
    HelloWorld,
    LogIn,
    WorkOfArtList,
    AddWorkOfArt
  },
  data () {
    return {
      //
    }
  }
}
</script>
