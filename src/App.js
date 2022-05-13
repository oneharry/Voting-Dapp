import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Candidate from "./pages/admin/Candidate";
import NewElection from "./pages/admin/NewElection";
import VoteList from "./pages/voting/VoteList";
import ElectionList from "./pages/admin/ElectionList";
import VoteCards from "./pages/voting/VoteCards";
import "./App.css";
import { NavBar } from "./components/NavBar";
import Airdrop from "./pages/admin/Airdrop";
import AccessControl from "./pages/admin/AccessControl";
import { BigNumber, ethers } from "ethers";
import voting from "./utils/voting.json";

function App() {
  const [isChairman, setIsChairman] = useState(false);


  const voteContractAddress = voting.contract;
  const voteContractABI = voting.abi;


  const getChairman = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        
        const accounts = await ethereum.request({ method: "eth_accounts" });
        let userAdr = accounts[0];
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(
          voteContractAddress,
          voteContractABI,
          signer
        );

        const publicData = await voteContract.owner({
          gasLimit: 300000,
        });
        console.log(publicData);
        let ownerAdr = publicData

        if(userAdr.toLowerCase() == ownerAdr.toLowerCase()) {
          setIsChairman(true)
        } else {setIsChairman(false)}

        //setStacked(Number(BigNumber.from(tokenStaked).toString()) / 10 ** 18);
        //setToken(Number(BigNumber.from(tokenBalance).toString()) / 10 ** 18);
        //setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChairman();
  },[]);

  return (
    <div>
      <NavBar
        
        isChairman={isChairman}
      />
      <Routes>
        <Route path="candidate" element={<Candidate isChairman={isChairman}/>} />
        <Route path="elections" element={<ElectionList />} />
        <Route index element={<Home isChairman={isChairman}/>} />
        <Route path="voting" element={<VoteList isChairman={isChairman}/>} />
        <Route path="vote" element={<VoteCards />} />
        <Route path="new" element={<NewElection isChairman={isChairman}/>} />
        <Route path="access" element={<AccessControl isChairman={isChairman}/>} />
      </Routes>
    </div>
  );
}

export default App;
