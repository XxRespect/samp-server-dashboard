'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Users, 
  ShoppingBag, 
  User, 
  Info, 
  Menu,
  LogIn,
  LogOut
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'

export default function HomePageNav() {
  const { data: session, status } = useSession()

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:text-grey hover:text-shadow-green-200-lg">
              
              <span className="text-xl font-bold text-gray-100">BMMSL</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-gray-100 transition-colors">
              <Home size={18} />
              <span>Início</span>
            </Link>
            <Link href="/sobre" className="flex items-center space-x-2 text-gray-400 hover:text-gray-100 transition-colors">
              <Info size={18} />
              <span>Sobre</span>
            </Link>
            <Link href="/admins" className="flex items-center space-x-2 text-gray-400 hover:text-gray-100 transition-colors">
              <Users size={18} />
              <span>Admins</span>
            </Link>
            <Link href="/loja" className="flex items-center space-x-2 text-gray-400 hover:text-gray-100 transition-colors">
              <ShoppingBag size={18} />
              <span>Loja</span>
            </Link>
            <Link href="/login" className="flex items-center space-x-2 text-gray-400 hover:text-gray-100 transition-colors">
              <User size={18} />
              <span>UCP</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700">
                    <Menu size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="text-gray-100 hover:text-gray-300">
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="text-gray-100 hover:text-gray-300"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-gray-700 hover:bg-gray-600 text-gray-100">
                <Link href="/login" className="flex items-center space-x-2">
                  <LogIn size={18} />
                  <span>Entrar</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
