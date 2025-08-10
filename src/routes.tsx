import { Route } from 'react-router-dom'
// Pages
import CharacterList from './pages/characters/CharacterList'
import CharacterDetail from './pages/characters/CharacterDetail'

import EpisodeList from './pages/episodes/EpisodeList'
import EpisodeDetail from './pages/episodes/EpisodeDetail'

import LocationList from './pages/locations/LocationList'
import LocationDetail from './pages/locations/LocationDetail'

export const AppRoutes = (
  <>
    {/* Rota padrão redireciona para /characters */}
    <Route path="/" element={<CharacterList />} />

    {/* Personagens */}
    <Route path="/characters" element={<CharacterList />} />
    <Route path="/characters/:id" element={<CharacterDetail />} />

    {/* Episódios */}
    <Route path="/episodes" element={<EpisodeList />} />
    <Route path="/episodes/:id" element={<EpisodeDetail />} />

    {/* Localizações */}
    <Route path="/locations" element={<LocationList />} />
    <Route path="/locations/:id" element={<LocationDetail />} />
  </>
)
