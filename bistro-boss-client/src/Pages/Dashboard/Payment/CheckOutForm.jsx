import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const CheckOutForm = () => {
const stripe = useStripe()
const elements = useElements()
const [cart, refetch] = useCart()
const totalPrice = cart.reduce((total, item)=> total + item.price, 0)
const [error, setError] = useState('')
const [transaction, setTransaction] = useState('')
const axiosSecure = useAxiosSecure()
const [clientSecret, setClientSecret] = useState(null)
const {user} = useAuth()


useEffect(() => {
    
       if(totalPrice > 0) {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
       }
    

}, [axiosSecure, totalPrice])



    const handleSubmit = async (event)=>{
        event.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log("Payment error", error);
            setError(error.message)
        }
        else{
            console.log("Payment method", paymentMethod);
            setError('')
        }

        //confirm paymentIntent
        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card : card,
                billing_details : {
                    email : user?.email || 'anonymous',
                    name : user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log("confirm error occured");
        }
        else{
            console.log("paymentinten", paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                // console.log(paymentIntent.id);
                setTransaction(paymentIntent.id)

                //now save the payment on the database
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId : paymentIntent.id,
                    date : new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds : cart.map(item => item.menuId),
                    status : 'pending'
                }

                
                const res = await axiosSecure.post('/payments', payment)
                    console.log(res.data);
                    refetch()
                    if(res.data.paymentResult.insertedId){
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Payment Successful",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                
            }
        }

    }
    return (
        <div>
           <form onSubmit={handleSubmit}>
           <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn bg-orange-400 text-white my-6" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transaction && <p className="text-green-600">Your transaction Id is: {transaction}</p>}
            </form> 
        </div>
    );
};

export default CheckOutForm;