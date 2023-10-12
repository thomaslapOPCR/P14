import React from "react";
import { Route, Routes } from "react-router-dom";
import {BaseLayout} from "./components/Layout/BaseLayout";



const App = () => {
  return (

      <Routes>

        <Route path="/" element={<BaseLayout />}>

        </Route>
      </Routes>
  );
};

export default App;