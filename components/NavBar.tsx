
import react from 'react';
import Link from 'next/link';
import { Moon } from 'lucide-react';


const NavBar = () => {
    return (
        <>
            <nav className='p-4 flex items-center justify-between'>
                {/**Left */}

                colls

                {/**Right */}
                <div className='flex items-center gap-4'>
                    <Link href="/dashboard">Dashboard</Link>
                    <Moon />


                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>
            </nav>
        </>
    )
}


export default NavBar;