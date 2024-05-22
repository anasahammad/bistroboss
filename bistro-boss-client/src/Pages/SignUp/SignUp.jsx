import axios from 'axios';
import authenticationImg from '../../assets/asset/others/authentication2.png'
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/social/SocialLogin';
const SignUp = () => {
const {createUser, updateUser} = useAuth()
const navigate = useNavigate()
const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm()
  

  const onSubmit = async (data) => {
    const image = data.photo[0]
    const formData = new FormData()
    formData.append('image', image)

    try{
     const response =  await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, formData)
      
     const photo = response.data.data.display_url;
     console.log(photo);
     
      const result = await createUser(data.email, data.password)
      console.log(result);

      await updateUser(data.name, photo)
      const userInfo = {
        name: data.name,
        email: data.email
      }
      axiosPublic.post('/users', userInfo)
      .then(res=>{
        if(res.data.insertedId){
          console.log('user added to the db');
          navigate('/')
        }
      })
    
    }
    catch (err){
      console.log(err);
    }
    
  

   
  }
    return (
        <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <img  className="w-[600px] h-[400px]" src={authenticationImg} alt="" />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name", { required: true })} type="text" name="name" placeholder="Name" className="input input-bordered"  />
          {errors.name && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email", { required: true })} type="email" name="email" placeholder="email" className="input input-bordered"  />
          {errors.email && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register("password", { required: true, minLength: 6,  maxLength: 20 })} type="password" name="password" placeholder="password" className="input input-bordered"  />
          {errors.password && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input  {...register("photo", { required: true })} type="file" name="photo" placeholder="Upload" className="input input-bordered"  />
          {errors.photo && <span className='text-red-600'>This field is required</span>}
        </div>
       
        <div className="form-control mt-6">
          <button  className="btn bg-[#d1a054b3] text-white">Sign Up</button>
        </div>
      </form>
      <SocialLogin text={`Already have an accout? please `} anchor={'Login'} to="/login"/>
    </div>
   
  </div>

</div>
    );
};

export default SignUp;