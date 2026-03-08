import { AuthModalState } from '@/src/atoms/authModalAtom'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

const AuthButtons = () => {
    const setAuthModalState = useSetRecoilState(AuthModalState)
    return (
        <>
            <Button variant={'outline'} height={'20px'} display={{ base: 'none', sm: 'flex' }} width={{ base: '70px', md: '110px' }}
                mr={2} onClick={() => { setAuthModalState({ open: true, view: 'login' }) }}>log in</Button>
            <Button height={'28px'} display={{ base: 'none', sm: 'flex' }} width={{ base: '70px', md: '110px' }}
                mr={2} onClick={() => { setAuthModalState({ open: true, view: 'signup' }) }}>sign up</Button>
        </>
    )
}

export default AuthButtons