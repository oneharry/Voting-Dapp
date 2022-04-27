import React, {useState} from 'react';
import '../../styles/admin.css'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Candidate = () => {
    const [status, setStatus] = useState("result")
    const [fileBuff, setFileBuff] = useState();
    const [loading, seloading] = useState();
    const [loading1, setloading1] = useState();
  
    const [cid, setCID] = useState('')

    //name of clicked election
    const {name} = useLocation().state;


      //handling upload
      const fileUpload = async (e) => {
        e.preventDefault();
       
      };

        //handle file upload button click
      const register = async (e) => {
        e.preventDefault();
        
  };




    return(
        <div id='candidate'>
                <p>{name}</p>
                <hr />
            <div className='section election_info'>

                <span className='ml-2 d-flex align-items-start'>
                     <p className='text-start'>Status: </p>
                     <solid className="h6">{status}</solid>
                </span>
                
                <div className='control d-flex  justify-content-start'>
                    <Button variant='success' onClick={() => setStatus("ongoing")}>Start</Button>
                    <Button variant='danger' onClick={() => setStatus("ended")}>End</Button>
                    <Button variant='primary' onClick={() => setStatus("result")}>Result</Button>
                </div>
            </div>

            {
                status == "result" ? (
                    <div className="mt-5 result section">
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
                : (
                  <div className='section candidate_register'>
               

                  <h2 className=' header text-dark text-center'>Candidates</h2>
                  <hr />
                  <form className='candidate_form'>
                      <div className='candidate_input'>
                          <input className="input" placeholder="Name of Candidate" />
                          {/* <div>{loading1 === true ? "uploading...." : ""}</div> */}
                          <input className="my-3" type="file" onChange={fileUpload}></input>
                          {/* <div>{loading === true ? "loading....." : ""}</div> */}
                          <Button onClick={register} className="button" variant="success">Register</Button>
                      
                      </div>
  
                      
                  </form>
                </div>
                )
            }
        </div>

    )
}

export default Candidate;