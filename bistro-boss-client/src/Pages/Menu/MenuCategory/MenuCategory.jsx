import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({items, img, title, text}) => {
    return (
        <div className="pt-8">
            {title && <Cover title={title} text={text} img={img}></Cover> }
               
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
            {
                items?.map(item=> <MenuItem item={item} key={item._id}></MenuItem>)
            }
           </div>
           <Link to={`/order/${title}`} className="flex justify-center">
           <button className="btn btn-outline border-0 border-b-4 mt-4">ORDER YOUR FAVOURITE FOOD</button>
           </Link>
          
        </div>
    );
};

export default MenuCategory;