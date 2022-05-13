import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { Link} from 'react-router-dom';
import "../App.css"

const Home = ({isChairman}) => {

    const [isStaff, setIsStaff] = useState(true);

    return(
        <div className="main d-lg-flex">
            
            <div className="home_content flex-md-row">
                <div className=" text-light text-start">
                    <div className="home_text">
                        <h1 className="lh-base fs-large fw-bolder">ZuriVote Provides A Trustless  Voting Platform </h1>
                        <p className="my-4">Every stakeholer(students and staff) now have a say in our elections. </p>
                    </div>
                    <div className="home_buttons d-flex justify-content-around mt-5">
                    
                        <Button href="/voting" className=" fw-bold px-5 py-2" variant="primary">Create Vote</Button>
                        {
                            isChairman ? <Link to="/elections" className=" fw-bold px-5 py-2" variant="primary">Manage Voting</Link>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="home_image flex-md-row">
                    <img 
                    src="https://media.istockphoto.com/vectors/people-putting-a-completed-paper-ballot-into-a-polling-box-election-vector-id1271676007?k=20&m=1271676007&s=612x612&w=0&h=nwO_0oVkkVcGvhcX7H2-UG2Ze0fuV51WsrxJrPGxMj4=" 
                    alt="voters"
                    />
            </div>
 
        </div>
    )
}

export default Home;