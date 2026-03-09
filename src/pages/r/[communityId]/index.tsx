import { Community, communityState } from '@/src/atoms/communitiesAtom'
import { firestore } from '@/src/firebase/clientApp'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/Community/NotFound'
import safeJsonStringify from 'safe-json-stringify'
import Header from '@/src/components/Community/Header'
import PageContent from '@/src/components/Layout/PageContent'
import CreatePostLink from '@/src/components/Community/CreatePostLink'
import Posts from '@/src/components/Posts/Posts'
import { useRecoilState } from 'recoil'
import About from '@/src/components/Community/About'
import { ElementType } from 'react'

type Props = {

    icon: ElementType
    communityData: Community
}

const CommunityPage: React.FC<Props> = ({ communityData, icon: Icon }) => {
    console.log('data', communityData)
    // const setCommunityStateValue = useRecoilState(communityState)
    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);
    if (!communityData) {
        return (
            <div><NotFound></NotFound></div>
        )
    }
    useEffect(() => {
        setCommunityStateValue(prev => ({
            ...prev, currentCommunity: communityData
        }))
    }, [communityData])
    return (
        <>
            <Header icon={Icon} communityData={communityData}></Header>
            <PageContent>
                <>
                    <CreatePostLink icon={Icon}></CreatePostLink>
                    <Posts communityData={communityData}></Posts>
                </>
                <>
                    <About icon={Icon} communityData={communityData}></About>
                </>
            </PageContent>
        </>
    )
}
export default CommunityPage


export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string)
        const communityDoc = await getDoc(communityDocRef)
        return {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })) : ''
            }
        }
    } catch (error) {
        console.log('getServerSideProps error', error)
    }
}





























// import { useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import type { GetServerSidePropsContext, NextPage } from "next";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRecoilState } from "recoil";
// import safeJsonStringify from "safe-json-stringify";
// import { Community, communityState } from "../../../atoms/communitiesAtom";
// import { auth, firestore } from "../../../firebase/clientApp";

// interface CommunityPageProps {
//   communityData: Community;
// }

// const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
//   const [user, loadingUser] = useAuthState(auth);

//   const [communityStateValue, setCommunityStateValue] =
//     useRecoilState(communityState);

//   // useEffect(() => {
//   //   // First time the user has navigated to this community page during session - add to cache
//   //   const firstSessionVisit =
//   //     !communityStateValue.visitedCommunities[communityData.id!];

//   //   if (firstSessionVisit) {
//   //     setCommunityStateValue((prev) => ({
//   //       ...prev,
//   //       visitedCommunities: {
//   //         ...prev.visitedCommunities,
//   //         [communityData.id!]: communityData,
//   //       },
//   //     }));
//   //   }
//   // }, [communityData]);

//   useEffect(() => {
//     setCommunityStateValue((prev) => ({
//       ...prev,
//       currentCommunity: communityData,
//     }));
//   }, [communityData]);

//   // Community was not found in the database
//   if (!communityData) {
//     return <CommunityNotFound />;
//   }

//   return (
//     <>
//       <Header communityData={communityData} />
//       <PageContentLayout>
//         {/* Left Content */}
//         <>
//           <CreatePostLink />
//           <Posts
//             communityData={communityData}
//             userId={user?.uid}
//             loadingUser={loadingUser}
//           />
//         </>
//         {/* Right Content */}
//         <>
//           <About communityData={communityData} />
//         </>
//       </PageContentLayout>
//     </>
//   );
// };

// export default CommunityPage;

