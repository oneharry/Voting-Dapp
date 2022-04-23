import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BigNumber, ethers } from "ethers";
import voting from "../utils/voting.json";

const ManageVoting = () => {
  const voteContractAddress = "0x7B0407F40A0394ce6Bf9076D614022322006bb34";
  const voteContractABI = voting.abi;
  //CREATING NEW ELECTION
  const [newElection, setNewElection] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [elections, setElections] = useState([]);
  const [electionName, setElectionName] = useState("");

  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(
      voteContractAddress,
      voteContractABI,
      signer
    );

    const electionCreated = () => {
      setLoading(false);
      window.alert("election Created");
    };

    const candidateCreated = () => {
      setLoading1(false);
      window.alert("candidate added");
    };

    const voteEnabled = () => {
      setLoading1(false);
      window.alert("voting enabled");
    };

    voteContract.on("CreateElection", electionCreated);
    voteContract.on("AddCandidate", candidateCreated);
    voteContract.on("AddCandidate", candidateCreated);

    return () => {
      if (voteContract) {
        voteContract.off("CreateElection", electionCreated);
        voteContract.off("AddCandidate", candidateCreated);
      }
    };
  }, []);

  useEffect(() => {
    getElections();
  }, []);

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

        const Txn = await voteContract.createElection(newElection, {
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

  //ADDING NEW CANDIDATE
  const [candidateName, setCandidateName] = useState("");
  const [allElections, setAllEllections] = useState([]);
  useEffect(() => {
    //fetch all available elections
  });

  const addCandidate = async (e) => {
    e.preventDefault();
    setLoading1(true);
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

        const Txn = await voteContract.addCandidate(
          electionName,
          candidateName,
          {
            gasLimit: 3000000,
          }
        );

        console.log("Mining...", Txn.hash);
      }

      //handle smartcontract here
    } catch (error) {
      setLoading1(false);
      console.log(error);
    }
  };

  //ELECTION STATUS SECTION
  const [voteStatus, setVoteStatus] = useState(true);

  useEffect(() => {
    //fetch all elections and status voteStatus
  }, []);

  const enableVoting = async (e, en) => {
    //calls the enableVote from contract
    e.preventDefault();
    setLoading2(true);
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

        const Txn = await voteContract.enableVoting(en, {
          gasLimit: 3000000,
        });

        console.log("Mining...", Txn.hash);
      }

      //handle smartcontract here
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
    setVoteStatus(true);
  };

  const disableVoting = () => {
    //calls the disableVote from contract
    setVoteStatus(false);
  };

  //COMPILE RESULT

  const showResult = () => {
    //fetch result
  };

  return (
    <div className="manage_vote">
      <div className="forms flex-md-row">
        <div className="form">
          <h5>Set up New Election</h5>
          <form>
            <input
              value={newElection}
              onChange={(e) => setNewElection(e.target.value)}
              placeholder="Title of Election"
            />
          </form>
          <div>{loading === true ? "loading....." : ""}</div>

          <button
            onClick={createElection}
            className="p-1 px-2 btn-primary rounded"
          >
            Create Election
          </button>
        </div>

        <div className="form">
          <h5>Candidate for Election</h5>
          <form>
            <div>
              <select onChange={(e) => setElectionName(e.target.value)}>
                <option value="select Vote">Select Election</option>
                {elections.map((item) => {
                  return <option value={item}>{item.toUpperCase()}</option>;
                })}
              </select>
            </div>
            <div>
              <input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Name of Candidate"
              />
            </div>
            <div>{loading1 === true ? "loading..... " : ""}</div>

            <button
              onClick={addCandidate}
              className="p-1 px-2 btn-primary rounded"
            >
              Add Candidate
            </button>
          </form>
        </div>
      </div>
      <div className="election_status mb-5">
        <h3 className="text-center">Election Status</h3>
        <table className="table">
          <tr className="table_row">
            <th>Election Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {elections.map((item) => {
            return (
              <tr className="table_row">
                <td>{item}</td>
                <td></td>
                <td>
                  {voteStatus ? (
                    <button
                      onClick={disableVoting}
                      className="p-1 px-2 btn-danger rounded"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={(e) => enableVoting(e, item)}
                      className="p-1 px-2 btn-success rounded"
                    >
                      Enable
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="result my-4">
        <h3 className="text-center">Result - Election</h3>
        <table className="table">
          <tr className="table_row">
            <th>Candidate</th>
            <th>Points</th>
          </tr>
          <tr className="table_row">
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div>
          <select>
            <option value="select Vote">Select Election</option>
            {allElections.map((election) => {
              return <option>{election}</option>;
            })}
          </select>
          <button
            onClick={showResult}
            className="p-1 mx-2 px-2 btn-warning rounded"
          >
            Show Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageVoting;
