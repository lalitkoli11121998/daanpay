const fs = require('fs')

const dataPath = 'src/data/temples.json'
const temples = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const unique = new Map(temples.map((temple) => [temple.id, temple]))

const canonical = [
  ['jyotirlinga-somnath', 'Somnath Jyotirlinga', 'Prabhas Patan, Gujarat', 'Lord Shiva'],
  ['jyotirlinga-mallikarjuna', 'Mallikarjuna Jyotirlinga', 'Srisailam, Andhra Pradesh', 'Lord Shiva'],
  ['jyotirlinga-mahakaleshwar', 'Mahakaleshwar Jyotirlinga', 'Ujjain, Madhya Pradesh', 'Lord Shiva'],
  ['jyotirlinga-omkareshwar', 'Omkareshwar Jyotirlinga', 'Khandwa, Madhya Pradesh', 'Lord Shiva'],
  ['jyotirlinga-kedarnath', 'Kedarnath Jyotirlinga', 'Kedarnath, Uttarakhand', 'Lord Shiva'],
  ['jyotirlinga-bhimashankar', 'Bhimashankar Jyotirlinga', 'Pune, Maharashtra', 'Lord Shiva'],
  ['jyotirlinga-kashi', 'Kashi Vishwanath Jyotirlinga', 'Varanasi, Uttar Pradesh', 'Lord Shiva'],
  ['jyotirlinga-trimbakeshwar', 'Trimbakeshwar Jyotirlinga', 'Nashik, Maharashtra', 'Lord Shiva'],
  ['jyotirlinga-vaidyanath', 'Vaidyanath Jyotirlinga', 'Deoghar, Jharkhand', 'Lord Shiva'],
  ['jyotirlinga-nageshwar', 'Nageshwar Jyotirlinga', 'Dwarka, Gujarat', 'Lord Shiva'],
  ['jyotirlinga-rameshwaram', 'Rameshwaram Jyotirlinga', 'Rameswaram, Tamil Nadu', 'Lord Shiva'],
  ['jyotirlinga-grishneshwar', 'Grishneshwar Jyotirlinga', 'Ellora, Maharashtra', 'Lord Shiva'],
  ['chardham-badrinath', 'Badrinath Char Dham', 'Badrinath, Uttarakhand', 'Lord Vishnu'],
  ['chardham-dwarka', 'Dwarka Char Dham', 'Dwarka, Gujarat', 'Lord Krishna'],
  ['chardham-jagannath', 'Jagannath Puri Char Dham', 'Puri, Odisha', 'Lord Jagannath'],
  ['chardham-rameshwaram', 'Rameshwaram Char Dham', 'Rameswaram, Tamil Nadu', 'Lord Shiva'],
  ['panch-kedar-kedarnath', 'Panch Kedar Kedarnath', 'Rudraprayag, Uttarakhand', 'Lord Shiva'],
  ['panch-kedar-tungnath', 'Panch Kedar Tungnath', 'Rudraprayag, Uttarakhand', 'Lord Shiva'],
  ['panch-kedar-rudranath', 'Panch Kedar Rudranath', 'Chamoli, Uttarakhand', 'Lord Shiva'],
  ['panch-kedar-madhyamaheshwar', 'Panch Kedar Madhyamaheshwar', 'Rudraprayag, Uttarakhand', 'Lord Shiva'],
  ['panch-kedar-kalpeshwar', 'Panch Kedar Kalpeshwar', 'Chamoli, Uttarakhand', 'Lord Shiva'],
]

canonical.forEach(([id, name, location, deity]) => {
  if (!unique.has(id)) {
    unique.set(id, {
      id, name, image: 'hero.png', location, type: deity.includes('Shiva') ? 'Shiva Temple' : 'Pilgrimage Temple',
      deity, description: `${name} is a mock directory record for search and navigation testing.`,
      timings: '6:00 AM - 9:00 PM', established: 'Ancient', donors: 'Mock record',
      about: `Mock details for ${name}, maintained for the Daanpay catalogue prototype.`, isMock: true,
    })
  }
})

const states = ['Andhra Pradesh', 'Assam', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
const deities = ['Lord Shiva', 'Lord Vishnu', 'Lord Krishna', 'Lord Rama', 'Goddess Durga', 'Goddess Lakshmi', 'Lord Ganesha', 'Lord Hanuman']

let index = 1
while (unique.size < 1000) {
  const state = states[(index - 1) % states.length]
  const deity = deities[(index - 1) % deities.length]
  const id = `mock-temple-${String(index).padStart(4, '0')}`
  unique.set(id, {
    id, name: `Mock Temple ${String(index).padStart(4, '0')}`, image: 'hero.png',
    location: `Temple District ${index}, ${state}`, type: `${deity.replace('Lord ', '').replace('Goddess ', '')} Temple`, deity,
    description: `Mock temple record ${index} for search, filtering, and detail-page testing.`,
    timings: '6:00 AM - 9:00 PM', established: 'Mock record', donors: 'Mock record',
    about: `This is mock catalogue data for Temple District ${index}, ${state}.`, isMock: true,
  })
  index += 1
}

fs.writeFileSync(dataPath, `${JSON.stringify([...unique.values()].slice(0, 1000), null, 2)}\n`)
console.log(`Wrote ${Math.min(unique.size, 1000)} unique temple records to ${dataPath}`)