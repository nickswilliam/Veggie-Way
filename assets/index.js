const products = document.querySelector('.products-container')
const productsCart = document.querySelector('.cart-container')
const total = document.querySelector('.total')
const productsFilter = document.querySelector('.products-filter')
const filterList = document.querySelectorAll('.filter')
const btnLoad = document.querySelector('.btn-load')
const btnBuy = document.querySelector('.btn-buy')
const cartCount = document.querySelector('.cart-count')
const barsBtn = document.querySelector('.menu-toggle')
const barsMenu = document.querySelector('.navbar')
const cartBtn = document.querySelector('.cart-menu')
const cartMenu = document.querySelector('.cart')
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
            data-id="${id}">+Agregar</button>
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

   if(isLastIndex()){
    btnLoad.classList.add('hidden')
   }
}

const changeBtnActiveState = selectedCategorie => {
    const categories = [...filterList]
    categories.forEach(categorieBtn =>{
        if(categorieBtn.dataset.filter !== selectedCategorie){
            categorieBtn.classList.remove('f-main')
        } else{
            categorieBtn.classList.add('f-main')
        }
    })
}

const changeShowMoreBtnState = selectedCategorie => {
    if(!selectedCategorie){
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
    if(!e.target.classList.contains('filter')) return;
    console.log('soy un boton')

    const clickedFilter = e.target.dataset.filter;
    changeFilterState(clickedFilter)
    if(!clickedFilter){
        products.innerHTML = ''
        renderProducts()
    } else {
        renderProducts(0, clickedFilter)
        productsController.nextProductsIndex = 1; 
    }
}

const menuToggle = () => {
    barsMenu.classList.toggle('open-menu')
    if(cartMenu.classList.contains('open-cart')){
        cartMenu.classList.remove('open-cart')
        return
    }
    overlay.classList.toggle('show-overlay')
}

const cartToggle = () => {
    cartMenu.classList.toggle('open-cart')
    if(barsMenu.classList.contains('open-menu')){
        barsMenu.classList.remove('open-menu')
        return
    }
    overlay.classList.toggle('show-overlay')
}

const init = () => {
        renderProducts();
        btnLoad.addEventListener('click', showMoreProducts)
        productsFilter.addEventListener('click', applyFilter)
        
        barsBtn.addEventListener('click', toggleMenu)
        cartBtn.addEventListener('click', toggleCart)


}


init()
