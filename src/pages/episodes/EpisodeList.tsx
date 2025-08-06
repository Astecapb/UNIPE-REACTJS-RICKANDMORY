/*import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Pagination from '../../components/Pagination'

export default function EpisodeList() {
  const [episodes, setEpisodes] = useState<any[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [prev, setPrev] = useState<string | null>(null)

  const fetchData = async (url = '/episode') => {
    const res = await api.get(url)
    setEpisodes(res.data.results)
    setNext(res.data.info.next?.replace('https://rickandmortyapi.com/api', '') || null)
    setPrev(res.data.info.prev?.replace('https://rickandmortyapi.com/api', '') || null)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl mb-4">Episódios</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {episodes.map(ep => (
          <li key={ep.id}>
            <Link to={`/episodes/${ep.id}`}>
              <h2 className="font-bold">{ep.name}</h2>
              <p>Data: {ep.air_date}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination next={next} prev={prev} onNavigate={fetchData} />
    </div>
  )
}*/

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Pagination from '../../components/Pagination'

interface Episode {
  id: number
  name: string
  air_date: string
}

export default function EpisodeList() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [prev, setPrev] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchEpisodes = async (url = `/episode?page=${page}`) => {
    const res = await api.get(url)
    setEpisodes(res.data.results)
    setNext(res.data.info.next?.replace('https://rickandmortyapi.com/api', '') || null)
    setPrev(res.data.info.prev?.replace('https://rickandmortyapi.com/api', '') || null)
    setTotalPages(res.data.info.pages)

    const match = url.match(/page=(\d+)/)
    if (match) setPage(Number(match[1]))
  }

  useEffect(() => {
    fetchEpisodes()
  }, [])

  return (
    <div className="px-8 py-6">
      <h1 className="text-center text-3xl font-bold text-orange-500 mb-6">Episódios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {episodes.map(ep => (
          <Link to={`/episodes/${ep.id}`} key={ep.id} className="border p-4 rounded-lg hover:shadow-md transition">
            <h2 className="font-semibold text-lg">{ep.name}</h2>
            <p className="text-sm text-gray-600">Data de estreia: {ep.air_date}</p>
          </Link>
        ))}
      </div>
      <Pagination next={next} prev={prev} onNavigate={fetchEpisodes} currentPage={page} totalPages={totalPages} />
    </div>
  )
}

