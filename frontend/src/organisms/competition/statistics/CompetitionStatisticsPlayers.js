import React from 'react';
import {useParams} from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {useHistory} from 'react-router-dom';
import {useGetCompetitionsStatistics} from "../../../api/competitionClient_v1";
import {OverlayTriggerTable} from "../../../basicComponents/OverlayTriggerTable";
import {Heading} from "../../../basicComponents";
import {Table} from "../../../basicComponents/Table";
import loadingGif from "../../../assets/images/loading.gif";

function getPlayers(state) {
    if (!state.isLoading) {
        return state.statistics.sort((a, b) => b.field_points - a.field_points);
    }
}

function getRank(playerData) {
    return (Number(playerData.index) + 1).toString();
}

export function CompetitionStatisticsPlayers({isGoalKeeper}) {
    let {id_competition} = useParams();
    let history = useHistory();
    const [state] = useGetCompetitionsStatistics(id_competition, isGoalKeeper);

    const players = getPlayers(state);
    function handleClick(row) {
        if (row) {
            history.push("/users/" + row.original.id_user);
        }
    }

    const columns = [
        {
            Header: "Pořadí",
            accessor: "rank",
            Cell: (playerData) => getRank(playerData),
            filterable: false,
        },
        {
            Header: "Jméno a příjmení",
            accessor: "name_surname",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().match(filter.value.toLowerCase())
        },
        {
            Header: "Počet zápasů",
            accessor: "matches",
            filterable: false,
        },
        {
            Header: "Góly",
            accessor: "goals",
            filterable: false,
        },
        {
            Header: "Asistence",
            accessor: "assists",
            filterable: false,
        },
        {
            Header: <OverlayTriggerTable header="KB" placement="bottom" icon={Icons.faInfo} message="Součet gólů a asistencí" />,
            filterable: false,
            accessor: "field_points"
        },
        {
            Header: <OverlayTriggerTable header="Pr. KB" placement="bottom" icon={Icons.faInfo} message="Průměr Kanadského bodu na zápas" />,
            accessor: "field_average_points",
            filterable: false,
        },
        {
            Header: "Trestné minuty",
            accessor: "suspensions",
            filterable: false,
        }
    ];

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&
                <Table data={players} columns={columns} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }}/>
            }
        </div>
    );
}

