import { link } from 'node:fs'
import { ElementType } from 'react'
import { IconType } from 'react-icons'
import { TiHome } from 'react-icons/ti'
import { atom } from 'recoil'
export type DirectoryMenuItem = {
    displayText: string
    link: string
    icon: ElementType | IconType
    iconColor: string
    imageURL?: string
}

interface DirectoryMenuState {
    isOpen: boolean
    selectedMenuItem: DirectoryMenuItem
}
export const defaultMenuitem: DirectoryMenuItem = {
    displayText: 'Home',
    link: '/',
    icon: TiHome,
    iconColor: 'black'
}
export const defaultMenuState: DirectoryMenuState = {
    isOpen: false,
    selectedMenuItem: defaultMenuitem
}
export const directoryMenuState = atom<DirectoryMenuState>({
    key: 'directoryMenuState',
    default: defaultMenuState
})