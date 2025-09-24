'use client';

import { Drawer as DrawerSource } from 'vaul';

function Drawer({children, direction}) {
    return (
        <DrawerSource.Root direction={direction}>{children}</DrawerSource.Root>
    )
}

function DrawerTrigger({children, className}) {
    return (
        <DrawerSource.Trigger asChild className={className}>{children}</DrawerSource.Trigger>
    )
}

function DrawerPortal({children}) {
    return (
        <DrawerSource.Portal>{children}</DrawerSource.Portal>
    )
}

function DrawerOverlay({className}) {
    return (
        <DrawerSource.Overlay className={`fixed inset-0 bg-black/10 backdrop-blur-xs ${className}`} />
    )
}

function DrawerContent({children, className}) {
    return (
        <DrawerSource.Content className={`dark:bg-[#202020] rounded-t-[30px] h-[85dvh] fixed bottom-0 left-0 right-0 outline-none p-5 ${className}`}>{children}</DrawerSource.Content>
    )
}

function DrawerHandle() {
    return (
        <DrawerSource.Handle />
    )
}

function DrawerTitle({children, className}) {
    return (
        <DrawerSource.Title className={className}>{children}</DrawerSource.Title>
    )
}

function DrawerDescription({children, className}) {
    return (
        <DrawerSource.Description className={className}>{children}</DrawerSource.Description>
    )
}

function DrawerClose({children, className}) {
    return (
        <DrawerSource.Close className={className}>{children}</DrawerSource.Close>
    )
}


export { 
    Drawer, 
    DrawerTrigger, 
    DrawerPortal, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerHandle, 
    DrawerTitle,
    DrawerDescription,
    DrawerClose
};
