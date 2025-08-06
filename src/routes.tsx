import { Route } from 'react-router-dom'
import CharacterList from './pages/characters/CharacterList'
import CharacterDetail from './pages/characters/CharacterDetail'
import EpisodeList from './pages/episodes/EpisodeList'
import EpisodeDetail from './pages/episodes/EpisodeDetail'
import LocationList from './pages/locations/LocationList'
import LocationDetail from './pages/locations/LocationDetail'

export const AppRoutes = (
  <>
    <Route path="/" element={<CharacterList />} />
    <Route path="/characters" element={<CharacterList />} />
    <Route path="/characters/:id" element={<CharacterDetail />} />
    <Route path="/episodes" element={<EpisodeList />} />
    <Route path="/episodes/:id" element={<EpisodeDetail />} />
    <Route path="/locations" element={<LocationList />} />
    <Route path="/locations/:id" element={<LocationDetail />} />
  </>
)
