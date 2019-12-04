import React from 'react';
import {NavLink as Link, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../atoms';
import {Breadcrumb, Image, Tabs, Tab, Row, Button} from 'react-bootstrap';
import {TeamSquad} from "../../../organisms/team/public/TeamSquad";
import {useGetTeam, useGetTeamMatches} from "../../../api/teamClient_v1";
import {TeamCompetitions} from "../../../organisms/team/public/TeamCompetitions";
import {TeamStatistics} from "../../../organisms/team/public/TeamStatistics";
import loadingGif from "../../../assets/images/loading.gif";
import {TeamData} from "../../../organisms/team/public/TeamData";
import {MatchList} from "../../../organisms/match/MatchList";
import {changePlayerStatus, useGetTeamPlayersByStatus} from "../../../api/teamMembershipClient_v1";
import {useAuth} from "../../../utils/auth";
import {useApi} from "../../../hooks/useApi";

export function TeamDetail() {
    const api = useApi();

    const {user} = useAuth();
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);
    const [matchesState] = useGetTeamMatches(id_team);
    const [playersState] = useGetTeamPlayersByStatus(id_team, "active");

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&
            <div>
                <Breadcrumb>
                    <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                    <li className="breadcrumb-item"><Link to="/teams">Týmy</Link></li>
                    <li className="breadcrumb-item"><span className="active">{state.team_data.name}</span></li>
                </Breadcrumb>
                <Heading className="mt-4 mb-5">{state.team_data.name}</Heading>

                <TeamData state={state} />
                {user ? (<Row>
                    <Button variant="primary" onClick={async () => {
                        await changePlayerStatus(api, id_team, user.id_user, "pending")}}>
                        Odeslat žádost o zařazení do týmu
                    </Button>
                </Row>) : null }

                <Tabs className="mb-3" fill defaultActiveKey="squad" id="teamTabs">
                    <Tab eventKey="squad" title="Sestava">
                        <TeamSquad status="active" playersState={playersState}/>
                    </Tab>
                    <Tab eventKey="competition" title="Soutěže">
                        <TeamCompetitions/>
                    </Tab>
                    <Tab eventKey="statistics" title="Statistiky">
                        <TeamStatistics/>
                    </Tab>
                    <Tab eventKey="matches" title="Zápasy">
                        <MatchList matchesState={matchesState} admin={false} id_team={id_team} />
                    </Tab>
                </Tabs>
            </div>
            }
        </div>
    );
}
