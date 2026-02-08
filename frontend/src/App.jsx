import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperheroList from './pages/SuperheroList';
import SuperheroDetail from './pages/SuperheroDetails';
import SuperheroForm from './pages/SuperheroForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuperheroList />} />
        <Route path="/superheroes/:id" element={<SuperheroDetail />} />
        <Route path="/create" element={<SuperheroForm />} />
        <Route path="/edit/:id" element={<SuperheroForm />} />
      </Routes>
    </Router>
  );
}

export default App;
