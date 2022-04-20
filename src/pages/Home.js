import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";


const Home = () => {



    return(
        <div className="main">
            
            <div className="home_content bg-dark flex-md-row">
                <div className=" text-light text-center">
                    <div className="home_text">
                        <h1 className="my-4 lh-base fs-large fw-bolder">Best Platform For Learning <br></br> Further Your Learning Path.</h1>
                        <p className="my-4">Smart students <span className="text-danger">|</span> Best Teachers <span className="text-danger">|</span> Five Star Facilities</p>
                    </div>
                    <div className="home_buttons">
                    
                       
                
                    </div>
                </div>
                <div id="register" className="form bg-dark mx-5 mt-5 pt-5">
                    <form>
                        <div className="mb-3">
                            <select>
                                <option value="select Vote">-Select Option-</option>
                                <option>Student</option>
                                <option>Teacher</option>
                                <option>Board of Director</option>
                            </select>
                        </div>
                        <div>
                        <input className="mt-3 mb-5" placeholder="Name of Candidate" />
                        </div>
                        <Button className="fw-bold px-5 py-2" variant="danger">Enroll</Button>
                    </form>
                </div>
            </div>
 
        </div>
    )
}

export default Home;