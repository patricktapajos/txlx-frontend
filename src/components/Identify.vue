<template>
<v-container>
    <v-layout row class="text-xs-center">
      <v-flex lg3 ></v-flex>
      <v-flex xs12 lg6 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h2>Identificar Imóvel</h2>
            </v-card-title>
            <v-alert :value="msgErro" type="error">{{ msgErro }}</v-alert>
                <v-form ref="form" v-model="valid" class="pa-5">
                 
                 <v-subheader>Tipo de Contribuinte</v-subheader>
                  <v-radio-group v-model="tipoContribuinte" :rules="tipoContribuinteRules" row>
                      <v-radio label="Pessoa Física" value="cpf"></v-radio>
                      <v-radio label="Pessoa Jurídica" value="cnpj"></v-radio>
                    </v-radio-group>

                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula do IPTU" required></v-text-field>
                    
                    <v-text-field v-show="tipoContribuinte == 'cpf'"
                        v-model="cpf" :rules="cpfRules" label="CPF" maxlength=14 :counter="14"
                        return-masked-value 
                        mask="###.###.###-##"
                    ></v-text-field>
                    
                    <v-text-field v-show="tipoContribuinte == 'cnpj'"
                        v-model="cnpj" :rules="cnpjRules" label="CNPJ" maxlength=18 :counter="18"
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
      cpfRules: [
        (v) => v && CPF.validate(v) || 'CPF do Contribuinte é Inválido'
      ],
      cnpj: '',
      cnpjRules: [
        (v) => v && cnpj.isValid(v) || 'CNPJ Inválido'
      ],
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
</style>
