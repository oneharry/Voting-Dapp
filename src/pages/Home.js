import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";

const Home = () => {



    return(
        <div className="main">
            
            <div className="home_content flex-md-row">
                <div className=" text-light text-center">
                    <div className="home_text">
                        <h1 className="my-4 lh-base fs-large fw-bolder">ZurCemy Provides A Trustless  Voting Platform <br></br> For Everyone In Zuri Academy.</h1>
                        <p className="my-4">Every stakeholer(students and staff) now have a say in our elections. </p>
                    </div>
                    <div className="home_buttons">
                    
                    <Button href="/voting" className="fw-bold px-5 py-2" variant="primary">Get Started</Button>
                
                    </div>
                </div>
            </div>
 
        </div>
    )
}

export default Home;