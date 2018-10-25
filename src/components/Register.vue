<template>
<v-container>
    <v-layout row class="text-xs-center">
      <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
      <v-flex lg2 ></v-flex>
      <v-flex xs12 lg8 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
          <v-card flat>
            
            <v-card-title primary-title>
              <h1>Cadastrar Imóvel</h1>
            </v-card-title>

            <v-alert :value="msgErro" type="error">{{ msgErro }}</v-alert>
                <v-form ref="form" v-model="valid" class="pa-5">
                  
                   <input type="hidden" v-model="id"/>
                    
                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula" required
                    ></v-text-field>

                    <v-text-field v-model="cpf" :rules="cpfRules" label="CPF"  maxlength=14 :counter="14" required 
                    return-masked-value mask="###.###.###-##"
                    ></v-text-field>

                    <v-text-field v-model="qtdePessoas" :rules="qtdePessoasRules" label="Qtd. Pessoas" required
                    ></v-text-field>

                    <v-select :items="tipos" item-value="id" item-text="descricao" v-model="tipoUso" :rules="tipoUsoRules" label="Tipo de Uso" required
                      ></v-select>

                    <v-text-field v-model="faixaGeracao" :rules="faixaGeracaoRules" label="Faixa de Geração" required
                    ></v-text-field>

                    <v-text-field v-model="nomeDeclarante" :rules="nomeDeclaranteRules" label="Nome do Declarante" maxlength=100 :counter="100" required
                    ></v-text-field>

                    <v-text-field v-model="cpfDeclarante" :rules="cpfDeclaranteRules" label="CPF do Declarante" maxlength=14 :counter="14" required
                    return-masked-value mask="###.###.###-##"
                    ></v-text-field>

                    <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
                    
                    <v-text-field v-model="telefone" label="Telefone"></v-text-field>
                    
                    <v-text-field v-model="cep" label="CEP" maxlength=10 :counter="10" 
                    ></v-text-field>
                    
                    <v-text-field v-model="logradouro" label="Logradouro"
                    ></v-text-field>
                    
                    <v-text-field v-model="complemento" label="Complemento"
                    ></v-text-field>
                    
                    <v-text-field v-model="numero" label="Número"
                    ></v-text-field>
                    
                    <v-text-field v-model="bairro" label="Bairro"
                    ></v-text-field>
                    
                    <v-text-field v-model="cidade" label="Cidade"
                    ></v-text-field>

                      <v-btn color="primary" @click="salvar()">Salvar</v-btn>
                      <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
                </v-form>
            </v-card>
        </v-container>
      </v-flex>
      <v-flex lg2 ></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import CPF from 'gerador-validador-cpf'
  const SALVAR_URL = process.env.HOST + 'cadastrar'
  const CONSULTAR_URL = process.env.HOST + 'consultar'
  const TIPOIMOVEL_URL = process.env.HOST + 'tipousoimovel'

  export default {
    data: () => ({
      props: ['pMatricula', 'pCpf'],
      tipos: [],
      valid: false,
      isLoading: false,
      fullPage: true,
      id: '',
      matricula: '',
      matriculaRules: [
        v => !!v || 'Matrícula é obrigatório'
      ],
      cpf: '',
      cpfRules: [
        v => !!v || 'CPF é obrigatório',
        v => CPF.validate(v) || 'CPF Inválido'        
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
        v => !!v || 'CPF do Declarante é obrigatório',
        v => CPF.validate(v) || 'CPF Inválido'        
        
      ],
      email: '',
      emailRules: [
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail inválido'
      ],
      telefone: '',
      cep: '',
      logradouro: '',
      complemento: '',
      numero: '',
      cidade: '',
      bairro: '',
      ano: '',
      msgErro: ''
    }),
    components: {
         loading: Loading
      },
    mounted () {
      if (this.$route.params.pMatricula || this.matricula) {
        this.matricula = this.$route.params.pMatricula
        this.cpf = this.$route.params.pCpf         
        this.consultar()
      } else {
        this.$router.push('/identificar')
      }
    },
    methods: {
      consultar () {
        this.isLoading = true

          this.axios.get(TIPOIMOVEL_URL, {})
          .then(({data}) => {
            this.tipos = data;
          });

          this.axios.post(CONSULTAR_URL, {MATRICULA_IPTU: this.matricula, CPF: this.cpf})
            .then(({data}) => {
              if (data) {
                this.id             = data.id;
                this.qtdePessoas    = data.qtd_pessoas 
                this.tipoUso        = data.tipo_uso 
                this.faixaGeracao   = data.faixa_geracao
                this.nomeDeclarante = data.nome_declarante
                this.cpfDeclarante  = data.cpf_declarante
                this.email          = data.email
                this.telefone       = data.telefone
                this.cep            = data.cep
                this.logradouro     = data.logradouro
                this.complemento    = data.complemento
                this.numero         = data.numero
                this.bairro         = data.bairro
                this.cidade         = data.cidade
                this.ano            = data.ano
              } 
          }).catch((err) => {
            console.log(err)
          });
          
          setTimeout(() => {
              this.isLoading = false
          },2000)
      },
      salvar () {
        this.isLoading = true
        if (this.$refs.form.validate()) {
          this.axios.post(SALVAR_URL, 
              {
                ID: this.id,
                MATRICULA_IPTU: this.matricula, 
                CPF: this.cpf, 
                NOME_DECLARANTE: this.nomeDeclarante, 
                CPF_DECLARANTE: this.cpfDeclarante, 
                FAIXA_GERACAO: this.faixaGeracao, 
                TIPO_USO: this.tipoUso, 
                QTD_PESSOAS: this.qtdePessoas, 
                EMAIL: this.email,
                TELEFONE: this.telefone,
                CEP: this.cep,
                LOGRADOURO: this.logradouro,
                COMPLEMENTO: this.complemento,
                NUMERO: this.numero,
                BAIRRO: this.bairro,
                CIDADE: this.cidade
              })
            .then(({data}) => {
              if (data.success) {
                this.msgErro = ''
                this.ano = data.ano
                this.$router.push({name: 'Print', params: {MATRICULA_IPTU: this.matricula, CPF: this.cpf}})              
              } else {
                this.msgErro = data.msgErro
              }
            }).catch((err) => {
              console.log(err)
            })
            setTimeout(() => {
                this.isLoading = false
            },2000)
        }
      },
      cancelar () {
        this.$router.push('/identificar')
      }
    }
  }
</script>
<style>
  .v-input {
    text-transform: uppercase;
  }
</style>
