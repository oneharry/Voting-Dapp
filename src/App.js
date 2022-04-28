import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CastVote from './pages/voting/CastVote';
import Manage from './pages/admin/Manage';
import Candidate from './pages/admin/Candidate';
import Elections from './pages/admin/Elections';
import NewElection from './pages/admin/NewElection'
import VoteList from './pages/voting/VoteList'
import ElectionList from './pages/admin/ElectionList'
import VoteCards from './pages/voting/VoteCards'
import './App.css'
import { NavBar } from "./components/NavBar";
import Airdrop from './pages/admin/Airdrop';

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
        <Route index element={<Home />} />
        <Route path='voting' element={<CastVote />} >
          <Route index element={<VoteList />} />
          <Route path='vote' element={<VoteCards />} />
        </Route>
        <Route path='admin' element={<Manage />} >
        <Route index element={<ElectionList />} />
          <Route path='candidate' element={<Candidate />} />
          <Route path='elections' element={<Elections />} >
            <Route path='candidate' element={<Candidate />} />
            <Route index element={<ElectionList />} />
          </Route>
          <Route path='new' element={<NewElection />} />
          <Route path='airdrop' element={<Airdrop />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
