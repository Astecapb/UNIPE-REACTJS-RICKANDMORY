import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'

export default function LocationDetail() {
  const { id } = useParams()
  const [location, setLocation] = useState<any>(null)
  const [residents, setResidents] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/location/${id}`)
      setLocation(res.data)

      const charactersRes = await Promise.all(
        res.data.residents.map((url: string) =>
          api.get(url.replace('https://rickandmortyapi.com/api', ''))
        )
      )

      setResidents(charactersRes.map(res => res.data))
    }

    fetchData()
  }, [id])

  if (!location) return <p>Carregando localização...</p>

  return (
    <div>
      <h1 className="text-2xl mb-2">{location.name}</h1>
      <p><strong>Tipo:</strong> {location.type}</p>
      <p><strong>Dimensão:</strong> {location.dimension}</p>

      <h2 className="text-xl mt-6 mb-2">Residentes:</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {residents.map(char => (
          <Link to={`/characters/${char.id}`} key={char.id} className="border rounded p-2 hover:shadow-md">
            <img src={char.image} alt={char.name} className="rounded w-full" />
            <p className="text-center mt-2">{char.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
