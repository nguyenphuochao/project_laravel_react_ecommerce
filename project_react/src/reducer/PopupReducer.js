
const init = { popup_type: '' }
const PopupReducer = (state = init, action) => {
    switch (action.type) {
        case "POPUP_CART":
            return { popup_type: "POPUP_CART" }

        case "POPUP_LOGIN":
            return { popup_type: "POPUP_LOGIN" }

        case "POPUP_REGISTER":
            return { popup_type: "POPUP_REGISTER" }

        case "POPUP_FORGOT_PASSWORD":
            return { popup_type: "POPUP_FORGOT_PASSWORD" }

        case "POPUP_CLOSE":
            return { popup_type: "POPUP_CLOSE" }

        default:
            return state;
    }
}

export default PopupReducer;