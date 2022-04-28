import React, {useState} from 'react';
import '../../styles/admin.css'
import { Link, useNavigate} from 'react-router-dom';

const Elections = () => {
    const [election, setElection] = useState("")
    const [elections, setElections] = useState(["Harry", "Hello", "world"])

    let navigate = useNavigate();
    const set = (x) => {
        setElection(x)
    }
    return(

        <div id='candidate' >
            <p>elections</p>
            <hr></hr>
 
            <div className='candidate_main'>
                <div className='d-flex justify-content-end'><Link to="new">Create Election+</Link></div>
                <div className='candidate_list'>
                    {
                        elections.map(name => {
                            return(
                                <Link to="/candidate" state={{name}} onClick={() => console.log(name)} className='candidate_item '>
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