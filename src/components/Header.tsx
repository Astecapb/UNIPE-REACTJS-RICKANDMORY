import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
     <header className="bg-black text-white>">
  <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between"></div>
  <h1 className="text-2xl font-bold">Rick & Morty</h1>
  <nav className="flex gap-26 text-lg">
    <NavLink to="/characters" className="hover:underline">Personagens</NavLink>
    <NavLink to="/episodes" className="hover:underline">Episódios</NavLink>
    <NavLink to="/locations" className="hover:underline">Localizações</NavLink>
  </nav>
</header>
  )
}



