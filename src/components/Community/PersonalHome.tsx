import React from 'react'
import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
const PersonalHome: React.FC = () => {
    return (
        <Flex
            direction={'column'}
            bg={'white'} borderRadius={4} cursor={'pointer'}
            border={'1px solid'} borderColor={'gray.300'} position={'sticky'}>
            <Flex align={'flex-end'} color={'white'}
                p={'6px 10px'} bg={'blue.500'} height={'34px'}
                borderRadius={'4px 4px 0px 0px'} fontWeight={600}
                bgImage={'url(/images/redditPersonalHome.png)'}
                backgroundSize={'cover'}></Flex>
            <Flex direction={'column'} p={'12px'}>
                <Flex align={'center'} mb={2}>
                    <Icon as={FaReddit} fontSize={50} color={'brand.100'}
                        mr={2}></Icon>
                    <Text fontWeight={600}>home</Text>
                </Flex>
                <Stack spacing={3}>
                    <Text fontSize='9pt'>built reddit perosnal page</Text>
                    <Button height={'30px'}>create post</Button>
                    <Button variant={'outline'} height={'30px'}>create community</Button>
                </Stack>
            </Flex>
        </Flex>
    )
}
export default PersonalHome