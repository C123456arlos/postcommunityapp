import { Button, Flex, Image, Input, Stack } from '@chakra-ui/react'
import React, { useRef } from 'react'

type Props = {
    selectedFile?: string
    onSelecImage: (event: React.ChangeEvent<HTMLInputElement>) => void
    setSelectedTab: (value: string) => void
    setSelectedFile: (value: string) => void
}

const ImageUpload = ({ selectedFile, onSelecImage, setSelectedTab, setSelectedFile }: Props) => {
    const selectedFileRef = useRef<HTMLInputElement>(null)
    return (
        <Flex direction={'column'} justify={'center'} align={'center'} width={'100%'}>
            {selectedFile ? (<>
                <Image src={selectedFile} maxWidth={'400px'} maxHeight={'400px'}></Image>
                <Stack direction={'row'} mt={4}>
                    <Button height={'28px'} onClick={() => setSelectedTab('Post')}>back post</Button>
                    <Button variant={'outline'} height={'28px'} onClick={() => setSelectedFile('')}>remove</Button>
                </Stack>
            </>) : (

                <Flex justify={'center'} align={'center'} p={20} border={'1px dashed'} borderColor={'gray.200'}
                    width={'100%'} borderRadius={4}>
                    <Button variant={'outline'} height={'20px'} onClick={() => selectedFileRef.current?.click()}>upload</Button>
                    <Input ref={selectedFileRef} type='file' hidden onChange={onSelecImage}></Input>
                    <img src={selectedFile}></img>
                </Flex >
            )
            }
        </Flex>
    )
}

export default ImageUpload