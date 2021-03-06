import React, { useState, useEffect, useRef } from "react";
import "../../styles/admin.css";
import {Link} from 'react-router-dom'
import { Button, Alert } from "react-bootstrap";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";

const NewElection = ({isChairman}) => {
  const voteContractAddress = voting.contract;
  const voteContractABI = voting.abi;

  const categoryRef = useRef();

  //CREATING NEW ELECTION
  const [newElection, setNewElection] = useState("");
  const [electionEvent, setElectionEvent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [elections, setElections] = useState([]);
  const [electionName, setElectionName] = useState("");
  const [contract, setContract] = useState("");
  const [message, setMessage] = useState("");

  const createElection = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(
          voteContractAddress,
          voteContractABI,
          signer
        );

        // const category = categoryRef.current.value;
        const category = "general";
        console.log(category);

        const Txn = await voteContract.createElection(newElection, category, {
          gasLimit: 3000000,
        });

        console.log("Mining...", Txn.hash);
      }

      //handle smartcontract here
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(
      voteContractAddress,
      voteContractABI,
      provider
    );

    const electionCreated = () => {
      setLoading(false);
      setElectionEvent(false);
      setMessage("Election created successfully");
    };

    if (electionEvent === true) {
      voteContract.on("CreateElection", electionCreated);
    }

    return () => {
      voteContract.removeAllListeners();
    };
  }, []);
  return (
    <div>
      { isChairman ? 
        <div id="candidate">
          <p>new election</p>
          <hr></hr>
          <form className="candidate_form">
            <div className="header text-primary text-center font-italic">
              <h3>Zuri Vote</h3>
              <p>Voting platform</p>
              <hr></hr>
            </div>
            {
                message.length > 0  ? <Alert className=" position-fixed text-center" variant="success" >{message}</Alert> : null
            }
            <div className="candidate_input">
              <input
                className="input"
                value={newElection}
                onChange={(e) => setNewElection(e.target.value)}
                placeholder="Name of Election"
              />
              {/* <select ref={categoryRef} style={{ marginTop: "20px" }}>
                <option value="general">General</option>
                <option value="student">Student</option>
                <option value="bod">Bod</option>
                <option value="staff">Staff</option>
              </select> */}
          
              <Button className="button" onClick={createElection} variant="primary">
          
                {loading === true ? "Please wait..." : "Create Election"}
              </Button>
            </div>
          </form>
        </div>
        : <Link className="text-center" to="/">Home</Link>
      }
    </div>

  );
};

export default NewElection;
