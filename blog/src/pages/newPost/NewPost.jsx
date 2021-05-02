import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';

import './newPost.scss';

function NewPost() {

    const { _id } = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        if(_id) {
            getPost();
        }
    });

    function getPost() {
        axios.get(`http://localhost:8080/posts/${_id}`, {

        }).then(response => {
            console.log(response.data);
            setPost(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const schema = yup.object({
        title: yup.string()
        .min(4, "*El titulo tiene que tener al menos 4 caracteres")
        .max(100, "*El titulo no puede tener mas de 100 caracteres")
        .required("*El titulo es necesario"),
        text: yup.string()
        .min(4, "*El texto tiene que tener al menos 4 caracteres")
        .max(1000, "*LEl texto puede tener mas de 1000 caracteres")
        .required("*El texto es necesario"),
        category: yup.string()
        .min(4, "*La categoria tiene que tener al menos 4 caracteres")
        .max(100, "*La categoria puede tener mas de 100 caracteres")
        .required("*La categoria es necesario")
    });

    function createPost(newPost) {
        axios.post(`http://localhost:8080/posts/new`, newPost)
        .then(response => {
            console.log(response.data);
            // setPost(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function updatePost(updatePost) {
        axios.put(`http://localhost:8080/posts/update/${_id}`, updatePost)
        .then(response => {
            console.log(response.data);
            // setPost(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    return ( 
    <div className="content" >
        <Formik 
        initialValues={{ title: post.title, text: post.text, category: post.category }} 
        enableReinitialize
        validationSchema={schema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true);
          setTimeout(() => {
              if(post) {
                updatePost(values);
              } else {
                createPost(values);
              }
            actions.setSubmitting(false);
          }, 500);
        }}>
        {/* Callback function containing Formik state and helpers that handle common form actions */}
        {formik => (
        <Form className="formGroup" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formPostTitle">
                <Form.Label>Titulo del post</Form.Label>
                <Form.Control value={formik.values.title} onChange={formik.handleChange} name="title" type="text" placeholder="Titulo del post" />
            
            {formik.touched.title && formik.errors.title ? (
                <div className="error-message">{formik.errors.title}</div>
              ): null}
            </Form.Group>

            <Form.Group controlId="formPostText">
                <Form.Label>Texto del blog</Form.Label>
                <Form.Control value={formik.values.text} onChange={formik.handleChange} name="text" as="textarea" rows={8} />
            
                {formik.touched.text && formik.errors.text ? (
                <div className="error-message">{formik.errors.text}</div>
              ): null}
            </Form.Group>

            <Form.Group controlId="formPostCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control value={formik.values.category} onChange={formik.handleChange} name="category" type="text" placeholder="Categoria" />
            {formik.touched.category && formik.errors.category ? (
                <div className="error-message">{formik.errors.category}</div>
              ): null}
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        )}
        </Formik>
    </div>); 
}

export default NewPost;