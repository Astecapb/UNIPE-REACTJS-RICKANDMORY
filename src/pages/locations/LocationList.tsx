/*import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'

interface Location {
  id: number
  name: string
  type: string
  dimension: string
}

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [prev, setPrev] = useState<string | null>(null)

  const fetchData = async (url = '/location') => {
    const res = await api.get(url)
    setLocations(res.data.results)
    setNext(res.data.info.next?.replace('https://rickandmortyapi.com/api', '') || null)
    setPrev(res.data.info.prev?.replace('https://rickandmortyapi.com/api', '') || null)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl mb-4">Localizações</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map(loc => (
          <Link to={`/locations/${loc.id}`} key={loc.id} className="p-4 border rounded shadow hover:shadow-lg">
            <h2 className="font-bold">{loc.name}</h2>
            <p>Tipo: {loc.type}</p>
            <p>Dimensão: {loc.dimension}</p>
          </Link>
        ))}
      </div>
      <Pagination next={next} prev={prev} onNavigate={fetchData} />
    </div>
  )
}*/


import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'

interface Location {
  id: number
  name: string
  type: string
  dimension: string
}

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [prev, setPrev] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchData = async (url = `/location?page=${page}`) => {
    const res = await api.get(url)
    setLocations(res.data.results)
    setNext(res.data.info.next?.replace('https://rickandmortyapi.com/api', '') || null)
    setPrev(res.data.info.prev?.replace('https://rickandmortyapi.com/api', '') || null)
    setTotalPages(res.data.info.pages)

    const match = url.match(/page=(\d+)/)
    if (match) setPage(Number(match[1]))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="px-8 py-6">
      <h1 className="text-center text-3xl font-bold text-orange-500 mb-6">Localizações</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {locations.map(loc => (
          <Link to={`/locations/${loc.id}`} key={loc.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <h2 className="font-semibold text-lg">{loc.name}</h2>
            <p className="text-sm text-gray-600">Tipo: {loc.type}</p>
            <p className="text-sm text-gray-500">Dimensão: {loc.dimension}</p>
          </Link>
        ))}
      </div>
      <Pagination next={next} prev={prev} onNavigate={fetchData} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
