import { useState, useEffect } from "react";
import { Header } from "./LandingPag.js/header";

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import CategoryList from "./products/CategoryList";
import IngredientsList from "./products/IngredientsList";
import MesBols from "./order/MesBols";
import Panier from "./order/Panier";
import Team from './LandingPag.js/Team'
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../Redux/Actions/AuthActions";
import Loading from "./Loading";
import { Button } from "@material-ui/core";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [panier, setPanier] = useState({
    content: [],
    status: false,
  });
  const dispatch = useDispatch();
const auth=useSelector(state=>state.AuthReducer)
  
  useEffect(() => {
    
       setLandingPageData(JsonData); 
       dispatch(load_user()) 


    
  }, []);

  

  const myBol = useSelector((state) => state.contentReducer.content);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [data, setData] = useState(null);
  const [showCart, setShowCart] = useState(false);
  
  return (
    <div>
      
      <Header data={landingPageData.Header} />
      <CategoryList
        setData={setData}
        setOpen={setOpen}
        open={open}
        data={data}
      />
      
      {open ? (
        <>
          <IngredientsList
            setOpen={setOpen}
            open={open}
            category={data}
            cart={cart}
            setCart={setCart}
          />
        </>
      ) : null}
      {cart && myBol.length !== 0 ? (
        <MesBols
          setShowCart={setShowCart}
          setCart={setCart}
          setOpen={setOpen}
          open={open}
          panier={panier}
          setPanier={setPanier}
        />
      ) : null}
      {showCart ?
      <Panier setShowCart={setShowCart}/>
    : null}
     
      <Team data={landingPageData.Team} /> 
      
    </div>
  );
};

export default App;
