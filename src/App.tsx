import { Routes } from 'react-router-dom'
import { AppRoutes } from './routes'
import Header from './components/Header'

export default function App() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Routes>
          {AppRoutes}
        </Routes>
      </main>
      <footer className="text-center text-gray-500 text-sm py-6">
  © {new Date().getFullYear()} Rick and Morty API Explorer | Desenvolvido por você
</footer>

    </div>
  )
}

