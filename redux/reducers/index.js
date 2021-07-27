import { combineReducers } from "redux";

import { user } from './users'
import { restaurant } from './restaurant'

const Reducers = combineReducers({
    userState: user,
    restaurantState: restaurant,
})

export default Reducers