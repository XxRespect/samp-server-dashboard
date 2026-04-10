'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Roboto } from 'next/font/google'
import { 
  Users, 
  ShoppingBag, 
  User, 
  Info
} from 'lucide-react'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  display: 'swap',
})

export default function Homepage() {
  return (
    <div className={`min-h-screen bg-gray-950 ${roboto.className}`}>
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
