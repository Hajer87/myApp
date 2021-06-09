import { ADD_TO_BOL_SUCESS, DELETE_FROM_BOL, RESET_BOL } from '../types'

export const addToBol = (payload) => {
  return {
    type: ADD_TO_BOL_SUCESS,
  payload}}

export const deleteFromBol = (payload) => {
  return {
    type: DELETE_FROM_BOL,
    payload
}
}
export const resetBol=(payload)=>{
  return {
    type: RESET_BOL,
    payload
  }
}
