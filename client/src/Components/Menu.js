import React from 'react';
import SearchMenu from '../Components/SearchMenu';
import BurgerMenu from '../Components/BurgerMenu';

function Menu (props, ref) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 690;
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return width > breakpoint ? <SearchMenu ref={ref} currentList={props.currentList} handleChoice={props.handleChoice}/> : <BurgerMenu ref={ref} currentList={props.currentList} handleChoice={props.handleChoice}/>;
};

export default React.forwardRef(Menu);