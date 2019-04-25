<!--<template>-->
  <!--&lt;!&ndash;<left-nav></left-nav>&ndash;&gt;-->
  <!--<div class="posts">-->
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
    <!--<left-nav></left-nav>-->
    <!--<ul id="work-of-art-list" class="no-bullets">-->
      <!--<li v-for="art in artList" :key="art">-->
        <!--<work-of-art :title=art.title :description=art.description :image=art.image :author=art.author  ></work-of-art>-->
      <!--</li>-->
    <!--</ul>-->
  <!--</div>-->
<!--</template>-->

<template>
  <div id="app">
    <v-app id="inspire" light>
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
            <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="">
            <v-list-tile-action><v-icon>art_track</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>All works of art</v-list-tile-title>
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
          <!--<v-toolbar-title class="headline text-uppercase">-->
            <!--<span>Art</span>-->
            <!--<span class="font-weight-light">PORTAL</span>-->
          <!--</v-toolbar-title>-->
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
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <!--<v-flex>-->
              <ul id="work-of-art-list" class="no-bullets wide">
                <li v-for="art in artList" :key="art">
                  <work-of-art :name=art.name :description=art.description :image=art.image :author=art.author  ></work-of-art>
                </li>
              </ul>
            <!--</v-flex>-->
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app :fixed="footer.fixed" :clipped-left="footer.clippedLeft">
        <span class="caption mx-3">&copy; 2018, MIT LICENSE</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import WorkOfArt from './WorkOfArt.vue'
import WorksOfArtService from '../services/WorksOfArtService'

// import LeftNav from './LeftNav'
export default {

  components: {
    WorkOfArt
  },
  name: 'WorkOfArtList',
  data: () => ({
    // artList: [{
    //   'title': 'artwork1',
    //   'description': 'dcfd',
    //   'image': "require('../assets/sculpture.jpg')",
    //   'author': 'Leonardo daVinci'
    // }, {
    //   'title': 'artwork2',
    //   'description': 'dcfd',
    //   'image': '',
    //   'author': 'Leonardo'
    // }, {
    //   'title': 'artwork3',
    //   'description': 'dcfd',
    //   'image': '',
    //   'author': 'asaaaaa'
    // }, {
    //   'title': 'artwork4',
    //   'description': 'dcfd',
    //   'image': '',
    //   'author': 'ddddddd'
    // }, {
    //   'title': 'artwork5',
    //   'description': 'dcfd',
    //   'image': '',
    //   'author': 'ffffff'
    // }, {
    //   'title': 'artwork6',
    //   'description': 'dcfd',
    //   'image': '',
    //   'author': 'ggggg'
    // }
    // ],
    artList: [],
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
    },
    footer: {
      // sets the CSS position of the footer
      fixed: true,
      // sets if the footer is full width (true) or gives space to the drawer (false)
      clippedLeft: true
    }
  }),

  created () {
    this.fetch()
  },

  props: {
    source: String
  },

  methods: {
    fetch: async function () {
      const { data } = await WorksOfArtService.fetchWorksOfArt()
      this.artList = data
      console.log(data)
    },
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

<style>
  .no-bullets {
    list-style-type: none;
}
  .wide {
    width: 500px;
  }
</style>
