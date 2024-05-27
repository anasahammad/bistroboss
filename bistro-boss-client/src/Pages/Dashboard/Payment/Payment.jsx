import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle subHeading="Pay to eat" heading="Payment"></SectionTitle>

            <div>
                <Elements stripe={stripePromise}>

            <CheckOutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;