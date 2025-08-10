import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  location: { name: string };
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export default function EpisodeDetail() {
  const { id } = useParams()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/episode/${id}`)
      setEpisode(res.data)

      const charRes = await Promise.all(
        res.data.characters.map((url: string) =>
          api.get(url.replace('https://rickandmortyapi.com/api', ''))
        )
      )

      setCharacters(charRes.map(r => r.data))
    }

    fetchData()
  }, [id])

  const statusColor = (status: string) => {
    switch (status) {
      case 'Alive': return 'text-green-600'
      case 'Dead': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  if (!episode) return <p className="text-center mt-6">Carregando...</p>

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-orange-500 mb-4">Detalhes do Episódio</h1>

      <div className="bg-white border rounded-lg p-6 text-center mb-6">
        <h2 className="text-xl font-bold">{episode.name}</h2>
        <p className="text-gray-600">{episode.episode}</p>
        <p className="text-gray-500">Data de exibição: {episode.air_date}</p>
      </div>

      <h3 className="text-xl font-bold text-center text-orange-500 mb-4">Personagens</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {characters.map(char => (
          <Link to={`/characters/${char.id}`} key={char.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
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
    </div>
  )
}
