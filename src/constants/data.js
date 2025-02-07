export const barbers = [
  {
    id: 1,
    name: 'Etiene',
  },
  {
    id: 2,
    name: 'Barbeiro 2',
  },
  {
    id: 3,
    name: 'Barbeiro 3',
  },
]

export const appointments = [
  {
    id: 1,
    barber: 'Etiene',
    services: ['Cabelo', 'Barba', 'Sobrancelha'],
    date: '2021/10/10',
    time: '08:00'
  },
  {
    id: 2,
    barber: 'Barbeiro 2',
    services: ['Cabelo'],
    date: '2021/10/10',
    time: '09:00'
  },
  {
    id: 3,
    barber: 'Barbeiro 3',
    services: ['Cabelo', 'Barba'],
    date: '2021/10/10',
    time: '10:00'
  },
]

export const services = [
  {
    id: 1,
    name: 'Cabelo',
    price: 30
  },
  {
    id: 2,
    name: 'Barba',
    price: 30
  },
  {
    id: 3,
    name: 'Cabelo + Barba',
    price: 60
  },
  {
    id: 4,
    name: 'Sobrancelha',
    price: 15
  },
  {
    id: 5,
    name: 'Alisamento',
    price: 30
  },
  {
    id: 6,
    name: 'Progressiva',
    price: 60
  },
  {
    id: 7,
    name: 'Corte + Progressiva',
    price: 90
  },
  {
    id: 8,
    name: 'Pezinho',
    price: 15
  },
  {
    id: 9,
    name: 'Cabelo + Barba (promoção)',
    price: 50
  }
]