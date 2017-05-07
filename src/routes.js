import matches from  './components/matches.vue';
import deliveries from  './components/deliveries.vue';

export const routes = [
	{path : '/matches' , component : matches },
	{path : '/deliveries' , component : deliveries  },
    {path: '*', redirect: '/matches'}

];