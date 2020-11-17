import React from 'react';
import SearchResults from './SearchResults/SearchResults';
import BurgerResults from './BurgerResults/BurgerResults';

function Results (props, ref) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 760;
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return width > breakpoint ? <SearchResults ref={ref} onCheck={props.onCheck} /> : <BurgerResults ref={ref} openBurger={props.openBurger} onCheck={props.onCheck}/>;
}

export default React.forwardRef(Results);