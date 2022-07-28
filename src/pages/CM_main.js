import React from 'react';
import {Link} from 'react-router-dom';

function CMmain(){
    return(
        <div>
            <Link to="/review">
                <button>커뮤니티로</button>
            </Link>
        </div>
    );
};

export default CMmain;