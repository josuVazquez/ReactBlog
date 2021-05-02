import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Switch, Route, Link } from 'react-router-dom';
//Page Imports
import Home from '../../pages/home/Home';
import NewPost from '../../pages/newPost/NewPost';
import Post from '../../pages/post/Post';
import PostList from '../../pages/postList/PostList';

import './header.scss'

function Header() {
    return ( <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand as={Link} to="/">Mi Blog</Navbar.Brand>
            <Nav className="links">
              <Nav.Link as={Link} to="/post-list">Lista de Post</Nav.Link>
              <Nav.Link as={Link} to="/new-post">Crea un post</Nav.Link>
            </Nav>
            <Form className="searchForm">
              <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
              <Button variant="outline-light">Buscar</Button>
            </Form>
            <Button variant="outline-light" className="filterButton">
              <FaSearch/>
            </Button>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/post-list' component={PostList} />
          <Route exact path='/new-post' component={NewPost} />
          <Route exact path='/post-edit/:_id' component={NewPost} />
          <Route exact path='/post/:_id' component={Post} />
          <Route render={function () {
            return (
            <div className="notFound">
              <h1>404</h1>
              <p>Not found</p>
            </div>)
          }} />
        </Switch>
    </>); 
}

export default Header;