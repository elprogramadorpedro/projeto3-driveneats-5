//possui um array referenciando cada linha de itens(prato,bebida,sobremesa)
const  allItens = document.getElementsByClassName("item");

//usado pra verificar quais itens ja foram selecionados
const selectedItens = [false,false,false]
let finishOrder = false;

//deleseciona todas as outras opções quando um item eh selecionado
function deselectOtherItens(itens){
    for(let item of itens){
        const selectIcon = item.getElementsByTagName("ion-icon");
        selectIcon[0].style.display = "none";
        item.style.border = "none";
    }
}

//seleciona uma opcao, deseleciona as outras
//chama o finishOrderHandler pra verificar se o pedido pode ser finalizado
function selectItem(number, option){
    finishOrderHandler(number);
    const itens = allItens[number].getElementsByClassName("item__opcao");

    const item = itens[option];
    const selectIcon = item.getElementsByTagName("ion-icon");
    
    deselectOtherItens(itens);
    selectIcon[0].style.display = "block"
    item.style.border = "5px solid #32B72F";
}

//se uma opcao em cada item foi selecionado
//modifica o botao de finalizar pedido
function finishOrderHandler(number){
    selectedItens[number] = true;
    
    if(selectedItens.every(itemIsSelected => itemIsSelected)){
        const finishButton = document.getElementsByClassName("finalizar-pedido");
        finishButton[0].style.background = "#32B72F";
        finishButton[0].textContent = "Fechar pedido";
        finishOrder = true;
    }
}