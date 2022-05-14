import React, { useState, useEffect } from "react";
import "../../styles/admin.css";
import { Link, useNavigate } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import voting from "../../utils/voting.json";


const Elections = () => {
  const [election, setElection] = useState("");
  const [elections, setElections] = useState([]);

  const voteContractAddress = voting.contract;
  const voteContractABI = voting.abi;

  let navigate = useNavigate();
  const set = (x) => {
    setElection(x);
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
        const reversePublicData = arr => {
          let newArr = [];
          arr.forEach(element => {
            newArr.unshift(element);
          });
          return newArr;
        } 
        const t = await reversePublicData(publicData)
        console.log(t);
        setElections(t);

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

  return (
    <div id="candidate">
      <p>elections</p>
      <hr></hr>

      <div className="candidate_main">
        <div className="d-flex justify-content-end">
          <a href="/new/">Create Election+</a>
        </div>
        {
          !elections.length ? <p className="text-center">Loading elections...</p>
          : (
            <div className="candidate_list">
              {elections.map((name) => {
                return (
                  <div
                      
                      className="candidate_item d-flex flex-column justify-content-around align-items-center"
                    >
                      <h4 className="text-center">{name.toUpperCase()}</h4>
                      <Link 
                        to="/candidate"
                        state={{ name }}
                        className="candidate_item_link "
                      ><i class="bi bi-arrow-right" ></i></Link>
                  </div>
                );
              })}
            </div>
          )
        }
        
      </div>
    </div>
  );
};

export default Elections;
