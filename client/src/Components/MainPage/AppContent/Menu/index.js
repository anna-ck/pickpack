import React, {useState} from 'react';
import {SearchMenu} from './SearchMenu';
import {BurgerMenu} from './BurgerMenu';

function Menu (props, ref) {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 760;
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return width > breakpoint ? <SearchMenu ref={ref} handleChoice={props.handleChoice}/> : <BurgerMenu ref={ref} handleChoice={props.handleChoice}/>;
};

export default React.forwardRef(Menu);