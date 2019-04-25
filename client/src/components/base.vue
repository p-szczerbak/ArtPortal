<!--&lt;!&ndash;<!DOCTYPE html>&ndash;&gt;-->
<!--&lt;!&ndash;<html>&ndash;&gt;-->
  <!--&lt;!&ndash;<head>&ndash;&gt;-->
    <!--&lt;!&ndash;<meta charset="utf-8">&ndash;&gt;-->
    <!--&lt;!&ndash;<meta name="viewport" content="width=device-width,initial-scale=1.0">&ndash;&gt;-->
    <!--&lt;!&ndash;<title>art-portal</title>&ndash;&gt;-->
  <!--&lt;!&ndash;</head>&ndash;&gt;-->
  <!--&lt;!&ndash;<body>&ndash;&gt;-->
    <!--&lt;!&ndash;<div id="app"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash; built files will be auto injected &ndash;&gt;&ndash;&gt;-->
  <!--&lt;!&ndash;</body>&ndash;&gt;-->
<!--&lt;!&ndash;</html>&ndash;&gt;-->
<!--<!DOCTYPE html>-->
<!--<html>-->
<!--<head>-->
  <!--<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet">-->
  <!--<link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">-->
  <!--<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">-->
<!--</head>-->
<!--<body>-->
  <!--<div id="app">-->
    <!--<v-app>-->
      <!--<v-content>-->
        <!--<v-container>-->
          <!--<v-toolbar dark dense fixed color="primary">-->
            <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->

            <!--<v-toolbar-title class="white&#45;&#45;text">Title</v-toolbar-title>-->

            <!--<v-spacer></v-spacer>-->

            <!--<v-btn icon>-->
              <!--<v-icon>search</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn icon>-->
              <!--<v-icon>apps</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn icon>-->
              <!--<v-icon>refresh</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn icon>-->
              <!--<v-icon>more_vert</v-icon>-->
            <!--</v-btn>-->
          <!--</v-toolbar>-->
        <!--</v-container>-->
      <!--</v-content>-->
    <!--</v-app>-->
  <!--</div>-->

  <!--<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>-->
  <!--<script src="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js"></script>-->
  <!--<script>-->
    <!--new Vue({ el: '#app' })-->
  <!--</script>-->
<!--</body>-->
<!--</html>-->

<template>
  <div class="base">
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
      <v-container>
      </v-container>
  </div>
</template>

<script>
export default {
  name: 'base',
  data () {
    return {}
  }
}
</script>

