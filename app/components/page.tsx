'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'

export default function ComponentsPage() {
    const { components } = useStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [mounted, setMounted] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="min-h-screen bg-white" />

    const categories = ['all', ...Array.from(new Set(components.map(c => c.category?.toLowerCase() || 'otros')))]

    const filteredComponents = components.filter(comp => {
        const nameMatch = comp.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
        const brandMatch = comp.brand?.toLowerCase().includes(searchTerm.toLowerCase()) || false
        const matchesSearch = nameMatch || brandMatch

        const compCategory = comp.category?.toLowerCase() || 'otros'
        const matchesCategory = selectedCategory === 'all' || compCategory === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative w-full md:max-w-md">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600">🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar por nombre o marca..."
                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-4 focus:ring-zinc-50 dark:focus:ring-zinc-800/50 focus:border-zinc-950 dark:focus:border-zinc-700 transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${selectedCategory === cat
                                        ? 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-50 shadow-md'
                                        : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                        }`}
                                >
                                    {cat === 'all' ? 'Todos' : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="w-full">
                    {filteredComponents.length === 0 ? (
                        <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 border-dashed max-w-xl mx-auto">
                            <div className="text-6xl mb-6 grayscale">⚙️</div>
                            <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 mb-3">Sin resultados</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 px-10 leading-relaxed">No hemos encontrado componentes que coincidan con tu búsqueda. Intenta con otros términos.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                                className="mt-8 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-lg active:scale-95"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredComponents.map(comp => (
                                <div key={comp.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 flex flex-col">
                                    <div className="p-8 pb-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{comp.brand}</p>
                                                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition leading-tight">{comp.name}</h3>
                                            </div>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700">
                                                {comp.category}
                                            </span>
                                        </div>

                                        <div className="space-y-3 py-6 border-t border-zinc-50 dark:border-zinc-800">
                                            {comp.specs && Object.entries(comp.specs).map(([key, value]) => (
                                                <div key={key} className="flex justify-between items-center text-xs">
                                                    <span className="text-zinc-400 dark:text-zinc-500 font-medium capitalize">{key}</span>
                                                    <span className="text-zinc-900 dark:text-zinc-100 font-bold">{String(value)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 pt-0 mt-auto">
                                        <button className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 py-3 rounded-xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                            <span>Añadir a mi build</span>
                                            <span className="text-lg">+</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <footer className="py-16 text-center">
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-[10px]">Total: {filteredComponents.length} Componentes indexados</p>
            </footer>
        </div>
    )
}
