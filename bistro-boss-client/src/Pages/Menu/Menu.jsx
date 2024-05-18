import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import bgImage from '../../assets/asset/menu/banner3.jpg'
import pizzaImage from '../../assets/asset/menu/pizza-bg.jpg'
import saladImage from '../../assets/asset/menu/salad-bg.jpg'
import soupImage from '../../assets/asset/menu/soup-bg.jpg'
import dessertImage from '../../assets/asset/menu/dessert-bg.jpeg'
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu()
    const desserts = menu?.filter(item=>item.category === 'dessert');
    const soup = menu?.filter(item=>item.category === 'soup');
    const salad = menu?.filter(item=>item.category === 'salad');
    const pizza = menu?.filter(item=>item.category === 'pizza');
    const offered = menu?.filter(item=>item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
          <Cover title={"OUR MENU"} text={"Would you like to try a dish?"} img={bgImage}></Cover>
          <SectionTitle subHeading={"Don't mis"} heading={"TODAY'S OFFER"}></SectionTitle>
          {/* Offerd */}
          <MenuCategory items={offered}></MenuCategory>
          {/* dessert */}
          <MenuCategory  title={"desserts"} img={dessertImage} text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} items={desserts}>

          </MenuCategory>
          {/* pizza */}
          <MenuCategory  title={"pizza"} img={pizzaImage} text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} items={pizza}>

          </MenuCategory>
          {/* salad */}
          <MenuCategory  title={"salad"} img={saladImage} text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} items={salad}>

          </MenuCategory>
          {/* soup */}
          <MenuCategory  title={"soup"} img={soupImage} text={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} items={soup}>

          </MenuCategory>
        </div>
    );
};

export default Menu;