Highcharts.createElement('link', {
   href: 'https://fonts.googleapis.com/css?family=Dosis',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ['#434348' , '#5E35B1'],
   chart: {
      style: {
         fontFamily: '\'Dosis\', sans-serif'
      }
   },
   title: {
      style: {
         color: '#fff',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   }
}

// Apply the theme
Highcharts.setOptions(Highcharts.theme);