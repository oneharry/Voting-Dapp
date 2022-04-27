import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';

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
            <Outlet />
 
        </div>
    )
}

export default CastVote;