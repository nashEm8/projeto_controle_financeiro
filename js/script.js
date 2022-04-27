
const transacoesClass = document.querySelector('#transacoes');
const total_valor = document.querySelector('#total');
const resultado = document.querySelector('.resultado');
const transacoes = [];

 const transacoesIntoDOM = transacoes =>{
  const operador = transacoes.tipo == 1 ? '-' : '+';
  const CSSClass = transacoes.valor < 0 ? 'remover' : 'adicionar';
  const div = document.createElement('div');

  div.classList.add(CSSClass);
  div.innerHTML = 
  `<div style="margin-left:20px">${operador}</div>
  <div class="item">
  <div>${transacoes.name}</div>
  <div>${formatterCurrency(Number(transacoes.valor))}</div>
  </div>`

  transacoesClass.append(div);
  document.querySelector('#mercadoria').value = '';
  document.querySelector('#valor').value = '';
  document.querySelector('#opcao').value = '';
}

//função máscara para converter para moeda BR 
function atacado(i) {
  var decimais = 2;
  var separador_milhar = '.';
  var separador_decimal = ',';
  
  var decimais_ele = Math.pow(10, decimais);
  var thousand_separator ='$1'+separador_milhar;
  var v = i.value.replace(/\D/g,'');
  v = (v/decimais_ele).toFixed(decimais) + '';
  var splits = v.split(".");
  var p_parte = splits[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, thousand_separator);
  (typeof splits[1] === "undefined") ? i.value = p_parte : i.value =p_parte+separador_decimal+splits[1];
}

//formata o valor para Real "R$"
function formatterCurrency(value) {
  const valueFormat = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valueFormat;
}

//Cálculo dos itens inseridos no input mercadoria -> valor
const balancoValores = () => {
  let total = 0;

  /*Verificação para a exibição da mensagem de cadastro vazio, 
  caso algum produto tenha sido adicionado (transacoes.length > 0),
  logo a mensagem vai sumir. E se o cadastro estiver vazio (transacoes.length <0),
  a mensagem vai aparecer
  */
  if(transacoes.length > 0){
    document.getElementById("transacao-vazia").style.display = "none";
  } else {
    if(transacoes.length <= 0){
      document.getElementById("transacao-vazia").style.display = "block";
    }
  }

  /* condição para fazer o cálculo dos itens */
  for(let i of transacoes){
    total = i.tipo == "2"? total += i.valor : total -= i.valor;

    if(total > 0){
      resultado.innerHTML = '[Lucro]';
    } else { 
      if(total < 0 ){
        resultado.innerHTML = '[Prejuízo]';
      } else{
        resultado.innerHTML = '';
      }
    }
  }
  total = (new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total));
  total_valor.innerHTML = `${total}`; 
}

 const init = () => {
  transacoesClass.innerHTML = '';
  transacoes.forEach(transacoesIntoDOM);
  balancoValores();
 }

init();

//validação do formulário
function validacao(e) {
  e.preventDefault();

  var nomeMercadoria = document.querySelector('#mercadoria').value;
  var valorMercadoria = document.querySelector('#valor').value;
  var tipoTransacao = document.querySelector('#opcao').value;

  const transacao = {
    tipo: tipoTransacao, 
    name: nomeMercadoria, 
    valor: +valorMercadoria
    .replaceAll(".", "")
    .replaceAll(",", "."),
  }

  transacoes.push(transacao); 
  init();
}

//Não permitir que números sejam digitados no input nome da mercadoria 
document.querySelector('#mercadoria').addEventListener('keypress', function(e){
  const keyCode = (e.keyCode ? e.keyCode : e.wich);

  if(keyCode > 47 && keyCode < 58){
    e.preventDefault();
  }
}) 


//Menu 
function abrir_menu(){
  document.querySelector('.barra').style.display = 'block';
}

function fechar_menu(){
  document.querySelector('.barra').style.display = 'none';
}