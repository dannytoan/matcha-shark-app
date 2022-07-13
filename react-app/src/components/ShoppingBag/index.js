import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBag } from "../../store/shoppingBag";
import { viewOrderHistory } from "../../store/orderHistory.js";
import "./ShoppingBag.css"


function ShoppingBag() {
    const dispatch = useDispatch();
    const bag = JSON.parse(localStorage.getItem("shoppingBag"))

    const removeBagHandler = (cartItem) => {
        dispatch(removeFromBag(cartItem))
        window.location.reload(false)
    }

    function handleCheckout() {
        dispatch(viewOrderHistory);
    }

    return (
        <div id="bag-body-contiainer">
            <h1 className="text" id="shopping-bag-h1">Shopping Bag</h1>
            <div id="bag-item-container-outer">

            {bag?.map(bagItem => (
                <div id="bag-item-container">
                <img id="bag-item-img" src={bagItem?.image_url_1}/>
                <div id="bag-item-details-cntr">
                <h3 className="text bag-item-name">{bagItem.product_name}</h3>
                <div className="text" id="bag-item-detail-price">${bagItem.price} USD</div>
                    <button className="remove-btn" onClick={() => removeBagHandler(bagItem)}>Remove</button>
                </div>
                <div>
                    <button onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            ))}
        </div>
            <div id="continue-div"><a className="text continue-text" href="/products/all">Continue Shopping</a></div>
            </div>
    )
}

export default ShoppingBag;
