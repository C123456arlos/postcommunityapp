// import { Timestamp } from 'firebase/firestore'
// import { atom } from 'recoil'
// export interface Community {
//     id: string,
//     creatorId: string
//     numberOfMembers: number
//     privacyType: 'public' | 'restricted' | 'private'
//     createAt?: Timestamp
//     imageURL?: string
// }


import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";

export interface Community {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: "public" | "restrictied" | "private";
    createdAt?: Timestamp;
    imageURL?: string;
}
export interface CommunitySnippet {
    communityId: string
    isModerator?: boolean
    imageURL?: string
}
interface CommunityState {
    mySnippets: CommunitySnippet[]
    currentCommunity?: Community
    snippetsFetched: boolean
}
const defaultCommunityState: CommunityState = {
    mySnippets: [],
    snippetsFetched: false

}
export const communityState = atom<CommunityState>({
    key: 'communitesState',
    default: defaultCommunityState
})


