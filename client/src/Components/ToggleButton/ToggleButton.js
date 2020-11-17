import React from 'react';
import { changeTheme } from '../../actions';
import {getTheme} from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonWrapper, DayIcon, NightIcon} from './ToggleButtonStyles';

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