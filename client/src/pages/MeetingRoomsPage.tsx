import { IconCalendarEvent, IconChecks, IconX } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { addBooking, cancelBooking, getBookings, type RoomBooking } from '../utils/experienceStorage'

type Room = {
  id: string
  name: string
  location: string
  capacity: number
}

const rooms: Room[] = [
  { id: 'room-a', name: 'Meeting Room A', location: 'HQ · Floor 7', capacity: 6 },
  { id: 'room-b', name: 'Meeting Room B', location: 'HQ · Floor 7', capacity: 10 },
  { id: 'room-c', name: 'Meeting Room C', location: 'HQ · Floor 8', capacity: 14 },
]

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function MeetingRoomsPage() {
  const { t } = useI18n()
  const [, setTick] = useState(0)

  const bookings = getBookings()

  const [roomId, setRoomId] = useState(rooms[0]?.id ?? '')
  const [date, setDate] = useState('2026-01-20')
  const [start, setStart] = useState('10:00')
  const [end, setEnd] = useState('10:30')
  const [purpose, setPurpose] = useState('')

  const selectedRoom = useMemo(() => rooms.find((r) => r.id === roomId), [roomId])

  const disabled = !roomId || !date || !start || !end || !purpose.trim()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('rooms.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('rooms.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoomId(r.id)}
                className={`rounded-3xl p-5 text-left shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  roomId === r.id
                    ? 'bg-white ring-[#E1523E]/30 dark:bg-slate-900 dark:ring-[#E1523E]/40'
                    : 'bg-white ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10'
                }`}
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white">{r.name}</div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{r.location}</div>
                <div className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">{t('rooms.capacity').replace('{count}', String(r.capacity))}</div>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <div className="flex items-center gap-2">
              <IconCalendarEvent className="h-5 w-5 text-[#E1523E]" />
              <h2 className="text-lg font-bold text-[#002855] dark:text-white">{t('rooms.book.title')}</h2>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('rooms.book.room')}</div>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-slate-950/40"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('rooms.book.date')}</div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-slate-950/40"
                />
              </label>

              <label className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('rooms.book.start')}</div>
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-slate-950/40"
                />
              </label>

              <label className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('rooms.book.end')}</div>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-slate-950/40"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('rooms.book.purpose')}</div>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-slate-950/40"
                />
              </label>

              <button
                type="button"
                disabled={disabled}
                onClick={() => {
                  const r = selectedRoom
                  if (!r) return
                  const booking: RoomBooking = {
                    id: uid(),
                    roomId: r.id,
                    roomName: r.name,
                    date,
                    start,
                    end,
                    purpose: purpose.trim(),
                  }
                  addBooking(booking)
                  setPurpose('')
                  setTick((x) => x + 1)
                }}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors sm:col-span-2 ${
                  disabled
                    ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                }`}
              >
                <IconChecks className="h-4 w-4" />
                {t('rooms.book.submit')}
              </button>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <h2 className="text-lg font-bold text-[#002855] dark:text-white">{t('rooms.bookings.title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('rooms.bookings.subtitle')}</p>

          {bookings.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">{t('rooms.bookings.empty')}</p>
          ) : (
            <div className="mt-6 space-y-3">
              {bookings.slice(0, 10).map((b) => (
                <div key={b.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-slate-900 dark:text-white">{b.roomName}</div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{b.date} · {b.start}–{b.end}</div>
                      <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">{b.purpose}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        cancelBooking(b.id)
                        setTick((x) => x + 1)
                      }}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-900/5 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-800"
                      aria-label="cancel"
                    >
                      <IconX className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
