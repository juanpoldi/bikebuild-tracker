'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/lib/store'

export default function NewDiaryEntryPage() {
    const router = useRouter()
    const { bikes, addDiaryEntry } = useStore()
    const [mounted, setMounted] = useState(false)

    const [content, setContent] = useState('')
    const [bikeId, setBikeId] = useState<string>('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const tags = [
        { id: '#mantenimiento', label: 'Mantenimiento' },
        { id: '#mejora', label: 'Mejora' },
        { id: '#ajuste', label: 'Ajuste' },
        { id: '#ruta', label: 'Ruta' },
        { id: '#compra', label: 'Compra' },
        { id: '#test', label: 'Test' },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        setIsSubmitting(true)

        // Simulate a bit of delay for better UX
        await new Promise(resolve => setTimeout(resolve, 600))

        addDiaryEntry({
            user_id: 'mock-user-1',
            bike_id: bikeId || null,
            content,
            photos: [],
            tags: selectedTags,
            mentioned_components: null,
            is_public: false
        })

        router.push('/diary')
    }

    const toggleTag = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(t => t !== tagId)
                : [...prev, tagId]
        )
    }

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Contenido principal */}
                    <section className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                        <div className="space-y-4">
                            <label htmlFor="content" className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                ¿Qué ha pasado hoy?
                            </label>
                            <textarea
                                id="content"
                                required
                                rows={6}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all resize-none"
                                placeholder="Describe el ajuste, la pieza instalada o las sensaciones en ruta..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label htmlFor="bike" className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                    Vincular a una bicicleta
                                </label>
                                <select
                                    id="bike"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
                                    value={bikeId}
                                    onChange={(e) => setBikeId(e.target.value)}
                                >
                                    <option value="">Entrada General (Ninguna)</option>
                                    {bikes.map(bike => (
                                        <option key={bike.id} value={bike.id}>{bike.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                    Etiquetas
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => toggleTag(tag.id)}
                                            className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${selectedTags.includes(tag.id)
                                                ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-50'
                                                : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
                                                }`}
                                        >
                                            {tag.id}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !content.trim()}
                            className={`w-full sm:w-auto px-10 py-3 text-sm font-bold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-50 rounded-xl shadow-lg transition-all active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-zinc-800 dark:hover:bg-zinc-200'
                                }`}
                        >
                            {isSubmitting ? 'Guardando...' : 'Publicar entrada'}
                        </button>
                    </div>
                </form>
            </main>

            <footer className="py-12 text-center">
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-[10px]">Paso 1 de 1: Completa la información de tu build</p>
            </footer>
        </div>
    )
}
