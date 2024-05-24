import { FaTrash, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async ()=>{
            const res = await axiosSecure('/users')
            return res.data;
        }
    })

    //make admin
    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <SectionTitle subHeading={"How many??"} heading={"MANAGE ALL USERS"}></SectionTitle>

            <div className="">
            <h2 className="text-4xl ">Total users: {users.length} </h2>
            </div>

            <div className="overflow-x-auto">
  <table className="table my-4">
    {/* head */}
    <thead className="bg-orange-400 text-white uppercase ">
      <tr>
        <th>
            #
        </th>
        <th>Name</th>
        <th>EMail</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {
        users?.map((user, idx)=> <tr key={user._id}>
            <th>
            <td>{idx + 1}</td>
            </th>
            <td>
              
                
                  
                    <h1>{user.name}</h1>
                  
                
               
             
            </td>
            <td>
             
             <h1>{user.email}</h1>
            </td>
            <td> {user.role === 'admin' ? 'Admin' : <button onClick={()=>handleMakeAdmin(user)}  className="btn  btn-lg"><FaUsers className="bg-orange-400 text-white"/></button>}
           
            </td>
            <th>
              <button onClick={()=>handleDeleteUser(user)}  className="btn  btn-lg"><FaTrash className="text-red-700 text-2xl"/></button>
            </th>
          </tr>)
    }
      
      
     
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default AllUsers;