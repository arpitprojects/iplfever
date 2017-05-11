import matches from  './components/matches.vue';
import deliveries from  './components/deliveries.vue';
import analytics from  './components/analytics.vue';
import players from './components/players.vue';
import teams from './components/teams.vue';
export const routes = [
	{path : '/matches' , component : matches },
	{path : '/deliveries' , component : deliveries  },
    {path : '/analytic' , component : analytics},
    {path : '/player' ,component : players },
    {path : '/teams' ,component : teams },
    {path: '*', redirect: '/matches'}

];