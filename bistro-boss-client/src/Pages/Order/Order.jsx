import Cover from "../Shared/Cover/Cover";
import orderBg from "../../assets/asset/shop/banner2.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    const initalIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initalIndex);
    const [menu] = useMenu()
    
  
    const desserts = menu?.filter(item=>item.category === 'dessert');
    const soup = menu?.filter(item=>item.category === 'soup');
    const salad = menu?.filter(item=>item.category === 'salad');
    const pizza = menu?.filter(item=>item.category === 'pizza');
    const drinks = menu?.filter(item=>item.category === 'drinks');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover title={"Order Now"} text={"Would you like to try a dish?"} img={orderBg}></Cover>

<div className="flex justify-center items-center">
<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

                
<TabList>
  <Tab>Salad</Tab>
  <Tab>Pizza</Tab>
  <Tab>Soups</Tab>
  <Tab>Desserts</Tab>
  <Tab>Drinks</Tab>
</TabList>
<TabPanel>
    <div className="grid md:grid-cols-3 gap-10">
        {
            salad.map(item=> <FoodCard key={item._id} item={item}>

            </FoodCard>)
        }
    </div>
</TabPanel>
<TabPanel>
<div className="grid md:grid-cols-3 gap-10">
        {
            pizza.map(item=> <FoodCard key={item._id} item={item}>

            </FoodCard>)
        }
    </div>
</TabPanel>
<TabPanel>
<div className="grid md:grid-cols-3 gap-10">
        {
            soup.map(item=> <FoodCard key={item._id} item={item}>

            </FoodCard>)
        }
    </div>
</TabPanel>
<TabPanel>
<div className="grid md:grid-cols-3 gap-10">
        {
            desserts.map(item=> <FoodCard key={item._id} item={item}>

            </FoodCard>)
        }
    </div>
</TabPanel>
<TabPanel>
<div className="grid md:grid-cols-3 gap-10">
        {
            drinks.map(item=> <FoodCard key={item._id} item={item}>

            </FoodCard>)
        }
    </div>
</TabPanel>
</Tabs>
</div>
           
        </div>
    );
};

export default Order;