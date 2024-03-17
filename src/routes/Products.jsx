import { CButton, CCard, CCardBody, CCardGroup, CCardImage, CCardText, CCardTitle, CCarousel, CCarouselItem, CCol, CImage, CRow } from "@coreui/react";
import Header from "../components/header";
import ReactImg from '../assets/react.png';
import './products.css';
import { useContext, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Context
  const data = useContext(CartContext)

  const fetchProducts = async () => {
    try {
      const fetchAPI = await fetch('https://fakestoreapi.com/products');
      const result = await fetchAPI.json()
      console.log('Result:', result);
      setProducts(result)
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const btnHandleClick = (id) => {
    const findIdx = products.findIndex((element) => element.id === id)
    const arrToStorage = {
     id: products[findIdx].id,
     title: products[findIdx].title,
     image: products[findIdx].image,
     price: products[findIdx].price,
     quantity: 1
    }

    data.addToCart(arrToStorage)
  }


  return (
    <>
      <Header />

      <main id="mainProducts">
        <CCarousel controls indicators dark className="carousel h-100">
          <CCarouselItem>
            <CImage className='d-block w-100 carousel-img' src={ReactImg} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className='d-block w-100 carousel-img' src={ReactImg} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className='d-block w-100 carousel-img' src={ReactImg} alt="slide 3" />
          </CCarouselItem>
        </CCarousel>

        <h2 id="list-product-text">LIST PRODUCT</h2>

        <div className="ListProduct">
          <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 g-4">
            {isLoading ? "Loading" : products.map((data) => (
              <div className="" key={data.id}>
                <div className="card h-100">
                  <Link to={`/products/${data.id}`}><img src={data.image} className="card-img-top" /></Link>
                  <div className="card-body">
                    <div className="card-title-container">
                      <h3 ><Link className="card-title" to={`/products/${data.id}`}>{data.title}</Link></h3>
                    </div>
                    <div className="card-text-container">
                      <p className="card-text">{data.description}</p>
                    </div>
                    <div className="card-details">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><Rating size="small" name="read-only" value={data.rating.rate} readOnly/></li>
                        <li className="list-group-item">${data.price}</li>
                      </ul>
                      <div className="btn-add-cart">
                        <button type="button" className="btn btn-primary lg-2" onClick={() => btnHandleClick(data.id)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}