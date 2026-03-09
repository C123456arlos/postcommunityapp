import React, { useState } from 'react'
import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react'
import { BsDot, BsReddit } from 'react-icons/bs'
import { AuthModalState } from '@/src/atoms/authModalAtom'
import { auth } from '@/src/firebase/clientApp'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { ElementType } from 'react'
type Props = {
    icon: ElementType
}
const ResetPassword = ({ icon: Icon }: Props) => {
    // const setAuthModalState = useRecoilState(AuthModalState)

    const setAuthModalState = useSetRecoilState(AuthModalState);
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await sendPasswordResetEmail(email)
        setSuccess(true)
    }
    return (
        <Flex direction={'column'} alignItems={'center'} width={'100%'}>
            <Icon as={BsReddit} color={'brand.100'} fontSize={40} mb={2}></Icon>
            <Text fontWeight={700} mb={2}>reset password</Text>
            {success ? (<Text mb={4}>check email</Text>) : (
                <>
                    <Text fontSize={'sm'} textAlign={'center'} mb={2}>
                        enter email with account
                    </Text>
                    <form onSubmit={onSubmit} style={{ width: '100%' }}>
                        <Input required name='email' placeholder='email' type='email' mb={2}
                            onChange={(event) => setEmail(event.target.value)} fontSize={'10pt'}
                            _placeholder={{ color: 'gray.500' }} _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                            _focus={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }} bg={'gray.50'}></Input>
                        <Text textAlign={'center'} fontSize={'10pt'} color={'red'}>{error?.message}</Text>
                        <Button width={'100%'} height={'36px'} mb={2} mt={2} type='submit' isLoading={sending}>reset password</Button>
                    </form>
                </>
            )}
            <Flex alignItems={'center'} fontSize={'9pt'} color={'blue.500'} fontWeight={'700'}
                cursor={'pointer'}>
                {/* <Text onClick={() => setAuthModalState((prev) => ({
                    ...prev, view:'login'
                }))}>login</Text> */}
                <Icon as={BsDot}></Icon>
                <Text onClick={() => setAuthModalState((prev) => ({ ...prev, view: 'signup' }))}>
                    signup
                </Text>
            </Flex>
        </Flex>
    )
}
export default ResetPassword








// import React, { useState } from "react";
// import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
// import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
// import { BsDot, BsReddit } from "react-icons/bs";
// import { AuthModalState, ModalView } from "../../../atoms/authModalAtom";
// import { auth } from "../../../firebase/clientApp";
// import { useSetRecoilState } from "recoil";

// type ResetPasswordProps = {
//     toggleView: (view: ModalView) => void;
// };

// const ResetPassword: React.FC<ResetPasswordProps> = ({ toggleView }) => {
//     const setAuthModalState = useSetRecoilState(AuthModalState);
//     const [email, setEmail] = useState("");
//     const [success, setSuccess] = useState(false);
//     const [sendPasswordResetEmail, sending, error] =
//         useSendPasswordResetEmail(auth);

//     const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         await sendPasswordResetEmail(email);
//         setSuccess(true);
//     };
//     return (
//         <Flex direction="column" alignItems="center" width="100%">
//             <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
//             <Text fontWeight={700} mb={2}>
//                 Reset your password
//             </Text>
//             {success ? (
//                 <Text mb={4}>Check </Text>
//             ) : (
//                 <>
//                     <Text fontSize="sm" textAlign="center" mb={2}>
//                         Enter the email associated with your account and we will send you a
//                         reset link
//                     </Text>
//                     <form onSubmit={onSubmit} style={{ width: "100%" }}>
//                         <Input
//                             required
//                             name="email"
//                             placeholder="email"
//                             type="email"
//                             mb={2}
//                             onChange={(event) => setEmail(event.target.value)}
//                             fontSize="10pt"
//                             _placeholder={{ color: "gray.500" }}
//                             _hover={{
//                                 bg: "white",
//                                 border: "1px solid",
//                                 borderColor: "blue.500",
//                             }}
//                             _focus={{
//                                 outline: "none",
//                                 bg: "white",
//                                 border: "1px solid",
//                                 borderColor: "blue.500",
//                             }}
//                             bg="gray.50"
//                         />
//                         <Text textAlign="center" fontSize="10pt" color="red">
//                             {error?.message}
//                         </Text>
//                         <Button
//                             width="100%"
//                             height="36px"
//                             mb={2}
//                             mt={2}
//                             type="submit"
//                             isLoading={sending}
//                         >
//                             Reset Password
//                         </Button>
//                     </form>
//                 </>
//             )}
//             <Flex
//                 alignItems="center"
//                 fontSize="9pt"
//                 color="blue.500"
//                 fontWeight={700}
//                 cursor="pointer"
//             >
//                 <Text
//                     onClick={() =>
//                         setAuthModalState((prev) => ({
//                             ...prev,
//                             view: "login",
//                         }))
//                     }
//                 >
//                     LOGIN
//                 </Text>
//                 <Icon as={BsDot} />
//                 <Text
//                     onClick={() =>
//                         setAuthModalState((prev) => ({
//                             ...prev,
//                             view: "signup",
//                         }))
//                     }
//                 >
//                     SIGN UP
//                 </Text>
//             </Flex>
//         </Flex>
//     );
// };
// export default ResetPassword;