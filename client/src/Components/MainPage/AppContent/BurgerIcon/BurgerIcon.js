import React from 'react';
import {useSelector} from 'react-redux'
import {isBurgerActive} from '../../../../reducers';

import {Icon, IconContainer} from './BurgerIconStyles'

function BurgerIcon (props, ref) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const active = !(useSelector(isBurgerActive))
    const breakpoint = 760;

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const handleClick = () => {
        props.onClick()
    }

    return (
        <IconContainer>
            <Icon active={active} isVisible={width <= breakpoint} ref={ref} className="fas fa-list" onClick={handleClick}></Icon>
            <Icon active={!active} isVisible={width <= breakpoint} ref={ref} className="fas fa-arrow-left" onClick={handleClick}></Icon>
        </IconContainer>
    )
}

export default React.forwardRef(BurgerIcon);