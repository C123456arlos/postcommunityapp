import { Flex, Icon, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ElementType } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsLink45Deg } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { useSetRecoilState } from 'recoil'
import { AuthModalState } from '@/src/atoms/authModalAtom'
import { auth } from '@/src/firebase/clientApp'
import useDirectory from '@/src/hooks/useDirectory'
type Props = {
    icon: ElementType
}
const CreatePostLink = ({ icon: Icon }: Props) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const { toggleMenuOpen } = useDirectory()
    const setAuthModalState = useSetRecoilState(AuthModalState)
    const onClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' })
            return
        }
        const { communityId } = router.query
        if (communityId) {
            router.push(`/r/${communityId}/submit`)
            return
        }
        toggleMenuOpen()
    }
    return (
        <Flex justify={'space-evenly'} align={'center'} height={'50px'} bg={'white'}
            borderRadius={4} border='1px solid' borderColor={'gray.300'} p={2} mb={4}>
            <Icon as={FaReddit} fontSize={36} color={'gray.300'} mr={4}></Icon>
            <Input placeholder='create post' fontSize={'10pt'}
                _placeholder={{ color: 'gray.500' }} _hover={{
                    bg: 'white', border: '1px solid', borderColor: 'blue.500'
                }} _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50' borderColor={'gray.200'} height={'36px'} borderRadius={4} mr={4} onClick={onClick}></Input>
            <Icon as={IoImageOutline} fontSize={24} mr={4}
                color={'gray.400'} cursor={'pointer'}></Icon>
            <Icon as={BsLink45Deg} fontSize={24}
                color={'gray.400'} cursor={'pointer'}></Icon>
        </Flex>
    )
}
export default CreatePostLink