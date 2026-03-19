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

import {

    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"


import { MdComputer, MdSupportAgent } from "react-icons/md";
import { FaHome } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';


import { useTheme } from 'next-themes';

const NavBar = () => {

    const { setTheme } = useTheme()

    return (
        <>
            <nav className='flex w-full items-center justify-between border-b px-4 py-4'>
                {/**Left */}

                colls

                {/**Right */}
                <div className='flex items-center gap-4'>
                    <Link href="/dashboard">Dashboard</Link>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Moon className='cursor-pointer' />
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
                            <Button variant="ghost">
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar></Button>
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
                            <SquareMenu className='cursor-pointer w-10' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>General</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span><FaHome /></span><Link href="/dashboard">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span><UserIcon /></span><Link href="/me">Account</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span><MdSupportAgent /></span><Link href="/dashboard/support">Support</Link>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem>
                                    <span><IoIosPeople /></span><Link href="/dashboard/players">Players</Link>
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
