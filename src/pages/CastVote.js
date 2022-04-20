import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";

const CastVote = () => {

    const [candidates, setCandidates] = useState(["sample1", "sample2", "sample3"])
    const [elections, setElections] = useState(["Election1", "Election2", "Election3"])
    const loadCandidates = (e) => {
        alert(e.target.value)
    }
    
    useEffect(() => {
        //fetch all elections from contract
    },[])
    const vote = () => {
        alert("voted")
    }

    return(
        <div>
           <div  id="vote">
               <h2 className="text-center h1 fw-bold">Our Voting Platform</h2>
                <div className="">

                    <form>
                        <div className="pt-4 text-center">
                            <select onChange={loadCandidates}>
                                <option value="select Vote">-Select Election -</option>
                                {
                                    elections.map((election, idx) => <option value={election} key={idx}>{election}</option>)
                                }
                            </select>
                        </div>
                    </form>
                </div>
                <div className="pt-5 mt-3">
                    { 
                            candidates == [] ? <p>No candidates for this election</p>
                            : 
                            (<ul>
                                <h4 className="text-center">Aspirants</h4>
                                <hr></hr>
                                {
                                    candidates.map(candidate => {
                                        return <li className="d-flex justify-content-between px-4 my-4"> <span className="fw-bold h5">{candidate}</span> <button className="p-1 px-2 btn-success rounded px-4"  onClick={vote}>Vote</button></li>
                                    })
                                }
                                
                            </ul>)

                    }
                </div>
           </div>
        </div>
    )
}

export default CastVote;