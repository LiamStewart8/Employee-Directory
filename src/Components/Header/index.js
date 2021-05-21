import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Jumbo = (props) => {
    return (
        <div>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-3">Employee Directory</h1>
                </Container>
            </Jumbotron>
        </div>
    );
};

export default Jumbo;