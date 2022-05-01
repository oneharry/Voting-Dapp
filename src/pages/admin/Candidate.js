import React, { useState, useEffect, useRef } from "react";
import "../../styles/admin.css";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";
import { get } from "https";
import Web3 from "web3";

const Candidate = () => {
  const [status, setStatus] = useState("ready");
  const [isStaff, setIsStaff] = useState(true);
  const [isChairman, setIsChairman] = useState("");
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [address, setAddress] = useState("");

  const nameRef = useRef();

  const voteContractAddress = "0x010a6fC859002Eb14940f03925E69FCfDF5c138f";
  const voteContractABI = voting.abi;

  //name of clicked election
  const { name } = useLocation().state;

  //handling upload
  const fileUpload = async (e) => {
    e.preventDefault();
  };

  //handle file upload button click
  const register = async (e) => {
    e.preventDefault();
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

  const startElection = async (e) => {
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

        const Txn = await voteContract.enableVoting(name, {
          gasLimit: 3000000,
        });

        console.log("Mining...", Txn.hash);
      }

      //handle smartcontract here
    } catch (error) {
      setLoading1(false);
      console.log(error);
    }
  };

  const stopElection = async (e) => {
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

        const Txn = await voteContract.disableVoting(name, {
          gasLimit: 3000000,
        });

        console.log("Mining...", Txn.hash);
      }

      //handle smartcontract here
    } catch (error) {
      setLoading1(false);
      console.log(error);
    }
  };

  const addCandidate = async (e) => {
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

        const candidate = nameRef.current.value;

        const Txn = await voteContract.addCandidate(name, candidate, {
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

  const getChairman = async () => {
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

        const publicData = await voteContract.owner({
          gasLimit: 300000,
        });
        console.log(publicData);
        setIsChairman(publicData);

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
    getChairman();
  }, []);

  useEffect(async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const accounts = await ethereum.request({ method: "eth_accounts" });
    setAddress(accounts[0]);
    console.log(accounts[0]);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(
      voteContractAddress,
      voteContractABI,
      provider
    );

    const candidateCreated = () => {
      setLoading(false);
      setMessage("Candidate added successfully");
    };

    const electionEnabled = () => {
      setLoading1(false);
      setMessage2("Election has been enabled");
    };

    const electionStopped = () => {
      setLoading1(false);
      setMessage2("Election has been stopped");
    };

    voteContract.on("AddCandidate", candidateCreated);
    voteContract.on("EnableVoting", electionEnabled);
    voteContract.on("StopVoting", electionStopped);

    return () => {
      voteContract.removeAllListeners();
    };
  }, []);

  return (
    <div id="candidate">
      <p>{name}</p>
      <hr />
      <div className="section election_info">
        <span className="ml-2 d-flex align-items-start">
          <p className="text-start">Status: </p>
          <solid className="h6">{status}</solid>
        </span>
        <div className="alert-success">
          {message2.length > 0 ? message2 : ""}
        </div>
        <div className="control d-flex  justify-content-start">
          {isChairman.toLowerCase() === address.toLowerCase() ? (
            <div>
              <div>{loading1 === true ? "loading....." : ""}</div>
              <Button variant="success" onClick={startElection}>
                Start
              </Button>
              <Button variant="danger" onClick={stopElection}>
                End
              </Button>
            </div>
          ) : null}

          {isStaff && status == "ended" ? (
            <div>
              <Button variant="primary" onClick={() => setStatus("result")}>
                Result
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {status == "result" ? (
        <div className="mt-5 result section">
          <h2 className=" header text-center">Result - {name}</h2>
          <hr />
          <table className="table">
            <tr className="result_table_row">
              <th>Candidate</th>
              <th>Points</th>
            </tr>
            <tr className="result_table_row">
              <td>Harry</td>
              <td>1</td>
            </tr>
          </table>
        </div>
      ) : (
        <div className="section candidate_register">
          <div className="alert-success">
            {message.length > 0 ? message : ""}
          </div>
          <h2 className=" header text-dark text-center">Candidates</h2>
          <hr />
          <form className="candidate_form">
            <div className="candidate_input">
              <input
                className="input"
                ref={nameRef}
                placeholder="Name of Candidate"
              />
              {/* <div>{loading1 === true ? "uploading...." : ""}</div> */}
              <input className="my-3" type="file" onChange={fileUpload}></input>
              {/* <div>{loading === true ? "loading....." : ""}</div> */}
              <div>{loading === true ? "loading......" : ""}</div>
              <Button
                onClick={addCandidate}
                className="button"
                variant="success"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Candidate;
