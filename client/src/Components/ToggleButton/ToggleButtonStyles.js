import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../../theme/Colors';

export const ButtonWrapper = styled.div`
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

export const DayIcon = styled.i`
    &:before {
      visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
      padding: 0px 4px 0px 4px;
      font-size: 1.4rem;
      color: ${AppSalmon};
    }
`;

export const NightIcon=styled.i`
    &:before {
      visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
      padding: 0px 4px 0px 4px;
      font-size: 1.4rem;
      color: white;
    }
`;