import Header from "../components/header";
import ReactImg from '../assets/react.png';
import './products.css';
import { Fragment, useContext, useEffect, useState } from "react";
import { Alert, Rating, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";

export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Snackbar
  const handleClose = () => {
    setOpen(false);
  };

  // Context
  const data = useContext(CartContext)
  const auth = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.checkLogin() === false) {
      navigate('/')
    }
    console.log(auth.checkLogin());

    fetchProducts();
  }, [])

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
    setOpen(true)
  }


  return (
    <>
      <Header />

      <main id="mainProducts">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={ReactImg} className="d-block w-100 carousel-img " alt="..." />
            </div>
            <div className="carousel-item">
              <img src={ReactImg} className="d-block w-100 carousel-img" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={ReactImg} className="d-block w-100 carousel-img" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> 

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
                        <li className="list-group-item"><Rating size="small" name="read-only" value={data.rating.rate} readOnly /></li>
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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success">Added to Cart</Alert>
        </Snackbar>
      </main>
      <footer></footer>
    </>
  );
}