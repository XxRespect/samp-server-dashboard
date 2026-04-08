"use client"

import Link from 'next/link';
import { Moon, SquareMenu, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { BsLayoutSidebarInset } from "react-icons/bs";
import { useSidebar } from './ui/sidebar';

import {
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"

import { MdComputer, MdSupportAgent } from "react-icons/md";
import { FaCloudMoon, FaHome } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { useTheme } from 'next-themes';
import { SidebarTrigger } from './ui/sidebar';

import {useSession} from 'next-auth/react'

const NavBar = () => {

    const {data: session} = useSession();

    const { setTheme } = useTheme()
    const {toggleSidebar} = useSidebar()
    return (
        <>
            <nav className='flex w-full items-center justify-between border-b px-4 py-4 sticky'>
                {/**Left */}

                {/*<SidebarTrigger className='cursor-pointer p-4 ' variant='outline'/>*/}

                <Button variant='outline' className='cursor-pointer p-4 ' size="icon" aria-label="Open sidebar" onClick={toggleSidebar}>
                    <BsLayoutSidebarInset className='w-7 h-7' />
                </Button>
               

                {/**Right */}
                <div className='flex items-center gap-4'>
                    <Link href="/dashboard" className='font-bold text-shadow-blue-50 border-b-1 hover:transition-all hover:scale-120'>{session?.user?.Nome}</Link>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='cursor-pointer p-4 ' size="icon" aria-label="Alterar tema">
                                <FaCloudMoon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                <Sun />
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                <Moon />
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('system')}>
                                <MdComputer />
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='cursor-pointer' size="icon" aria-label="Abrir menu">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <UserIcon />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <MdSupportAgent />
                                support
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SettingsIcon />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                                <LogOutIcon />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                
                    <DropdownMenu>
                        <DropdownMenuTrigger  asChild>
                            <Button variant="outline" size="xs" aria-label="Abrir menu" className='cursor-pointer p-4'>
                                <SquareMenu className='w-15 h-3'   />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>General</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span><FaHome /></span><Link href="/dashboard">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span><UserIcon /></span><Link href="/dashboard/profile">Account</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span><MdSupportAgent /></span><Link href="/dashboard/support">Support</Link>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem>
                                    <span><IoIosPeople /></span><Link href="/dashboard/users">Players</Link>
                                </DropdownMenuItem>
                                
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </>
    )
}


export default NavBar;
