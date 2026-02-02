import { Bike, DiaryEntry, Component } from './types'

export const mockBikes: Bike[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    name: 'Giant Defy Advanced',
    type: 'road',
    description: 'Mi compañera de fondo. Cuadro de carbono, cómoda para rutas de +100km. Mejorada gradualmente desde 2023.',
    photo_url: null,
    is_public: false,
    current_version: 2,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    name: 'Trek Domane AL',
    type: 'mtb',
    description: 'Configurada para senderos y algo de enduro ligero. Robusta y fiable.',
    photo_url: null,
    is_public: false,
    current_version: 1,
    created_at: new Date('2024-03-20').toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    name: 'Canyon Grizl',
    type: 'gravel',
    description: 'La reina de las pistas. Versátil para bikepacking y exploración.',
    photo_url: null,
    is_public: true,
    current_version: 3,
    created_at: new Date('2024-05-10').toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    bike_id: '1',
    content: 'Instalación de pedales Shimano 105 R7000. La transferencia de potencia se siente mucho más directa que con los pedales de plataforma anteriores.',
    photos: [],
    tags: ['#instalación', '#pedales'],
    mentioned_components: ['mock-comp-1'],
    is_public: false,
    created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'mock-user-1',
    bike_id: '1',
    content: 'Cambio de cassette a Ultegra R8100. Buscaba un escalonado más cerrado en los piñones centrales. La precisión es quirúrgica.',
    photos: [],
    tags: ['#mejora', '#transmisión'],
    mentioned_components: ['mock-comp-2'],
    is_public: false,
    created_at: new Date(Date.now() - 86400000 * 45).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'mock-user-1',
    bike_id: '1',
    content: 'Ruta de 120km por la sierra. Los neumáticos GP5000 ruedan increíblemente rápido. Presión a 5.5 bar perfecta para mi peso.',
    photos: [],
    tags: ['#salida', '#test'],
    mentioned_components: ['mock-comp-4'],
    is_public: false,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    user_id: 'mock-user-1',
    bike_id: '2',
    content: 'Primera salida seria con la Trek. El grupo SRAM Rival aguanta bien el barro, aunque quizás necesite un ajuste de tensión en el cable del desviador trasero.',
    photos: [],
    tags: ['#estreno', '#mtb'],
    mentioned_components: ['mock-comp-5'],
    is_public: false,
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    user_id: 'mock-user-1',
    bike_id: '3',
    content: 'Montaje de la Canyon Grizl. El cockpit es muy ergonómico y el paso de rueda permite incluso neumáticos de 50mm.',
    photos: [],
    tags: ['#unboxing', '#gravel'],
    mentioned_components: null,
    is_public: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    user_id: 'mock-user-1',
    bike_id: '1',
    content: 'Limpieza a fondo y engrasado de cadena con cera. El silencio de la transmisión es adictivo.',
    photos: [],
    tags: ['#mantenimiento'],
    mentioned_components: null,
    is_public: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    user_id: 'mock-user-1',
    bike_id: '3',
    content: 'Instalé el sillín Specialized Power. Mucho mejor soporte para mis isquiones en salidas largas.',
    photos: [],
    tags: ['#comodidad', '#sillin'],
    mentioned_components: ['mock-comp-6'],
    is_public: true,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockComponents: Component[] = [
  {
    id: 'mock-comp-1',
    name: 'Shimano 105 R7000 SPD-SL',
    brand: 'Shimano',
    category: 'pedals',
    specs: {
      weight: '265g',
      material: 'Carbon composite',
      tension: 'Adjustable'
    },
    affiliate_links: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-comp-2',
    name: 'Shimano Ultegra R8100 11-30',
    brand: 'Shimano',
    category: 'drivetrain',
    specs: {
      weight: '291g',
      range: '11-30T',
      speeds: '12v'
    },
    affiliate_links: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-comp-3',
    name: 'Hope Tech 3 V4',
    brand: 'Hope',
    category: 'brakes',
    specs: {
      weight: '344g',
      piston: '4 pistons',
      adjustment: 'Tool-free reach/bite'
    },
    affiliate_links: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-comp-4',
    name: 'Continental Grand Prix 5000',
    brand: 'Continental',
    category: 'tires',
    specs: {
      width: '28mm',
      tpi: '330',
      compound: 'Black Chili'
    },
    affiliate_links: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-comp-5',
    name: 'SRAM Rival eTap AXS',
    brand: 'SRAM',
    category: 'groupset',
    specs: {
      shifting: 'Wireless',
      speeds: '12v',
      interface: 'Bluetooth'
    },
    affiliate_links: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-comp-6',
    name: 'Specialized Power Expert',
    brand: 'Specialized',
    category: 'saddle',
    specs: {
      width: '143mm',
      rails: 'Titanium',
      padding: 'Level 2'
    },
    affiliate_links: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockUser = {
  id: 'mock-user-1',
  email: 'demo@bikebuild.com',
  name: 'Usuario Demo',
  avatar_url: null,
  created_at: new Date('2024-01-01').toISOString()
}

export const mockComponentContext = {
  'mock-comp-4': {
    id: 'ctx-1',
    component_id: 'mock-comp-4',
    source: 'reddit',
    source_url: 'https://reddit.com/r/cycling',
    summary: 'Referente absoluto en agarre y resistencia a la rodadura. Algo difíciles de montar la primera vez.',
    sentiment: 'positive',
    created_at: new Date().toISOString()
  }
}

export const getMockUser = () => mockUser

export const simulateApiCall = async <T>(
  callback: () => T,
  delay: number = 500
): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(callback()), delay)
  })
}
