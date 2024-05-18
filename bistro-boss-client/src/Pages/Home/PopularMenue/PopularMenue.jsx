import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenue = () => {
const [menu] = useMenu()
const popular = menu?.filter(item=>item.category === 'popular');
       
    return (
        <section>
            
           <SectionTitle subHeading={"Check it out"} heading={"FROM OUR MENU"}/> 
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {
                popular?.map(item=> <MenuItem item={item} key={item._id}></MenuItem>)
            }
           </div>
        </section>
    );
};

export default PopularMenue;