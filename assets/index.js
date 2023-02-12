const products = document.querySelector('.products-container')
const productsCart = document.querySelector('.cart-container')
const total = document.querySelector('.total')
const productsFilter = document.querySelector('.products-filter')
const filterList = document.querySelectorAll('.filter')
const btnLoad = document.querySelector('.btn-load')
const btnBuy = document.querySelector('.btn-buy')
const cartCount = document.querySelector('.cart-count')
const barsBtn = document.querySelector('.toggle-icon')
const barsMenu = document.querySelector('.navbar')
const cartBtn = document.querySelector('.cart-div')
const cartMenu = document.querySelector('.cart')
const overlay = document.querySelector('.overlay')
const successModal = document.querySelector('.add-modal')
const deleteBtn = document.querySelector('.btn-delete')

let cart = JSON.parse(localStorage.getItem('cart')) || []
const saveLocalStorage = cartList => {
    localStorage.setItem('cart', JSON.stringify(cartList))
}

const renderProduct = ({ product, price, description, img, id }) => {
    return `
    <div class="prod-type">
        <h3>${product}</h3>
        <img src=${img} alt=${product}>
        <p>${description}</p>

        <div class="prod-bot-info">
            <span>Precio: $${price}</span>
            <button class="btn-add"
            data-id="${id}"
            data-product="${product}"
            data-price="${price}"
            data-img="${img}"
            
            
            >+Agregar</button>
        </div>
    </div>
    `
}

const renderFilteredProducts = category => {
    const productsList = productsDAta.filter(product => product.categorie === category)
    products.innerHTML = productsList.map(renderProduct).join('')
}

const renderDividedProducts = (index = 0) => {
    const productsToRender = productsController.dividedProducts[index]
    products.innerHTML += productsToRender.map(renderProduct).join('')
}

const renderProducts = (index = 0, category = null) => {
    if (!category) {
        renderDividedProducts(index)
    } else {
        renderFilteredProducts(category)
    }
}

const isLastIndex = () => productsController.nextProductsIndex === productsController.productsLimit

const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex)
    productsController.nextProductsIndex++;

    if (isLastIndex()) {
        btnLoad.classList.add('hidden')
    }
}

const changeBtnActiveState = selectedCategorie => {
    const categories = [...filterList]
    categories.forEach(categorieBtn => {
        if (categorieBtn.dataset.filter !== selectedCategorie) {
            categorieBtn.classList.remove('f-main')
        } else {
            categorieBtn.classList.add('f-main')
        }
    })
}

const changeShowMoreBtnState = selectedCategorie => {
    if (!selectedCategorie) {
        btnLoad.classList.remove('hidden')
        return
    }
    btnLoad.classList.add('hidden')
}

const changeFilterState = (selectedCategorie) => {
    changeBtnActiveState(selectedCategorie)
    changeShowMoreBtnState(selectedCategorie)
}

const applyFilter = (e) => {
    if (!e.target.classList.contains('filter')) return;

    const clickedFilter = e.target.dataset.filter;
    changeFilterState(clickedFilter)
    if (!clickedFilter) {
        products.innerHTML = ''
        renderProducts()
    } else {
        renderProducts(0, clickedFilter)
        productsController.nextProductsIndex = 1;
    }
}

const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu')
    if (cartMenu.classList.contains('open-cart')) {
        cartMenu.classList.remove('open-cart')
        return
    }
    overlay.classList.toggle('show-overlay')
}

const toggleCart = () => {
    cartMenu.classList.toggle('open-cart')
    if (barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu')
        return
    }
    overlay.classList.toggle('show-overlay')
}

const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains('open-menu') &&
        !cartMenu.classList.contains('open-cart')
    ) return;

    barsMenu.classList.remove('open-menu')
    cartMenu.classList.remove('open-cart')
    overlay.classList.remove('show-overlay')

}

const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-link')) return;
    barsMenu.classList.remove('open-menu')
    overlay.classList.remove('show-overlay')
}

const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu')
    cartMenu.classList.remove('open-cart')
    overlay.classList.remove('show-overlay')
}

const renderCartProduct = ({ product, img, id, price, quantity }) => {
    return `
    <div class="cart-prod">
        <img src=${img} alt=${product}>

        <div class="cart-prod-info">
            <h3>${product.toUpperCase()}</h3>
                <span>PRECIO:</span>
                <p>$${price*quantity}</p>
        </div>

        <div class="cart-controlls">
            <button class="cart-rest handle" data-id=${id}>-</button>
            <span class="cart-quantity">${quantity}</span>
            <button class="cart-add handle" data-id=${id}>+</button>
        </div>

                        
    </div>
    `
}

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p>No hay productos en el carrito</p>`
        return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join('')
}

const getCartTotal = () => {
    return cart.reduce((accum, currentValue) => accum + Number(currentValue.price) * currentValue.quantity, 0)
}

const showTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}`
}

const isExistingCartProduct = ({ id }) => cart.some(prod => prod.id === id)

const createCartProduct = (products) => {
    cart = [...cart, { ...products, quantity: 1 }]
}

const showSuccessModal = msg => {
    successModal.classList.add('active-modal')
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove('active-modal')
    }, 1500)
}

const disableBtn = btn => {
    if (!cart.length) {
        btn.classList.add('hidden')
    } else {
        btn.classList.remove('hidden')
    }
}

const renderCartBubble = () => {
    cartCount.textContent = cart.reduce((acc, curr) => acc + curr.quantity, 0)
}

const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart();
    showTotal();
    disableBtn(btnBuy);
    disableBtn(deleteBtn);
    renderCartBubble();
}

const addUnitToProduct = product => {
    cart = cart.map(cartProduct => cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    )
}

const addProduct = (e) => {
    if (!e.target.classList.contains('btn-add')) return;

    const { id, product, img, price } = e.target.dataset;
    const productToCart = { id, img, product, price }

    if (isExistingCartProduct(productToCart)) {
        addUnitToProduct(productToCart)
        showSuccessModal("Se agregó una unidad del producto al carrito")
    } else {
        createCartProduct(productToCart);
        showSuccessModal("El producto se ha agregado al carrito.")
    }

    checkCartState();
}

const resetCartItems = () => {
    cart = []
    checkCartState()
}

const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        //vaciar carrito 
        resetCartItems()
        //mostrar mensaje de exito
        alert(successMsg)
    }
}

const completeBuy = () => {
    completeCartAction(
        '¿Confirmar compra?',
        'El pedido ha sido realizado exitosamente.'
    )
}

const deleteCart = () => {
    completeCartAction(
        '¿Desea eliminar todos los productos del carrito?',
        'El carrito se ha vaciado'
    )
}

const removeProductFromCart = ({ id }) => {
    cart = cart.filter(product => product.id !== id)
    checkCartState();
}

const substractUnitProduct = ({ id }) => {
    cart = cart.map(product => product.id === id ? { ...product, quantity: product.quantity - 1 } : product)
}

const handlePlusBtnEvent = id => {
    const existingProduct = cart.find(product => product.id === id)
    addUnitToProduct(existingProduct)
}

const handleMinusBtnEvent = id => {
    const existingProduct = cart.find(product => product.id === id)

    if (existingProduct.quantity === 1) {
        if(window.confirm('¿Desea eliminar el producto del carrito?')){
            removeProductFromCart(existingProduct)
        }
        return;
    }
    substractUnitProduct(existingProduct)
}

const handleQuantity = e => {
    if (e.target.classList.contains('cart-rest')) {
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains('cart-add')) {
        handlePlusBtnEvent(e.target.dataset.id)
    }
    checkCartState();
}

const init = () => {
    renderProducts();
    btnLoad.addEventListener('click', showMoreProducts)
    productsFilter.addEventListener('click', applyFilter)

    barsBtn.addEventListener('click', toggleMenu)
    cartBtn.addEventListener('click', toggleCart)

    window.addEventListener('scroll', closeOnScroll)

    barsMenu.addEventListener('click', closeOnClick)
    overlay.addEventListener('click', closeOnOverlayClick)

    document.addEventListener('DOMContentLoaded', renderCart)
    document.addEventListener('DOMContentLoaded', showTotal)

    products.addEventListener('click', addProduct)

    btnBuy.addEventListener('click', completeBuy)
    deleteBtn.addEventListener('click', deleteCart)
    productsCart.addEventListener('click', handleQuantity)

    disableBtn(btnBuy);
    disableBtn(deleteBtn);
    renderCartBubble();
}


init()
