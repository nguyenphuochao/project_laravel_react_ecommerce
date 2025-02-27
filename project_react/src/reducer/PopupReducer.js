
const init = { popup_type: '' }
const PopupReducer = (state = init, action) => {
    switch (action.type) {
        case "POPUP_CART":
            return { popup_type: "POPUP_CART" }

        case "POPUP_CLOSE" :
            return { popup_type: "POPUP_CLOSE" }

        default:
            return state;
    }
}

export default PopupReducer;