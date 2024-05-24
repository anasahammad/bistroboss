import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useMenu = () => {
    // const [menu, setMenu] = useState([])
    const axiosPublic = useAxiosPublic()
    // const [loading, setLoading] = useState(true)
    // useEffect(()=>{
    //     fetch('http://localhost:5000/menu')
    //     .then(res=> res.json())
    //     .then(data => {
    //         setMenu(data)
    //         setLoading(false)
    //     })
        
    // }, [])
    const {data: menu = [], refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/menu')
            return res.data
        }
    })
    return [menu, refetch] 
};

export default useMenu;