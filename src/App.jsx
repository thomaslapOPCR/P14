import React from "react";
import { Route, Routes } from "react-router-dom";
import {BaseLayout} from "./components/Layout/BaseLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import './styles/varibles.scss'
import Error from "./pages/Error/Error.jsx";
import Create from "./pages/Create/Create.jsx";
import List from "./pages/List/List.jsx";


const App = () => {
  return (

      <Routes>

        <Route path="/" element={<BaseLayout />}>
            <Route path='/' element={<Home/>}/>
            <Route path='/list' element={<List/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='*' element={<Error/>}/>
            <Route path='/error' element={<Error/>}/>
        </Route>
      </Routes>
  );
};

export default App;