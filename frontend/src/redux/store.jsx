import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { thunk } from 'redux-thunk'
import { UserReducer } from './users/user.reducer'
import { TaskReducer } from './tasks/task.reducer'
const reducer = combineReducers({
 userDetails:UserReducer,
 TaskDetails:TaskReducer
})

const initialState = {}
const middleware = [thunk]

const store = createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
)

export default store;