const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Ele importa o app para poder usar a aplicação.
//Ele configura o dotenv, que carrega as variáveis de ambiente
//Ele aponta para a porta definida na variável PORT.
//Se não encontrar essa variável, ele usa o número 8080 como padrão.
//Por fim, ele informa que a porta está rodando, mostrando no console que o servidor está ativo.

// Em uma frase curta: “O server importa o app, configura o dotenv, aponta para a porta e, se não achar, roda na 8080.