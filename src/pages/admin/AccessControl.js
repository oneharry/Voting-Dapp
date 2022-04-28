import React, {useState} from 'react';
import '../../styles/admin.css'
import { Button } from 'react-bootstrap';

const NewElection = () => {
    const [access, setAccess] = useState("")
    const [address, setAddress] = useState("")
    const [bod, setBOD] = useState(true)


    const registerStakeholder = (e) => {
        e.preventDefault()
    }
    const grantAccessControl = (e) => {
        e.preventDefault()
    }

    return(
        <div id="candidate">
            <p>access control & registration</p>
                <hr></hr>
            <form className='candidate_form'>
                <div>

                    <div className='mb-3 candidate_input'>
                        <h5 className='text-center'>Stakeholders</h5>
                        <input onChange={(e) => setAddress(e.target.value)} className="input" placeholder="Address..." />
                        <Button onClick={registerStakeholder} className="button" variant="primary" >Register</Button>
                    </div>
                    {
                        bod ? (
                            <div className='candidate_input pt-4'>
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
                            </div>
                        )
                        : null
                    }

                </div>
                
                
            </form>
        </div>
    )
}

export default NewElection;