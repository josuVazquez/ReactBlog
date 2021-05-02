import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import axios from 'axios';

import './post.scss';

function Post() {

    const history = useHistory();
    const { _id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/${_id}`, {
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.log(error);
        });
    });

    function deletePost() {
        axios.delete(`http://localhost:8080/posts/delete/${_id}`, {
        }).then(response => {
            goToList();
        }).catch(error => {
            console.log(error);
        });
    }
    
    function goToList() {
        history.push(`/post-list`);
    }

    function editPost() {
        history.push(`/post-edit/${_id}`);
    }

    return ( 
    <div className="content">
        <header>
            <h1>{post.title}</h1>
            <h4>{post.category}</h4>
        </header>
        {/* <img /> */}
        <article>
            {post.text}
        </article>
        <footer>
            <Button variant="danger" onClick={ () => { deletePost() }}>
                <FaTrash/>
            </Button>
            <Button variant="primary" onClick={ () => { editPost() } }>
                <FaEdit/>
            </Button>
        </footer>
    </div>); 
}

export default Post;