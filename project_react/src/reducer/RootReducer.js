import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import PopupReducer from "./PopupReducer";

const RootReducer = combineReducers(
    // object
    {
        PopupReducer: PopupReducer,
        AuthReducer: AuthReducer,
        CartReducer: CartReducer
    }
);

export default RootReducer;