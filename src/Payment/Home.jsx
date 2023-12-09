import React, { useState, useEffect } from "react";
// import "./App.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="http://localhost-4000/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

export default Home







// import axios from 'axios';
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import api from '../utills/api';

// const Home = () => {

//     const navigate = useNavigate();

//     const itemName = "Shirt"
//     const itemPrice = 50
//     const [ quantity, setQuantity ] = useState(1)
//     const [ finalAmount, setFinalAmount ] = useState(itemPrice)


//     const decrement = () =>{
//         if(quantity <= 1){
//             setQuantity(1)
//             setFinalAmount(itemPrice)
//         }else if( quantity > 1 ){
//             setQuantity(quantity-1)
//             setFinalAmount(finalAmount - itemPrice)
//         }
//     }

//     const increment = () =>{
//         setQuantity(quantity + 1)
//         setFinalAmount( finalAmount + itemPrice )
//     }


//     const checkOut = async () =>{

//             await api.post('create-checkout-session',{ items : [ { id:1, quantity, price : itemPrice, name : itemName } ] })
//             .then((res)=> window.location = res.id )
//             .catch((err)=> console.log(err) )
//     }

//   return (
//     <div>
//       <button className='bg-blue-600 w-24 h-16' onClick={checkOut} >Pay</button>
//     </div>
//   )
// }

// export default Home