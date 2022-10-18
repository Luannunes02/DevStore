let productAddBtn = document.getElementById('productAddBtn');
let buyBtn = document.querySelectorAll('#buyBtn');
const buyProductsConfirm = document.getElementById('buyProductsConfirm');
let allProducts = [
    {
        imgLink: './imgs/caneta.jfif',
        name: 'Caneta',
        description: 'Caneta para escrever em caderno.',
        value: 3.50,
        inventoryQuantity: 10,
    },
    {
        imgLink: 'https://upload.wikimedia.org/wikipedia/commons/2/22/3-Tasten-Maus_Microsoft.jpg',
        name: 'Mouse',
        description: 'Ótimo mouse para trabalho e estudos.',
        value: 20.00,
        inventoryQuantity: 10,
    },
    {
        imgLink: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Mechpencil05.jpg',
        name: 'Lapiseira',
        description: 'Uma excelente lapiseira, resistente e durável para estudos.',
        value: 5.00,
        inventoryQuantity: 5,
    },
    {
        imgLink: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Penna_bianchetto.jpg',
        name: 'Corretivo liquido',
        description: 'Corretivo liquido para cobrir erros com caneta.',
        value: 6.00,
        inventoryQuantity: 10,
    },
];
let productsInTheCart = [];

productAddBtn.addEventListener('click', insertNewProduct);
buyProductsConfirm.addEventListener('click', confirmPurchase)
for (let i = 0; i < allProducts.length; i++) {
    buyBtn[i].addEventListener('click', (e) => {
        let index = i;
        addToCart(e.currentTarget, index);
    });
}

function insertNewProduct() {
    productAddBtn.style.display = 'none' // this part delete the button that add a new product
    let $sectionProductAdd = document.getElementById('sectionProductAdd');

    let divAddProductForm = document.createElement('div');
    divAddProductForm.className = 'divAddProductForm';

    let inputImageLink = document.createElement('input');
    inputImageLink.placeholder = 'Digitar link da imagem do produto';
    inputImageLink.className = 'd-block mb-1 col-4 ';
    inputImageLink.required = 'true';
    inputImageLink.id = 'inputImageLink';

    let inputProductName = document.createElement('input');
    inputProductName.placeholder = 'Nome do produto';
    inputProductName.className = 'd-block  mb-1 col-4';
    inputProductName.id = 'inputProductName';

    let inputProductDescription = document.createElement('input');
    inputProductDescription.placeholder = 'Descrição do produto'
    inputProductDescription.className = 'd-block  mb-1 col-4'
    inputProductDescription.id = 'inputProductDescription'

    let inputProductPrice = document.createElement('input');
    inputProductPrice.placeholder = 'Valor do produto';
    inputProductPrice.type = 'number';
    inputProductPrice.className = 'd-block  mb-1 col-4'
    inputProductPrice.id = 'inputProductPrice'

    let inputInventoryQuant = document.createElement('input');
    inputInventoryQuant.placeholder = 'Quantidade do estoque';
    inputInventoryQuant.type = 'number';
    inputInventoryQuant.className = 'd-block  mb-1 col-4'
    inputInventoryQuant.id = 'inputInventoryQuant'

    let btnConfirmAddProduct = document.createElement('button');
    btnConfirmAddProduct.innerText = 'Adicionar Produto';
    btnConfirmAddProduct.type = 'button';
    btnConfirmAddProduct.className = 'd-block mb-1 btn btn-outline-warning'
    btnConfirmAddProduct.id = 'btnConfirmAddProduct'

    let btnCancelAddProduct = document.createElement('button');
    btnCancelAddProduct.innerText = 'Cancelar';
    btnCancelAddProduct.type = 'button';
    btnCancelAddProduct.className = 'd-block mb-1 btn btn-outline-danger'
    btnCancelAddProduct.id = 'btnCancelAddProduct'

    divAddProductForm.append(inputImageLink, inputProductName, inputProductDescription, inputProductPrice, inputInventoryQuant, btnConfirmAddProduct, btnCancelAddProduct);
    $sectionProductAdd.appendChild(divAddProductForm);

    btnCancelAddProduct.addEventListener('click', cancelShowNewProduct);
    btnConfirmAddProduct.addEventListener('click', showNewProduct);

}

function showNewProduct() {

    let $listOfProductsDiv = document.getElementById('listOfProducts');
    let divAddProductForm = document.querySelector('.divAddProductForm');
    let $inputImageLink = document.getElementById('inputImageLink');
    let $inputProductNameH4 = document.getElementById('inputProductName');
    let $inputProductDescription = document.getElementById('inputProductDescription');
    let $inputProductPrice = document.getElementById('inputProductPrice');

    const product = document.createElement('div');
    product.id = 'product';

    const productImg = document.createElement('img');
    productImg.src = $inputImageLink.value
    productImg.id = 'productImg';
    productImg.alt = $inputProductNameH4.value;

    const productName = document.createElement('h4')
    productName.id = 'productName';
    productName.innerText = $inputProductNameH4.value;

    const productDescription = document.createElement('p');
    productDescription.id = 'productDescription'
    productDescription.innerText = $inputProductDescription.value

    //price and quantity div
    const productPriceAndQuantDiv = document.createElement('div');
    productPriceAndQuantDiv.className = 'd-flex';
    productPriceAndQuantDiv.id = 'productPriceAndQuantDiv';

    const productPrice = document.createElement('p');
    productPrice.id = 'productPrice';
    productPrice.innerText = $inputProductPrice.value + ' R$';
    productPrice.className = 'text-md-start'

    const productQuant = document.createElement('input');
    productQuant.type = 'number'
    productQuant.value = '1';
    productQuant.id = 'productQuant'

    productPriceAndQuantDiv.append(productPrice, productQuant);
    //here the div part

    const buyBtn = document.createElement('button');
    buyBtn.type = 'button'
    buyBtn.className = 'btn btn-outline-success'
    buyBtn.id = 'buyBtn'
    buyBtn.appendChild(document.createTextNode('Comprar'));

    // here i finish the creations of the elements

    if ($inputImageLink.value === '' || $inputProductNameH4.value === '' || $inputProductDescription.value === '' || $inputProductPrice.value === '') {
        alert('Favor preencher todas as informações de cadastro do produto, tente novamente');
        let divParentNodeAddProduct = divAddProductForm.parentNode;
        divParentNodeAddProduct.removeChild(divAddProductForm);

        productAddBtn.style.display = 'block';
        productAddBtn.style.margin = '0 auto 40px';

        return
    }

    newProductObject();

    product.append(productImg, productName, productDescription, productPriceAndQuantDiv, buyBtn)
    $listOfProductsDiv.appendChild(product);
    const $buyBtn = document.querySelectorAll('#buyBtn');

    buyBtn.removeEventListener('click', addToCart);
    for (let i = 0; i < $buyBtn.length; i++) {
        console.log($buyBtn[i]);
        $buyBtn[i].addEventListener('click', (e) => {
            let index = i;
            addToCart(e.currentTarget, index);
        });
    }

    let divParentNodeAddProduct = divAddProductForm.parentNode;
    divParentNodeAddProduct.removeChild(divAddProductForm);

    productAddBtn.style.display = 'block';
    productAddBtn.style.margin = '0 auto 40px';

}

function newProductObject() {

    class Product {
        constructor(imgLink, name, description, value, inventoryQuantity) {
            this.imgLink = imgLink
            this.name = name
            this.description = description
            this.value = value
            this.inventoryQuantity = inventoryQuantity
        }

        sell(quantityBought) {
            this.inventoryQuantity -= quantityBought
        }
    }

    let $inputImageLink = document.getElementById('inputImageLink').value;
    let $inputProductNameH4 = document.getElementById('inputProductName').value;
    let $inputProductDescription = document.getElementById('inputProductDescription').value;
    let $inputProductPrice = document.getElementById('inputProductPrice').value;
    let $inputInventoryQuant = document.getElementById('inputInventoryQuant').value;


    const newProduct = new Product($inputImageLink, $inputProductNameH4, $inputProductDescription, parseFloat($inputProductPrice).toFixed(2), parseInt($inputInventoryQuant));

    allProducts.push(newProduct);
}

function cancelShowNewProduct() {
    let divAddProductForm = document.querySelector('.divAddProductForm');
    let divParentNodeAddProduct = divAddProductForm.parentNode;
    divParentNodeAddProduct.removeChild(divAddProductForm);

    productAddBtn.style.display = 'block';
    productAddBtn.style.margin = '0 auto 40px';
}

function addToCart(event, i) {
    const product = event.parentNode;
    const productImgValue = product.querySelector('#productImg').src;
    const productNameValue = product.querySelector('#productName').textContent;
    const productPriceValue = product.querySelector('#productPrice').textContent;
    const buyQuantityValue = product.querySelector('#productQuant').value;
    //const inventoryQuantityValue = product.querySelector('#buyQuantity').value;

    const $modalCart = document.getElementById('modalCart');

    const quant = document.querySelectorAll('#productQuant');


    const div = document.createElement('div');
    div.id = 'cartProductDiv';


    //start the div part of the name and value of the cart

    const divProductInfo = document.createElement('div');
    divProductInfo.id = 'divProductInfoCart';
    divProductInfo.className = 'd-flex'

    const productImg = document.createElement('img');
    productImg.src = productImgValue;
    productImg.id = 'productImgCart';
    productImg.className = 'd-block'
    productImg.alt = productImgValue;

    const divNameAndValue = document.createElement('div');
    divNameAndValue.id = 'divNameAndValueCart';
    divNameAndValue.className = 'd-block'

    const productName = document.createElement('p')
    productName.id = 'productNameCart';
    productName.innerText = productNameValue;
    productName.className = 'text-md-start d-block'

    const productPrice = document.createElement('p');
    productPrice.id = 'productPriceCart';
    productPrice.innerText = productPriceValue;
    productPrice.className = 'text-md-start d-block'

    divNameAndValue.append(productName, productPrice)
    divProductInfo.append(productImg, divNameAndValue);
    //end the div part of the name and value of the cart

    //start the div part of the quantity that the client will buy and the quantity that have in the inventory
    const divQuantityAndInventory = document.createElement('div');
    divQuantityAndInventory.id = 'divQuantityAndInventoryCart';

    const buyQuantity = document.createElement('input');
    buyQuantity.type = 'number';
    buyQuantity.id = 'buyQuantityCart';
    buyQuantity.className = 'text-md-start';
    buyQuantity.value = buyQuantityValue;

    const inventoryQuantity = document.createElement('p');
    inventoryQuantity.id = 'inventoryQuantityCart';
    inventoryQuantity.className = 'text-md-start';
    inventoryQuantity.innerText = `Restam ${allProducts[i].inventoryQuantity} unidades no estoque`;

    divQuantityAndInventory.append(buyQuantity, inventoryQuantity);
    //end the div part of the quantity that the client will buy and the quantity that have in the inventory

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button'
    removeBtn.className = 'btn btn-outline-danger'
    removeBtn.id = 'removeBtnCart'
    removeBtn.innerText = 'Remover produto'

    div.append(divProductInfo, divQuantityAndInventory, removeBtn);
    $modalCart.appendChild(div);

    productsInTheCart.push({ name: productNameValue, buyQuantity: parseInt(buyQuantityValue) });
    const $removeBtn = document.querySelectorAll('#removeBtnCart');
    for (let i = 0; i < $removeBtn.length; i++) {
        $removeBtn[i].addEventListener('click', (e) => {
            removeToCart(e.currentTarget, i);
        });
    }

    quant[i].value = '1';
}

function removeToCart(event, i) {
    event.parentNode.parentNode.removeChild(event.parentNode);
}

function confirmPurchase() {
    const cart = document.getElementById('modalCart');

    for (let i = 0; i < productsInTheCart.length; i++) {
        allProducts.forEach(product => {
            if (product.name === productsInTheCart[i].name) {
                if (product.inventoryQuantity === 0) {
                    alert('O valor da quantidade que você deseja comprar e superior a quantidade em estoque, favor alterar a quantidade que deseja e tente comprar novamente');
                    for (let i = productsInTheCart.length; i > 0; i--) {
                        productsInTheCart.pop();
                    }
                    return
                }
                product.inventoryQuantity -= productsInTheCart[i].buyQuantity;
            }
        })
    }

    for (let i = productsInTheCart.length; i > 0; i--) {
        productsInTheCart.pop();
    }

    let child = cart.lastElementChild;
    while (child) {
        cart.removeChild(child)
        child = cart.lastElementChild;
    }

    alert('Você comprou todos os produtos que estavam no carrinho :)')
}

