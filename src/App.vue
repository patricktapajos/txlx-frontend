<template>
  <v-app>
    <v-toolbar
      app
      color="primary"
    >
      <div class="navbar-logo"></div>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer color="primary" app>
      <span class="footer-text">© 2018 Prefeitura de Manaus. Todos os Direitos Reservados. Desenvolvido pela Subsecretaria de Tecnologia da Informação - SUBTI/SEMEF</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Declaração de Resíduos Sólidos Domésticos'
    }
  },
  name: 'App'
}
</script>

<style>
  .theme--light .v-toolbar {
    color: rgb(255, 255, 255) !important;
    background-image: linear-gradient(to bottom, rgb(52,95,140), rgba(74, 146, 123, 1));
  }

  .theme--light .v-footer {
    text-align: center;
    display: grid;
    color: rgb(255, 255, 255) !important;    
}

  /*.error {
      color: #a94442 !important;
      background-color: #f2dede !important;
      border-color: #ebccd1 !important;
      display: block !important;
  }*/

@media (max-width: 890px){

    .theme--light .v-footer{
        display: flex;
    }
    
    .footer-text {
        visibility: hidden;
    }
    .footer-text:before {
        content: "© 2018 Prefeitura de Manaus";
        visibility: visible;
    }
  }

  .navbar-logo {
    width: 160px;
    height: 49px;
    background: url(assets/logo_2017_2020.png);
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

  @media (max-width: 320px){
    .navbar-logo {
        background: url(assets/brasao.png);
        background-size: cover;
        height: 45px;
        width: 60px;
    }
  }
  
</style>
