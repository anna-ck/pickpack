import React from 'react';
import SearchResults from '../Components/SearchResults';
import BurgerResults from '../Components/BurgerResults';

function Results (props, ref) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 690;
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return width > breakpoint ? <SearchResults ref={ref} currentList={props.currentList} searchResults={props.searchResults} pickedItems={props.pickedItems} onCheck={props.onCheck} /> : <BurgerResults ref={ref} openBurger={props.openBurger} currentList={props.currentList} searchResults={props.searchResults} pickedItems={props.pickedItems} onCheck={props.onCheck}/>;
}

export default React.forwardRef(Results);