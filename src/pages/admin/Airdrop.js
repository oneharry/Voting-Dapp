import React, {useState} from 'react';
import '../../styles/admin.css'
import { Button } from 'react-bootstrap';

const Airdrop = () => {
    const [election, setElection] = useState("")
    const [elections, setElections] = useState(["Harry", "Hello", "world"])

    const sendTokens = (x) => {
        setElection(x)
    }
    return(

        <div id='candidate'>
                <p>voters permit token</p>
                <hr></hr>
                <form className='candidate_form'>
                <div className='header text-primary text-center font-italic'>
                    <h3>ZurChemy</h3>
                    <p>Voting platform</p>
                    <hr></hr>
                </div>
                  <div className="d-flex flex-column">
    
                      <input type="file" onChange={() => alert("file changed")} />
                  </div>
                  <Button className='mt-4' onClick={sendTokens} variant="warning" >
                    Air Drop Token
                  </Button>
                </form>
        </div>
    )
}

export default Airdrop;