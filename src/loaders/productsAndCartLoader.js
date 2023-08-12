import { getShoppingCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get Cart
    const savedCart = getShoppingCart();
    const storedProductIds = Object.keys(savedCart);
    // get products
    const productsData = await fetch('http://localhost:5000/productsByID', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(storedProductIds)
    });
    const products = await productsData.json();
    console.log(products);

    const previousCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            previousCart.push(addedProduct);
        }
    }
    return { products, previousCart };
}