import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Bike, DiaryEntry, Component } from './types'
import { mockBikes, mockDiaryEntries, mockComponents } from './mock-data'

interface BikeStore {
  bikes: Bike[]
  diaryEntries: DiaryEntry[]
  components: Component[]
  
  // Actions
  addBike: (bike: Omit<Bike, 'id' | 'created_at' | 'updated_at'>) => void
  updateBike: (id: string, bike: Partial<Bike>) => void
  deleteBike: (id: string) => void
  
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'created_at' | 'updated_at'>) => void
  updateDiaryEntry: (id: string, entry: Partial<DiaryEntry>) => void
  deleteDiaryEntry: (id: string) => void
  
  addComponent: (component: Omit<Component, 'id' | 'created_at' | 'updated_at'>) => void
}

export const useStore = create<BikeStore>()(
  persist(
    (set) => ({
      bikes: mockBikes,
      diaryEntries: mockDiaryEntries,
      components: mockComponents,

      addBike: (bikeData) => set((state) => ({
        bikes: [
          ...state.bikes,
          {
            ...bikeData,
            id: Math.random().toString(36).substring(7),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ]
      })),

      updateBike: (id, bikeData) => set((state) => ({
        bikes: state.bikes.map((b) => b.id === id ? { ...b, ...bikeData, updated_at: new Date().toISOString() } : b)
      })),

      deleteBike: (id) => set((state) => ({
        bikes: state.bikes.filter((b) => b.id !== id),
        diaryEntries: state.diaryEntries.filter((e) => e.bike_id !== id)
      })),

      addDiaryEntry: (entryData) => set((state) => ({
        diaryEntries: [
          ...state.diaryEntries,
          {
            ...entryData,
            id: Math.random().toString(36).substring(7),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ]
      })),

      updateDiaryEntry: (id, entryData) => set((state) => ({
        diaryEntries: state.diaryEntries.map((e) => e.id === id ? { ...e, ...entryData, updated_at: new Date().toISOString() } : e)
      })),

      deleteDiaryEntry: (id) => set((state) => ({
        diaryEntries: state.diaryEntries.filter((e) => e.id !== id)
      })),

      addComponent: (compData) => set((state) => ({
        components: [
          ...state.components,
          {
            ...compData,
            id: Math.random().toString(36).substring(7),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ]
      })),
    }),
    {
      name: 'bikebuild-storage',
    }
  )
)
