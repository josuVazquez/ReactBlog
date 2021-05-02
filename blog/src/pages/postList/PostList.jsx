import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import PostCard from "../../components/postCard/PostCard";

import './postList.scss';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/posts', {
            // headers: {
            //     'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOiI2MDgzZmViYmQyMWU0ZDYyZjQwOGRlMTciLCJjYWR1Y2EiOjE2MTkyNjU2MzIsImlhdCI6MTYxOTI2NTAzMn0.-Sr8BezZdM-cHss53JlsRlbNR4VXF4vAc6ZCO0DYYhU'
            // }
        }).then(response => {
            console.log(response.data);
            setPosts(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const history = useHistory();

    const handleRoute = _id => () => {
        history.push(`/post/${_id}`);
    }

    return ( <div className="content">
            <ul className="postList">
                {posts.map(post => 
                    (
                        <li className="post" key={post._id} onClick={ handleRoute(post._id) }>
                            <PostCard post={post}/>
                        </li>
                    )
                    )}
            </ul>
            </div>
            ); 
}

export default PostList;