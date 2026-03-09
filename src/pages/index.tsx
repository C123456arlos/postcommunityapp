import { useAuthState } from 'react-firebase-hooks/auth'
import PageContentLayout from '../components/Layout/PageContent'
import { auth, firestore } from '../firebase/clientApp'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { communityState } from '../atoms/communitiesAtom'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import usePosts from '../hooks/usePosts'
import { Post, PostVote } from '../atoms/postsAtom'
import PostLoader from '../components/Posts/PostLoader'
import { Stack } from '@chakra-ui/react'
import PostItem from '../components/Posts/PostItem'
import CreatePostLink from '../components/Community/CreatePostLink'
import useCommunityData from '../hooks/useCommunityData'
import Recomendations from '../components/Community/Recomendations'
import Premium from '../components/Community/Premium'
import PersonalHome from '../components/Community/PersonalHome'
import { Icon } from '@chakra-ui/icons'


export default function Home() {
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  // const communityStateValue = useRecoilValue(communityState)
  const { communityStateValue } = useCommunityData()
  const buildUserHomeFeed = async () => {
    setLoading(true)
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(snippet => snippet.communityId)
        const postQuery = query(collection(firestore, 'posts'), where('communityId', 'in', myCommunityIds),
          limit(10)
        )
        const postDocs = await getDocs(postQuery)
        const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setPostStateValue(prev => ({
          ...prev,
          posts: posts as Post[]
        }))
      }
      else {
        buildNoUserHomeFeed()
      }
    } catch (error) {
      console.log('build user feed', error)
    }
    setLoading(false)
  }
  const { setPostStateValue, postStateValue, onSelectPost, onDeletePost, onVote } = usePosts()

  const buildNoUserHomeFeed = async () => {
    setLoading(true)
    try {
      const postQuery = query(collection(firestore, 'posts'), orderBy('voteStatus',
        'desc'
        // 'asc'
      ), limit(10))
      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[]
      }))


    } catch (error) {
      console.log('build no user', error)
    }
    setLoading(false)
  }

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map(post => post.id)
      const postVotesQuery = query(collection(firestore, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postIds))
      const postVoteDocs = await getDocs(postVotesQuery)
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id, ...doc.data()
      }))
      setPostStateValue(prev => ({
        ...prev,
        postVotes: postVotes as PostVote[]
      }))
    } catch (error) {
      console.log('grtuserpost', error)
    }
  }














  // useEffect(() => {

  //   if (communityStateValue.snippetsFetched) buildUserHomeFeed()
  // }, [communityStateValue.snippetsFetched])
  // useEffect(() => {

  //   // if (communityStateValue.snippetsFetched) return
  //   // if (user) {
  //   //   buildUserHomeFeed()
  //   // }

  //   // }, [user, communityStateValue.snippetsFetched])
  // }, [user, communityStateValue.snippetsFetched])




















  useEffect(() => {
    /**
     * initSnippetsFetched ensures that user snippets have been retrieved;
     * the value is set to true when snippets are first retrieved inside
     * of getSnippets in useCommunityData
     */
    if (!communityStateValue.snippetsFetched) return;

    if (user) {
      buildUserHomeFeed();
    }
  }, [user, communityStateValue.snippetsFetched]);




  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed()
  },
    [user, loadingUser])
  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes()
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: []
      }))
    }
  }, [
    user, postStateValue.posts])
  return (
    <>
      <PageContentLayout>
        <>
          <CreatePostLink icon={Icon}></CreatePostLink>
          {loading ? (<PostLoader></PostLoader>) : (
            <>

              <Stack>
                {postStateValue.posts.map(post => (
                  <PostItem icon={Icon} key={post.id} post={post} event={event}
                    onSelectPost={onSelectPost} onVote={onVote}
                    userVoteValue={postStateValue.postVotes.find(item => item.postId === post.id)?.voteValue}
                    userIsCreator={user?.uid === post.creatorId} onDeletePost={onDeletePost} homePage></PostItem>
                ))}
              </Stack>
            </>
          )}
        </>
        <Stack spacing={5}>
          <Recomendations icon={Icon}></Recomendations>
          <Premium icon={Icon}></Premium>
          <PersonalHome icon={Icon}></PersonalHome>
        </Stack>
      </PageContentLayout>

    </>
  )
}





























// import { useEffect, useState } from "react";
// import { Stack } from "@chakra-ui/react";
// import {
//   collection,
//   DocumentData,
//   getDocs,
//   limit,
//   onSnapshot,
//   orderBy,
//   query,
//   QuerySnapshot,
//   where,
// } from "firebase/firestore";
// import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRecoilValue } from "recoil";
// import { communityState } from "../atoms/communitiesAtom";
// import { Post, PostVote } from "../atoms/postsAtom";
// import CreatePostLink from "../components/Community/CreatePostLink";
// // import Recommendations from "../components/Community/";
// import PageContentLayout from "../components/Layout/PageContent";
// import PostLoader from "../components/Posts/PostLoader";
// import PostItem from "../components/Posts/PostItem";
// import { auth, firestore } from "../firebase/clientApp";
// import usePosts from "../hooks/usePosts";
// import useCommunityData from "../hooks/useCommunityData";
// // import Premium from "../components/Community/Premium";
// // import PersonalHome from "../components/Community/PersonalHome";

// const Home: NextPage = () => {
//   const [loading, setLoading] = useState(false)
//   const [user, loadingUser] = useAuthState(auth);
//   const {
//     postStateValue,
//     setPostStateValue,
//     onVote,
//     onSelectPost,
//     onDeletePost,
//     // loading,
//     // setLoading,
//   } = usePosts();
//   // const communityStateValue = useRecoilValue(communityState);
//   const { communityStateValue } = useCommunityData()
//   const getUserHomePosts = async () => {
//     console.log("GETTING USER FEED");
//     setLoading(true);
//     try {
//       /**
//        * if snippets has no length (i.e. user not in any communities yet)
//        * do query for 20 posts ordered by voteStatus
//        */
//       const feedPosts: Post[] = [];

//       // User has joined communities
//       if (communityStateValue.mySnippets.length) {
//         console.log("GETTING POSTS IN USER COMMUNITIES");

//         const myCommunityIds = communityStateValue.mySnippets.map(
//           (snippet) => snippet.communityId
//         );
//         // Getting 2 posts from 3 communities that user has joined
//         let postPromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];
//         [0, 1, 2].forEach((index) => {
//           if (!myCommunityIds[index]) return;

//           postPromises.push(
//             getDocs(
//               query(
//                 collection(firestore, "posts"),
//                 where("communityId", "==", myCommunityIds[index]),
//                 limit(3)
//               )
//             )
//           );
//         });
//         const queryResults = await Promise.all(postPromises);
//         /**
//          * queryResults is an array of length 3, each with 0-2 posts from
//          * 3 communities that the user has joined
//          */
//         queryResults.forEach((result) => {
//           const posts = result.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           })) as Post[];
//           feedPosts.push(...posts);
//         });
//       }
//       // User has not joined any communities yet
//       else {
//         console.log("USER HAS NO COMMUNITIES - GETTING GENERAL POSTS");

//         const postQuery = query(
//           collection(firestore, "posts"),
//           orderBy("voteStatus", "desc"),
//           limit(10)
//         );
//         const postDocs = await getDocs(postQuery);
//         const posts = postDocs.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Post[];
//         feedPosts.push(...posts);
//       }

//       console.log("HERE ARE FEED POSTS", feedPosts);

//       setPostStateValue((prev) => ({
//         ...prev,
//         posts: feedPosts,
//       }));

//       // if not in any, get 5 communities ordered by number of members
//       // for each one, get 2 posts ordered by voteStatus and set these to postState posts
//     } catch (error: any) {
//       console.log("getUserHomePosts error", error.message);
//     }
//     setLoading(false);
//   };

//   const getNoUserHomePosts = async () => {
//     console.log("GETTING NO USER FEED");
//     setLoading(true);
//     try {
//       const postQuery = query(
//         collection(firestore, "posts"),
//         orderBy("voteStatus", "desc"),
//         limit(10)
//       );
//       const postDocs = await getDocs(postQuery);
//       const posts = postDocs.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       console.log("NO USER FEED", posts);

//       setPostStateValue((prev) => ({
//         ...prev,
//         posts: posts as Post[],
//       }));
//     } catch (error: any) {
//       console.log("getNoUserHomePosts error", error.message);
//     }
//     setLoading(false);
//   };

//   const getUserPostVotes = async () => {
//     const postIds = postStateValue.posts.map((post) => post.id);
//     const postVotesQuery = query(
//       collection(firestore, `users/${user?.uid}/postVotes`),
//       where("postId", "in", postIds)
//     );
//     const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
//       const postVotes = querySnapshot.docs.map((postVote) => ({
//         id: postVote.id,
//         ...postVote.data(),
//       }));

//       setPostStateValue((prev) => ({
//         ...prev,
//         postVotes: postVotes as PostVote[],
//       }));
//     });

//     return () => unsubscribe();
//   };

//   // useEffect(() => {
//   //   /**
//   //    * initSnippetsFetched ensures that user snippets have been retrieved;
//   //    * the value is set to true when snippets are first retrieved inside
//   //    * of getSnippets in useCommunityData
//   //    */
//   //   if (!communityStateValue.initSnippetsFetched) return;

//   //   if (user) {
//   //     getUserHomePosts();
//   //   }
//   // }, [user, communityStateValue.initSnippetsFetched]);

//   useEffect(() => {
//     if (!user && !loadingUser) {
//       getNoUserHomePosts();
//     }
//   }, [user, loadingUser]);

//   useEffect(() => {
//     if (!user?.uid || !postStateValue.posts.length) return;
//     getUserPostVotes();

//     // Clear postVotes on dismount
//     return () => {
//       setPostStateValue((prev) => ({
//         ...prev,
//         postVotes: [],
//       }));
//     };
//   }, [postStateValue.posts, user?.uid]);

//   return (
//     <PageContentLayout>
//       <>
//         <CreatePostLink />
//         {loading ? (
//           <PostLoader />
//         ) : (
//           <Stack>
//             {postStateValue.posts.map((post: Post, index) => (
//               <PostItem
//                 key={post.id}
//                 post={post}
//                 // postIdx={index}
//                 onVote={onVote}
//                 onDeletePost={onDeletePost}
//                 userVoteValue={
//                   postStateValue.postVotes.find(
//                     (item) => item.postId === post.id
//                   )?.voteValue
//                 }
//                 userIsCreator={user?.uid === post.creatorId}
//                 onSelectPost={onSelectPost}
//                 homePage
//               />
//             ))}
//           </Stack>
//         )}
//       </>
//       <Stack spacing={5} position="sticky" top="14px">

//       </Stack>
//     </PageContentLayout>
//   );
// };

// export default Home;











