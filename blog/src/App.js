import Header from './components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
    </BrowserRouter>

      {/* <PostList/>
      <NewPost/> */}
    </div>
  );
}

export default App;
