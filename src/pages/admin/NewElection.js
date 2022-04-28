import React from 'react';
import '../../styles/admin.css'
import { Button } from 'react-bootstrap';

const NewElection = () => {

    return(
        <div id="candidate">
            <p>new election</p>
                <hr></hr>
            <form className='candidate_form'>
                <div className='header text-primary text-center font-italic'>
                    <h3>Zuri Vote</h3>
                    <p>Voting platform</p>
                    <hr></hr>
                </div>
                <div className='candidate_input'>
                <input className="input" placeholder="Title of Election" />
                    <Button className="button" variant="primary">Create Election</Button>
                </div>
                
            </form>
        </div>
    )
}

export default NewElection;