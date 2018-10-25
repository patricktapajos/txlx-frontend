<template>
<v-container>
    <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
    <v-layout row class="text-xs-center">
      <v-flex lg2 ></v-flex>
      <v-flex xs12 lg8 class="grey lighten-4">
        <v-container style="position: relative;" class="text-xs-center">
            <v-card flat>
                <v-card-title primary-title class="text-xs-center text-lg-center">
                    <h1>Comprovante de Cadastro</h1>
                </v-card-title>
                <div class="inner-table" id="pdf">
                    <table class="table">
                        <tr>
                            <th>Matrícula</th>
                            <td>{{ matricula }}</td>
                        </tr>
                        <tr>
                            <th>CPF</th>
                            <td>{{ cpf }}</td>
                        </tr>
                        <tr>
                            <th>Qtde. de Pessoas</th>
                            <td>{{ qtdePessoas }}</td>
                        </tr>
                        <tr>
                            <th>Tipo de Uso</th>
                            <td>{{ tipoUso }}</td>
                        </tr>
                        <tr>
                            <th>Faixa de Geração</th>
                            <td>{{ faixaGeracao }}</td>
                        </tr>                    
                        <tr>
                            <th>Nome do Declarante</th>
                            <td>{{ nomeDeclarante }}</td>
                        </tr>                        
                        <tr>
                            <th>CPF do Declarante</th>
                            <td>{{ cpfDeclarante }}</td>
                        </tr>                        
                        <tr>
                            <th>Email</th>
                            <td>{{ email }}</td>
                        </tr>                        
                        <tr>
                            <th>Telefone</th>
                            <td>{{ telefone }}</td>
                        </tr>       
                        <tr>               
                            <th>CEP</th>
                            <td>{{ cep }}</td>
                        </tr>                        
                        <tr>
                            <th>Logradouro</th>
                            <td>{{ logradouro }}</td>
                        </tr>                        
                        <tr>
                            <th>Complemento</th>
                            <td>{{ complemento }}</td>
                        </tr>                        
                        <tr>
                            <th>Número</th>
                            <td>{{ numero }}</td>
                        </tr>                        
                        <tr>
                            <th>Bairro</th>
                            <td>{{ bairro }}</td>
                        </tr>                        
                        <tr>
                            <th>Cidade</th>
                            <td>{{ cidade }}</td>
                        </tr>                        
                        <tr>
                            <th>Ano do Cadastro</th>
                            <td>{{ ano }}</td>
                        </tr>
                    </table>
                </div>
                <br>
                <v-btn color="secondary"  @click="imprimir()">Imprimir</v-btn>
                <v-btn color="error" @click="cancelar()">Sair</v-btn>
                <br>
                <br>
            </v-card>
            
            
        </v-container>
      </v-flex>
      <v-flex lg2 ></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import * as jsPDF from 'jspdf-with-html2canvas'
  import html2canvas from 'html2canvas'  
  const CONSULTAR_URL = process.env.HOST + 'consultar'

  export default {
    data: () => ({
      isLoading: false,
      fullPage: true,
      props: ['MATRICULA_IPTU', 'CPF'],
      id: '',
      matricula: '',
      cpf: '',
      qtdePessoas: '',
      tipoUso: '',
      faixaGeracao: '',
      nomeDeclarante: '',
      cpfDeclarante: '',
      email: '',
      telefone: '',
      cep: '',
      logradouro: '',
      complemento: '',
      numero: '',
      cidade: '',
      bairro: '',
      ano: '',
      imgLogo: require('@/assets/logo-prefeitura.jpg')
    }),

    mounted () {
      if (this.$route.params.MATRICULA_IPTU) {        
            this.matricula = this.$route.params.MATRICULA_IPTU
            this.cpf = this.$route.params.CPF         
       } else {
        this.$router.push('/identificar')
      }
      this.consultar()
    },
    
    components: {
         loading: Loading
    },

    methods: {
        consultar () {
            this.isLoading = true
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
        
        cancelar () {
            this.$router.push('/identificar')
        },
        
        imprimir () {
            this.isLoading = true 
            var doc = new jsPDF('portrait', 'pt', 'a4', true)
            doc.addImage(this.imgLogo, 'jpeg', 20, 25, 140, 49, 'logo-prefeitura')
            doc.setFontSize(16)
            doc.text(230, 50, "Prefeitura de Manaus")
            doc.setFontSize(15)
            doc.text(195, 75, "Secretaria Municipal de Finanças")
            doc.setFontSize(14)            
            doc.text(160, 120, "Declaração de Resíduos de Sólidos Domésticos")
            doc.setLineWidth(0.2)
            doc.line(150, 125, 469, 125)
            doc.setFontSize(13)      
            doc.text(230, 140, "Comprovante de Cadastro")
            doc.setFontSize(9)
            doc.setFontType('italic')
            doc.text(10, 825, "Data de Impressão: "+ this.$moment(new Date()).format("DD/MM/YYYY"))

            let options = {logging: false, async: true, scale: 2}
            var pdfView = document.getElementById('pdf').cloneNode(true)
            pdfView.style.width = '490px'
            pdfView.style.height = '490px'
            document.body.appendChild(pdfView);
            html2canvas(pdfView, options).then((canvas)=>{
                doc.addHTML(pdfView, 0, 0, {pagesplit: true}, {}).then(()=>{
                    document.body.removeChild(pdfView);
                    var imgData = canvas.toDataURL('image/jpeg');
                    doc.addImage(imgData, 'jpeg', 120, 180, 380, 400);
                    let y = this.$moment(new Date()).format("YYYY");
                    doc.save("comprovante_trsd_"+y+".pdf")
                })
                
                setTimeout(() => {
                    this.isLoading = false
                },2000)
            });
        }
    }
  }
</script>

<style>
.inner-table{
    width: 75%;
    margin: 0 auto;
}
.table{
    /*font-size: 12px;*/
    font-family: Arial, sans-serif;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0; 
    border: none;
}


.table tr th{
    padding: 0px 15px 5px;
    text-align: left;
}

.table tr td {
    padding: 2px 5px;
    text-align: left;    
}
</style>
