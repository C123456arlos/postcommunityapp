import { AuthModalState } from '@/src/atoms/authModalAtom'
import { Input, Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../../../firebase/clientApp'
import { FIREBASE_ERRORS } from '../../../firebase/errors'
import { User } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

type Props = {}

const SignUp = (props: Props) => {
    const setAuthModalState = useSetRecoilState(AuthModalState)
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [
        createUserWithEmailAndPassword,
        userCred,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(auth);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (error) setError('')
        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Password not match')
            return
        }
        createUserWithEmailAndPassword(signupForm.email, signupForm.password)
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const createUserDocument = async (user: User) => {
        await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)))
    }
    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user)
        }
    }, [userCred])
    return (
        <form onSubmit={onSubmit}>
            <Input required name='email' placeholder='email' type='email' mb={2} onChange={onChange} fontSize={'10pt'}
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }} bg={'gray.50'}></Input>
            <Input required name='password' placeholder='password' type='password' onChange={onChange} fontSize={'10pt'}
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }} bg={'gray.50'}></Input>
            <Input required name='confirmPassword' placeholder='confirm password' type='password' onChange={onChange} fontSize={'10pt'}
                _placeholder={{ color: 'gray.500' }} _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }} bg={'gray.50'}></Input>
            <Text textAlign={'center'} color={'red'} fontSize={'10pt'}>
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button isLoading={loading} type='submit' width={'100%'} height={'36px'} mt={2} mb={2}>signup</Button>
            <Flex fontSize='9pt' justifyContent={'center'}>
                <Text mr={1}>account already</Text>
                <Text color={'blue.500'} fontWeight={700} cursor={'pointer'} onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: 'login'
                }))}>login</Text>
            </Flex>
        </form>
    )
}

export default SignUp









// import React, { useState } from "react";
// import { Button, Flex, Input, Text } from "@chakra-ui/react";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

// import { auth } from "../../../firebase/clientApp";
// import { FIREBASE_ERRORS } from "../../../firebase/errors";


// type SignUpProps = {

// };

// const SignUp: React.FC<SignUpProps> = () => {
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });
//     const [formError, setFormError] = useState("");
//     const [createUserWithEmailAndPassword, _, loading, authError] =
//         useCreateUserWithEmailAndPassword(auth);

//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (formError) setFormError("");
//         if (!form.email.includes("@")) {
//             return setFormError("Please enter a valid email");
//         }

//         if (form.password !== form.confirmPassword) {
//             return setFormError("Passwords do not match");
//         }

//         // Valid form inputs
//         createUserWithEmailAndPassword(form.email, form.password);
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
//                 mb={2}
//                 onChange={onChange}
//             />
//             <Input
//                 name="confirmPassword"
//                 placeholder="confirm password"
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
//                 Sign Up
//             </Button>
//             <Flex fontSize="9pt" justifyContent="center">
//                 <Text mr={1}>Have an account?</Text>
//                 <Text
//                     color="blue.500"
//                     fontWeight={700}
//                     cursor="pointer"

//                 >
//                     LOG IN
//                 </Text>
//             </Flex>
//         </form>
//     );
// };
// export default SignUp;