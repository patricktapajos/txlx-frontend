<template>
<v-container>
    <v-layout row class="text-xs-center">
      <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
      <v-flex lg3 ></v-flex>
      <v-flex xs12 lg6 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
          <v-card flat>
            
            <v-card-title primary-title>
              <h2><v-icon>home</v-icon>Dados do Imóvel</h2>
            </v-card-title>
  
                <v-form ref="form" v-model="valid" class="pl-5 pr-5">
                    <v-text-field v-model="matricula" label="Matrícula de IPTU" required disabled
                    ></v-text-field>

                    <v-text-field v-show="tipoContribuinte == 'cpf'" v-model="cpf" label="CPF do Contribuinte ou Responsável Financeiro"  maxlength=14 :counter="14" required disabled
                    return-masked-value mask="###.###.###-##"
                    ></v-text-field>

                    <v-text-field v-show="tipoContribuinte == 'cnpj'" v-model="cnpj" label="CNPJ do Contribuinte ou Responsável Financeiro" 
                      maxlength=18 :counter="18" required disabled return-masked-value mask="##.###.###/####-##"
                    ></v-text-field>

                    <v-text-field v-model="tipoUso" label="Tipo de Uso do Imóvel" disabled
                    ></v-text-field>
                    
                    <v-text-field v-model="cep" label="CEP" maxlength=10 :counter="10" disabled
                    ></v-text-field>
                    
                    <v-text-field v-model="logradouro" label="Logradouro" disabled
                    ></v-text-field>
                    
                    <v-text-field v-model="complemento" label="Complemento" disabled
                    ></v-text-field>
                    
                    <v-text-field v-model="numero" label="Número" disabled
                    ></v-text-field>
                    
                    <v-text-field v-model="bairro" label="Bairro" disabled
                    ></v-text-field>
                    
                    <v-text-field v-model="cidade" label="Cidade" disabled
                    ></v-text-field>

                     <v-alert :value="msg" type="error" outline v-html="msg">{{ msg }}</v-alert>
                     <br>

                    <v-btn color="primary" @click="prosseguir()">Prosseguir >></v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
                </v-form>
            </v-card>
        </v-container>
      </v-flex>
      <v-flex lg3 ></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  const CONSULTAR_URL = process.env.HOST + 'consultar'

  export default {
    data: () => ({
      //props: ['pMatricula', 'pCpfCnpj', 'pTipoContribuinte'],
      valid: false,
      isLoading: false,
      fullPage: true,
      msg: '<p>Caso a informação do campo Tipo de Uso do Imóvel esteja incorreta, você pode alterá-la clicando no link: </p> &nbsp <p><a target="_blank" href="https://semefatende.manaus.am.gov.br/inventario.php?id=423">Alteração de Tipo de Uso de Imóvel</a></p>',
      tipoContribuinte: '',
      matricula: '',
      cpf: '',
      cnpj: '',
      tipoUso: '',
      cep: '',
      logradouro: '',
      complemento: '',
      numero: '',
      cidade: '',
      bairro: ''
    }),
    components: {
         loading: Loading
      },
    mounted () {
      
      this.matricula = this.$session.get('pMatricula')

      if (this.matricula) {
        this.tipoContribuinte = this.$session.get('pTipoContribuinte')
        if(this.tipoContribuinte == "cnpj"){
          this.cnpj = this.$session.get('pCpfCnpj')          
        }else{
          this.cpf = this.$session.get('pCpfCnpj')
        }
        this.consultar()
      } else {
        this.$router.push('/identificar')
      }
    },
    methods: {

      consultar () {
        this.isLoading = true
        let cpfcnpj = this.cpf != ''?this.cpf:this.cnpj
        this.axios.post(CONSULTAR_URL, {MATRICULA_IPTU: this.matricula, CPFCNPJ: cpfcnpj})
          .then(({data}) => {
            if (data) {
              
              if(data.tipo_uso == 2){
                this.tipoUso = 'Residencial'
              }else{
                this.tipoUso = 'Não Residencial'
              }

              this.cep            = data.cep
              this.logradouro     = data.logradouro
              this.complemento    = data.complemento
              this.numero         = data.numero
              this.bairro         = data.bairro
              this.cidade         = data.cidade
            } 
        }).catch((err) => {
          console.log(err)
        });
        
        setTimeout(() => {
            this.isLoading = false
        },2000)
      },

      prosseguir () {
        if (this.$refs.form.validate()) {
          let cpfcnpj = this.cpf != ''?this.cpf:this.cnpj        
          this.isLoading = true
         
          this.$router.push({name: 'Register'})
           
            setTimeout(() => {
                this.isLoading = false
            },2000)
        }
      },

      cancelar () {
        this.$session.remove('pMatricula')
        this.$session.remove('pCpfCnpj')
        this.$session.remove('pTipoContribuinte')
        this.$router.push('/identificar')
      }
    }
  }
</script>
<style>
  .v-text-field__slot > input {
    text-transform: uppercase;
  }
  a {
    color: inherit !important;
  }
</style>
