import React, { useState, useEffect } from "react";
import "../../styles/voting.css";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";

const Candidate = () => {
  const [status, setStatus] = useState("ongoing");
  const [candidates, setCandidates] = useState([]);

  const { name } = useLocation().state;

  console.log(name);

  const voteContractAddress = "0x010a6fC859002Eb14940f03925E69FCfDF5c138f";
  const voteContractABI = voting.abi;

  const getCandidates = async () => {
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
        console.log(name);
        const publicData = await voteContract.getAllCandidate(name, {
          gasLimit: 300000,
        });
        console.log(publicData);
        setCandidates(publicData[0]);

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
    getCandidates();
  }, []);

  return (
    <div id="votecards">
      <div className="header text-primary text-center font-italic">
        <h3>Zuri Vote</h3>
        <p>Your polling unit</p>
        <hr></hr>
      </div>
      <p className="pl-5">{name.toUpperCase()}</p>

      {status == "result" ? (
        <div id="candidate" className="mt-5 result section">
          <h2 className=" header text-center">Result - {name}</h2>
          <hr />
          <table className="table">
            <tr className="result_table_row">
              <th>Candidate</th>
              <th>Points</th>
            </tr>
            <tr className="result_table_row">
              <td>candidate 1</td>
              <td>1</td>
            </tr>
          </table>
        </div>
      ) : status == "ongoing" ? (
        <div className="voting_cards">
          {candidates.map((Candidate) => {
            return (
              <div className="voting_card">
                <div className="image">
                  <img src="" />
                </div>
                <h6>{Candidate}</h6>
                <div>
                  <button>Vote</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">Election is currently not available</p>
      )}
    </div>
  );
};

export default Candidate;
