'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function DiaryPage() {
    const { diaryEntries, bikes } = useStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Helper to get bike name
    const getBikeName = (bikeId: string | null) => {
        if (!bikeId) return 'General'
        return bikes.find(b => b.id === bikeId)?.name || 'Bici desconocida'
    }

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <main className="max-w-3xl mx-auto w-full">
                    {diaryEntries.length === 0 ? (
                        <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="text-6xl mb-6 grayscale">📓</div>
                            <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 mb-3">Tu diario está vacío</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8 px-10 leading-relaxed">Registra tus cambios de piezas, sensaciones tras una ruta o ideas de futuras mejoras.</p>
                            <Link
                                href="/diary/new"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-50 rounded-xl shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                            >
                                Escribir mi primera entrada
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {[...diaryEntries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(entry => (
                                <div key={entry.id} className="relative pl-10">
                                    <div className="absolute left-[3px] top-4 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 last:hidden" />
                                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-950 dark:bg-zinc-50 ring-4 ring-zinc-50 dark:ring-zinc-950 z-10" />

                                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-7 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                                                    {getBikeName(entry.bike_id)}
                                                </span>
                                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                                    {new Date(entry.created_at).toLocaleDateString('es-ES', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 whitespace-pre-wrap">
                                            {entry.content}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {entry.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-100 dark:border-zinc-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <footer className="py-16 text-center">
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-[10px]">BikeBuild • Registro Histórico</p>
            </footer>
        </div>
    )
}
