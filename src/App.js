import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateVoting from './pages/Managevoting';
import CastVote from './pages/CastVote';
import './App.css'
import { NavBar } from "./components/NavBar";

function App() {

  const [connected, setConnected] = useState(false);

  //component moun
  useEffect(() => {

  })

  //connect wallet
  const connectWallet = () => {
    const {ethereum} = window;

    setConnected(true)
  }

  //disconnect wallet
  const disconnectWallet = () => {
    

    setConnected(false)
  }


  return (
    <div>
      <NavBar connectWallet={connectWallet} disconnectWallet={disconnectWallet} connected={connected}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/election' element={<CreateVoting />} />
        <Route path='/vote' element={<CastVote />} />
      </Routes>
    </div>
  );
}

export default App;
