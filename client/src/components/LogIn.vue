<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height align-content-center>
        <v-layout align-center justify-center fill-height>
          <v-flex xs12 sm8 md4>
            <v-card >
              <v-toolbar dark color="white">
                <!--<v-toolbar-title>Log in</v-toolbar-title>-->
                <v-img
                  :src="require('../assets/art-portal-logo.png')"
                  :lazy-src="require('../assets/art-portal-logo.png')"
                  class="white lighten-2"
                  height="50px"
                  contain
                ></v-img>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout align-center justify-center>
                  <v-flex xs12 align-self-center>
                    <div class="text-xs-center">
                      <v-btn small flat color="grey">Reset password</v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn flat color="primary">Register</v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn color="primary" to="WorkOfArtList">Login</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'LogIn',
  data: () => ({
    drawer: null
  }),

  props: {
    source: String
  }
}
</script>
