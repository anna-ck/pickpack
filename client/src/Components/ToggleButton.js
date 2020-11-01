import React from 'react';
import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../theme/Colors';
import { changeTheme } from '../actions';
import {getTheme} from '../reducers';
import {useDispatch, useSelector} from 'react-redux'

const ButtonWrapper = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 3rem;
    width: 65px;
    height: 28px;
    border: 1.5px solid ${AppBlue};
    border-radius: 14px;
    transition: all 0.5s ease-in-out;
    display:flex;
    align-items: center;

    @media (max-width: 690px) {
      right: 1rem;
      top: 1rem;
  };

    @media print {
      display: none;
      visibility:hidden
   }
`;

const DayIcon = styled.i`
    &:before {
      visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
      padding: 0px 4px 0px 4px;
      font-size: 1.4rem;
      color: ${AppSalmon};
    }
`;

const NightIcon=styled.i`
    &:before {
      visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
      padding: 0px 4px 0px 4px;
      font-size: 1.4rem;
      color: white;
    }
`;


function ToggleButton() {

  const dispatch = useDispatch()
  const theme = useSelector(getTheme)

    return (
        <ButtonWrapper onClick={() => dispatch(changeTheme())}>
          <DayIcon active={theme === 'light'} className="fas fa-sun" samesite='none'/>
          <NightIcon active={theme !== 'light'} className="fas fa-moon"/>
        </ButtonWrapper>
    )
}

export default ToggleButton