import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, MenuDivider, Text } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { FaRedditSquare } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogin } from 'react-icons/md'
import React from 'react'
import { auth } from '@/src/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { AuthModalState } from '@/src/atoms/authModalAtom'
import { IoSparkles } from 'react-icons/io5'
import { communityState } from '@/src/atoms/communitiesAtom'

type Props = {
    user?: User | null
}

const UserMenu: React.FC<Props> = ({ user }) => {
    // const resetCommunityState = useResetRecoilState(communityState)
    const setAuthModalState = useSetRecoilState(AuthModalState)
    const logout = async () => {
        await signOut(auth)
        // resetCommunityState()
    }
    return (
        <Menu>
            <MenuButton cursor={'pointer'} padding={'0px 6px'} borderRadius={4} _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
                <Flex align={'center'}>
                    <Flex align={'center'}>
                        {user ? (
                            <>
                                <Icon fontSize={24} mr={1} color={'gray.300'} as={FaRedditSquare}></Icon>
                                <Flex direction={'column'} display={{ base: 'none', lg: 'flex' }} fontSize={'8pt'}
                                    align={'flex-start'} mr={8}>
                                    <Text fontWeight={700}>
                                        {user?.displayName || user.email?.split('@')[0]}
                                    </Text>
                                    <Flex>
                                        <Icon as={IoSparkles} color={'brand.100'} mr={1}></Icon>
                                        <Text color={'gray.400'}>1 karma</Text>
                                    </Flex>
                                </Flex>
                            </>
                        ) : (<Icon fontSize={24} color='gray.400' mr={1} as={VscAccount}></Icon>)}
                    </Flex>
                    <ChevronDownIcon></ChevronDownIcon>
                </Flex>
            </MenuButton>

            <MenuList>
                {user ? (
                    <>
                        <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{
                            bg: 'blue.500', color: 'white'
                        }}>
                            <Flex align={'center'}>
                                <Icon fontSize={20} mr={2} as={CgProfile}></Icon>
                                profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider></MenuDivider>
                        <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{
                            bg: 'blue.500', color: 'white'
                        }} onClick={logout}>
                            <Flex align={'center'}>
                                <Icon fontSize={20} mr={2} as={MdOutlineLogin}></Icon>
                                log out
                            </Flex>
                        </MenuItem>
                    </>) : (<>
                        <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{
                            bg: 'blue.500', color: 'white'
                        }} onClick={() => setAuthModalState({ open: true, view: 'login' })}>
                            <Flex align={'center'}>
                                <Icon fontSize={20} mr={2} as={MdOutlineLogin}></Icon>
                                log in /signup
                            </Flex>
                        </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    )
}

export default UserMenu



// import React from "react";

// import { ChevronDownIcon } from "@chakra-ui/icons";
// import {
//     Box,
//     Flex,
//     Icon,
//     Menu,
//     MenuButton,
//     MenuList,
//     Text,
// } from "@chakra-ui/react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRecoilState } from "recoil";
// // import { authModalState } from "../../../../atoms/authModalAtom";
// import { auth } from "@/src/firebase/clientApp";

// import NoUserList from "./NoUserList";
// import UserList from "./UserList";

// import { FaRedditSquare } from "react-icons/fa";
// import { VscAccount } from "react-icons/vsc";
// import { IoSparkles } from "react-icons/io5";
// import { User } from "firebase/auth";

// type Props = {
//     user?: User | null
// }

// const MenuWrapper = (user: Props) => {
//     // const [authModal, setModalState] = useRecoilState(authModalState);
//     // const [user] = useAuthState(auth);
//     return (
//         <Menu>
//             <MenuButton
//                 cursor="pointer"
//                 padding="0px 6px"
//                 borderRadius="4px"
//                 _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
//             >
//                 <Flex alignItems="center">
//                     <Flex alignItems="center">
//                         {user ? (
//                             <>
//                                 <Icon
//                                     fontSize={24}
//                                     mr={1}
//                                     color="gray.300"
//                                     as={FaRedditSquare}
//                                 />
//                                 <Box
//                                     display={{ base: "none", lg: "flex" }}
//                                     flexDirection="column"
//                                     fontSize="8pt"
//                                     alignItems="flex-start"
//                                     mr={8}
//                                 >
//                                     <Text fontWeight={700}>

//                                     </Text>
//                                     <Flex alignItems="center">
//                                         <Icon as={IoSparkles} color="brand.100" mr={1} />
//                                         <Text color="gray.400">1 karma</Text>
//                                     </Flex>
//                                 </Box>
//                             </>
//                         ) : (
//                             <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
//                         )}
//                     </Flex>
//                     <ChevronDownIcon color="gray.500" />
//                 </Flex>
//             </MenuButton>
//             <MenuList>
//                 {user ? <UserList /> : <NoUserList />}
//             </MenuList>
//         </Menu>
//     );
// };
// export default MenuWrapper;