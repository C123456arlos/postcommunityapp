import { AuthModalState } from '@/src/atoms/authModalAtom'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import AuthInputs from './AuthInputs'
import OAuthButtons from './OAuthButtons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/src/firebase/clientApp'
import ResetPassword from './ResetPassword'


const AuthModal = () => {
    // const [modalState, setModalState] = useRecoilState(AuthModalState)
    // const [user, loading, error] = useAuthState(auth)
    // const handleClose = () => {
    //     setModalState(prev => ({
    //         ...prev, open: false
    //     }))
    // }
    const [modalState, setModalState] = useRecoilState(AuthModalState);
    const [user, loading, error] = useAuthState(auth)
    const handleClose = () =>
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    useEffect(() => {
        if (user) handleClose()
        console.log(user)
    }, [user])
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent textAlign={'center'}>
                    <ModalHeader>{modalState.view === 'login' && 'login'}
                        {modalState.view === 'signup' && 'signup'}
                        {modalState.view === 'resetPassword' && 'reset password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Flex direction={'column'} align={'center'} justify={'center'} width={'70%'}>
                            {modalState.view === 'login' || modalState.view === 'signup' ? (
                                <>
                                    <OAuthButtons></OAuthButtons>
                                    <Text color={'gray.500'} fontWeight={700}>or</Text>
                                    <AuthInputs></AuthInputs>
                                </>
                            ) :
                                <ResetPassword></ResetPassword>
                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}



export default AuthModal






// import React, { useEffect } from "react";
// import {
//     Flex,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalHeader,
//     ModalOverlay,
// } from "@chakra-ui/react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { auth } from "../../../firebase/clientApp";
// import OAuthButtons from "./OAuthButtons";
// import { AuthModalState } from "@/src/atoms/authModalAtom";


// type AuthModalProps = {};

// const AuthModal: React.FC<AuthModalProps> = () => {
//     const [modalState, setModalState] = useRecoilState(AuthModalState);
//     const handleClose = () =>
//         setModalState((prev) => ({
//             ...prev,
//             open: false,
//         }));


//     const [user, error] = useAuthState(auth);

//     // Can implement at the end
//     // useEffect(() => {
//     //   if (currentUser) handleClose();
//     // }, [currentUser]);
//     const toggleView = (view: string) => {
//         setModalState({
//             ...modalState,
//             view: view as typeof modalState.view,
//         });
//     };

//     useEffect(() => {
//         if (user) handleClose();
//     }, [user]);

//     return (
//         <Modal isOpen={modalState.open} onClose={handleClose}>
//             <ModalHeader display="flex" flexDirection="column" alignItems="center">
//                 {modalState.view === "login" && "Login"}
//                 {modalState.view === "signup" && "Sign Up"}
//                 {modalState.view === "resetPassword" && "Reset Password"}
//             </ModalHeader>
//             <ModalCloseButton />
//             <ModalBody
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 pb={6}
//             >
//                 <Flex
//                     direction="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     width="70%"
//                 >

//                 </Flex>
//             </ModalBody>
//         </Modal>
//     );
// };
// export default AuthModal;