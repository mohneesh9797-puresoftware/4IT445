import React from 'react';
import {Heading} from "../../basicComponents";
import {CustomSelect} from "../../basicComponents/Select";
import {changeTeamStatus, useGetCompetitions} from "../../api/competitionClient_v1";
import {Formik} from "formik";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useParams} from "react-router";
import {useApi} from "../../hooks/useApi";
import {useGetTeamCompetition} from "../../api/teamClient_v1";

export function TeamAdminSelectCompetition() {

    const [competitions] = useGetCompetitions();
    let {id_team} = useParams();
    const [teamsCompetitions] = useGetTeamCompetition(id_team);
    const api = useApi();
    return (
        <div>
            {competitions.isLoading && <div>Načítám data...</div>}
            {!competitions.isLoading && competitions.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!competitions.isLoading && !competitions.error &&
            <Formik
                initialValues={{
                    id_competition: "Vyberte soutez"
                }}
                onSubmit={values => {changeTeamStatus(api, values, id_team, "pending")
                    console.log(values)
                }}
            >{({handleSubmit, setFieldValue}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col xl={10} lg={10}>
                            <Row>
                                <Col sm={{span: 6, offset: 0}}>
                                    <CustomSelect name="id_competition"
                                                  options={competitions.competitions}
                                                  getOptionLabel={option => `${option.name}`}
                                                  getOptionValue={option => `${option.id_competition}`}
                                                  placeholder="Vyberte soutez"
                                                  onChange={option => setFieldValue("id_competition", `${option.id_competition}`)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mb-4 mt-lg-0" lg={{span: 5, offset: 0}}>
                            <Button type="submit" block>
                                Odeslat
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            }
        </div>
    );
}

