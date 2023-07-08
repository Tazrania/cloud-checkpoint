import Page from "./Page";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  return(
    <BrowserRouter>
    <div className="container">
    <div className="content">
      <Routes>
        <Route path="/" element={<Page />}/>
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  )
}

export default App;