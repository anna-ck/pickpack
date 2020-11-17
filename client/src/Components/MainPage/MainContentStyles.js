import styled from 'styled-components';
import { AppSalmon, AppBlue } from '../../theme/Colors';

export const AppContentWrapper= styled.div`
  display: flex;
  margin: 0 auto;
  overflow: auto;
`;

export const ToggleUserButton = styled.button`
  display: none;
  padding: 0.5rem 0.8rem;
  margin: 1rem;
  font-size: 0.9rem;
  line-height: 1.5rem;
  background-color: white;
  border: 2px solid ${AppBlue};;
  border-radius: 50px;

  &:hover {
    border-color: ${AppSalmon};
  }

  @media (max-width: 760px) {
    display: ${({ isActive, currentUser }) => (isActive && currentUser ? 'block' : 'none')};
  };

  @media print {
    display: none;
    visibility:hidden
 }
`;

export const Icon = styled.i`
  font-size: 1.5rem;
  padding: 0rem 0.2rem;
`;

export const UserBar = styled.div`
  position: fixed;
  width: ${({ currentUser }) => (currentUser ? '13rem' : '0rem')};
  background-color:  ${({ theme }) => theme.userPanel};
  flex-direction: column;
  justify-content: left;
  align-content: center;
  height: 100vh;
  overflow: auto;

  @media (max-width: 760px) {
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
    width: 100%;
    height: 100vh;
    position: sticky;
    left: 0;
    top: 0;
  };

  @media print {
    display: none;
    visibility:hidden
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  margin-left: ${({ currentUser }) => (currentUser ? '13rem' : '0rem')};

  @media (max-width: 760px) {
    margin: 0;
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  }

  @media print {
    height: auto;
    align-items: flex-start;
    justify-content: flex-start
  }
`;

export const MainContentDiv = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1290px) {
    flex-direction: column;
  }
`;

export const ContentSearch = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin: 0rem 0.75rem 0rem 1.5rem;

  @media (max-width: 1290px) {
    width: 70%;
    margin: 0 auto;
    padding:0;
    padding-bottom: 2.5rem;
  }

  @media (max-width: 1090px) {
    width: 70%;
  }

  @media (max-width: 950px) {
    width: 85%;
  }

  @media (max-width: 820px) {
    width: 95%;
  }

  @media print {
    display: none;
    visibility:hidden
  }
`;

export const ContentSearchInput = styled.div`
  max-width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-content: center;
  z-index:2;
  padding-bottom:0.5rem;

  @media (max-width: 690px) {
    padding-bottom: 0rem;
  }

  @media (max-width: 1090px) {
      width:100%;
      display:inline-flex;
  }
`;

export const ContentSearchResults = styled.div`
  max-width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-content: space-between;
`;

export const ContentFinal = styled.div`
  width: 50%;
  padding: 0rem;
  margin: 0rem 1.5rem 0rem 0.75rem;

  @media (max-width: 1290px) {
    width: 70%;
      margin: 0 auto;
      text-align: center;
      padding: 0rem
  }

  @media (max-width: 1090px) {
    width: 70%;
  }

  @media (max-width: 950px) {
    width: 85%;
  }

  @media (max-width: 820px) {
    width: 95%;
  }

  @media (max-width: 760px) {
    width: 85%;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.5rem;

  @media print {
    display: none;
    visibility:hidden
  }
`;