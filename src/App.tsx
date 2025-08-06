import { Routes } from 'react-router-dom'
import { AppRoutes } from './routes'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          {AppRoutes}
        </Routes>
      </main>
      <footer className="text-center text-gray-500 text-sm py-6">
  © {new Date().getFullYear()} Rick and Morty API Explorer | Desenvolvido por Robson Lima Palmeira
</footer>

    </div>
  )
}

