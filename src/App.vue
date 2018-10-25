<template>
  <v-app>
    <v-toolbar
      app
      color="primary"
    >
     <!-- <img class="icon-custom" src="./assets/logo-prefeitura.png"/> -->
      <div class="navbar-logo"></div>
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
      title: 'Cadastro de Resíduos Domésticos'
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

  .navbar-logo {
    width: 154px;
    height: 49px;
    background: url(assets/logo-prefeitura.png);
    background-size: cover;
  }

  @media (max-width: 970px){
    .navbar-logo {
        background: url(assets/brasao.png);
        background-size: cover;
        height: 45px;
        width: 35px;
    }
  }
  
</style>
