import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'

interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
}

interface Character {
  id: number
  name: string
  image: string
  status: string
  species: string
  location: { name: string }
}

export default function LocationDetail() {
  const { id } = useParams()
  const [location, setLocation] = useState<Location | null>(null)
  const [residents, setResidents] = useState<Character[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/location/${id}`)
      setLocation(res.data)

      const characterResponses = await Promise.all(
        res.data.residents.map((url: string) =>
          api.get(url.replace('https://rickandmortyapi.com/api', ''))
        )
      )

      setResidents(characterResponses.map(r => r.data))
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

  if (!location) return <p className="text-center mt-10">Carregando...</p>

  return (
    <div className="px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-orange-500 mb-6">
          Detalhes da Localização
        </h1>

        <div className="bg-white border rounded-lg shadow p-6 text-center mb-6">
          <h2 className="text-xl font-bold">{location.name}</h2>
          <p className="text-sm text-gray-600 mt-2">Tipo: {location.type}</p>
          <p className="text-sm text-gray-600">Dimensão: {location.dimension}</p>
        </div>

        <h3 className="text-lg text-orange-500 font-semibold text-center mb-4">Residentes</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {residents.map(res => (
            <Link
              to={`/characters/${res.id}`}
              key={res.id}
              className="bg-white border rounded-lg shadow hover:shadow-md transition text-center"
            >
              <div className="flex justify-center mt-4">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-md">{res.name}</h4>
                <p className={`text-sm ${statusColor(res.status)}`}>Status: {res.status}</p>
                <p className="text-sm text-gray-600">{res.species}</p>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Última localização:</p>
                  <p className="font-semibold">{res.location.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
