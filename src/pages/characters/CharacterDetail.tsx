import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

export default function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState<Character | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/character/${id}`)
      setCharacter(res.data)

      const episodesData = await Promise.all(
        res.data.episode.map((url: string) =>
          api.get(url.replace('https://rickandmortyapi.com/api', ''))
        )
      )
      setEpisodes(episodesData.map(e => e.data))
    }

    fetchData()
  }, [id])

  if (!character) return <p className="text-center mt-6">Carregando...</p>

  const statusColor = character.status === 'Alive'
    ? 'text-green-600'
    : character.status === 'Dead'
    ? 'text-red-600'
    : 'text-gray-500'

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-orange-500 mb-6">Detalhes do Personagem</h1>

      <div className="bg-white border rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center justify-between mb-6">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold mb-1">{character.name}</h2>
          <p className={`font-semibold ${statusColor}`}>Status: {character.status}</p>
          <p>Espécie: {character.species}</p>
          <p>Origem: {character.origin.name}</p>
          <p>Última localização: {character.location.name}</p>
        </div>
        <img src={character.image} alt={character.name} className="w-48 h-48 rounded-lg object-cover" />
      </div>

      <div className="border rounded-lg p-4 mb-4">
        <h3 className="text-center font-semibold text-lg mb-2"> {character.name} aparece nos seguintes episódios:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {episodes.map(ep => (
            <Link
              to={`/episodes/${ep.id}`}
              key={ep.id}
              className="border p-3 rounded-lg hover:shadow transition"
            >
              <h4 className="font-bold">{ep.name}</h4>
              <p className="text-sm text-gray-600">{ep.episode}</p>
              <p className="text-sm text-gray-500">Data Exibição: {ep.air_date}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
