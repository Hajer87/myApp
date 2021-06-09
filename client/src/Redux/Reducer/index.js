import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import categoryReducer from './categoryReducer'
import ingredientReducer from './ingredientReducer'
import contentReducer from '../Reducer/order/contentReducer'
import orderReducer from '../Reducer/order/orderReducer'
import OrdersReducer from '../Reducer/order/OrdersReducer'


import commandeReducer from '../Reducer/order/commandeRducer'
import usersReducer from './usersReducer'





export default combineReducers({
AuthReducer, 
categoryReducer, 
ingredientReducer, 
contentReducer, 
orderReducer,
OrdersReducer, 
commandeReducer, 
usersReducer })