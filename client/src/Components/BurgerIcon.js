import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div``;

const Icon = styled.i`
    padding: 1rem;
    color: ${({ theme }) => theme.span};
    position: relative;
    top: 3rem;
    z-index: 20;
    display: ${({ active, isVisible }) => (isVisible && active ? "block" : "none")};
    width: 45%;
    margin: 0 auto;

    @media (max-width: 550px) {
        width: 65%;
    }
`;

function BurgerIcon (props, ref) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [active, setActive] = React.useState(!props.burgerIsActive);
    const breakpoint = 760;

    React.useEffect(() => {setActive(active => !active);}, [props.burgerIsActive]);

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