export default function themeReducer (state = 'light', action) {
    switch (action.type) {
        case "THEME_CHANGE": {
            const previousTheme = state
            let theme = ''
            if (previousTheme === 'light') {
                theme = 'dark'
            }
            else {
                theme = 'light'
            }
            return theme
        }

        case "INITIALSTATE_SET": {
            return 'light'
        }

        default:
            return state
    }
}