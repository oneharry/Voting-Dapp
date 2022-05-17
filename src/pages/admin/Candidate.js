import React, { useState, useEffect, useRef } from "react";
import "../../styles/admin.css";
import { Button, Alert, Fade, Modal } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";
import { get } from "https";
import Web3 from "web3";
import ipfs from "../../utils/ipfs"

const Candidate = ({isChairman}) => {
  const [status, setStatus] = useState("");
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message0, setMessage0] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [address, setAddress] = useState("");
  const [buffer, setBuffer] = useState("");
  const [votes, setVotes] = useState([]);
  const [numberOfVoters, setNumberOfVoters] = useState(0);



  const nameRef = useRef();

  const voteContractAddress = voting.contract;
  const voteContractABI = voting.abi;

  //name of clicked election
  const { name } = useLocation().state;

  //handling upload
  const fileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      
      let buff = Buffer(reader.result);
      setBuffer(buff)
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

        const electionEnabled = () => {
          setLoading1(false);
          setMessage("Election has been enabled");
        };
        voteContract.on("EnableVoting", electionEnabled);
      
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

        const electionStopped = () => {
          setLoading1(false);
          setMessage("Election has been stopped");
        };
    
        voteContract.on("StopVoting", electionStopped);
        
      }

      
    } catch (error) {
      setLoading1(false);
      console.log(error);
    }
  };

  const enableResult = async (e) => {
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

        const Txn = await voteContract.allowResultCompile(name, {
          gasLimit: 3000000,
        });
        
        console.log("Mining...", Txn.hash);

        const resultEnabled = () => {
          setLoading1(false);
          setMessage("Result view is enabled");
        };
    
        voteContract.on("changeVoteStatus", resultEnabled);
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
        //assert input field/image upload
        const candidate = nameRef.current.value;
          console.log(candidate, buffer);
        if(candidate == "" && buffer == "" ) {
          setLoading(false);
          setMessage0("Enter name and upload image")
        
        } else {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const voteContract = new ethers.Contract(
            voteContractAddress,
            voteContractABI,
            signer
          );
            const buffData = await ipfs.add(buffer);
            
            const imgUrl = buffData[0].hash;
            console.log(imgUrl)
          const Txn = await voteContract.addCandidate(name, candidate, imgUrl, {
            gasLimit: 3000000,
          });


          const candidateCreated = () => {
            setLoading(false);
            setMessage("Candidate added successfully");
            nameRef.current.value = ""
          };
          
          voteContract.on("AddCandidate", candidateCreated);
          console.log("Mining...", Txn.hash);
        }

      }

      //handle smartcontract here
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get election status
  const votingStatus = async () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);

      //checks if user has already voted
        const publicData = await voteContract.getVotingStatus(name);
    
        if(publicData == 0) {
          setStatus('ready')
        }
        if(publicData == 1) {
          setStatus('ongoing')
        }
        if(publicData == 2) {
          setStatus('ended')
        }
        if(publicData == 3) {
          setStatus('result')
        }
        
      } else {
        alert("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }


  //get results
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
          console.log(result)
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

  useEffect(async () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const voteContract = new ethers.Contract(voteContractAddress, voteContractABI, signer);

      }

      await votingStatus();
      getElections();
      fetchResults()
      getNumberOfVoters()
      setTimeout(() => {
        setMessage("")
      }, 5000)

    } catch (error) {
      console.log(error)
    }

    return () => {
      voteContract.removeAllListeners();
    }
    
  }, [status, message]);

  // useEffect(async () => {
    
  // }, []);


  return (
    <div>
        { isChairman ?  (
        <div id="candidate">
        {
                message.length > 0 ? <Alert className=" position-fixed end-40 " variant="success" dismissible={true} >{message}</Alert> : null
        }
        <p>{name}</p>

        <hr />
        <div className="section election_info">
          <span className="ml-2 d-flex align-items-start">
            
          </span>
          <div className="control d-flex  justify-content-start">
              <p className="text-start">status:  {status}</p>
              <div>
                <p className="text-center text-success">{loading1 === true ? "loading....." : ""}</p>
                <Button variant="success" onClick={startElection}>
                  Start
                </Button>
                <Button variant="danger" onClick={stopElection}>
                  End
                </Button>
                <Button variant="primary" onClick={enableResult}>
                  Result
                </Button>
              </div>
            
          </div>
        </div>
  
        {status == "result" ? (
          <div className=" result section">
            <p>Total votes: {numberOfVoters}</p>
            <h2 className=" header text-center">Result - {name}</h2>
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
                    
                    <tr key={vote.candidate} className="result_table_row vote_rows">
                      <td>{vote.candidate}</td>
                      <td>{vote.vote}</td>
                    </tr>
                  )
                })
              }
            </div>
            </table>
          </div>
        ) : (
          <div className="section candidate_register">
            {/* <div className="alert-success">
              {message.length > 0 ? message : ""}
            </div> */}
            <h2 className=" header text-dark text-center">Add candidates</h2>
            <hr />
            <form className="candidate_form">
              <p className="text-danger">{message0}</p>
              <div className="candidate_input">
                <input
                  className="input"
                  ref={nameRef}
                  placeholder="Name of Candidate"
                />
                {/* <div>{loading1 === true ? "uploading...." : ""}</div> */}
                <input className="my-3" type="file" onChange={fileUpload} required></input>
                {/* <div>{loading === true ? "loading....." : ""}</div> */}
                <Button
                  onClick={addCandidate}
                  className="button"
                  variant="success"
                >{
                  loading ? "Please wait..." : "Register"
                }
                
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
      )
      : <Link className="text-center text-primary" to="/">Home</Link>
    }
    </div>
  );
};

export default Candidate;
