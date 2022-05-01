import React, { useState, useEffect } from "react";
import "../../styles/voting.css";
import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";

const VoteList = () => {
  const [election, setElection] = useState("");

  const [elections, setElections] = useState([]);

  const voteContractAddress = "0x010a6fC859002Eb14940f03925E69FCfDF5c138f";
  const voteContractABI = voting.abi;

  const getElections = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(
          voteContractAddress,
          voteContractABI,
          signer
        );

        const publicData = await voteContract.getAllElection({
          gasLimit: 300000,
        });
        console.log(publicData);
        setElections(publicData);

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
    getElections();
  }, []);

  const set = (x) => {
    setElection(x);
  };
  return (
    <div id="election">
      <p>Elections</p>
      <hr></hr>

      <div className="election_main">
        <div className="header text-primary text-center font-italic">
          <h3>Zuri Vote</h3>
          <p>Voting platform</p>
          <hr></hr>
        </div>
        <div className="election_list ">
          {elections.map((name) => {
            return (
              <Link
                to="/vote"
                state={{ name }}
                onClick={() => console.log(name)}
                className="election_item "
              >
                <h4>{name}</h4>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VoteList;
