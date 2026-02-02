'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function BikesListPage() {
    const { bikes } = useStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <main className="w-full">
                    {bikes.length === 0 ? (
                        <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-xl mx-auto">
                            <div className="text-6xl mb-6 grayscale">🚲</div>
                            <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 mb-3">Tu garaje está vacío</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8 px-10 leading-relaxed">No hemos encontrado ninguna bicicleta registrada. Empieza registrando tu primera máquina para llevar el control de sus componentes.</p>
                            <Link
                                href="/bikes/new"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-50 rounded-xl shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                            >
                                Registrar mi primera Bici
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bikes.map(bike => (
                                <Link
                                    key={bike.id}
                                    href={`/bikes/${bike.id}`}
                                    className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 flex flex-col"
                                >
                                    <div className="h-44 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-5xl relative">
                                        <span className="group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">
                                            {bike.type === 'road' && '🛣️'}
                                            {bike.type === 'mtb' && '🚵'}
                                            {bike.type === 'gravel' && '🪨'}
                                            {bike.type === 'urban' && '🚲'}
                                        </span>
                                    </div>

                                    <div className="p-7 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition">{bike.name}</h3>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                                {bike.type}
                                            </span>
                                        </div>

                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                                            {bike.description || 'Sin descripción técnica disponible.'}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Versión actual</span>
                                                <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">v{bike.current_version}.0</span>
                                            </div>
                                            <div className="w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:bg-zinc-950 dark:group-hover:bg-zinc-50 group-hover:text-white dark:group-hover:text-zinc-950 transition-all transform group-hover:translate-x-1">
                                                →
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <footer className="py-16 text-center">
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-[10px]">Total: {bikes.length} Máquinas registradas</p>
            </footer>
        </div>
    )
}
