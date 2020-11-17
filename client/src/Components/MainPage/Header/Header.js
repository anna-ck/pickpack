import React from 'react';
import {useSelector} from 'react-redux'
import {getUser} from '../../../reducers';
import {DivHeader, LargeHeader, SmallHeader} from './HeaderStyles'

function Header() {
    const currentUser = useSelector(getUser)
    return (
        <DivHeader currentUser={currentUser}>
            <LargeHeader>Pick &amp; Pack</LargeHeader>
            <SmallHeader>Pick items to add them to your <span>packing list</span>!</SmallHeader>
        </DivHeader>
    )
} 

export default Header;