export function normalizePersonKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const imageFileByPersonKey: Record<string, string> = {
  [normalizePersonKey('Eng. Metab Al Shahrani')]: 'eng-metab-al-shahrani.png',
  [normalizePersonKey('Eng. Fahad Al Solaie')]: 'eng-fahad-al-solaie.png',
  [normalizePersonKey('Eng. Omar Al Suwaiyan')]: 'eng-omar-al-suwaiyan.png',
  [normalizePersonKey('Eng. Mohamed Al Mehiemeed')]: 'eng-mohamed-al-mehiemeed.png',

  [normalizePersonKey('Adel Al Obailan')]: 'adel-al-obailan.png',
  [normalizePersonKey('Talal Al Rumayaan')]: 'talal-al-rumayaan.png',
  [normalizePersonKey('Ehab Mufti')]: 'ehab-mufti.png',
  [normalizePersonKey('Anwar Al Khuraimi')]: 'anwar-al-khuraimi.png',
  [normalizePersonKey('Amro Al Tamimi')]: 'amro-al-tamimi.png',
  [normalizePersonKey('Bandar Subaih')]: 'bandar-subaih.png',
  [normalizePersonKey('Abdulrahman Al Sebaiheen')]: 'abdulrahman-al-sebaiheen.png',
  [normalizePersonKey('Hamad Al Jarboou')]: 'hamad-al-jarboou.png',
  [normalizePersonKey('Sultan AlTamimi')]: 'sultan-altamimi.png',

  [normalizePersonKey('Bejad Al Muraibadh')]: 'bejad-al-muraibadh.png',
  [normalizePersonKey('Abdulmajid Al Othman')]: 'abdulmajid-al-othman.png',
  [normalizePersonKey('Ghaida Al Fawaz')]: 'ghaida-al-fawaz.png',
  [normalizePersonKey('Najd Al Otaibi')]: 'najd-al-otaibi.png',
  [normalizePersonKey('Mohammed Al Sharari')]: 'mohammed-al-sharari.png',
  [normalizePersonKey('Fahd Al Owardhi')]: 'fahd-al-owardhi.png',
}

export function getPersonImageSrc(personName: string | null | undefined): string | undefined {
  if (!personName) return undefined
  const normalized = normalizePersonKey(personName)
  const file = imageFileByPersonKey[normalized]
  if (!file) return undefined
  return encodeURI(`/${file}`)
}

export function toStandardImageFileName(personName: string): string {
  return (
    normalizePersonKey(personName)
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim() +
    '.png'
  )
}
