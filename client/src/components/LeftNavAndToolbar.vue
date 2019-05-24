<template>
  <div id="app">
      <v-navigation-drawer
        :clipped="drawer.clipped"
        :fixed="drawer.fixed"
        :permanent="drawer.permanent"
        :mini-variant="drawer.mini"
        v-model="drawer.open"
        app
      >
        <v-list>
          <v-list-tile @click="toggleMiniDrawer">
            <v-list-tile-action><v-icon>chevron_right</v-icon></v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile to="LogIn">
            <v-list-tile-action><v-icon>power_settings_new</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Log out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="">
            <v-list-tile-action><v-icon>art_track</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>All works of art</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="AddWorkOfArt">
            <v-list-tile-action><v-icon>art_track</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Add work of art</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile to="">
            <v-list-tile-action><v-icon>perm_contact_calendar</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>All portfolios</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile to="">
            <v-list-tile-action><v-icon>list_alt</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>All posts</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="">
            <v-list-tile-action><v-icon>playlist_add</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Add post</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-navigation-drawer>

      <v-toolbar
        app
        :fixed="toolbar.fixed"
        :clipped-left="toolbar.clippedLeft"
        color="white"
      >
        <v-layout justify-center align-center>
          <v-toolbar-side-icon
            @click.stop="toggleDrawer"
          ></v-toolbar-side-icon>
            <v-img
              :src="require('../assets/art-portal-logo.png')"
              :lazy-src="require('../assets/art-portal-logo.png')"
              class="white lighten-2"
              height="50px"
              contain
            ></v-img>
            <v-btn flat icon color="black">
              <v-icon>shopping_cart</v-icon>
            </v-btn>
            <v-btn flat icon color="black" to="LogIn">
              <v-icon>power_settings_new</v-icon>
            </v-btn>
        </v-layout>
      </v-toolbar>
  </div>
</template>

<script>

export default {

  components: {
    //
  },
  name: 'LeftNavAndToolbar',
  data: () => ({
    drawer: {
      // sets the open status of the drawer
      open: false,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: false,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: false,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: false,
      // sets the drawer to the mini variant, showing only icons, of itself (true)
      // or showing the full drawer (false)
      mini: true
    },
    toolbar: {
      //
      fixed: true,
      // sets if the toolbar contents is leaving space for drawer (false) or not (true)
      clippedLeft: false
    }
  }),

  props: {
    source: String
  },

  methods: {
    // changes the drawer to permanent
    makeDrawerPermanent () {
      this.drawer.permanent = true
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false
      this.toolbar.clippedLeft = false
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer () {
      this.drawer.mini = !this.drawer.mini
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer () {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true
        this.toolbar.clippedLeft = true
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open
      }
    }
  }
}
</script>
