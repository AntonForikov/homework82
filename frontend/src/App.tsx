import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
function App() {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='artist/:id' element={<Albums/>}/>
          <Route path='album/:albumId' element={<Tracks/>}/>
          <Route path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
