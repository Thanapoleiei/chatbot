import { combineReducers } from 'redux'

const initial = { CurrentUser: null }
const Reducer = (state = initial, action) => {
    switch (action.type) {
        case "T":
            return {
                ...state,
                CurrentUser: action.payload
            }
        case "L":
            return {
                ...state,
                CurrentUser: null
            }
        default: return state
    }
}

export default combineReducers({ Reducer })