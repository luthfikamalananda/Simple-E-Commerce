import { createContext, useState } from "react";

export const CartContext = createContext()

export default function CartProvider({children}) {
    const [cart, setCart] = useState    (() => {
        const data = localStorage.getItem('cart');
        if(!data) return [];
        return JSON.parse(data);
      });

    const addToCart = (obj) => {
        const found = cart.findIndex(element => element.id === obj.id)
        console.log(found);
        if (found > -1 ) {
          const newArr = cart.map((data, index) => {
            if (found === index) {
              return {
                ...data,
                quantity: data.quantity + 1
              }
            }
            return data;
          })
          setCart(newArr);
          localStorage.setItem('cart',JSON.stringify(newArr));
        } else {
          const newArr = [...cart,obj] 
          localStorage.setItem('cart',JSON.stringify(newArr));
          setCart(newArr)
        }
    }

    const removeFromCart = (id) => {
        const found = cart.findIndex(element => element.id === id)
        const newArr = [...cart]
        newArr.splice(found,1)
        setCart(newArr)
        localStorage.setItem('cart',JSON.stringify(newArr))
    }

    const addQuantityCart = (id) => {
      const found = cart.findIndex(element => element.id === id)
      console.log(found);
      if (found > -1 ) {
        const newArr = cart.map((data, index) => {
          if (found === index) {
            return {
              ...data,
              quantity: data.quantity + 1
            }
          }
          return data;
        })
        setCart(newArr);
        localStorage.setItem('cart',JSON.stringify(newArr));
      }
  }

  const subtractQuantityCart = (id) => {
    const found = cart.findIndex(element => element.id === id)
    console.log(found);
    if (found > -1 ) {
      const newArr = cart.map((data, index) => {
        if (found === index) {
          return {
            ...data,
            quantity: data.quantity - 1
          }
        }
        return data;
      })
      setCart(newArr);
      localStorage.setItem('cart',JSON.stringify(newArr));
    }
}

    const value = {
        cart,
        addToCart,
        removeFromCart,
        addQuantityCart,
        subtractQuantityCart
    };
    
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
