//usado pra verificar quais itens ja foram selecionados [dishElement, drinkElement, dessertElement]
const selectedItens = new Array(undefined, undefined, undefined);
let finishOrderAvailable = false;

//o index referencia a posicao no array selectedItens, indicando qual o tipo do item:
// [0:dish, 1:drink, 2:dessert:2] 
function getIndex(dataIdentifier) {
    switch (dataIdentifier) {
        case "dishes": return 0;
        case "drinks": return 1;
        case "desserts": return 2;
    }
}

//seleciona o item atual, deseleciona o item previamente selecionado
function selectItem(itemSelecionado) {
    const index = getIndex(itemSelecionado.parentElement.getAttribute("data-identifier"));

    if(itemSelecionado.classList.toggle("item-selecionado")){
        if (selectedItens[index] != undefined) {
            selectedItens[index].classList.toggle("item-selecionado");
        }
        selectedItens[index] = itemSelecionado;
    }else{
        selectedItens[index] = undefined;
    }

    //vefifica botao de fechar pedido
    finishOrderHandler();
}

//se uma opcao em cada item foi selecionado, modifica o botao de finalizar pedido
//senao, volta o botao pro estado original
function finishOrderHandler() {
    const finishButton = document.getElementById("finalizar-pedido");
    if (selectedItens.every(item => item != undefined)) {
        finishButton.textContent = "Fechar pedido";
        finishButton.classList.add("item-clicavel");
        finishButton.classList.add("pedido-pronto");
        finishOrderAvailable = true;
    } else {
        finishButton.textContent = "Selecione os 3 itens para finalizar o pedido";
        finishButton.classList.remove("item-clicavel");
        finishButton.classList.remove("pedido-pronto");
        finishOrderAvailable = false;
    }
}

//Chama os prompts, calcula o preco total. 
//Atualiza as informacoes sobre o pediado nos campos de texto da tela de confirmacao. 
//Muda o display da tela de confirmacao pra ela aparecer
function abrirTelaConfirmacao() {
    if (finishOrderAvailable) {
        const nome = prompt("Qual seu nome? 🤔")
        const endereco = prompt("Diga seu endereço 👀")

        const orderInfo = document.querySelectorAll(".informacao-pedido");
        const itemNames = [];
        console.log(orderInfo)

        //pega o nome e preco de todos os itens selecionados
        let precoTotal = 0;
        for (let i = 0; i < selectedItens.length; i++) {
            const selectedOption = selectedItens[i];

            const itemName = selectedOption.querySelector("h1");
            const itemPrice = selectedOption.querySelector("h2");

            const itemInfo = orderInfo[i].querySelectorAll("h3");
            itemInfo[0].textContent = itemName.textContent;
            itemInfo[1].textContent = itemPrice.textContent.replace("R$ ", "");
            itemNames.push(itemName.textContent);

            precoTotal += parseFloat(itemInfo[1].textContent.replace(",", "."));
        }

        const precoFinalElement = document.getElementById("preco-final");
        precoFinalElement.textContent = "R$ " + precoTotal.toFixed(2).toString().replace('.', ',');

        const telaConfirmacao = document.getElementById("background-confirmacao");
        telaConfirmacao.style.display = "flex";

        const confirmButton = document.getElementById("botao-confirmar");
        confirmButton.addEventListener("click", function () {
            redirectToWhatsApp(itemNames, precoTotal.toFixed(2), nome, endereco);
        });
    }
}

//funcao do botao 'cancelar' na tela de confirmacao
function cancelarPedido() {
    const telaConfirmacao = document.getElementById("background-confirmacao");
    telaConfirmacao.style.display = "none";
}

function redirectToWhatsApp(itemNames, precoFinal, nome, endereco) {
    let message = "Olá, gostaria de fazer o pedido:"
        + "\n - Prato: " + itemNames[0]
        + "\n - Bebida: " + itemNames[1]
        + "\n - Sobremesa: " + itemNames[2]
        + "\nTotal: R$ " + precoFinal;

    if (nome != "" || endereco != "") {
        message += "\n";
        if (nome != "") message += "\nNome: " + nome;
        if (endereco != "") message += "\nEndereço: " + endereco;
    }

    const url = "https://wa.me/5521999521936?text="
        + encodeURIComponent(message)

    window.open(url, "_blank")
}