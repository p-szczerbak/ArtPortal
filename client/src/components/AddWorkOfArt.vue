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
            <v-flex md12 xl6 offset-xl3 >
              <v-card class="add-card">
                <v-card-title primary-title>
                  <div>
                    <h1 class="headline mb-0">Add work of art</h1>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="title"
                      :counter="30"
                      :rules="nameRules"
                      label="Name"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="author"
                      :counter="30"
                      :rules="nameRules"
                      label="Author"
                      required
                    ></v-text-field>

                    <v-textarea
                        v-model="description"
                        outline
                        name="input-7-4"
                        :rules="[v => !!v || 'Item is required']"
                        label="Description of your masterpiece"
                        required
                      ></v-textarea>

                    <v-select
                      v-model="select"
                      :items="types"
                      :rules="[v => !!v || 'Item is required']"
                      label="Type"
                      required
                    ></v-select>

                    <v-text-field
                      v-model="image"
                      :counter="30"
                      :rules="[v => !!v || 'Item is required']"
                      label="Image path"
                      required
                    ></v-text-field>

                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-layout align-center justify-center>
                        <!--<v-btn-->
                          <!--:disabled="!valid"-->
                          <!--color="success"-->
                          <!--@click="validate"-->
                        <!--&gt;-->
                          <!--Validate-->
                        <!--</v-btn>-->

                        <!--<v-btn-->
                          <!--color="error"-->
                          <!--@click="reset"-->
                        <!--&gt;-->
                          <!--Reset Form-->
                        <!--</v-btn>-->
                        <v-btn
                          color="primary"
                          :disabled="!valid"
                          @click="add()"
                        >
                          Add
                        </v-btn>
                  </v-layout>
                </v-card-actions>
            </v-card>
            </v-flex>
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
import WorksOfArtService from '../services/WorksOfArtService'

export default {

  name: 'AddWorkOfArt',
  data: () => ({
    valid: true,
    title: '',
    author: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    select: null,
    types: ['painting', 'drawing', 'sculpture', 'other'],
    image: '',
    description: '',
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

  props: {
    source: String
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
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
    },
    add: async function () {
      let postData = {
        title: this.title,
        author: this.author,
        description: this.description,
        image: this.image
      }
      const { data } = await WorksOfArtService.addWorkOfArt(postData)
      console.log('resp ', data)
    }
  }
}
</script>

<style>
  .add-card {
    padding: 50px;
  }
</style>
