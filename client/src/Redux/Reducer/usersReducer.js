import { GET_USERS_FAILED, GET_USERS_LOADING, GET_USERS_SUCCESS } from "../Actions/types"

const initialState = {
  users: [],
  isLoading: false,
  errors: null
}

const usersReducer = (state = { users: [] } , action) => {
  switch (action.type) {
    case GET_USERS_LOADING:
      return { loading: true }
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload }
    case GET_USERS_FAILED:
      return { loading: false, error: action.payload }
   
    default:
      return state
  }
}
export default usersReducer