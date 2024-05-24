import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const image_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
const UpdateItem = () => {
    const {name, category, price, _id} = useLoaderData()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const onSubmit = async data => {

      const imageFile =  data.image[0]
      const formData = new FormData()
      formData.append('image', imageFile)

      const res =  await  axiosPublic.post(image_url, formData)
      console.log(res.data);

      if(res.data.success){
        const menuItem = {
          name: data.name,
          price: parseFloat(data.price),
          category: data.category,
          recipe : data.details,
          image: res.data.data.display_url


        }

        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(menuRes.data);

        if(menuRes.data.modifiedCount > 0){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Menu Updated successful",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    };
    return (
        <div>
            <SectionTitle heading="Update Item" subHeading="Refresh"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
       <fieldset className=" p-12 rounded-md bg-[#F3F3F3] ">
			
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full ">
					<label  className="text-sm">Recepie Name</label>
					<input defaultValue={name} name="name" {...register("name", {required: true})} id="name" type="text" placeholder="Recepie Name" className="w-full py-4 px-8 rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 " />
				</div>

                <label className="flex flex-col w-full col-span-full sm:col-span-3">
  <div className="label">
    <span className="label-text">Category</span>
   
  </div>
  <select  {...register("category")} defaultValue={category} className="select select-bordered">
    <option disabled value="default">Category</option>
    <option value="salad">Salad</option>
    <option value="pizza">Pizza</option>
    <option value="soups">Soups</option>
    <option value="desserts">Desserts</option>
    <option value="drinks">Drinks</option>
    
  </select>
 
</label>
				<div className="col-span-full sm:col-span-3">
					<label  className="text-sm">Price*</label>
					<input defaultValue={price} name="price" {...register("price", {required: true})} id="price" type="number" placeholder="Price" className="w-full rounded-md focus:ring py-3 px-8  focus:ring-opacity-75  focus:dark:ring-violet-600 " />
				</div>
				<div className="col-span-full">
					<label  className="text-sm">Recepic Details*</label>
					<textarea name="details" {...register("details", {required: true})}  id="details" rows="6" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 "></textarea>
				</div>
				<div className="col-span-full">
					<input {...register('image')} type="file" />
					
				</div>
                
               
			</div>
		</fieldset>
        <div className="flex justify-center items-center">
                <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">Update Recipe Details </button>
                </div>
      </form>
        </div>
    );
};

export default UpdateItem;