import React from "react";
import { Flex, Button } from '@chakra-ui/react'
import Link from "next/link"
const CommmunityNotFound = () => {
    return (
        <Flex
            direction={'column'} justifyContent={'center'} alignItems={'center'} minHeight={"60vh"}>
            sorry the community does not exist or has been banned
            <Link href={'/'}>
                <Button mt={4}>go home</Button></Link>
        </Flex>
    )
}
export default CommmunityNotFound