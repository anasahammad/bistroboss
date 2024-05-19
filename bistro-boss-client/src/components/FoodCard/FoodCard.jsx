import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({item}) => {
  const axiosSecure = useAxiosSecure()
    const {name, image, recipe, price, _id} = item;
    const {user} = useAuth()
    const navigate = useNavigate()
    const [, refetch] = useCart()
    const handleAddToCart = ()=>{
      if(user && user?.email){
        //ToDo: add to the cart
        const cartItem = {
          menuId: _id,
          email: user?.email,
          name,
          image,
          price
        }
        axiosSecure.post('/carts', cartItem)
        .then(res=>{
          console.log(res.data);
          if(res.data.insertedId){
            alert(`${name} added to the cart`)
            refetch()
            return
          }
        })
      } 
      else{
        
         alert("Please Login first")
        navigate('/login')
        return
      }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="text-white absolute right-4 top-4 px-4  bg-[#111827]">${price}</p>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;