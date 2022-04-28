import React, {useState} from 'react';
import '../../styles/admin.css'
import { Outlet } from 'react-router-dom';

const Elections = () => {
    const [election, setElection] = useState("")
    const [elections, setElections] = useState(["Harry", "Hello", "world"])

    const set = (x) => {
        setElection(x)
    }
    return(

        <div className='election_outlet'>

            <Outlet />

        </div>
    )
}

export default Elections;