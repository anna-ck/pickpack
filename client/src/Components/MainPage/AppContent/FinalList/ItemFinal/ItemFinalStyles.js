import styled from 'styled-components';
import { AppSalmon } from '../../../../../theme/Colors';

export const RowWrapper = styled.thead``;

export const Item = styled.tr`
    padding: 0rem 0.1rem 0rem 0.1rem;
    height: 35px;
    display:flex;
    justify-content:space-between;
    align-items:center;

    @media (max-width: 600px) {
      font-size: 0.9rem;
  }
`;

export const TdSmall = styled.td`
    text-align: left;
    width: 5%;
    padding: 0rem 0.5rem;

    &:hover {
      color: ${AppSalmon}
    }

    @media print {
      display: ${({ hide }) => (hide ? 'none' : 'block')};
    }
`;

export const TdLarge = styled.td`
    text-align: left;
    width: 22%
`;

export const TdXLarge = styled.td`
    width: 63%
`;

export const Input = styled.input`
    width:100%;
    padding:0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.txt};
    text-align: center;
    height: 33px;
    background-color: inherit;
    border:none;

    @media (max-width: 600px) {
      font-size: 0.9rem;
  }
`;

export const Arrow = styled.td`
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: ${({ up, theme }) => (up ? 'none' : `10px solid ${theme.txt}`)};
    border-bottom: ${({ up, theme }) => (up ? `10px solid ${theme.txt}` : 'none')};
    width: 0;
    height: 0;

    &:hover {
      border-top: ${({ up, theme }) => (up ? 'none' : `10px solid ${theme.span}`)};
      border-bottom: ${({ up, theme }) => (up ? `10px solid ${theme.span}` : 'none')};
    }

    @media (max-width: 600px) {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: ${({ up, theme }) => (up ? 'none' : `6px solid ${theme.txt}`)};
      border-bottom: ${({ up, theme }) => (up ? `6px solid ${theme.txt}` : 'none')};

      &:hover {
        border-top: ${({ up, theme }) => (up ? 'none' : `6px solid ${theme.span}`)};
        border-bottom: ${({ up, theme }) => (up ? `6px solid ${theme.span}` : 'none')};
      }
    }
`;

export const Txt = styled.p`
    font-size: 0.8rem;
`;