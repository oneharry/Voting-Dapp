import React, {useState} from 'react';
import '../../styles/admin.css'
import { Link} from 'react-router-dom';

const Elections = () => {
    const [election, setElection] = useState("")
    const [elections, setElections] = useState(["Harry", "Hello", "world"])

    const set = (x) => {
        setElection(x)
    }
    return(

        <div id='candidate' >
            <p>elections</p>
            <hr></hr>
 
            <div className='election_main'>
                <div className='election_list'>
                    {
                        elections.map(name => {
                            return(
                                <Link to="candidate" state={{name}} onClick={() => alert(name)} className='election_item '>
                                <h4>{name}</h4>
                                <p>Description</p>
                            </Link> 
                            )
                   
                        })
                    }
                </div>

            </div>

    </div>
    )
}

export default Elections;