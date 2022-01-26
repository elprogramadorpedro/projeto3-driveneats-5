const  allItens = document.getElementsByClassName("item");

function scrollItemRight(number){
    
    const item = allItens[number];
    
    item.scrollBy({
        left: 150,
        behavior: "smooth"
    });

}

function scrollItemLeft(number){
    const item = allItens[number];
    
    item.scrollBy({
        left: -150,
        behavior: "smooth"
    });
}

function deselectOtherItens(itens){
    for(let item of itens){
        item.style.border = "none";
    }
}

function selectItem(number, option){
    const itens = allItens[number].getElementsByClassName("item__opcao");

    const item = itens[option];
    deselectOtherItens(itens);
    item.style.border = "5px solid #32B72F";
}