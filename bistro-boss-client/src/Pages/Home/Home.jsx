import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Featured from "./Featured/Featured";
import PopularMenue from "./PopularMenue/PopularMenue";
import Testimonials from "./Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
           <Banner/>
           <Categories/>
           <PopularMenue/>
           <Featured/>
           <Testimonials/>
        </div>
    );
};

export default Home;