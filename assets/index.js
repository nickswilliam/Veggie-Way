const products = document.querySelector('.products-container')
const productsCart = document.querySelector('.cart-container')
const total = document.querySelector('.total')
const productsFilter = document.querySelector('.products-filter')
const filterList = document.querySelectorAll('.filter')
const btnLoad = document.querySelector('.btn-load')
const btnBuy = document.querySelector('.btn-buy')
const cartCount = document.querySelector('.cart-count')
const barsMenu = document.querySelector('.menu-label')
const cartMenu = document.querySelector('.navbar-list')
const overlay = document.querySelector('.overlay')
const successModal = document.querySelector('add-modal')
const deleteBtn = document.querySelector('btn-delete')

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
            data-id=${id}>+Agregar</button>
        </div>
    <div>
    `
}

const renderDividedProducts = (index = 0) => {
    const productsToRender = productsController.dividedProducts[index]
    products.innerHTML = productsToRender.map(renderProduct).join('')
}

const renderProducts = (index = 0, category = null) => {
    if (!category) {
        renderDividedProducts(index)
    } else {
        //renderizar productos por categoria
    }
}



const init = () => {
    document.addEventListener('DOMContentLoaded', ()=>{
        renderProducts();
    })
    
}


init()
