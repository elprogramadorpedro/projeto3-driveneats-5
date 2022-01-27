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