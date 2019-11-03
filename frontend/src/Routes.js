import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { TeamList } from './pages/teams/list/TeamList';
import { Leagues } from './pages/Leagues';
import { Matches } from './pages/Matches';
import { Statistics } from './pages/Statistics';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Page404 } from './pages/error/Page404';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Profile } from "./pages/administration/Profile";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";
import { TeamDetail } from './pages/teams/detail/TeamDetail';
import { Team } from './pages/administration/Team';
import {ResetPassword} from "./pages/auth/ResetPassword";

export function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={HomePage}/>
			<Route path="/team/:id_team" exact component={TeamDetail} />
            <Route path="/teams" exact component={TeamList} />
			<Route path="/leagues" exact component={Leagues}/>
			<Route path="/matches" exact component={Matches}/>
			<Route path="/statistics" exact component={Statistics} />
			<Route path="/aboutus" exact component={AboutUs}/>
			<Route path="/contact" exact component={Contact}/>
			<Route path="/login" exact component={Login} />
            <Route path="/statistics" exact component={Statistics} />
            <Route path="/register" exact component={Register} />
            <Route path="/administration/profile" exact component={Profile} />
			<Route path="/resetPassword/:id_user/:hash" exact component={ResetPassword} />
			<Route path="/confirmEmail/:id_user/:hash" exact component={ConfirmEmail} />
			<Route path="/administration/team" exact component={Team} />
			<Route path="*" component={Page404}/>
		</Switch>
	);
}