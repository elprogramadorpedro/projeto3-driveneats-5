//possui um array referenciando cada linha de itens(prato,bebida,sobremesa)
const  allItens = document.getElementsByClassName("item");

//usado pra verificar quais itens ja foram selecionados
const selectedItens = [undefined,undefined,undefined]
let finishOrderAvailable = false;

//deleseciona a ultima opcao selectionada no prato(dish) atual
function deselectOtherItem(itens, dish){
    if(selectedItens[dish] != undefined){
        const item = itens[selectedItens[dish]];

        //remove a borda verde e icone do item
        item.style.border = "none";
        const selectIcon = item.getElementsByTagName("ion-icon");
        selectIcon[0].style.display = "none";
    }
    
}

//seleciona uma opcao, chama deselectItem() pra deselecionar a ultima opcao desse prato
//chama o finishOrderHandler pra verificar se o pedido pode ser finalizado
function selectItem(dish, selectedOption){
    const itens = allItens[dish].getElementsByClassName("item__opcao");

    const item = itens[selectedOption];
    const selectIcon = item.getElementsByTagName("ion-icon");
    
    //adiciona borda verde e revela o icone na opcao selecionada 
    selectIcon[0].style.display = "block"
    item.style.border = "5px solid #32B72F";

    deselectOtherItem(itens, dish);
    selectedItens[dish] = selectedOption;
    finishOrderHandler();
}

//se uma opcao em cada item foi selecionado
//modifica o botao de finalizar pedido
function finishOrderHandler(){
    if(selectedItens.every(item => item != undefined)){
        const finishButton = document.getElementsByClassName("finalizar-pedido");
        finishButton[0].style.background = "#32B72F";
        finishButton[0].textContent = "Fechar pedido";
        finishOrderAvailable = true;
    }
}

//Calcula o preco total. Atualiza as informacoes sobre o pedido 
//nos campos de texto das classes informacao-pedido. 
//Muda o display da tela de confirmacao pra ela aparecer
function abrirTelaConfirmacao(){
    if(finishOrderAvailable){
        const orderInfo = document.getElementsByClassName("informacao-pedido");
        const itemNames=[];

        let precoTotal = 0;
        for(let i = 0; i<3;i++){
            const dishes = allItens[i].getElementsByClassName("item__opcao");;
            const selectedOption = dishes[selectedItens[i]];
            const itemName = selectedOption.getElementsByTagName("h1")
            const itemPrice = selectedOption.getElementsByTagName("h2")


            const itemInfo = orderInfo[i].getElementsByTagName("h3");
            itemInfo[0].textContent = itemName[0].textContent;
            itemNames.push(itemName[0].textContent);
            let price = itemPrice[0].textContent.replace("R$ ", "");
            itemInfo[1].textContent = price;
            price = price.replace(",","."); //troca , por . pra poder fazer o parse
            precoTotal += parseFloat(price);
        }   

        const precoFinal = document.getElementById("preco-final");
        const precoFinalString = precoTotal.toFixed(2).toString().replace('.',',');
        precoFinal.textContent = "R$ "+precoFinalString;
        
        const telaConfirmacao = document.getElementsByClassName("background-confirmacao");
        telaConfirmacao[0].style.display="flex";

        const confirmButton = document.getElementById("botao-confirmar");
        confirmButton.addEventListener("click", function(){
            redirectToWhatsApp(itemNames, precoTotal.toFixed(2));
        });   
    }
}

//funcao do botao 'cancelar' na tela de confirmacao
function cancelarPedido(){
    const telaConfirmacao = document.getElementsByClassName("background-confirmacao");
    telaConfirmacao[0].style.display="none";
}

function redirectToWhatsApp(itemNames, precoFinal){
    const message = "Olá, gostaria de fazer o pedido:"
    +"\n - Prato: "+itemNames[0]
    +"\n - Bebida: "+itemNames[1]
    +"\n - Sobremesa: "+itemNames[2]
    +"\nTotal: R$ "+precoFinal;

    const url = "https://wa.me/5521999521936?text="
    +encodeURIComponent(message)

    window.open(url, "_blank")
}