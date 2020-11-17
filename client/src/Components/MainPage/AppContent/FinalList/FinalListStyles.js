import styled from 'styled-components';

export const FinalListWrapper = styled.div`
  @media (max-width: 690px) {
    margin: 0 auto;
  }
`;

export const Header = styled.div`
    display:flex;
    flex-direction: column;
    width: calc(100% - 4px);
    height: 4.4rem;
    color: white;
    font-size: 1.6rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding:0.2rem 0rem;
    margin:0rem;
    background-color: ${({ theme }) => theme.headerFinal};
    border: 2px solid ${({ theme }) => theme.headerFinal};
    border-radius:2px;

    @media print {
      height: auto;
   }
`;

export const List = styled.div`
    background: repeating-linear-gradient( ${({ theme }) => theme.menu}, ${({ theme }) => theme.menu} 34px, ${({ theme }) => theme.results} 34px, ${({ theme }) => theme.results} 35px); 
    height: ${({ currentUser }) => (currentUser ? '432px' : '452px')};
    width: 100%;
    border: 1px solid inherit;
    border-radius:2px;
    overflow: scroll;
    border-collapse: collapse;
    margin:0rem;
`;

export const Tip= styled.p`
    font-size: 0.85rem;
    text-align: center;
    padding: 0.5rem 0.3rem 0rem 0.3rem;

    @media (max-width: 690px) {
      font-size: 0.7rem
    }
    
    @media print {
      display: none;
      visibility:hidden
    }
`;

export const Input = styled.input`
    background-color: ${({ theme }) => theme.headerFinal};
    width: 14rem;
    border:none;
    text-align: center;
    font-size: 1.3rem;
    font-family: 'Rowdies', cursive;
    color: white;
    padding: 0.2rem 0rem
`;

export const Row = styled.table`
    width: 100%;
`;