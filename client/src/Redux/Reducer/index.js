import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import categoryReducer from './categoryReducer'
import catReducer from './catReducer'

import ingredientReducer from './ingredientReducer'
import contentReducer from '../Reducer/order/contentReducer'
import orderReducer from '../Reducer/order/orderReducer'
import OrdersReducer from '../Reducer/order/OrdersReducer'
import orderUpdateReducer from '../Reducer/order/orderUodateReducer'
import commandeReducer from '../Reducer/order/commandeRducer'
import usersReducer from './usersReducer'
import findOrderReducer from './order/FindOrderReducer'




export default combineReducers({
AuthReducer, 
categoryReducer, 
catReducer,
ingredientReducer,
contentReducer, 
orderReducer,
OrdersReducer, 
findOrderReducer,
orderUpdateReducer,
commandeReducer, 
usersReducer })