<template>
  <v-app>
    <v-toolbar
      app
      color="primary"
    >
      <v-toolbar-side-icon>
        <img class="icon-custom" src="./assets/brasao.png"/>
      </v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer color="primary" app>
      <span> &copy; SEMEF/SUBTI 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Cadastro de Resíduos Descartáveis'
    }
  },
  name: 'App'
}
</script>

<style>
  .theme--light.v-toolbar {
    color: rgb(255, 255, 255);
  }
  .theme--light.v-footer {
    text-align: center;
    color: rgb(255, 255, 255);    
}
  .icon-custom{
    width: -webkit-fill-available !important;
    margin-top: -5px;
  }
</style>
