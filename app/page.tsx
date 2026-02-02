'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { bikes, diaryEntries, components } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        {/* Main Content */}
        <main className="space-y-10">
          {/* Welcome & New Entry - High Contrast Hero */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mb-4">
                Bienvenido de nuevo
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mb-8 leading-relaxed">
                Tu diario técnico está listo. Registra cada ajuste, mejora o componente de tus máquinas favoritas en un solo lugar.
              </p>
              <Link href="/diary/new">
                <button className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-50 rounded-xl shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95">
                  <span className="mr-2">+</span> Nueva entrada en el diario
                </button>
              </Link>
            </div>
            {/* Subtle aesthetic pattern background */}
            <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
              <span className="text-[200px] leading-none">🔧</span>
            </div>
          </section>

          {/* Stats Grid - Neutral Minimalist */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Bicicletas</p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">{bikes.length}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">unidades</p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Entradas</p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">{diaryEntries.length}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">registros</p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Componentes</p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">{components.length}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">piezas</p>
              </div>
            </div>
          </section>

          {/* Bikes Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                Mis Máquinas
              </h2>
              <Link href="/bikes" className="text-sm font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300 transition-colors">
                Ver todas →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bikes.slice(0, 2).map(bike => (
                <Link key={bike.id} href={`/bikes/${bike.id}`} className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300">
                  <div className="h-48 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-5xl">
                    <span className="group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">
                      {bike.type === 'road' && '🛣️'}
                      {bike.type === 'mtb' && '🚵'}
                      {bike.type === 'gravel' && '🪨'}
                      {bike.type === 'urban' && '🚲'}
                    </span>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{bike.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        {bike.type}
                      </span>
                    </div>

                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {bike.description || 'Sin descripción técnica disponible.'}
                    </p>

                    <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-zinc-400">v{bike.current_version}.0</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                        <span className="text-xs text-zinc-400">
                          {new Date(bike.updated_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50 group-hover:translate-x-1 transition-transform">
                        Gestionar
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Actions - Minimalist Boxes */}
          <section className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/diary" className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition group">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">📓</span>
                  <span className="font-semibold text-zinc-950 dark:text-zinc-50">Ver Diario Global</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">→</span>
              </Link>
              <Link href="/components" className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition group">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🔍</span>
                  <span className="font-semibold text-zinc-950 dark:text-zinc-50">Explorar Componentes</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">→</span>
              </Link>
            </div>
          </section>
        </main>
      </div>

      <footer className="bg-zinc-50 dark:bg-zinc-950 py-16 px-4 transition-colors">
        <div className="max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
            BikeBuild © 2026 • Made for Enthusiasts
          </p>
          <button
            onClick={() => {
              if (confirm('¿Quieres resetear todos los datos a la versión por defecto?')) {
                localStorage.removeItem('bikebuild-storage');
                window.location.reload();
              }
            }}
            className="text-[10px] text-zinc-300 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition font-bold uppercase tracking-widest"
          >
            Resetear Base de Datos Local
          </button>
        </div>
      </footer>
    </div>
  )
}
