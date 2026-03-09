import { auth } from '@/src/firebase/clientApp'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
// import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore'
// import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
// import { HiLockClosed } from 'react-icons/hi'
import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Icon,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    Stack,
    Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import { firestore } from "../../../firebase/clientApp";
import useDirectory from '@/src/hooks/useDirectory';

import { ElementType } from 'react'


type Props = {
    open: boolean
    handleClose: () => void
    icon: ElementType
}

const CreateCommunityModal: React.FC<Props> = ({ open, handleClose, icon: Icon }: Props) => {
    const [user] = useAuthState(auth)
    const [communityName, setCommunityName] = useState('')
    const [charsRemaining, setCharsRemaining] = useState(21)
    const [communityType, setCommmunityType] = useState('public')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toggleMenuOpen } = useDirectory()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return
        setCommunityName(event.currentTarget.value)
        setCharsRemaining(21 - event.target.value.length)
    }
    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommmunityType(event.target.name)
    }
    const handleCreateCommunity = async () => {
        if (error) setError('')
        const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
        if (format.test(communityName) || communityName.length < 3) {
            setError('between 3 and 21 chars')
            return
        }
        setLoading(true)
        try {
            const communityDocRef = doc(firestore, 'communities', communityName)
            await runTransaction(firestore, async (transaction) => {

                const communityDoc = await transaction.get(communityDocRef)
                if (communityDoc.exists()) {
                    throw new Error(`name taken r/${communityName}`)
                }
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType
                })
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                })
            })
            handleClose()
            toggleMenuOpen()
            router.push(`r/${communityName}`)
        } catch (error: any) {
            console.log('handlecreateCommunity error', error)
            setError(error.message)
        }
        setLoading(false)
    }
    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size={'lg'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} flexDirection={'column'} fontSize={15}
                        padding={3}>create community</ModalHeader>
                    <Box pl={3} pr={3}>
                        <Divider></Divider>
                        <ModalCloseButton />
                        <ModalBody display={'flex'} flexDirection={'column'} padding={'10px 6px'} >
                            <Text fontWeight={600} fontSize={15}>name</Text>
                            <Text fontSize={11} color={'gray.500'}>community names including capitalization not changed</Text>
                            <Text position={'relative'} top={'27px'} left={'10px'} width={'20px'} color={'gray.400'}>r/</Text>
                            <Input value={communityName} position='relative' size={'sm'} pl={'22px'} onChange={handleChange}></Input>
                            <Text color={charsRemaining === 0 ? 'red' : 'gray.500'} fontSize={'9pt'}>{charsRemaining} characters remaining</Text>
                            <Text fontSize={'9pt'} color={'red'} padding={1}>{error}</Text>
                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15}>community type</Text>
                                {/* <CheckBox></CheckBox> */}
                                <Stack spacing={2}>
                                    <Checkbox name='public' isChecked={communityType === 'public'}
                                        onChange={onCommunityTypeChange}>
                                        <Flex align={'center'}>
                                            <Icon as={BsFillPersonFill} color={'gray.500'} mr={2}></Icon>
                                            <Text fontSize={'10pt'} mr={1}>public</Text>
                                            <Text fontSize={'8pt'} color={'gray.500'} pt={1}>anyone can view, post, comment</Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox onChange={onCommunityTypeChange}
                                        name='restricted' isChecked={communityType === 'restricted'}>
                                        <Flex align={'center'}>
                                            <Icon as={BsFillEyeFill} color={'gray.500'} mr={2}></Icon>
                                            <Text fontSize={'10pt'} mr={1}>restricted</Text>
                                            <Text fontSize={'8pt'} color={'gray.500'} pt={1}>anyone can view</Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox onChange={onCommunityTypeChange}
                                        name='private' isChecked={communityType === 'private'}> <Flex align={'center'}>
                                            <Icon as={HiLockClosed} color={'gray.500'} mr={2}></Icon>
                                            <Text fontSize={'10pt'} mr={1}>private</Text>
                                            <Text fontSize={'8pt'} color={'gray.500'} pt={1}>approved can view, post, comment</Text>
                                        </Flex></Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>
                    <ModalFooter bg={'gray.100'} borderRadius={'0px 0px 10px 10px'}>
                        <Button variant={'outline'} height={'30px'} colorScheme='blue' mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' height={'30px'} onClick={handleCreateCommunity} isLoading={loading}>create community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default CreateCommunityModal










