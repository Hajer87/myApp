import React from "react";
import './UserSearch.css'

const UserSearch = ({search,setSearch}) => {
       const searchHandler=(e)=>{
                                setSearch(e.target.value)
       }  
       const handleSubmit=(e)=>{
        e.preventDefault();
      }              
  return (
    <>
      <form action="" class="search-bar">
<h2>Chercher un utilisateur</h2>
	<input onSubmit={handleSubmit} onChange={searchHandler} type="search" name="search" pattern=".*\S.*"  required/>
	<button class="search-btn" type="submit"> 
		<span>Search</span>
	</button> 
</form>
    </>
  );
};

export default UserSearch;
