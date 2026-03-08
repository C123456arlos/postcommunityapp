import { AuthModalState } from '@/src/atoms/authModalAtom'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Login from './Login'
import SignUp from './SignUp'

type Props = {}

const AuthInputs = (props: Props) => {
    const modalState = useRecoilValue(AuthModalState)
    return (
        <Flex direction={'column'} align={'center'} width={'100%'} mt={4}>
            {modalState.view === 'login' && <Login></Login>}
            {modalState.view === 'signup' && <SignUp></SignUp>}

        </Flex>
    )
}

export default AuthInputs