<template>
  <v-layout
    wrap
    style="height: 100%"
  >
    <!--<v-container>-->
      <!--<v-layout justify-center>-->
        <!--<v-btn-->
          <!--color="pink"-->
          <!--dark-->
          <!--@click.stop="drawer = !drawer"-->
        <!--&gt;-->
          <!--Toggle-->
        <!--</v-btn>-->
      <!--</v-layout>-->
    <!--</v-container>-->

    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      app
    >
      <v-list>
        <v-list-tile
           v-if="!drawer.permanent"
           @click="makeDrawerPermanent">
          <v-list-tile-action><v-icon>chevron_right</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Static Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="toggleMiniDrawer">
          <v-list-tile-action><v-icon>aspect_ratio</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Mini Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile>
          <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  name: 'LeftNav',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      mini: true,
      right: null
    }
  }
}
</script>

<style>
</style>
