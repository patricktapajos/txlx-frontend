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
    <v-content class="grey lighten-4">
      <div class="overlay"></div>
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

  .v-card-btns-actions {
    padding: 25px;
  }
  
  .theme--light .v-toolbar {
    color: rgb(255, 255, 255) !important;
  }

  .v-content__wrap {
    background-image: url(assets/topo.png);
    background-size: cover;
  }

  .theme--light .v-footer {
    text-align: center;
    display: grid;
    color: rgb(255, 255, 255) !important;    
  }

  .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .55;
      background-color: #000000;
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
        margin-top: auto;
    }
    .footer-text:before {
        position: absolute;
        content: "© 2018 Prefeitura de Manaus";
        visibility: visible;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%)
    }

    .h2-text {
      font-size: inherit;
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
