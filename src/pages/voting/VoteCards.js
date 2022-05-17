import React, { useState, useEffect } from "react";
import "../../styles/voting.css";
import { Button, Modal, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";

const Candidate = () => {
  const [status, setStatus] = useState("ongoing");
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const [CID, setCID] = useState([]);
  const [voted, setVoted] = useState("");
  const [isUserVoted, setIsUserVoted] = useState(false);
  const [show, setShow] = useState(false);
  const [ID, setID] = useState();
  const [candidateName, setCandidateName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [numberOfVoters, setNumberOfVoters] = useState(0);


  const { name} = useLocation().state;

  console.log(name);

  const voteContractAddress = voting.contract;
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

        let candidateArr = [];
        for(let i = 0; i < publicData[0].length; i++) {
          let result = {
            candidate: publicData[0][i],
            id: publicData[1][i].toNumber(),
            cid: publicData[2][i],
          }
          candidateArr.push(result);
        }
        setCandidates(candidateArr);
        console.log(candidateArr)


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //voting
  const vote = async (id) => {
    setLoading(true);
    try {
      const {ethereum} = window;
      console.log(name);
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);
        console.log("TEST",name, id);
      
        await voteContract.vote(name, id, {
          gasLimit: 300000,
        });

        //listener
        const castVote = () => {
          setMessage("Voting successful")
          setLoading(false);
          setTimeout(() => {
            setVoted("")
          },5000)
        }

        voteContract.on("Vote", castVote)

      } else {
        alert("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getIsUserVoted = async () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);

      //checks if user has already voted
        const isVoted = await voteContract.getVoter(name);
        console.log(isVoted)
        setIsUserVoted(isVoted)
      } else {
        alert("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getNumberOfVoters = async() => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);

      //checks if user has already voted
        const publicData = await voteContract.getNumberOfVoters(name);
        setNumberOfVoters(publicData.toNumber())
      } else {
        alert("Ethereum object doesn't exist!")
      } 
    } catch(error) {
      console.log(error)
    }
  }

  const votingStatus = async () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);

      //checks if user has already voted
        const publicData = await voteContract.getVotingStatus(name);
        let electionStatus;
        if(publicData == 0) {
          electionStatus = 'ready'
        }
        if(publicData == 1) {
          electionStatus = 'ongoing'
        }
        if(publicData == 2) {
          electionStatus = 'ended'
        }
        if(publicData == 3) {
          electionStatus = 'result'
        }
        setStatus(electionStatus)
        console.log("STATUS", electionStatus)
      } else {
        alert("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchResults = async () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);

      //checks if user has already voted
        const publicData = await voteContract.getResults(name);

        let resultArr = [];
        for(let i = 0; i < publicData[0].length; i++) {
          let result = {
            candidate: publicData[0][i],
            vote: publicData[1][i].toNumber(),
          }
          resultArr.push(result);
        }
        
        setVotes(resultArr);
        console.log(votes)
      } else {
        alert("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  //MODAL POPUP
  const handleClose = () => {
    setShow(false)
    setID();
    setCandidateName("")
  };
  const handleShow = () => setShow(true);

  useEffect(async() => {
    try {
      await votingStatus();
      await getIsUserVoted();
      getCandidates();
      fetchResults();
      getNumberOfVoters();
      console.log(numberOfVoters)
    } catch (error) {
      console.log(error)
    }
    
  }, [message, status]);

  return (
    <div id="votecards">
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{candidateName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure!!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="warning" onClick={() => {
                handleClose();
                vote(ID);
                }}>
                Vote
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      <div className="header text-primary text-center font-italic">
        <h3>Zuri Vote</h3>
        {status == "ongoing" ? <p>Your polling unit</p> : <p>Poll result</p>}
        <hr></hr>
      </div>
      <div className="d-flex justify-content-between">
        <p className="pl-5">{name.toUpperCase()}</p>
      </div>
      
      {status == "result" ? (
        <div id="candidate" className="mt-5 result section">
          <p>Total votes: {numberOfVoters}</p>
          <h2 className=" header text-center">Result</h2>
          <hr />
          <table className="table">
            <tr className="result_table_row">
              <th>Candidate</th>
              <th>Vote</th>
            </tr>
            <div className="result_data">
              {
                votes.map(vote => {
                  return (
                    
                    <tr key={vote.candidate} className="result_table_row vote_rows mt-2">
                      <td>{vote.candidate}</td>
                      <td>{vote.vote}</td>
                    </tr>
                  )
                })
              }
            </div>
            
          </table>
        </div>
      ) : status == "ongoing" ? (
        <div className="voting_cards">
          
            {
                message.length > 0 ? <Alert className=" position-fixed end-40 " variant="success" dismissible={true} >{message}</Alert> : null
            }
            {
                (!message.length && isUserVoted) ? <Alert className="mb-5 position-fixed fixed-bottom text-center" variant="warning" >You have voted!!!</Alert> : null
            }
            <p className="text-center text-success">{loading === true ? "loading....." : ""}</p>
          {candidates.map((Candidate) => {
            return (
              <div key={Candidate.id} className="voting_card">
                <div className="image">
                  {
                    CID ? <img alt="candidate img/logo" src={`https://ipfs.io/ipfs/${Candidate.cid}`}/>
                    : null
                  }
                  
                </div>
                <h6>{Candidate.candidate}</h6>
                <div>
                  <button  className="btn text-light fw-bolder" {...(isUserVoted) && {disabled: true}} onClick={() => {
                    setID(Candidate.id)
                    setCandidateName(Candidate.candidate)
                    handleShow()
                  }}>Vote</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : status == "ended" ?(
        <p className="text-center">Election is ended, check back soon for result!</p>
      ) : <p className="text-center">Voting starts soon!!</p>
      }
    </div>
  );
};

export default Candidate;
