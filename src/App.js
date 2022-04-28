import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Candidate from './pages/admin/Candidate';
import NewElection from './pages/admin/NewElection'
import VoteList from './pages/voting/VoteList'
import ElectionList from './pages/admin/ElectionList'
import VoteCards from './pages/voting/VoteCards'
import './App.css'
import { NavBar } from "./components/NavBar";
import Airdrop from './pages/admin/Airdrop';
import AccessControl from './pages/admin/AccessControl';

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
          <Route path='candidate' element={<Candidate />} />
          <Route path='elections' element={<ElectionList />} />
          <Route index element={<Home />} />
          <Route path='voting' element={<VoteList />} />
          <Route path='vote' element={<VoteCards />} />
          <Route path='new' element={<NewElection />} />
          <Route path='tokens' element={<Airdrop />} />
          <Route path='access' element={<AccessControl />} />
      </Routes>
    </div>
  );
}

export default App;
