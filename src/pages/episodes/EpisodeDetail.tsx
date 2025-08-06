import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'

interface Character {
  id: number;
  name: string;
  image: string;
  // add other properties if needed
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  // add other properties if needed
}

export default function EpisodeDetail() {
  const { id } = useParams()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/episode/${id}`)
      setEpisode(res.data)
      const charRes = await Promise.all(res.data.characters.map((url: string) => api.get(url.replace('https://rickandmortyapi.com/api', ''))))
      setCharacters(charRes.map(r => r.data))
    }
    fetchData()
  }, [id])

  if (!episode) return <p>Carregando...</p>

  return (
    <div>
      <h1>{episode.name}</h1>
      <p>Data: {episode.air_date}</p>
      <h2 className="text-xl mt-4">Personagens</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map(char => (
          <Link to={`/characters/${char.id}`} key={char.id}>
            <img src={char.image} className="rounded" />
            <p>{char.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
