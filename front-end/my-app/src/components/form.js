import React, { useState } from 'react';
import { Button, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import {useContext} from "react";
import noteContext from "./noteContext.js";

const LenderForm = () => {
  
  const a = useContext(noteContext);  
  let obj = {};
  const [username, setUsername] = useState('');
  const [parameters, setParameters] = useState([{ name: '', expression: '' }]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleParameterChange = (index, event) => {
    const newParameters = [...parameters];
    newParameters[index][event.target.name] = event.target.value;
    setParameters(newParameters);
  };

  const addParameter = () => {
    setParameters([...parameters, { name: '', expression: '' }]);
  };

  const deleteParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username,
      parameters,
    };

    obj.lender = String(formData.username);
    obj.version = 1;
    obj.filters = [];
    let num = formData.parameters.length;
    for( let i = 0; i < num; i++) {
      obj.filters[i] = {};
      obj.filters[i].name = String(formData.parameters[i].name);
      obj.filters[i].expressions = String(formData.parameters[i].expression);
    }
    /*console.log(formData);*/
    obj = JSON.stringify(obj);
    try {
      const response = await fetch(`http://localhost:3000/lender`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
           
        },
        body: obj 
      });
      console.log(response);
      a.update();
    } catch (err) {
      console.log('Failed to fetch.');
    }
    
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Username:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </Col>
        </Form.Group>
        
        {parameters.map((parameter, index) => (
          <Row key={index} className="mb-3 align-items-center">
            <Col md={5}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Parameter Name"
                  name="name"
                  value={parameter.name}
                  onChange={(event) => handleParameterChange(index, event)}
                  required
                />
              </InputGroup>
            </Col>
            <Col md={5}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Parameter Expression"
                  name="expression"
                  value={parameter.expression}
                  onChange={(event) => handleParameterChange(index, event)}
                  required
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button
                variant="danger"
                onClick={() => deleteParameter(index)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}

        <Button
          variant="primary"
          className="me-2"
          type="button"
          onClick={addParameter}
        >
          Add Parameter
        </Button>
        <Button
          variant="success"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LenderForm;
