'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { BikeType } from '@/lib/types'

export default function NewBikePage() {
    const router = useRouter()
    const { addBike } = useStore()

    const [name, setName] = useState('')
    const [type, setType] = useState<BikeType>('road')
    const [description, setDescription] = useState('')

    const bikeTypes: { id: BikeType; label: string; icon: string }[] = [
        { id: 'road', label: 'Ruta', icon: '🛣️' },
        { id: 'mtb', label: 'Montaña', icon: '🚵' },
        { id: 'gravel', label: 'Gravel', icon: '🪨' },
        { id: 'urban', label: 'Urbana', icon: '🏙️' },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        addBike({
            user_id: 'mock-user-1',
            name,
            type,
            description,
            photo_url: null,
            is_public: false,
            current_version: 1,
        })

        router.push('/bikes')
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
            <header className="py-6 bg-white dark:bg-zinc-900 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition">
                        ← Volver
                    </button>
                    <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                        🚲 Registrar Nueva Bici
                    </h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 space-y-8 shadow-sm">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider mb-2">
                            Nombre de la Bicicleta
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Ej: Giant Defy 2023, Mi MTB..."
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800/50 focus:border-zinc-950 dark:focus:border-zinc-600 outline-none transition text-lg text-zinc-950 dark:text-zinc-50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider mb-4">
                            Tipo de Bicicleta
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {bikeTypes.map(bt => (
                                <button
                                    key={bt.id}
                                    type="button"
                                    onClick={() => setType(bt.id)}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${type === bt.id
                                        ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800 shadow-md'
                                        : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                                        }`}
                                >
                                    <span className="text-3xl">{bt.icon}</span>
                                    <span className={`text-sm font-bold ${type === bt.id ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                        {bt.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-400 uppercase tracking-wider mb-2">
                            Descripción (Opcional)
                        </label>
                        <textarea
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800/50 focus:border-zinc-950 dark:focus:border-zinc-600 outline-none transition text-md text-zinc-800 dark:text-zinc-200"
                            rows={4}
                            placeholder="Cuéntanos un poco sobre esta bici, cuándo la compraste, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 py-4 rounded-xl font-bold text-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg transition active:scale-95"
                        >
                            💾 Guardar Bicicleta
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
