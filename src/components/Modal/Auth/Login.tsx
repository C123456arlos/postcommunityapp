import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { AuthModalState } from '@/src/atoms/authModalAtom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/clientApp'
import { FIREBASE_ERRORS } from '@/src/firebase/errors'
type Props = {}

const Login = (props: Props) => {
    const setAuthModalState = useSetRecoilState(AuthModalState)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    // const [error, setError] = useState('')
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    return (
        <form onSubmit={onSubmit}>
            <Input required name='email' placeholder='email' type='email' mb={2} onChange={onChange} fontSize={'10pt'}
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }} bg={'gray.50'}></Input>
            <Input required name='password' placeholder='password' type='password' onChange={onChange} fontSize={'10pt'}
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }} bg={'gray.50'}></Input>
            <Text textAlign={'center'} color={'red'} fontSize={'10pt'}>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button type='submit' width={'100%'} height={'36px'} mt={2} mb={2} isLoading={loading}>log in</Button>
            <Flex justifyContent={'center'} mb={2}>
                <Text fontSize={'9pt'} mr={1}>forgot password</Text>
                <Text fontSize={'9pt'} color={'blue.500'} cursor={'pointer'} onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: 'resetPassword'
                }))}>reset</Text>
            </Flex>
            <Flex fontSize='9pt' justifyContent={'center'}>
                <Text mr={1}>new account</Text>
                <Text color={'blue.500'} fontWeight={700} cursor={'pointer'} onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: 'signup'
                }))}>signup</Text>
            </Flex>
        </form>
    )
}

export default Login


















// import React, { useState } from "react";
// import { Button, Flex, Input, Text } from "@chakra-ui/react";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { ModalView } from "../../../atoms/authModalAtom";
// import { auth } from "../../../firebase/clientApp";
// import { FIREBASE_ERRORS } from "../../../firebase/errors";


// type LoginProps = {
//     toggleView: (view: ModalView) => void;
// };

// const Login: React.FC<LoginProps> = ({ toggleView }) => {
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//     });
//     const [formError, setFormError] = useState("");

//     const [signInWithEmailAndPassword, _, loading, authError] =
//         useSignInWithEmailAndPassword(auth);

//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (formError) setFormError("");
//         if (!form.email.includes("@")) {
//             return setFormError("Please enter a valid email");
//         }

//         // Valid form inputs
//         signInWithEmailAndPassword(form.email, form.password);
//     };

//     const onChange = ({
//         target: { name, value },
//     }: React.ChangeEvent<HTMLInputElement>) => {
//         setForm((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <Input
//                 name="email"
//                 placeholder="email"
//                 type="text"
//                 mb={2}
//                 onChange={onChange}
//             />
//             <Input
//                 name="password"
//                 placeholder="password"
//                 type="password"
//                 onChange={onChange}
//             />
//             <Text textAlign="center" mt={2} fontSize="10pt" color="red">
//                 {formError ||
//                     FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
//             </Text>
//             <Button
//                 width="100%"
//                 height="36px"
//                 mb={2}
//                 mt={2}
//                 type="submit"
//                 isLoading={loading}
//             >
//                 Log In
//             </Button>
//             <Flex justifyContent="center" mb={2}>
//                 <Text fontSize="9pt" mr={1}>
//                     Forgot your password?
//                 </Text>
//                 <Text
//                     fontSize="9pt"
//                     color="blue.500"
//                     cursor="pointer"
//                     onClick={() => toggleView("resetPassword")}
//                 >
//                     Reset
//                 </Text>
//             </Flex>
//             <Flex fontSize="9pt" justifyContent="center">
//                 <Text mr={1}>New here?</Text>
//                 <Text
//                     color="blue.500"
//                     fontWeight={700}
//                     cursor="pointer"
//                     onClick={() => toggleView("signup")}
//                 >
//                     SIGN UP
//                 </Text>
//             </Flex>
//         </form>
//     );
// };
// export default Login;




