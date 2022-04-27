import React from 'react';
import '../styles/sidebar.css'
import {Link} from 'react-router-dom'

const  SideBar = () => {
    return(
        <nav id="sidebar" className='bg-primary'>
            <div className="sidebar-header">
                <h4>Electoral Management system</h4>
                
            </div><hr></hr>

            <ul class="list-unstyled components">
                
                <li>
                    <Link to="elections">Elections</Link>
                </li>
                <li>
                    <Link to="new">Create Election</Link>
                </li>
                <li>
                    <Link to="airdrop">Voting Tokens</Link>
                </li>

            </ul>

        </nav>
    )
}

export default SideBar;