import React, {useState} from 'react';
import '../../styles/admin.css'
import { Button, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { BigNumber, ethers } from "ethers";
import voting from '../../utils/voting.json';

const NewElection = ({isChairman}) => {

    const [newAddress, setNewAddress] = useState("");
    const [message, setMessage] = useState("");
    const [message1, setMessage1] = useState("");
    const [stakeholder, setStakeholder] = useState("")
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const voteContractAddress = voting.contract;
    const voteContractABI = voting.abi;


    const transferChairman = async(e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const {ethereum} = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();

                const voteContract = new ethers.Contract(
                    voteContractAddress,
                    voteContractABI,
                    signer
                )

                const publicData = await voteContract.transferChairmanRole(newAddress);
                
                    setLoading(false);
                    setMessage("Chairman changed succesfully");
                
            
            } else {
                alert("Ethereum object doesn't exist")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const registerStakeholder = async(e) => {
        e.preventDefault()
        setLoading1(true);
        try {
            const {ethereum} = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();

                const voteContract = new ethers.Contract(
                    voteContractAddress,
                    voteContractABI,
                    signer
                )

                const publicData = await voteContract.giveStakeholderRole(stakeholder);

                const registerStake = () => {
                    setLoading1(false);
                    setMessage1("User added succesfully");
                  };
              
                
                  voteContract.on("AddStakeholder", registerStake);
            
            } else {
                alert("Ethereum object doesn't exist")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const removeStakeholder = async(e) => {
        e.preventDefault()
        setLoading2(true);
        try {
            const {ethereum} = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();

                const voteContract = new ethers.Contract(
                    voteContractAddress,
                    voteContractABI,
                    signer
                )

                const publicData = await voteContract.removeStakeholderRole(stakeholder);

                const removeStake = () => {
                    setLoading2(false);
                    setMessage1("User removed succesfully");
                  };
              
                  
                  voteContract.on("RemoveStakeholderRole", removeStake);
            
            } else {
                alert("Ethereum object doesn't exist")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return(
        <div>
            { isChairman ? (
                            <div id="candidate">
                            <p>access control & registration</p>
                                <hr></hr>
                            <form className='candidate_form'>
                                <div>
                                    {
                                        message1.length > 0 ? <Alert className=" sticky-top " variant="success" dismissible={true} >{message1}</Alert> : null
                                    }
                                    <p className="text-center sticky-top text-success">{loading1 === true ? "loading....." : ""}</p>
                                    <div className='mb-3 candidate_input'>
                                        <p className="text-center">{message1}</p>
                                        <h5 className='text-center'>Add Stakeholders</h5>
                                        <input onChange={(e) => setStakeholder(e.target.value)} className="input" placeholder="Address..." />
                                        <Button onClick={registerStakeholder} className="button" variant="primary" >{
                                                loading1 ? "Please wait..." : "Register Stakeholder"
                                            }</Button>
                                        <Button onClick={removeStakeholder} className="button" variant="danger" >{
                                                loading2 ? "Please wait..." : "Remove Stakeholder"
                                            }</Button>
                                    </div>
                                            {/* <div className='candidate_input pt-4'>
                                                <hr></hr>
                                                <h5 className='text-center'>Grant Access </h5>
                                                <select className="input mb-3" onChange={(e) => setAccess(e.target.value)}>
                                                    <option value="">
                                                        Register as
                                                    </option>
                                                    <option value="staff">
                                                        Staff
                                                    </option>
                                                    <option value="bod">
                                                        BOD
                                                    </option>
                                                </select>
                                                <input className="input" placeholder="Address..." />
                                                <Button onClick={grantAccessControl} className="button" variant="primary">Give Access</Button>
                                            </div> */}
                
                                        <div className='pt-4 candidate_input'>
                                            {
                                                message.length > 0 ? <Alert className=" sticky-top " variant="success" dismissible={true} >{message}</Alert> : null
                                            }
                                            <p className="text-center text-success">{loading === true ? "loading....." : ""}</p>
                                            <hr></hr>
                                            <h5 className='text-center'>New Chairman</h5>
                                            <input onChange={(e) => setNewAddress(e.target.value)} value={newAddress} className="input" placeholder="New Chairman Address" />
                                            <Button onClick={transferChairman} className="button" variant="warning" >{
                                                loading ? "Please wait..." : "Transfer chairman role"
                                            }</Button>
                                        </div>
            
                                </div>
                                
                                
                            </form>
                        </div>
            )
            : <Link className="text-primary" to="/">Home</Link>
            }
        </div>

    )
}

export default NewElection;