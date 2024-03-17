import { CButton, CCard, CCardBody, CCardGroup, CCardImage, CCardText, CCardTitle, CCarousel, CCarouselItem, CCol, CImage, CRow } from "@coreui/react";
import Header from "../components/header";
import ReactImg from '../assets/react.png';
import './detailproduct.css';
import { useContext, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Link, useLoaderData, useNavigation, } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

export default function DetailProduct() {
  const productData = useLoaderData();

  const { state } = useNavigation();

  // Context
  const data = useContext(CartContext);
  const { cart } = data // Destruct

  const handleButtonClick = () => {
    const arrToStorage = {
      id:productData.id,
      title:productData.title,
      image:productData.image,
      price:productData.price, 
      quantity:1
    };

    data.addToCart(arrToStorage)
  }

  return (
    <>
      <Header />
      <main className="">
        {state === 'loading' ? 'LOADING' : 
        <div className="container mw-90">
          <div className="row gx-5">
            <div className="col-lg-6">
              <div className="image-con">
                <div className="image-container">
                  <img src={productData.image} alt="Product Image" id="product-image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="detail-container">
                <h1>{productData.title}</h1>
                <div className="rating row mt-3">
                  <div className="col-auto">
                    <Rating name="read-only" value={productData.rating.rate} readOnly />
                  </div>
                  <div className="col-auto">
                    <h2>{productData.rating.rate}</h2>
                  </div>
                  <h3>${productData.price}</h3>
                  <div className="row mt-2">
                    <div className="col-auto">
                      <h4>Category :</h4>
                    </div>
                    <div className="col p-0">
                      <h4>{productData.category}</h4>
                    </div>
                  </div>
                  <h4 className="mt-2">About the product</h4>
                  <p>{productData.description}</p>
                </div>
              </div>

              <button type="button" className="btn btn-danger" onClick={handleButtonClick}>Add to cart</button>
            </div>
          </div>
        </div>
}
      </main>
    </>
  )
}

