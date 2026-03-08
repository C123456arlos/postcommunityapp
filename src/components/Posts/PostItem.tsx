import { Post } from '@/src/atoms/postsAtom'
import { Alert, AlertIcon, Flex, Icon, Image, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from "react-icons/io5";
type Props = {
    post: Post
    userIsCreator: boolean
    userVoteValue?: number
    onVote: (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => void
    onDeletePost: (post: Post) => Promise<boolean>
    onSelectPost?: (post: Post) => void
    homePage?: boolean
}

const PostItem = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost, homePage }: Props) => {
    const [loadingImage, setLoadingImage] = useState(true)
    const [error, setError] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const router = useRouter()
    const singlePostPage = !onSelectPost
    const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        setLoadingDelete(true)
        try {
            const success = await onDeletePost(post)
            if (!success) {
                throw new Error('failed delete post')
            }
            if (singlePostPage) {
                router.push(`/r/${post.communityId}`)
            }
            console.log('post deleted success')
        } catch (error: any) {
            setError(error.message)
        }
        setLoadingDelete(false)
    }
    return (
        <Flex border={'1px solid'} bg={'white'} borderColor={singlePostPage ? 'white' : 'gray.300'} borderRadius={singlePostPage ? '4px 4px 0px 0px' : '4px'}
            _hover={{ borderColor: singlePostPage ? 'none' : 'gray.500' }}
            cursor={singlePostPage ? 'unset' : 'pointer'} onClick={() => onSelectPost && onSelectPost(post)}>
            <Flex direction={'column'} align={'center'} bg={singlePostPage ? 'none' : 'gray.100'} p={2} width={'40px'}
                borderRadius={singlePostPage ? '0' : '3px 0px 0px 3px'}>
                <Icon as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue === 1 ? 'brand.100' : 'gray.400'} fontSize={22} onClick={(event) => onVote(event, post, 1, post.communityId)} cursor={'pointer'}></Icon>
                <Text fontSize={'9pt'}>{post.voteStatus}</Text>
                <Icon as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue === -1 ? '#4379ff' : 'gray.400'} fontSize={22} onClick={(event) => onVote(event, post, -1, post.communityId)} cursor={'pointer'}></Icon>
            </Flex>
            <Flex direction={'column'} width={'100%'}>
                {error && (
                    <Alert status='error'>
                        <AlertIcon></AlertIcon>
                        <Text mr={2}>{error}</Text>
                    </Alert>
                )}
                <Stack spacing={1} p={'10px'}>
                    <Stack direction={'row'} spacing={0.6} align={'center'} fontSize={'9pt'}>
                        {homePage && (
                            <>
                                {post.communityImageURL ? (<Image src={post.communityImageURL}
                                    borderRadius={'full'} boxSize={'18px'} mr={2}></Image>) : (<Icon as={FaReddit}
                                        fontSize={'18pt'} mr={1} color={'blue.500'}></Icon>)}
                                <Link href={`r/${post.communityId}`}>
                                    <Text fontWeight={700} _hover={{ textDecoration: 'underline' }}
                                        onClick={event => event.stopPropagation()} >{`r/${post.communityId}`}</Text>
                                </Link>
                                <Icon as={BsDot} color={'gray.500'} fontSize={6}></Icon>
                            </>
                        )}
                        <Text>posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>
                    <Text fontSize={'12pt'} fontWeight={600}>{post.title}</Text>
                    <Text fontSize={'10pt'}>{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify={'center'} align={'center'} p={2}>
                            {loadingImage &&
                                <Skeleton height={'200px'} width={'100%'} borderRadius={4}></Skeleton>
                            }
                            <Image maxHeight={'460px'} alt='post image' src={post.imageURL}
                                display={loadingImage ? 'none' : 'unset'} onLoad={() => setLoadingImage(false)}></Image>
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={0.5} color={'gray.500'} fontWeight={600}>
                    <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                        <Icon as={BsChat} mr={2}></Icon>
                        <Text fontSize={'9pt'}>{post.numberOfComments}</Text>
                    </Flex>
                    <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                        <Icon as={IoArrowRedoOutline} mr={2}></Icon>
                        <Text fontSize={'9pt'}>share</Text>
                    </Flex>
                    <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'}>
                        <Icon as={IoBookmarkOutline} mr={2}></Icon>
                        <Text fontSize={'9pt'}>save</Text>
                    </Flex>
                    {userIsCreator && <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{ bg: 'gray.200' }} cursor={'pointer'} onClick={handleDelete}>
                        {loadingDelete ? (<Spinner size={'sm'}></Spinner>) : (
                            <>
                                <Icon as={AiOutlineDelete} mr={2}></Icon>
                                <Text fontSize={'9pt'}>delete</Text>
                            </>
                        )}
                    </Flex>}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PostItem










// import React, { useState } from "react";
// import {
//     Flex,
//     Icon,
//     Image,
//     Skeleton,
//     Spinner,
//     Stack,
//     Text,
// } from "@chakra-ui/react";
// import moment from "moment";
// import { NextRouter } from "next/router";
// import { AiOutlineDelete } from "react-icons/ai";
// import { BsChat, BsDot } from "react-icons/bs";
// import { FaReddit } from "react-icons/fa";
// import {
//     IoArrowDownCircleOutline,
//     IoArrowDownCircleSharp,
//     IoArrowRedoOutline,
//     IoArrowUpCircleOutline,
//     IoArrowUpCircleSharp,
//     IoBookmarkOutline,
// } from "react-icons/io5";
// import { Post } from "@/src/atoms/postsAtom";
// import Link from "next/link";

// export type PostItemContentProps = {
//     post: Post;
//     onVote: (
//         event: React.MouseEvent<SVGElement, MouseEvent>,
//         post: Post,
//         vote: number,
//         communityId: string,
//         postIdx?: number
//     ) => void;
//     onDeletePost: (post: Post) => Promise<boolean>;
//     userIsCreator: boolean;
//     onSelectPost?: (value: Post, postIdx: number) => void;
//     router?: NextRouter;
//     postIdx?: number;
//     userVoteValue?: number;
//     homePage?: boolean;
// };

// const PostItem: React.FC<PostItemContentProps> = ({
//     post,
//     postIdx,
//     onVote,
//     onSelectPost,
//     router,
//     onDeletePost,
//     userVoteValue,
//     userIsCreator,
//     homePage,
// }) => {
//     const [loadingImage, setLoadingImage] = useState(true);
//     const [loadingDelete, setLoadingDelete] = useState(false);
//     const singlePostView = !onSelectPost; // function not passed to [pid]

//     const handleDelete = async (
//         event: React.MouseEvent<HTMLDivElement, MouseEvent>
//     ) => {
//         event.stopPropagation();
//         setLoadingDelete(true);
//         try {
//             const success = await onDeletePost(post);
//             if (!success) throw new Error("Failed to delete post");

//             console.log("Post successfully deleted");

//             // Could proably move this logic to onDeletePost function
//             if (router) router.back();
//         } catch (error: any) {
//             console.log("Error deleting post", error.message);
//             /**
//              * Don't need to setLoading false if no error
//              * as item will be removed from DOM
//              */
//             setLoadingDelete(false);
//             // setError
//         }
//     };

//     return (
//         <Flex
//             border="1px solid"
//             bg="white"
//             borderColor={singlePostView ? "white" : "gray.300"}
//             borderRadius={singlePostView ? "4px 4px 0px 0px" : 4}
//             cursor={singlePostView ? "unset" : "pointer"}
//             _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
//             onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
//         >
//             <Flex
//                 direction="column"
//                 align="center"
//                 bg={singlePostView ? "none" : "gray.100"}
//                 p={2}
//                 width="40px"
//                 borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
//             >
//                 <Icon
//                     as={
//                         userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
//                     }
//                     color={userVoteValue === 1 ? "brand.100" : "gray.400"}
//                     fontSize={22}
//                     cursor="pointer"
//                     onClick={(event) => onVote(event, post, 1, post.communityId)}
//                 />
//                 <Text fontSize="9pt" fontWeight={600}>
//                     {post.voteStatus}
//                 </Text>
//                 <Icon
//                     as={
//                         userVoteValue === -1
//                             ? IoArrowDownCircleSharp
//                             : IoArrowDownCircleOutline
//                     }
//                     color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
//                     fontSize={22}
//                     cursor="pointer"
//                     onClick={(event) => onVote(event, post, -1, post.communityId)}
//                 />
//             </Flex>
//             <Flex direction="column" width="100%">
//                 <Stack spacing={1} p="10px 10px">
//                     {post.createdAt && (
//                         <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
//                             {homePage && (
//                                 <>
//                                     {post.communityImageURL ? (
//                                         <Image
//                                             borderRadius="full"
//                                             boxSize="18px"
//                                             src={post.communityImageURL}
//                                             mr={2}
//                                         />
//                                     ) : (
//                                         <Icon as={FaReddit} fontSize={18} mr={1} color="blue.500" />
//                                     )}
//                                     <Link href={`r/${post.communityId}`}>
//                                         <Text
//                                             fontWeight={700}
//                                             _hover={{ textDecoration: "underline" }}
//                                             onClick={(event) => event.stopPropagation()}
//                                         >{`r/${post.communityId}`}</Text>
//                                     </Link>
//                                     <Icon as={BsDot} color="gray.500" fontSize={8} />
//                                 </>
//                             )}
//                             {/* <Text color="gray.500">
//                                 Posted by u/{post.userDisplayText}{" "}
//                                 {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
//                             </Text> */}
//                         </Stack>
//                     )}
//                     <Text fontSize="12pt" fontWeight={600}>
//                         {post.title}
//                     </Text>
//                     <Text fontSize="10pt">{post.body}</Text>
//                     {post.imageURL && (
//                         <Flex justify="center" align="center" p={2}>
//                             {loadingImage && (
//                                 <Skeleton height="200px" width="100%" borderRadius={4} />
//                             )}
//                             <Image
//                                 // width="80%"
//                                 // maxWidth="500px"
//                                 maxHeight="460px"
//                                 src={post.imageURL}
//                                 display={loadingImage ? "none" : "unset"}
//                                 onLoad={() => setLoadingImage(false)}
//                                 alt="Post Image"
//                             />
//                         </Flex>
//                     )}
//                 </Stack>
//                 <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
//                     <Flex
//                         align="center"
//                         p="8px 10px"
//                         borderRadius={4}
//                         _hover={{ bg: "gray.200" }}
//                         cursor="pointer"
//                     >
//                         <Icon as={BsChat} mr={2} />
//                         <Text fontSize="9pt">{post.numberOfComments}</Text>
//                     </Flex>
//                     <Flex
//                         align="center"
//                         p="8px 10px"
//                         borderRadius={4}
//                         _hover={{ bg: "gray.200" }}
//                         cursor="pointer"
//                     >
//                         <Icon as={IoArrowRedoOutline} mr={2} />
//                         <Text fontSize="9pt">Share</Text>
//                     </Flex>
//                     <Flex
//                         align="center"
//                         p="8px 10px"
//                         borderRadius={4}
//                         _hover={{ bg: "gray.200" }}
//                         cursor="pointer"
//                     >
//                         <Icon as={IoBookmarkOutline} mr={2} />
//                         <Text fontSize="9pt">Save</Text>
//                     </Flex>
//                     {userIsCreator && (
//                         <Flex
//                             align="center"
//                             p="8px 10px"
//                             borderRadius={4}
//                             _hover={{ bg: "gray.200" }}
//                             cursor="pointer"
//                             onClick={handleDelete}
//                         >
//                             {loadingDelete ? (
//                                 <Spinner size="sm" />
//                             ) : (
//                                 <>
//                                     <Icon as={AiOutlineDelete} mr={2} />
//                                     <Text fontSize="9pt">Delete</Text>
//                                 </>
//                             )}
//                         </Flex>
//                     )}
//                 </Flex>
//             </Flex>
//         </Flex>
//     );
// };

// export default PostItem;