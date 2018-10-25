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
                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula" required></v-text-field>
                    <v-text-field
                        v-model="cpf" :rules="cpfRules" label="CPF" maxlength=14 :counter="14" required
                        return-masked-value 
                        mask="###.###.###-##"
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
  const API_URL = process.env.HOST + 'identificar'

  export default {
    data: () => ({
      valid: false,
      validating: false,
      matricula: '',
      matriculaRules: [
        v => !!v || 'Matrícula é obrigatória'
      ],
      cpf: '',
      cpfRules: [
        v => !!v || 'CPF é obrigatório',
        v => CPF.validate(v) || 'CPF Inválido'
      ],
      msgErro: ''
    }),

    methods: {
      identificar () {
        if (this.$refs.form.validate()) {
          this.validating = true
          this.axios.post(API_URL, {MATRICULA_IPTU: this.matricula, CPF: this.cpf}).then(({data}) => {
            if (data.success) {
              this.msgErro = ''
              this.validating = false
              this.$router.push({name: 'Register', params: {pMatricula: this.matricula, pCpf: this.cpf}})
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
