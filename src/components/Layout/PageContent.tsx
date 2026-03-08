// import { Flex } from '@chakra-ui/react'
// import React, { PropsWithChildren, ReactNode } from 'react'

// type Props = {
// }
// const PageContent = ({ children }: PropsWithChildren) => {
//     console.log('children', children)
//     return (
//         <Flex justify={'center'} p={'16px 0px'} >
//             <Flex width={'95%'} justify={'center'} maxWidth={'860px'}>
//                 <Flex direction={'column'} width={{ base: '100%', md: '65%' }} mr={{ base: 0, md: 6 }}>{children && children[0 as keyof typeof children]}</Flex>
//                 <Flex direction={'column'}
//                     flexGrow={1} display={{ base: 'none', md: 'flex' }}>{children && children[1 as keyof typeof children]}</Flex>
//             </Flex>
//         </Flex>
//     )
// }
// export default PageContent
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
    maxWidth?: string;
    children: React.ReactNode
}

// Assumes array of two children are passed
const PageContentLayout: React.FC<PageContentLayoutProps> = ({
    children,
    maxWidth,
}) => {
    return (
        <Flex justify="center" p="16px 0px">
            <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
                <Flex
                    direction="column"
                    width={{ base: "100%", md: "65%" }}
                    mr={{ base: 0, md: 6 }}
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/* Right Content */}
                <Box
                    display={{ base: "none", md: "flex" }}
                    flexDirection="column"
                    flexGrow={1}
                >
                    {children && children[1 as keyof typeof children]}
                </Box>
            </Flex>
        </Flex>
    );
};

export default PageContentLayout;