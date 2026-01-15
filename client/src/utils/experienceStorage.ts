type Json = null | boolean | number | string | Json[] | { [key: string]: Json }

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: Json) {
  localStorage.setItem(key, JSON.stringify(value))
}

const CART_KEY = 'hayyak.cafeteria.cart'
const BOOKINGS_KEY = 'hayyak.rooms.bookings'
const RSVPS_KEY = 'hayyak.events.rsvps'
const READ_NEWS_KEY = 'hayyak.news.read'

export type CartItem = {
  id: string
  nameEn: string
  nameAr: string
  qty: number
}

export function getCart(): CartItem[] {
  const items = readJson<CartItem[]>(CART_KEY, [])
  return Array.isArray(items) ? items : []
}

export function addToCart(item: Omit<CartItem, 'qty'>) {
  const cart = getCart()
  const idx = cart.findIndex((x) => x.id === item.id)
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], qty: cart[idx].qty + 1 }
  } else {
    cart.push({ ...item, qty: 1 })
  }
  writeJson(CART_KEY, cart)
}

export function setCartQty(id: string, qty: number) {
  const cart = getCart()
  const next = cart
    .map((x) => (x.id === id ? { ...x, qty } : x))
    .filter((x) => x.qty > 0)
  writeJson(CART_KEY, next)
}

export function clearCart() {
  writeJson(CART_KEY, [])
}

export type RoomBooking = {
  id: string
  roomId: string
  roomName: string
  date: string
  start: string
  end: string
  purpose: string
}

export function getBookings(): RoomBooking[] {
  const items = readJson<RoomBooking[]>(BOOKINGS_KEY, [])
  return Array.isArray(items) ? items : []
}

export function addBooking(booking: RoomBooking) {
  const items = getBookings()
  items.unshift(booking)
  writeJson(BOOKINGS_KEY, items)
}

export function cancelBooking(id: string) {
  writeJson(BOOKINGS_KEY, getBookings().filter((b) => b.id !== id))
}

export function getRsvps(): Record<string, boolean> {
  const r = readJson<Record<string, boolean>>(RSVPS_KEY, {})
  return r && typeof r === 'object' && !Array.isArray(r) ? r : {}
}

export function toggleRsvp(eventId: string) {
  const r = getRsvps()
  r[eventId] = !r[eventId]
  writeJson(RSVPS_KEY, r)
}

export function getReadNews(): Record<string, boolean> {
  const r = readJson<Record<string, boolean>>(READ_NEWS_KEY, {})
  return r && typeof r === 'object' && !Array.isArray(r) ? r : {}
}

export function toggleReadNews(id: string) {
  const r = getReadNews()
  r[id] = !r[id]
  writeJson(READ_NEWS_KEY, r)
}
