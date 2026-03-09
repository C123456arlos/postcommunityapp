import useDirectory from '@/src/hooks/useDirectory'
import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'
import { ElementType } from 'react'

type Props = {
    displayText: string
    link: string
    icon: ElementType
    iconColor: string
    imageURL?: string
}

const MenuListItem = ({ displayText, link, icon, iconColor, imageURL }: Props) => {
    const { onSelectMenuItem } = useDirectory()
    return (
        <MenuItem width={'100%'} fontSize={'10pt'} _hover={{ bg: 'gray.100' }} onClick={() => onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })}>
            <Flex align={'center'}>{imageURL ? (<Image src={imageURL} borderRadius={'full'} boxSize={'18px'}
                mr={2} ></Image>) : (<Icon as={icon} fontSize={20} mr={2} color={iconColor}></Icon>)}
                {displayText}</Flex>
        </MenuItem>
    )
}

export default MenuListItem


