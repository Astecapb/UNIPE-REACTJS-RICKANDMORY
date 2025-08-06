import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'

interface Character {
  id: number
  name: string
  image: string
  status: string
  species: string
  location: { name: string }
}

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [prev, setPrev] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchCharacters = async (url = `/character?page=${page}`) => {
    const res = await api.get(url)
    setCharacters(res.data.results)
    setNext(res.data.info.next?.replace('https://rickandmortyapi.com/api', '') || null)
    setPrev(res.data.info.prev?.replace('https://rickandmortyapi.com/api', '') || null)
    setTotalPages(res.data.info.pages)

    const match = url.match(/page=(\d+)/)
    if (match) setPage(Number(match[1]))
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  const statusColor = (status: string) => {
    switch (status) {
      case 'Alive': return 'text-green-600'
      case 'Dead': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  // ⬇️ AGORA SIM, o return pode vir aqui dentro
  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-orange-500 mb-6">Personagens</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {characters.map(char => (
            <Link
              to={`/characters/${char.id}`}
              key={char.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition bg-white"
            >
              <img src={char.image} alt={char.name} className="w-full h-56 object-cover" />
              <div className="p-3 text-center">
                <h2 className="font-bold text-lg">{char.name}</h2>
                <p className={`${statusColor(char.status)} text-sm`}>{char.status}</p>
                <p className="text-sm text-gray-700">{char.species}</p>
                <p className="text-sm text-gray-500">Última localização: {char.location.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <Pagination next={next} prev={prev} onNavigate={fetchCharacters} currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  )
}
