import React, { useState, useEffect, useRef } from "react";
import "../../styles/admin.css";
import { Button } from "react-bootstrap";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";

const NewElection = () => {
  const voteContractAddress = "0x010a6fC859002Eb14940f03925E69FCfDF5c138f";
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

        const category = categoryRef.current.value;
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
    <div id="candidate">
      <p>new election</p>
      <hr></hr>
      <form className="candidate_form">
        <div className="header text-primary text-center font-italic">
          <h3>Zuri Vote</h3>
          <p>Voting platform</p>
          <hr></hr>
        </div>
        <div className="alert-success">{message.length > 0 ? message : ""}</div>
        <div className="candidate_input">
          <input
            className="input"
            value={newElection}
            onChange={(e) => setNewElection(e.target.value)}
            placeholder="Title of Election"
          />
          <select ref={categoryRef} style={{ marginTop: "20px" }}>
            <option value="general">General</option>
            <option value="student">Student</option>
            <option value="bod">Bod</option>
            <option value="staff">Staff</option>
          </select>
          <div>{loading === true ? "loading......" : ""}</div>
          <Button className="button" onClick={createElection} variant="primary">
            Create Election
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewElection;
