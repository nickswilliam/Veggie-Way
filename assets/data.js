const productsDAta = [
    {
        id: 1,
        product: "Burrito Vegan",
        price: 1100,
        description: "Burrito c/tortilla de maiz + Falafel + Ensalada + Salsa",
        img: "./assets/products/burrito-falafel.jpg",
        categorie: "rolls",

    },
    {
        id: 2,
        product: "Brunch Veggie",
        price: 1250,
        description: "Brunch veggie con Mix de frutos rojos + Tomates Cherrys + Palta",
        img: "./assets/products/brunch-veggie.jpg",
        categorie: "lunch"
    },
    {
        id: 3,
        product: "Burga al Plato",
        price: 1400,
        description: "Burguer al plato + Guarnición de vegetales + Zapallo asado",
        img: "./assets/products/burguer-veg01.jpg",
        categorie: "burguers"
    },
    {
        id: 4,
        product: "Seitán Asado",
        price: 1700,
        description: "Seitán asado + Verduras Asadas + Mezclas de especias aromaticas y salsa a elección.",
        img: "./assets/products/seitan-veg.jpg",
        categorie: "vegan-meat"
    },
    {
        id: 5,
        product: "Vegan Burguer",
        price: 1550,
        description: "Burguer simil carne + Cheddar + Pepinillos + LTC + Papas Rusticas",
        img: "./assets/products/vegan-burguer.jpg",
        categorie: "burguers"
    },
    {
        id: 6,
        product: "Tofu al Wok",
        price: 1300,
        description: "Tofu salteado en Wok + Mix de Vegetales + Semillas + Arroz",
        img: "./assets/products/vegan-burguer.jpg",
        categorie: "lunch"
    },
    {
        id: 7,
        product: "Wok de No-Pollo",
        price: 1950,
        description: "No-Pollo de Arveja + Salteado de Vegetales al Wok",
        img: "./assets/products/notchicken-wok.jpg",
        categorie: "vegan-meat"
    },
    {
        id: 8,
        product: "Pizza Vegana",
        price: 1800,
        description: "Pizza Vegetal con masa Integral + Muzza de Almendras + Zucchini + Albahaca",
        img: "./assets/products/pizza-vegana.jpg",
        categorie: "lunch"
    },
    {
        id: 9,
        product: "Choripan Veggie",
        price: 1300,
        description: "Choripan de Seitan + 2 Salsas a Elección + Guarnición",
        img: "./assets/products/choripan-vegan.png",
        categorie: "vegan-meat"
    },
    {
        id: 10,
        product: "Taco Vegano",
        price: 1600,
        description: "Taco con masa de Maiz + Garbanzos tostados + Vegetales Salteados + Salsa",
        img: "./assets/products/taco-vegan.jpg",
        categorie: "rolls"
    },
    {
        id: 11,
        product: "Sushi Vegano",
        price: 2100,
        description: "20 Piezas de Sushi (Tofu Salteado + Palta + Vegetales + Semillas)",
        img: "./assets/products/sushi-vegan.jpg",
        categorie: "lunch"
    },
    {  
        id: 12,
        product: "Quinoa Burguer",
        price: 1700,
        description: "Hamburguesa de Quinoa + Remolacha + Cheddar Vegan + Rucula y Perejil",
        img: "./assets/products/burguer-quinoa.png",
        categorie: "burguers"
    },
    {
        id: 13,
        product: "Caesar VSalad",
        price: 2000,
        description: "Ensalada Caesar Vegan + Crutons de Garbanzos + Rodajas de Palta",
        img: "./assets/products/caesar-garbanzos.jpg",
        categorie: "lunch"
    },
    {
        id: 14,
        product: "Wrap de Vegetales",
        price: 1650,
        description: "Arrollado de Vegetales + Salsa a elección + Garbanzos Fritos",
        img: "./assets/products/wrap-vegan.jpg",
        categorie: "rolls"
    },
    {
        id: 15,
        product: "Portobello Burguer",
        price: 2100,
        description: "Hamburguesa de Portobello marinada en Salsa Caramelo + Huevo de Tofu + Tomate & Rúcula",
        img: "./assets/products/burguer-portobello.png",
        categorie: "burguers"
    },
    {
        id: 16,
        product: "Seitanesa Napolitana",
        price: 2000,
        description: "Milanesa de Seitan a la Napolitana (Queso de Cajú + Guarnición)",
        img: "./assets/products/mila-napo-seitan.jpg",
        categorie: "vegan-meat"
    },
    {
        id: 17,
        product: "Lentejones VBurguer",
        price: 1750,
        description: "Hamburguesa de Lentejones + Tomate + Espinaca + Salsas + Guarnición",
        img: "./assets/products/burguer-lenteja.jpg",
        categorie: "burguers"
    },
    {
        id: 18,
        product: "Sandwich de Mila de Seitán",
        price: 1800,
        description: "Sanguche de Mila de Seitán + Tomate + Cebolla Morada + Salsas + Papas en Cubos",
        img: "./assets/products/sandwich-mila-seitan.jpg",
        categorie: "lunch"
    }

]

const splitProducts = size => {
    let dividedProducts = []
    for(let i = 0 ; i<productsDAta.length; i+=size){
        dividedProducts.push(productsDAta.slice(i, i+size))
    }
    return dividedProducts;
}

const productsController = {
    dividedProducts: splitProducts(6),
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length
}