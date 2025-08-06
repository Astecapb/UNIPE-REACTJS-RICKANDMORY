import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'

export default function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState<any>(null)
  const [episodes, setEpisodes] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/character/${id}`)
      setCharacter(res.data)
      const epRes = await Promise.all(res.data.episode.map((url: string) => api.get(url.replace('https://rickandmortyapi.com/api', ''))))
      setEpisodes(epRes.map(r => r.data))
    }
    fetchData()
  }, [id])

  if (!character) return <p>Carregando...</p>

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} />
      <p>Status: {character.status}</p>
      <p>Espécie: {character.species}</p>
      <p>Origem: {character.origin.name}</p>
      <p>Localização: {character.location.name}</p>
      <h2 className="mt-4 text-xl">Episódios:</h2>
      <ul>
        {episodes.map(ep => (
          <li key={ep.id}>
            <Link to={`/episodes/${ep.id}`}>{ep.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
