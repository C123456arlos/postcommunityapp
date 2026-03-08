import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import SearchInput from './SearchInput'
import RightContent from './RightContent/RightContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/src/firebase/clientApp'
import Directory from '@/src/components/Navbar/Directory/Directory'
import useDirectory from '@/src/hooks/useDirectory'
import { defaultMenuitem } from '@/src/atoms/DirectoryMenuAtom'
const Navbar = () => {
    const [user, loading, error] = useAuthState(auth)
    const { onSelectMenuItem } = useDirectory()
    return (
        <Flex bg={'white'} height='44px' padding={'6px 12px'} justify={{ md: 'space-between' }}>
            <Flex align={'center'} width={{ base: '40px', md: 'auto' }} mr={{ base: 0, md: 2 }}
                onClick={() => onSelectMenuItem(defaultMenuitem)} cursor={'pointer'}>
                <Image src='/images/redditicon.svg' height={'20px'}></Image>
                <Image src='/images/reddittext.svg' height={'46px'} display={{ base: 'none', md: 'unset' }}></Image>
            </Flex>
            {user && <Directory></Directory>}
            <SearchInput user={user}></SearchInput>
            <RightContent user={user}></RightContent>
        </Flex>
    )
}
export default Navbar