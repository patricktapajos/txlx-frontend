<template>
<v-container>
    <v-layout row class="text-xs-center">
      <v-flex lg3 ></v-flex>
      <v-flex xs12 lg8 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h2>Identificar Imóvel</h2>
            </v-card-title>
            <v-alert :value="msgErro" type="error" v-html="msgErro">{{ msgErro }}</v-alert>
                <v-form ref="form" v-model="valid" class="pl-5 pr-5  pb-5">
                 
                 <v-subheader>Tipo de Contribuinte</v-subheader>
                  <v-radio-group v-model="tipoContribuinte" :rules="tipoContribuinteRules" row>
                      <v-radio color="green" label="Pessoa Física" value="cpf"></v-radio>
                      <v-radio color="green" label="Pessoa Jurídica" value="cnpj"></v-radio>
                    </v-radio-group>

                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula do IPTU" required></v-text-field>
                    
                    <v-text-field v-show="tipoContribuinte == 'cpf'"
                        v-model="cpf" :rules="[verificarCPF]" label="CPF do Contribuinte" maxlength=14 :counter="14"
                        return-masked-value 
                        mask="###.###.###-##"
                    ></v-text-field>
                    
                    <v-text-field v-show="tipoContribuinte == 'cnpj'"
                        v-model="cnpj" :rules="[verificarCNPJ]" label="CNPJ do Contribuinte" maxlength=18 :counter="18"
                        return-masked-value 
                        mask="##.###.###/####-##"
                    ></v-text-field>
                     
                     <v-card-actions>
                        <v-btn color="primary" large block :disabled="validating" @click="identificar()">Verificar</v-btn>
                        <v-progress-circular
                          v-show="validating"
                          :width="3"
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                      </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
      </v-flex>
      <v-flex lg3 ></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import CPF from 'gerador-validador-cpf'
  import * as cnpj  from '@fnando/cnpj'
  import { isValid as isValidCnpj } from "@fnando/cnpj"; 
  const API_URL = process.env.HOST + 'identificar'

  export default {
    data: () => ({
      valid: false,
      validating: false,
      tipoContribuinte:'',
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
          this.validating = true
          this.axios.post(API_URL, {MATRICULA_IPTU: this.matricula, CPFCNPJ: cpfcnpj}).then(({data}) => {
            if (data.success) {
              this.msgErro = ''
              this.validating = false
              this.$router.push({name: 'Register', params: {pMatricula: this.matricula, pCpfCnpj: cpfcnpj, pTipoContribuinte: this.tipoContribuinte}})
            } else {
              this.validating = false
              this.msgErro = data.msgErro
            }
          }).catch((err) => {
            this.validating = false
            console.log(err)
          })
        }
      }
    }
  }
</script>
<style>
.v-subheader {
    display: flex;
    font-size: 17px;
    font-weight: normal;
    padding: 0;
}

a {
  color: inherit !important;
}

</style>
