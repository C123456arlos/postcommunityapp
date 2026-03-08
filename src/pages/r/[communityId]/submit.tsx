import { communityState } from '@/src/atoms/communitiesAtom'
import About from '@/src/components/Community/About'
import PageContent from '@/src/components/Layout/PageContent'
import NewPostForm from '@/src/components/Posts/NewPostForm'
import { auth } from '@/src/firebase/clientApp'
import useCommunityData from '@/src/hooks/useCommunityData'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'
const SubmitPostPage = () => {
    const [user] = useAuthState(auth)
    // const communityStateValue = useRecoilValue(communityState)
    const { communityStateValue } = useCommunityData()
    console.log('commun', communityStateValue)
    return (
        <PageContent>
            <>
                <Box p={'14px 6px'} borderBottom={'1px solid'} borderColor={'white'}>
                    <Text>create post</Text>
                </Box>
                {user && <NewPostForm user={user} communityImageURL={communityStateValue.currentCommunity?.imageURL}></NewPostForm>}

            </>
            <>
                {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity}></About>}
            </>
        </PageContent>
    )
}

export default SubmitPostPage