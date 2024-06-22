import React from 'react';
import { PRODUCTS } from "../../products";

export const Product = (props) => {
    const {id, productName, price, productImage} = props.data;
    return (
        <div>
        {
            productName
        }
        </div>
    );
};
