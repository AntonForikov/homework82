import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {Route, Routes} from 'react-router-dom';
function App() {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/*<Route path='add-new-post' element={<AddForm/>}/>*/}
          {/*<Route path={'/news/:id'} element={<NewsPage/>} />*/}
          <Route path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
