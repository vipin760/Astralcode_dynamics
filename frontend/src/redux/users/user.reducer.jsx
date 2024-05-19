import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./user.constants";


export const UserReducer =(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {
                loading:false,
                userData:action.payload,
                ...state,
            }
        case USER_REGISTER_FAIL:
            return {
                loading:false,
                error:action.payload,
                ...state,
            }
        case USER_LOGIN_REQUEST:
            return {
                loading:true
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading:false,
                userData:action.payload
            }
        case USER_LOGIN_FAIL:
            return { loading:false,
                userData:action.payload
            }

        default:
            return state
    }
}