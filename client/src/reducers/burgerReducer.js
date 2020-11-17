export default function burgerReducer(state = true, action) {
    switch (action.type) {
        case 'BURGER_UPDATE': {
            const newBurgerState = !state;
            return newBurgerState;
        }

        case "INITIALSTATE_SET": {
            return true
        }

        default:
            return state;
    }
}

export const isBurgerActive = (state) => {
    return state
}
