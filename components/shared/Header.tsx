'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ModeToggle } from './ModeToggle'

export default function Header() {
    const pathname = usePathname()

    const navItems = [
        { name: 'Dashboard', href: '/' },
        { name: 'Garaje', href: '/bikes' },
        { name: 'Diario', href: '/diary' },
        { name: 'Componentes', href: '/components' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                                BikeBuild
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${isActive
                                            ? 'text-zinc-950 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800'
                                            : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Link
                            href="/diary/new"
                            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-50 rounded-lg shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                        >
                            + Nueva Entrada
                        </Link>

                        {/* Mobile menu button could go here if needed, keeping it simple for now */}
                        <div className="md:hidden flex items-center gap-4">
                            {/* Mobile Nav could be an icon button with a dropdown or drawer */}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation (Simple visible rows for now or hidden behind menu) */}
                <nav className="md:hidden flex items-center gap-1 overflow-x-auto pb-4 scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${isActive
                                    ? 'text-zinc-950 bg-zinc-100 border border-zinc-200'
                                    : 'text-zinc-500 hover:text-zinc-700'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}
