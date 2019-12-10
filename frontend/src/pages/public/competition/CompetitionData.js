import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink as Link} from "react-router-dom";
import {Heading} from "../../../atoms";
import React from "react";
import { formatDate } from "../../../utils/date"

export function CompetitionData({state}) {

    return (
        <Row className="mb-5 align-items-center h-100">
            <Col className="mx-auto" lg={8} md={12}>
                <Row className="teamDetailDesc">
                    <Col sm={{ span: 2, offset: 1 }} xs={6}>
                        <p>Sport <FontAwesomeIcon className="ml-2"/></p>
                        <Link className="text-decoration-none" to={'/competitions/' + state.competition_data[0].sport}>
                            <Heading size="xs">
                                {state.competition_data[0].sport}
                            </Heading>
                        </Link>
                    </Col>
                    <Col sm={2} xs={6}>
                        <p>Mesto <FontAwesomeIcon className="ml-2"/></p>
                        <Link className="text-decoration-none" to={'/competitions/' + state.competition_data[0].city}>
                            <Heading size="xs">
                                {state.competition_data[0].city}

                            </Heading>
                        </Link>
                    </Col>
                    <Col sm={2} xs={6} className="mt-sm-0 mt-3">
                        <p>Typ</p>
                        <Heading size="xs">{state.competition_data[0].type}</Heading>
                    </Col>
                    <Col className="mt-sm-0 mt-3" sm={2} xs={6}>
                        <p>Začátek<FontAwesomeIcon className="ml-2" size="1x"/></p>
                        <Heading size="xs">
                            {formatDate(state.competition_data[0].start_date)}
                        </Heading>
                    </Col>
                    <Col className="mt-sm-0 mt-3" sm={2} xs={6}>
                        <p>Konec <FontAwesomeIcon className="ml-2" size="1x"/></p>
                        <Heading size="xs">
                            {formatDate(state.competition_data[0].end_date)}
                        </Heading>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}