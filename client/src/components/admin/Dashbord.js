import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories } from '../../Redux/Actions/categoryActions'
import { getIngredients } from '../../Redux/Actions/ingredientActions'
import { getOrders } from '../../Redux/Actions/Orders/order'
import getUsers from '../../Redux/Actions/usersAction'
import Navigation from '../LandingPag.js/navigation'
import Categories from './Categories'
import Commandes from './Commandes'
import Sidebar from './Sidebar'

const Dashboard = () => {
  const dispatch = useDispatch()
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
      <Navigation/>
      <Sidebar/>
      

      </div>
  )
}

export default Dashboard 


