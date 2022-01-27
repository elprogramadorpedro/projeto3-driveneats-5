//possui um array referenciando cada linha de itens(prato,bebida,sobremesa)
const  allItens = document.getElementsByClassName("item");

//data-identifiers
const DISH = "dishes"
const DRINK = "drinks"
const DESSERT = "desserts"

//usado pra verificar quais itens ja foram selecionados
const selectedItens = new Array(undefined,undefined,undefined);
let finishOrderAvailable = false;

function getIndex(dataIdentifier){ 
    switch(dataIdentifier){
        case DISH: return 0;
        case DRINK: return 1;
        case DESSERT: return 2;
    }
}

//deleseciona a ultima opcao selectionada no prato(dish) atual
//remove a borda verde e icone do item
function deselectOtherItem(index){
    const selectedItem = selectedItens[index];
    if(selectedItem != undefined){
        selectedItem.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.25)";
        const selectIcon = selectedItem.querySelector("ion-icon");
        selectIcon.style.display = "none";
    }
}

//seleciona uma opcao, chama deselectItem() pra deselecionar a ultima opcao desse prato
//chama o finishOrderHandler pra verificar se o pedido pode ser finalizado
function selectItem(item){
    const selectIcon = item.querySelector("ion-icon");

    //adiciona borda verde e revela o icone na opcao selecionada 
    selectIcon.style.display = "block"
    item.style.boxShadow = "inset 0 0 0 5px #32B72F";

    const index = getIndex(item.parentElement.getAttribute("data-identifier"));  
    if(selectedItens[index] != item){
        deselectOtherItem(index);
    }     
    selectedItens[index] = item;
    finishOrderHandler();
}

//se uma opcao em cada item foi selecionado modifica o botao de finalizar pedido
function finishOrderHandler(){
    if(selectedItens.every(item => item != undefined)){
        const finishButton = document.getElementById("finalizar-pedido");
        finishButton.style.background = "#32B72F";
        finishButton.textContent = "Fechar pedido";
        finishButton.classList.add("item-clicavel");
        finishOrderAvailable = true;
    }
}

//Calcula o preco total. Atualiza as informacoes sobre o pedido 
//nos campos de texto das classes informacao-pedido. 
//Muda o display da tela de confirmacao pra ela aparecer
function abrirTelaConfirmacao(){
    if(finishOrderAvailable){

        const nome = prompt("Qual seu nome? 🤔")
        const endereco = prompt("Diga seu endereço 👀")

        const orderInfo = document.getElementsByClassName("informacao-pedido");
        const itemNames=[];

        //pega o nome e preco de todos os itens selecionados
        let precoTotal = 0;
        for(let i = 0; i<selectedItens.length;i++){
            const selectedOption = selectedItens[i];
            
            const itemName = selectedOption.querySelector("h1");
            const itemPrice = selectedOption.querySelector("h2");

            const itemInfo = orderInfo[i].getElementsByTagName("h3");
            itemInfo[0].textContent = itemName.textContent;
            itemInfo[1].textContent = itemPrice.textContent.replace("R$ ", "");
            itemNames.push(itemName.textContent);
           
            precoTotal += parseFloat(itemInfo[1].textContent.replace(",","."));
        }   

        const precoFinalElement = document.getElementById("preco-final");
        const precoFinalString = precoTotal.toFixed(2).toString().replace('.',',');
        precoFinalElement.textContent = "R$ "+precoFinalString;
        
        const telaConfirmacao = document.getElementById("background-confirmacao");
        telaConfirmacao.style.display="flex";

        const confirmButton = document.getElementById("botao-confirmar");
        confirmButton.addEventListener("click", function(){
            redirectToWhatsApp(itemNames, precoTotal.toFixed(2), nome, endereco);
        });   
    }
}

//funcao do botao 'cancelar' na tela de confirmacao
function cancelarPedido(){
    const telaConfirmacao = document.getElementById("background-confirmacao");
    telaConfirmacao.style.display="none";
}

function redirectToWhatsApp(itemNames, precoFinal, nome, endereco){
    let message = "Olá, gostaria de fazer o pedido:"
    +"\n - Prato: "+itemNames[0]
    +"\n - Bebida: "+itemNames[1]
    +"\n - Sobremesa: "+itemNames[2]
    +"\nTotal: R$ "+precoFinal;

    if(nome != "" || endereco != ""){
        message+="\n";
        if(nome != "") message += "\nNome: "+nome;
        if(endereco != "") message += "\nEndereço: "+endereco;
    }

    const url = "https://wa.me/5521999521936?text="
    +encodeURIComponent(message)

    window.open(url, "_blank")
}