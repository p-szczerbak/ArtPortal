<template>
  <div id="app">
    <v-app id="inspire" light>
      <left-nav-and-toolbar></left-nav-and-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <!--<v-flex>-->
              <ul id="work-of-art-list" class="no-bullets wide">
                <li v-for="art in artList" :key="art">
                  <work-of-art :title=art.title :description=art.description :image=art.image :author=art.author  ></work-of-art>
                </li>
              </ul>
            <!--</v-flex>-->
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app :fixed="footer.fixed" :clipped-left="footer.clippedLeft">
        <span class="caption mx-3">&copy; 2019, MIT LICENSE</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import WorkOfArt from './WorkOfArt.vue'
import WorksOfArtService from '../services/WorksOfArtService'
import LeftNavAndToolbar from './LeftNavAndToolbar'

export default {

  components: {
    WorkOfArt,
    LeftNavAndToolbar
  },
  name: 'WorkOfArtList',
  data: () => ({
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
