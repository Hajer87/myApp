import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getCategories } from '../../Redux/Actions/categoryActions'
import { getIngredients } from '../../Redux/Actions/ingredientActions'
import { getOrders } from '../../Redux/Actions/Orders/order'
import getUsers from '../../Redux/Actions/usersAction'
import Navigation from '../LandingPag.js/navigation'
import AdminNav from './AdminNav/AdminNav'

import Sidebar from './Sidebar'

const Dashboard = () => {
  const dispatch = useDispatch()
  
  const history=useHistory()
  useEffect(() => {
  
   
    dispatch(getCategories())
    dispatch(getIngredients())
    dispatch(getOrders())
    dispatch(getUsers())
   
  }, [dispatch])

  const orders = useSelector(state => state.OrdersReducer.orders)
  console.log(orders)
  localStorage.setItem('orders', JSON.stringify(orders))
  const users=useSelector(state=>state.usersReducer.users)
  localStorage.setItem('users',JSON.stringify(users)   )

  return (
    <div>
    <AdminNav/>
      <Sidebar/>
      

      </div>
  )
}

export default Dashboard 


