<template>
<v-container>
    <v-layout row class="text-xs-center">
      <v-flex lg3 ></v-flex>
      <v-flex xs12 lg6 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h1>Cadastro</h1>
            </v-card-title>
            <v-alert :value="msgErro" type="error">{{ msgErro }}</v-alert>
                <v-form ref="form" v-model="valid" class="pa-5">
                    
                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula" required
                    ></v-text-field>
                    <v-text-field v-model="cpf" :rules="cpfRules" label="CPF"  maxlength=14 :counter="14" required 
                    return-masked-value 
                    mask="###.###.###-##"
                    ></v-text-field>
                    <v-text-field v-model="qtdePessoas" :rules="qtdePessoasRules" label="Qtd. Pessoas" required
                    ></v-text-field>
                    <v-text-field v-model="tipoUso" :rules="tipoUsoRules" label="Tipo de Uso" required
                    ></v-text-field>
                    <v-text-field v-model="faixaGeracao" :rules="faixaGeracaoRules" label="Faixa de Geração" required
                    ></v-text-field>
                    <v-text-field v-model="nomeDeclarante" :rules="nomeDeclaranteRules" label="Nome do Declarante" maxlength=100 :counter="100" required
                    ></v-text-field>
                    <v-text-field v-model="cpfDeclarante" :rules="cpfDeclaranteRules" label="CPF do Declarante" maxlength=14 :counter="14" required
                    return-masked-value 
                    mask="###.###.###-##"
                    ></v-text-field>

                     <v-card-actions>
                        <v-btn color="primary" large block v-on:click="salvar()">Salvar</v-btn>
                        <v-btn color="error" large block v-on:click="cancelar()">Cancelar</v-btn>
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
  import axios from 'axios'
  const API_URL = process.env.HOST + 'cadastrar'

  export default {
    data: () => ({
      props: ['pMatricula', 'pCpf'],
      valid: false,
      matricula: '',
      matriculaRules: [
        v => !!v || 'Matrícula é obrigatório'
      ],
      cpf: '',
      cpfRules: [
        v => !!v || 'CPF é obrigatório'
      ],
      qtdePessoas: '',
      qtdePessoasRules: [
        v => !!v || 'Qtde. Pessoas é obrigatório'
      ],
      tipoUso: '',
      tipoUsoRules: [
        v => !!v || 'Tipo Uso é obrigatório'
      ],
      faixaGeracao: '',
      faixaGeracaoRules: [
        v => !!v || 'Faixa Geração é obrigatório'
      ],
      nomeDeclarante: '',
      nomeDeclaranteRules: [
        v => !!v || 'Nome do Declarante é obrigatório'
      ],
      cpfDeclarante: '',
      cpfDeclaranteRules: [
        v => !!v || 'CPF do Declarante é obrigatório'
      ],
      msgErro: ''
    }),
    mounted () {
      if (this.$route.params.pMatricula || this.matricula) {
        this.matricula = this.$route.params.pMatricula
        this.cpf = this.$route.params.pCpf
      } else {
        this.$router.push('/identificar')
      }
    },
    methods: {
      salvar () {
        if (this.$refs.form.validate()) {
          axios.post(API_URL, {matricula: this.matricula, cpf: this.cpf, qtdePessoas: this.qtdePessoas, tipoUso: this.tipoUso, faixaGeracao: this.faixaGeracao, nomeDeclarante: this.nomeDeclarante, cpfDeclarante: this.cpfDeclarante})
            .then(({data}) => {
              if (data.success) {
                this.msgErro = ''
              } else {
                this.msgErro = data.msgErro
              }
            }).catch((err) => {
              console.log(err)
            })
        }
      },
      cancelar () {
        this.$router.push('/identificar')
      }
    }
  }
</script>