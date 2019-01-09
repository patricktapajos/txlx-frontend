<template>
<v-container>
    <v-layout row justify-center class="text-xs-center">
      <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
      <v-flex xs12 lg6 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h2> <v-icon>perm_identity</v-icon>Identificação do Contribuinte</h2>
            </v-card-title>
            <v-alert :value="msgErro" type="error"  outline v-html="msgErro">{{ msgErro }}</v-alert>
                <v-form ref="form" v-model="valid" class="pl-5 pr-5  pb-5">
                 
                  <v-radio-group v-model="tipoContribuinte" :rules="tipoContribuinteRules" row>
                      <v-radio color="green" label="Pessoa Física" value="cpf"></v-radio>
                      <v-radio color="green" label="Pessoa Jurídica" value="cnpj"></v-radio>
                    </v-radio-group>

                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula do IPTU" required solo></v-text-field>
                    
                    <v-text-field v-show="tipoContribuinte == 'cpf'"
                        v-model="cpf" :rules="[verificarCPF]" label="CPF do Contribuinte" maxlength=14 :counter="14"
                        return-masked-value 
                        mask="###.###.###-##" solo
                    ></v-text-field>
                    
                    <v-text-field v-show="tipoContribuinte == 'cnpj'"
                        v-model="cnpj" :rules="[verificarCNPJ]" label="CNPJ do Contribuinte" maxlength=18 :counter="18"
                        return-masked-value 
                        mask="##.###.###/####-##" solo
                    ></v-text-field>
                     
                     <v-card-actions>
                        <v-btn color="primary" depressed block @click="identificar()">Prosseguir</v-btn>
                      </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import CPF from 'gerador-validador-cpf'
  import * as cnpj  from '@fnando/cnpj'
  import { isValid as isValidCnpj } from "@fnando/cnpj"; 
  const API_URL = process.env.HOST + 'identificar'

  export default {
    data: () => ({
      valid: false,
      isLoading: false,
      fullPage: true,
      tipoContribuinte:'cpf',
      tipoContribuinteRules: [
        v => !!v || 'Tipo de Contribuinte é obrigatório'
      ],
      matricula: '',
      matriculaRules: [
        v => !!v || 'Matrícula do IPTU é obrigatória'
      ],
      cpf: '',
      cnpj: '',
      msgErro: ''
    }),

    components: {
        loading: Loading
    },

    watch: {
      tipoContribuinte: function(currentValue){
        if(currentValue == "cpf"){
          this.cnpf = ''
        }else{
          this.cpf = ''
        }
      }
    },

    methods: {      
      
      verificarCPF(){
        if(this.tipoContribuinte == 'cpf' && !CPF.validate(this.cpf)){
            return 'CPF Inválido'
          }else{
            return true
          }
      },

      verificarCNPJ(){
          if(this.tipoContribuinte == 'cnpj' && !cnpj.isValid(this.cnpj)){
            return 'CNPJ Inválido'
          }else{
            return true
          }
      },

      identificar () {
        if (this.$refs.form.validate()) {
          let cpfcnpj = this.cpf != ''?this.cpf:this.cnpj
          this.isLoading = true
          this.axios.post(API_URL, {MATRICULA_IPTU: this.matricula, CPFCNPJ: cpfcnpj}).then(({data}) => {
            if (data.success) {
              this.msgErro = ''
              this.isLoading = false
              this.$session.set('pMatricula', this.matricula)
              this.$session.set('pCpfCnpj', cpfcnpj)
              this.$session.set('pTipoContribuinte', this.tipoContribuinte)

              //this.$router.push({name: 'Immobile', params: {pMatricula: this.matricula, pCpfCnpj: cpfcnpj, pTipoContribuinte: this.tipoContribuinte}})
              this.$router.push({name: 'Immobile'})

            } else {
              this.isLoading = false
              this.msgErro = data.msgErro
            }
          }).catch((err) => {
            this.isLoading = false
            console.log(err)
          })
        }
      }
    }
  }
</script>
<style>
  a {
    color: inherit !important;
  }

</style>
