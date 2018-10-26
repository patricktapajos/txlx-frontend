# Taxa de Resíduos de Sólidos Domésticos

> Front-end para o sistema de declaração de resíduos sólidos domésticos. Link para o sistema http://chibarro.manaus.am.gov.br/trsd/#/.

## Sobre o Sistema
O sistema nomeado TRSD (Taxa de Resíduos Sólidos Domésticos) tem como objetivo obter dados da quantidade de resíduos sólidos gerados por um imóvel (residencial ou misto) para posterior taxação. É disponibilizado um formulário onde o contribuinte preenche alguns dados como seu endereço, o tipo de uso do imóvel que reside e a quantidade média de resíduos sólidos (lixo) que gera.

O sistema contempla apenas a identificação do imóvel e do contribuinte (tela de identificação), preenchimento de dados em um formulário (cadastro) e impressão de um comprovante do cadastro.

## Implementação
Para a implementação foi utilizado o framework vue.js (https://vuejs.org/), com a adição do framework Vuetify (https://vuetifyjs.com/en/) para a estrutura de componentes e design do sistema.
As demais dependências encontram-se no arquivo de configuração package.json.

## Deployment

``` bash
# Instalação de dependências
npm install

> Em algumas distribuições Unix, o comando acima pode apresentar problemas quanto à instalação da dependência do pacote phantomjs. Caso ocorra, antes do comando acima, execute:

npm install phantomjs-prebuilt@2.1.14 --ignore-scripts

# Para execução no ambiente de desenvolvimento
npm run dev

# Para execução no ambiente de homologação/produção
npm run build