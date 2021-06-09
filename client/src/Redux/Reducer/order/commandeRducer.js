import { ADD_COMMANDE, ADD_DETAILS,DELETE_COMMANDE, GET_ALL_COMMANDES, GET_COMMANDE, GET_SHIPPING_PRICE_FAILED, GET_SHIPPING_PRICE_SUCESS, LIVRAISON, LOCALISATION, RESET_COMMANDE, TOTAL, UPDATE_COMMANDE } from "../../Actions/types"


const initialState={
                          
commandes:[],
date:null,
heure:null,
tel:null,
address: null,
livraison: null,
total:0,



}



const commandeReducer =(state=initialState, action)=>{
switch (action.type){
case ADD_COMMANDE: 
return {... state,  commandes:[...state.commandes, action.payload]}
case UPDATE_COMMANDE:
  return {...state, commandes:action.payload}
case GET_COMMANDE:
  return action.payload
case DELETE_COMMANDE: 
return  {...state, commandes: state.commandes.filter((commande)=>{return state.commandes.indexOf(commande)!==action.payload}) }
case RESET_COMMANDE:
return initialState 

case ADD_DETAILS:
return{...state, livraison: action.payload.livraison, date:action.payload.date, heure:action.payload.heure, total:action.payload.total, tel:action.payload.tel, status: "ordered"}
 case LIVRAISON:
return {...state, livraison:action.payload}
case TOTAL:
  return {...state, total: action.payload}
case LOCALISATION: 
return{...state, address: action.payload} 
case GET_SHIPPING_PRICE_SUCESS:
  return{...state, shipping:action.payload}
case GET_SHIPPING_PRICE_FAILED:
  return{...state, errors: action.payload}
default: 
return state
 }
   }
export default commandeReducer