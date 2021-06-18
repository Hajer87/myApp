import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { load_user } from "../Redux/Actions/AuthActions";
import { getIngredients } from "../Redux/Actions/ingredientActions";
import { getOrders } from "../Redux/Actions/Orders/order";
import Navigation from "./LandingPag.js/navigation";
import UserCard from "./UserCard";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_user());
    dispatch(getOrders())
    dispatch(getIngredients())
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Navigation />
      <UserCard user={user} />
    </div>
  );
};

export default Profile;
