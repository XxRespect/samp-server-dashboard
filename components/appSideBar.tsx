import Link from 'next/link';

import { MdAdminPanelSettings, MdBlock, MdSupportAgent } from "react-icons/md";
import {
    FaCloudMoon,
    FaFlag,
    FaHome,
    FaShoppingBag,
    FaRegObjectGroup,
    FaMap
} from 'react-icons/fa';

import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenu,
    SidebarProvider,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarSeparator,
    SidebarGroupAction,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import {
    MessageCircleX,
    Columns4,
    CreditCard,
    MonitorCog,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
    ServerCrash,
    ChevronUp,
    Moon,
    Plus,
    Shield,
    Sun,
    User2,
    Waypoints
} from 'lucide-react';
import {
    FaUsersCog,
    FaHouseDamage
} from "react-icons/fa";

import {
    MdOutlineMarkUnreadChatAlt,
    MdOutlineDeveloperBoard,
    MdManageHistory 
} from "react-icons/md";

import { IoIosPeople } from 'react-icons/io';
import { RiAdminFill, } from "react-icons/ri";
import { SiRockstargames } from "react-icons/si";
import { LuLogs } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SiGeneralelectric, SiPlayerdotme } from "react-icons/si";
import { TbMessageCircleX } from 'react-icons/tb';
import { AiOutlineSecurityScan } from "react-icons/ai";


const Items = [
    {
        title: "Home",
        icon: FaHome,
        link: "/dashboard"
    },
    {
        title: "Profile",
        icon: UserIcon,
        link: "/dashboard"
    },
    {
        title: "Support",
        icon: MdSupportAgent,
        link: "/dashboard/support"
    },
    {
        title: "Clan",
        icon: PiMicrosoftTeamsLogoLight,
        link: "/dashboard/clan"
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        link: "/dashboard/settings"
    }
]


const SideBar = () => {
    return (
        <>
            <Sidebar collapsible='icon'>
                <SidebarHeader className='py-4'>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/evilrabbit.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="text-lg font-bold">Game Panel</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarSeparator className='w-45' />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Application
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {Items.map((item, index) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.link}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarSeparator className='w-45' />               
                    {/**User Area */}
                    <SidebarGroup>
                        <SidebarGroupLabel> General </SidebarGroupLabel>
                        <SidebarGroupAction>
                            <SiPlayerdotme className='w-4 h-4' />
                            <span className='sr-only'>General</span>
                        </SidebarGroupAction>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/users'>
                                            <IoIosPeople className='w-4 h-4' />
                                            <span>Players</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/clans'>
                                            <Shield className='w-4 h-4' />
                                            <span>Clans</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/zones'>
                                            <FaFlag className='w-4 h-4' />
                                            <span>Zones</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/properties'>
                                            <FaHouseDamage className='w-4 h-4' />
                                            <span>Properties</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/tops'>
                                            <Waypoints className='w-4 h-4' />
                                            <span>Ranking</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
    
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/modes'>
                                            <SiRockstargames className='w-4 h-4' />
                                            <span>Modes </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='/dashboard/zones'>
                                            <FaShoppingBag className='w-4 h-4' />
                                            <span>Shop</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarSeparator className='w-45' />
                    <SidebarGroup>
                        <SidebarGroupLabel>Administration</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <MdAdminPanelSettings className='w-5 h-4' />
                            <span className='sr-only'>Administration</span>
                        </SidebarGroupAction>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/Tickets'>
                                            <MdSupportAgent className='w-4 h-4' />
                                            <span>Tickets</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/banneds'>
                                            <MdBlock className='w-4 h-4' />
                                            <span>Banneds</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/banneds'>
                                            <MdBlock className='w-4 h-4' />
                                            <span>Ip Banneds</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/muteds'>
                                            <TbMessageCircleX className='w-4 h-4' />
                                            <span>Muted</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/jailed'>
                                            <Columns4 className='w-4 h-4' />
                                            <span>Jail</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/jailed'>
                                            <RiAdminFill className='w-4 h-4' />
                                            <span>Admins</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/auditorium'>
                                            <MdManageHistory  className='w-4 h-4' />
                                            <span>Auditorium</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/Logs'>
                                            <LuLogs className='w-4 h-4' />
                                            <span>Logs</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/Logs'>
                                            <MdOutlineMarkUnreadChatAlt className='w-4 h-4' />
                                            <span>Chat Logs</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/purchases'>
                                            <CreditCard className='w-4 h-4' />
                                            <span>Purchases</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/purchases'>
                                            <ServerCrash className='w-4 h-4' />
                                            <span>Server</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarGroupContent>

                    </SidebarGroup>
                    <SidebarSeparator />
                    <SidebarGroup>
                        <SidebarGroupLabel>Owner</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <MdOutlineDeveloperBoard className='w-5 h-4' />
                            <span className='sr-only'>Owner</span>
                        </SidebarGroupAction>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/accounts'>
                                            <FaUsersCog />
                                            <span>Accounts</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/acsettings'>
                                            <MonitorCog />
                                            <span>Anti Cheat</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/objects'>
                                            <FaRegObjectGroup className='w-4 h-4' />
                                            <span>Objects</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/serials'>
                                            <MdBlock className='w-4 h-4' />
                                            <span>Serial Banneds</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href='dashboard/serials'>
                                            <FaMap className='w-4 h-4' />
                                            <span>Maps</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>



                {/**Sidebar Footer */}
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 />Jan Karlos <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='flex flex-col' align="end">
                                    <DropdownMenuItem className='cursor-pointer :hover:bg-muted'>Account</DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer :hover:bg-muted'>Profile</DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer :hover:bg-muted'>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='cursor-pointer :hover:bg-muted'>Sign Out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}


export default SideBar;
