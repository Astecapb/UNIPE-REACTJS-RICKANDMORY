import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-wide">Rick & Morty</h1>
        
        
        <nav className="flex gap-12 text-2xl font-semibold">
  <NavLink
    to="/characters"
    className={({ isActive }) =>
      `hover:underline px-4 py-2 rounded transition ${
        isActive ? 'text-blue-600 font-bold' : 'text-gray-800'
      }`
    }
  >
    Personagens
  </NavLink>
  <NavLink
    to="/episodes"
    className={({ isActive }) =>
      `hover:underline px-4 py-2 rounded transition ${
        isActive ? 'text-blue-600 font-bold' : 'text-gray-800'
      }`
    }
  >
    Episódios
  </NavLink>
  <NavLink
    to="/locations"
    className={({ isActive }) =>
      `hover:underline px-4 py-2 rounded transition ${
        isActive ? 'text-blue-600 font-bold' : 'text-gray-800'
      }`
    }
  >
    Localizações
  </NavLink>
</nav>
       
      </div>
    </header>
  );
}