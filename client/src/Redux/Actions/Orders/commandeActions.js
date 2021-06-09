import { ADD_COMMANDE, ADD_DETAILS,DELETE_COMMANDE, GET_SHIPPING_PRICE_SUCESS,GET_SHIPPING_PRICE_FAILED, LIVRAISON, LOCALISATION, RESET_COMMANDE, TOTAL, GET_COMMANDE, GET_ALL_COMMANDES, UPDATE_COMMANDE } from '../types'
import axios from 'axios'
export const addCommande = (payload) => {
  localStorage.setItem('commandes', JSON.stringify(payload))

  return {
  type: ADD_COMMANDE,
  payload
}}
 export const updateCommande =(payload)=>{
   return{
     type: UPDATE_COMMANDE,
     payload
   }
 }
export const getCommande=(payload)=>{
  return{
    type:GET_COMMANDE,
    payload
  }
}

export const deleteCommande = (payload) => {
  return {
    type: DELETE_COMMANDE,
  payload}
}
export const resetCommande = (payload) => {
  return {
    type: RESET_COMMANDE,
  payload}
}
export const addDetails=(payload)=>{
  return{
    type: ADD_DETAILS,
    payload
  }
}
 export const addModeDeLivraison=(payload)=>{
return{
type:LIVRAISON,
payload
}
}

export const addAddress=(payload)=>{
return{
type: LOCALISATION,
payload
}                         
}
export const addTotal=(payload)=>{
  return{
    type:TOTAL,
    payload
  }
} 


export const getShippingPrice=()=>async dispatch=>{
  try{
    const response= await axios.get('http://localhost:5000/shipping')
    dispatch({
  type: GET_SHIPPING_PRICE_SUCESS,
  payload: response.data[0].prixUnitaire
    })
  
}catch(err){
  dispatch({
  type: GET_SHIPPING_PRICE_FAILED,
  payload: err.response.data.errors,
  })
}
}
