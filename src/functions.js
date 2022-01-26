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
        const selectIcon = item.getElementsByTagName("ion-icon");
        selectIcon[0].style.display = "none";
        item.style.border = "none";
    }
}

function selectItem(number, option){
    const itens = allItens[number].getElementsByClassName("item__opcao");

    const item = itens[option];
    const selectIcon = item.getElementsByTagName("ion-icon");
    
    deselectOtherItens(itens);
    selectIcon[0].style.display = "block"
    item.style.border = "5px solid #32B72F";
}