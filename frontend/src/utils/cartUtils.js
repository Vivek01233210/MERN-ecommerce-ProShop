export const addDecimals = (num) =>{
    return (Math.round(num * 100)/ 100).toFixed(2);
}

export const updateCart = (state)=>{
    // Calculate price of all the items in the cart and save it in a variable in the state.
    const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    state.itemsPrice = addDecimals(itemsPrice);
    
    // Calculate shipping price (if order > $100 --> shipping free, else $10 shipping fee)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    state.shippingPrice = addDecimals(shippingPrice);

    // Calculate tax price (15% tax)
    const taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
    state.taxPrice = addDecimals(taxPrice);

    // Calculate total price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    state.totalPrice = addDecimals(totalPrice);

    // save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}