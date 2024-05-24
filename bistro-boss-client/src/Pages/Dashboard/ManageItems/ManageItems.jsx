import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, refetch] =  useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDelete = item =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if(res.data.deletedCount > 0){
                    refetch()

                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title:`${item.name} has been deleted!`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            //   Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            //   });
            }
          });
    }
    return (
        <div>
            <SectionTitle heading="Manage All Items" subHeading="Hurry Up"></SectionTitle>

            <div className="">
            <h2 className="text-4xl ">Total Items: {menu.length} </h2>
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
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        menu.map((item, idx)=> <tr key={item._id}>
            <th>
              {idx + 1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask  w-12 h-12">
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
              <Link to={`/dashboard/updateItem/${item._id}`}>
              <button  className="btn  btn-xs"><FaEdit className="text-red-700"/></button>
              </Link>
            </th>
            <th>
              <button onClick={()=>handleDelete(item)} className="btn  btn-xs"><FaTrash className="text-red-700"/></button>
            </th>
          </tr>)
      }
      
     
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default ManageItems;