import React , { useReducer } from "react";

import "./app.css";
import Nav from "./Nav.js";
import { reducer } from "./reducer.js";
import SearchPokemon from "./SearchPokemon.js";
import CategoriesPokemon from "./CategoriesPokemon.js";

function App() {

  const defaultState = {
    page:1,
  }

  const [state , clippatch] = useReducer(reducer , defaultState)
  
  return (
    <>
      <Nav>
        <li className={state.page === 1 ? "active" : ""} onClick={()=> clippatch({type:"PAGE_1"})}>Search Pokemon</li>
        <li className={state.page === 2 ? "active" : ""} onClick={()=> clippatch({type:"PAGE_2"})}>Categories</li>
      </Nav>
      {state.page === 1 ? <SearchPokemon/> : <CategoriesPokemon/>}
    </>
  );
}

export default App;
