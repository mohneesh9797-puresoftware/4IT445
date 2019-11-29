import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export function MatchDetailScore({hostName, guestName, hostGoals, guestGoals}) {
    return (
        <Row className="match-score">
            <Col lg={5} md={12} sm={12} xs={12} className=" align-self-center team-home">
                <div className="text-center mt-2">Domácí:</div>
                <h2>{hostName}</h2>
            </Col>
            <Col lg={1} md={12} sm={12} xs={12} className="mb-lg-0 mb-3 score align-self-center">
                <span className="home">{hostGoals}</span>
            </Col>
            <Col lg={1} md={12} sm={12} xs={12} className="align-self-center score">
                <span className="home">{guestGoals}</span>
            </Col>
            <Col lg={5} md={12} sm={12} xs={12} className="align-self-center team-visiting">
                <div className="text-center mt-2">Hosté:</div>
                <h2>{guestName}</h2>
            </Col>
        </Row>
    );
}