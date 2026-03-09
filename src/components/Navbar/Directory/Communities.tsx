import React, { useState } from 'react'
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal'
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'
import { useRecoilValue } from 'recoil'
import { communityState } from '@/src/atoms/communitiesAtom'
import MenuListItem from './MenuListItem'
import { FaReddit } from 'react-icons/fa'
import { ElementType } from 'react'
type Props = {
    icon: React.ElementType
}

const Communities = ({ icon: Icon }: Props) => {
    const [open, setOpen] = useState(false)
    const mySnippets = useRecoilValue(communityState).mySnippets
    return (
        <>
            <CreateCommunityModal icon={Icon} open={open} handleClose={() => { setOpen(false) }}></CreateCommunityModal>
            <Box mb={4} mt={3}>
                <Text pl={3} mb={1} fontSize={'7pt'} fontWeight={500}
                    color={'gray.500'}>modetating
                </Text>
                {mySnippets.filter(snippet => snippet.isModerator).map((snippet) => (






                    <MenuListItem key={snippet.communityId}
                        icon={FaReddit}
                        displayText={`r/${snippet.communityId}`} link={`/r/${snippet.communityId}`} iconColor='brand.100'
                        imageURL={snippet.imageURL}></MenuListItem>









                ))}
            </Box>
            <Box mb={4} mt={3}>
                <Text pl={3} mb={1} fontSize={'7pt'} fontWeight={500}
                    color={'gray.500'}>communities
                </Text>
                <MenuItem width={'100%'} fontSize={'10pt'} _hover={{ bg: 'gray.100' }} onClick={() => { setOpen(true) }}>
                    <Flex align={'center'} >
                        <Icon as={GrAdd} fontSize={20} mr={2}></Icon>

                    </Flex>
                </MenuItem>
                {mySnippets.map((snippet) => (
                    <MenuListItem key={snippet.communityId} icon={FaReddit}
                        displayText={`r/${snippet.communityId}`} link={`/r/${snippet.communityId}`} iconColor='blue.500'
                        imageURL={snippet.imageURL}></MenuListItem>
                ))}
            </Box>
        </>

    )
}


export default Communities








// import React, { useState } from "react";
// import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { FaReddit } from "react-icons/fa";
// import { GrAdd } from "react-icons/gr";
// import { useRecoilValue } from "recoil";
// import { communityState } from "../../../atoms/communitiesAtom";
// import { auth } from "../../../firebase/clientApp";
// // import CreateCommunityModal from "../../Modal/CreateCommunity";
// import MenuListItem from "./MenuListItem";

// type CommunitiesProps = {
//     menuOpen: boolean;
// };

// const Communities: React.FC<CommunitiesProps> = ({ menuOpen }) => {
//     const [user] = useAuthState(auth);
//     const [open, setOpen] = useState(false);
//     const mySnippets = useRecoilValue(communityState).mySnippets;

//     return (
//         <>
//             {/* <CreateCommunityModal
//         isOpen={open}
//         handleClose={() => setOpen(false)}
//         userId={user?.uid!}
//       /> */}
//             {/* COULD DO THIS FOR CLEANER COMPONENTS */}
//             {/* <Moderating snippets={snippetState.filter((item) => item.isModerator)} />
//       <MyCommunities snippets={snippetState} setOpen={setOpen} /> */}
//             {mySnippets.find((item) => item.isModerator) && (
//                 <Box mt={3} mb={4}>
//                     <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
//                         MODERATING
//                     </Text>
//                     {mySnippets
//                         .filter((item) => item.isModerator)
//                         .map((snippet) => (
//                             <MenuListItem
//                                 key={snippet.communityId}
//                                 displayText={`r/${snippet.communityId}`}
//                                 link={`/r/${snippet.communityId}`}
//                                 icon={FaReddit}
//                                 iconColor="brand.100"
//                             />
//                         ))}
//                 </Box>
//             )}
//             <Box mt={3} mb={4}>
//                 <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
//                     MY COMMUNITIES
//                 </Text>
//                 <MenuItem
//                     width="100%"
//                     fontSize="10pt"
//                     _hover={{ bg: "gray.100" }}
//                     onClick={() => setOpen(true)}
//                 >
//                     <Flex alignItems="center">
//                         <Icon fontSize={20} mr={2} as={GrAdd} />
//                         Create Community
//                     </Flex>
//                 </MenuItem>
//                 {mySnippets.map((snippet) => (
//                     <MenuListItem
//                         key={snippet.communityId}
//                         icon={FaReddit}
//                         displayText={`r/${snippet.communityId}`}
//                         link={`/r/${snippet.communityId}`}
//                         iconColor="blue.500"
//                         imageURL={snippet.imageURL}
//                     />
//                 ))}
//             </Box>
//         </>
//     );
// };

// export default Communities;