import React, {useState} from 'react';
import '../../styles/voting.css'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Candidate = () => {
    const [status, setStatus] = useState("ongoing")
    const [candidates, setCandidates] = useState(["result","dummy","two","one", "Hello"])

    const {name} = useLocation().state;

    return(
        <div id='votecards' >

                <div className='header text-primary text-center font-italic'>
                    <h3>ZurChemy</h3>
                    <p>Your polling unit</p>
                    <hr></hr>
                </div>              
                <p className='text-dark pl-2'>{name.toUpperCase()}</p>

            {
                status == "result" ? (
                    <div id='candidate' className="mt-5 result section">
                    <h2 className=" header text-center">Result - {name}</h2>
                    <hr />
                    <table className="table">
                      <tr className="result_table_row">
                        <th>Candidate</th>
                        <th>Points</th>
                      </tr>
                      <tr className="result_table_row">
                        <td>Harry</td>
                        <td>1</td>
                        
                      </tr>
                    </table>
 
                  </div>
                )
                : (status == "ongoing") ?  <div className='voting_cards'>
                    {
                        candidates.map(Candidate => {
                           return (
                                <div className='voting_card'>
                                   <div className='image'>
                                   <img src=''/>
                                   </div>
                                   <h6>{Candidate}</h6>
                                   <div>
                                   <button>Vote</button>
                                   </div>
                                   
                                   
                                </div>
                                )
                        })
                    }
                </div>
    
                : <p className='text-center'>Election is currently not available</p>
            }
        </div>

    )
}

export default Candidate;