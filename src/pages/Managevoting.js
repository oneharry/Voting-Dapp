import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";


const ManageVoting = () => {
    //CREATING NEW ELECTION
    const [newElection, setNewElection] = useState("");

    const createElection = () => {
        //
    }

    //ADDING NEW CANDIDATE
    const [candidateName, setCandidateName] = useState("");
    const [allElections, setAllEllections] = useState([]);
    useEffect(() => {
        //fetch all available elections

    })

    const addCandidate = () => {
        
    }


    //ELECTION STATUS SECTION
    const [voteStatus, setVoteStatus] = useState(true);

    useEffect(() => {
        //fetch all elections and status voteStatus

    },[])

    const enableVoting = () => {
        //calls the enableVote from contract
        setVoteStatus(true)
    }

    const disableVoting = () => {
        //calls the disableVote from contract
        setVoteStatus(false)
    }

    //COMPILE RESULT

    const showResult = () => {
        //fetch result
    }

    return(
        <div className="manage_vote">
    
            <div className="forms flex-md-row">
                <div className="form">
                    <h5>Set up New Election</h5>
                    <form>
                    <input value={newElection} onChange={(e) => setNewElection(e.target.value)} placeholder="Title of Election" />
                    </form>
                    <button onClick={createElection} className="p-1 px-2 btn-primary rounded">Create Election</button>
                </div>

                <div className="form">
                    <h5>Candidate for Election</h5>
                    <form>
                        <div>
                            <select>
                                <option value="select Vote">Select Election</option>
                                <option></option>
                            </select>
                        </div>
                        <div>
                        <input value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="Name of Candidate" />
                        </div>
                        <button onClick={addCandidate} className="p-1 px-2 btn-primary rounded">Add Candidate</button>
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
                    <tr className="table_row">
                        <td></td>
                        <td></td>
                        <td>
                            {
                                voteStatus ? <button onClick={disableVoting} className="p-1 px-2 btn-danger rounded">Disable</button>
                                : <button onClick={enableVoting} className="p-1 px-2 btn-success rounded">Enable</button>
                            }
                        </td>
                    </tr>
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
                                {
                                    allElections.map(election => {
                                        return <option>{election}</option>
                                    })
                                }
                            </select>
                            <button onClick={showResult} className="p-1 mx-2 px-2 btn-warning rounded">Show Result</button>
                </div>
            </div>
        </div>
    )
}

export default ManageVoting;