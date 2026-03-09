import { Button, Flex, Icon } from '@chakra-ui/react'
import React from 'react'
import AuthButtons from './AuthButtons'
import AuthModal from '../../Modal/Auth/AuthModal'
import { signOut, User } from 'firebase/auth'
import { auth } from '@/src/firebase/clientApp'
import Icons from './Icons'
import UserMenu from './UserMenu'
import { ElementType } from 'react'

type RightContentProps = {
    user?: User | null
    icon: ElementType
}

const RightContent: React.FC<RightContentProps> = ({ user, icon: Icon }) => {
    return (
        <>
            <AuthModal></AuthModal>
            <Flex justify={'center'} align={'center'}>
                {user ? <Icons icon={Icon}></Icons> : <AuthButtons></AuthButtons>}
                <UserMenu icon={Icon} user={user}></UserMenu>
            </Flex>
        </>
    )
}

export default RightContent