import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../Redux/Actions/ProfilesActions";

const Profile = () => {
  const profile = useSelector((state) => state.ProfileReducer);
  const dispatch = useDispatch();
  useEffect(() => {
  
    dispatch((getProfile()));
  }, [ dispatch]);
  return (
    <div>
      <h1>my profile</h1>
    {(profile) ? <h2>{profile}</h2>: "no profile"}
    </div>
  );
};

export default Profile;
