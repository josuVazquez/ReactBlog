import { Card, Button } from 'react-bootstrap';

import './postCard.scss'
import img from '../../assets/Blog-intro.jpg';

function PostCard({post}) {

    return ( <>
        <Card style={{ width: '18rem' }}>
        <Card.Img className="cardImage" variant="top" src={img} />
        <Card.Body>
            <Card.Title> {post.title} </Card.Title>
            <Card.Text> {post.text} </Card.Text>

        </Card.Body>
        </Card>
    </>); 
}

export default PostCard;