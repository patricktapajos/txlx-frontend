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

            <v-alert :value="msgErro" type="error" outline>{{ msgErro }}</v-alert>
            
                <v-form ref="form" v-model="valid" class="pl-5 pr-5">
                  
                   <input type="hidden" v-model="id"/>
                    
                    <v-text-field v-model="matricula" :rules="matriculaRules" label="Matrícula de IPTU" required disabled
                    ></v-text-field>

                    <v-text-field v-show="tipoContribuinte == 'cpf'" v-model="cpf" :rules="[verificarCPF]" label="CPF do Contribuinte ou Responsável Financeiro"  maxlength=14 :counter="14" required disabled
                    return-masked-value mask="###.###.###-##"
                    ></v-text-field>

                    <v-text-field v-show="tipoContribuinte == 'cnpj'" v-model="cnpj" :rules="[verificarCNPJ]" label="CNPJ do Contribuinte ou Responsável Financeiro" 
                      maxlength=18 :counter="18" return-masked-value mask="##.###.###/####-##"
                    ></v-text-field>

                    <v-text-field v-model="qtdePessoas" :rules="qtdePessoasRules" label="Qtd. de Pessoas que Habitam o Imóvel" required
                    ></v-text-field>

                    <v-select :items="tipos" item-value="id" item-text="descricao" v-model="tipoUso" :rules="tipoUsoRules" label="Tipo de Uso" required
                     @change="carregarFaixaGeracao()" ></v-select>

                    <v-select :items="faixas" item-value="id" item-text="descricao" v-model="faixaGeracao" :rules="faixaGeracaoRules" label="Faixa de Geração Diária de Resíduos" required
                      ></v-select>

                    <v-text-field v-model="nomeDeclarante" :rules="nomeDeclaranteRules" label="Nome do Declarante" maxlength=100 :counter="100" required
                    ></v-text-field>

                    <v-text-field v-model="cpfDeclarante" :rules="cpfDeclaranteRules" label="CPF do Declarante" maxlength=14 :counter="14" required
                    return-masked-value mask="###.###.###-##"
                    ></v-text-field>

                    <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
                    
                    <v-text-field v-model="telefone" label="Telefone"  return-masked-value mask="(##)#####-####"></v-text-field>
                    
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
  import * as cnpj  from '@fnando/cnpj'
  import { isValid as isValidCnpj } from "@fnando/cnpj";
  const SALVAR_URL = process.env.HOST + 'cadastrar'
  const CONSULTAR_URL = process.env.HOST + 'consultar'
  const TIPOIMOVEL_URL = process.env.HOST + 'tipousoimovel'
  const FAIXAGERACAO_URL = process.env.HOST + 'geracaoresiduos'

  export default {
    data: () => ({
      props: ['pMatricula', 'pCpfCnpj', 'pTipoContribuinte'],
      tipos: [],
      faixas: [],
      valid: false,
      isLoading: false,
      fullPage: true,
      id: '',
      tipoContribuinte: '',
      matricula: '',
      matriculaRules: [
        v => !!v || 'Matrícula de IPTU é obrigatório'
      ],
      cpf: '',
      cnpj: '',
      qtdePessoas: '',
      qtdePessoasRules: [
        v => !!v || 'Qtde. Pessoas que Habitam o Imóvel é obrigatório'
      ],
      tipoUso: '',
      tipoUsoRules: [
        v => !!v || 'Tipo de Uso é obrigatório'
      ],
      faixaGeracao: '',
      faixaGeracaoRules: [
        v => !!v || 'Faixa Geração Diária é obrigatório'
      ],
      nomeDeclarante: '',
      nomeDeclaranteRules: [
        v => !!v || 'Nome do Declarante é obrigatório'
      ],
      cpfDeclarante: '',
      cpfDeclaranteRules: [
        v => !!v || 'CPF do Declarante é obrigatório',
        v => CPF.validate(v) || 'CPF do Declarante Inválido'        
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
        this.tipoContribuinte = this.$route.params.pTipoContribuinte
        if(this.tipoContribuinte == "cnpj"){
          this.cnpj = this.$route.params.pCpfCnpj          
        }else{
          this.cpf = this.$route.params.pCpfCnpj
        }
        this.consultar()
      } else {
        this.$router.push('/identificar')
      }
      // this.matricula = '48400'
      // this.tipoContribuinte = 'cpf'
      // this.cpf = '085.090.547-89'
      // this.consultar()
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
      consultar () {
        this.isLoading = true
          
          let cpfcnpj = this.cpf != ''?this.cpf:this.cnpj

         this.carregarTipoUso()

          this.axios.post(CONSULTAR_URL, {MATRICULA_IPTU: this.matricula, CPFCNPJ: cpfcnpj})
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
                
                this.carregarFaixaGeracao()
              } 
          }).catch((err) => {
            console.log(err)
          });
         
          setTimeout(() => {
              this.isLoading = false
          },2000)
      },

      carregarTipoUso (){
        this.axios.get(TIPOIMOVEL_URL, {})
          .then(({data}) => {
            this.tipos = data;
          });
      },
      
      carregarFaixaGeracao (){
        this.axios.get(FAIXAGERACAO_URL+'/'+this.tipoUso)
          .then(({data}) => {
            this.faixas = data;
          })
      },

      salvar () {
        console.log(this.$refs.form.validate())
        if (this.$refs.form.validate()) {
          let cpfcnpj = this.cpf != ''?this.cpf:this.cnpj        
          this.isLoading = true
          this.axios.post(SALVAR_URL, 
              {
                ID: this.id,
                MATRICULA_IPTU: this.matricula, 
                CPFCNPJ: cpfcnpj, 
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
                this.$router.push({name: 'Print', params: {pMatricula: this.matricula, pCpfCnpj: cpfcnpj, pTipoContribuinte: this.tipoContribuinte}})
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
  .v-text-field__slot > input {
    text-transform: uppercase;
  }
</style>
