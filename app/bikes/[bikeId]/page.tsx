'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/lib/store'

type ViewMode = 'overview' | 'diary' | 'timeline'

export default function BikeDetailPage({ params: paramsPromise }: { params: Promise<{ bikeId: string }> }) {
  const params = use(paramsPromise)
  const router = useRouter()
  const { bikes, diaryEntries, deleteBike, addDiaryEntry } = useStore()

  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  const [newEntryContent, setNewEntryContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['#mantenimiento'])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />

  const bike = bikes.find(b => b.id === params.bikeId)

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="text-center bg-white dark:bg-zinc-900 p-12 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 border-dashed max-w-md">
          <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-50 mb-4">🚲 Ups...</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8 leading-relaxed">Esta bicicleta ya no está en tu garaje.</p>
          <button
            onClick={() => router.push('/bikes')}
            className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-lg active:scale-95"
          >
            ← Volver al Garaje
          </button>
        </div>
      </div>
    )
  }

  const bikeEntries = diaryEntries.filter(entry => entry.bike_id === bike.id)

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar esta bicicleta? Se borrará todo su historial.')) {
      deleteBike(bike.id)
      router.push('/bikes')
    }
  }

  const handleCreateEntry = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!newEntryContent.trim()) return

    addDiaryEntry({
      user_id: 'mock-user-1',
      bike_id: bike.id,
      content: newEntryContent,
      photos: [],
      tags: selectedTags.length > 0 ? selectedTags : ['#mantenimiento'],
      mentioned_components: null,
      is_public: false,
    })

    setNewEntryContent('')
    setSelectedTags(['#mantenimiento'])
    setViewMode('timeline')
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{bike.name}</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest mt-1">Gestión de máquina</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              ✏️ <span className="ml-2 hidden sm:inline">Editar</span>
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 border border-transparent rounded-lg transition-colors"
            >
              🗑️
            </button>
          </div>
        </header>

        <main className="w-full">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-10 overflow-x-auto">
            {(['overview', 'timeline', 'diary'] as ViewMode[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setViewMode(tab)}
                className={`pb-4 px-6 text-sm font-semibold transition-all whitespace-nowrap border-b-2 ${viewMode === tab
                  ? 'text-zinc-950 dark:text-zinc-50 border-zinc-950 dark:border-zinc-50'
                  : 'text-zinc-500 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
              >
                {tab === 'overview' && 'Resumen'}
                {tab === 'timeline' && `Historial (${bikeEntries.length})`}
                {tab === 'diary' && '+ Nueva Entrada'}
              </button>
            ))}
          </div>

          <div>
            {viewMode === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-full flex items-center justify-center text-6xl mb-6 shadow-inner grayscale">
                      {bike.type === 'road' && '🛣️'}
                      {bike.type === 'mtb' && '🚵'}
                      {bike.type === 'gravel' && '🪨'}
                      {bike.type === 'urban' && '🚲'}
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 mb-1 text-center">{bike.name}</h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 mb-8">
                      {bike.type}
                    </span>
                    <div className="w-full space-y-5 pt-8 border-t border-zinc-50 dark:border-zinc-800">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Versión actual</span>
                        <span className="font-bold text-zinc-950 dark:text-zinc-50 text-sm">v{bike.current_version}.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Registrada</span>
                        <span className="font-bold text-zinc-950 dark:text-zinc-50 text-sm">{new Date(bike.created_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 lg:col-span-9 space-y-10">
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6">Descripción Técnica</h3>
                    <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">{bike.description || 'No hay descripción disponible para esta bicicleta.'}</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Entradas</p>
                      <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">{bikeEntries.length}</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Componentes</p>
                      <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">{Array.from(new Set(bikeEntries.flatMap(e => e.mentioned_components || []))).length}</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Alertas</p>
                      <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">0</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'timeline' && (
              <div className="max-w-3xl mx-auto">
                {bikeEntries.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 border-dashed">
                    <span className="text-6xl mb-6 block grayscale">📓</span>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-2">Historial vacío</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-8 mx-auto max-w-sm leading-relaxed">Empieza a registrar cambios o salidas para llevar un control detallado de esta máquina.</p>
                    <button
                      onClick={() => setViewMode('diary')}
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-50 rounded-xl shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                    >
                      Crear primera nota
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {[...bikeEntries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((entry) => (
                      <div key={entry.id} className="relative pl-10">
                        <div className="absolute left-[3px] top-4 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800" />
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-950 dark:bg-zinc-50 ring-4 ring-zinc-50 dark:ring-zinc-950 z-10" />
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-7 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                              {new Date(entry.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <div className="flex gap-2">
                              {entry.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-100 dark:border-zinc-700 font-semibold uppercase tracking-tight">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {viewMode === 'diary' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-8 flex items-center gap-3">
                    <span className="p-2 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-lg text-sm">📝</span>
                    Nueva entrada en el diario
                  </h2>
                  <form onSubmit={handleCreateEntry} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Descripción de la actividad</label>
                      <textarea
                        className="w-full p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-zinc-50 dark:focus:ring-zinc-800/50 focus:border-zinc-950 dark:focus:border-zinc-700 outline-none transition-all text-zinc-800 dark:text-zinc-200 bg-zinc-50/50 dark:bg-zinc-800/50 min-h-[180px]"
                        placeholder="¿Qué ha cambiado hoy? Ajustes técnicos, componentes nuevos, sensaciones en ruta..."
                        value={newEntryContent}
                        onChange={(e) => setNewEntryContent(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3 ml-1">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {['#mejora', '#ajuste', '#ruta', '#mantenimiento', '#test'].map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                            className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${selectedTags.includes(tag)
                              ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-50'
                              : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                              }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!newEntryContent.trim()}
                      className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg active:scale-95 transition-all disabled:opacity-50"
                    >
                      💾 Guardar Nota
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <footer className="py-16 text-center">
        <p className="text-zinc-400 font-medium uppercase tracking-widest text-[10px]">Actualizado: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  )
}
