import { MdDelete } from "react-icons/md";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const Cart = () => {
    const [carts, refetch] = useCart()
    const totalPrice = carts.reduce((total, item)=> total + item.price, 0)
    const axiosSecure = useAxiosSecure()
   
    const handleDelete = id =>{
        axiosSecure.delete(`/carts/${id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.deletedCount > 0){
                refetch()
            }
        })
    }
    return (
        <div>
            <SectionTitle subHeading={"My Cart"} heading={"Wanna Add More"}></SectionTitle>

            <div className="flex justify-evenly">
                <h2 className="text-4xl ">Items: {carts.length}</h2>
                <h2 className="text-4xl ">Total Price: ${totalPrice}</h2>
                {
                  carts.length ? <Link to="/dashboard/payment">
                 <button className="btn bg-orange-400 text-white">Pay</button>
                  </Link> :  <button disabled className="btn bg-orange-400 text-white">Pay</button>
                }
            </div>

            <div className="overflow-x-auto">
  <table className="table my-4">
    {/* head */}
    <thead className="bg-orange-400 text-white uppercase ">
      <tr>
        <th>
            #
        </th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        carts.map((item, idx)=> <tr key={item._id}>
            <th>
              {idx + 1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} />
                  </div>
                </div>
               
              </div>
            </td>
            <td>
             
             <h1>{item.name}</h1>
            </td>
            <td>${item.price}</td>
            <th>
              <button onClick={()=>handleDelete(item._id)} className="btn  btn-xs"><FaTrash className="text-red-700"/></button>
            </th>
          </tr>)
      }
      
     
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default Cart;