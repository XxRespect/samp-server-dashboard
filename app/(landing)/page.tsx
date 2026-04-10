'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Roboto } from 'next/font/google'
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

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  display: 'swap',
})

export default function Homepage() {
  const { data: session, status } = useSession()

  return (
    <div className={`min-h-screen bg-gray-950 ${roboto.className}`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-lg border border-gray-600"></div>
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

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6">
              Bem-vindo ao <span className="text-gray-300">BMMSL</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Experimente a melhor jogabilidade de SAMP com nosso servidor exclusivo. 
              Junte-se a milhares de jogadores e divirta-se!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gray-700 hover:bg-gray-600 text-gray-100">
                <Link href="/login">
                  <User size={20} className="mr-2" />
                  Acessar UCP
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700">
                <Link href="/sobre">
                  <Info size={20} className="mr-2" />
                  Saiba Mais
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Comunidade Ativa</h3>
              <p className="text-gray-400">Junte-se a uma comunidade vibrante com jogadores online 24/7</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Loja Exclusiva</h3>
              <p className="text-gray-400">Compre VIP, moedas e itens exclusivos em nossa loja</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Painel UCP</h3>
              <p className="text-gray-400">Gerencie sua conta, estatísticas e muito mais</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
