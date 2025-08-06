import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-black text-white h-20 px-8 flex items-center justify-between">
  <h1 className="text-2xl font-bold">Rick & Morty</h1>
  <nav className="flex gap-6 text-lg">
    <NavLink to="/characters" className="hover:underline">Personagens</NavLink>
    <NavLink to="/episodes" className="hover:underline">Episódios</NavLink>
    <NavLink to="/locations" className="hover:underline">Localizações</NavLink>
  </nav>
</header>
  )
}



