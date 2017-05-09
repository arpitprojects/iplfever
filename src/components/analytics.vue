<template>
    <div>
        <br /><br /><br /><br /><br /><br />
        <span class="wrapper">
            <h5>Statstics</h5>
            <br />
            <span id="all_information">
                <div class="row">
                    <div class="col l6 s12 m6">
                      <div class="card blue darken-3
 waves-effect waves-orange">
                        <div class="card-content white-text">
                          <p class="font-size-20">Number of Super Over Match:</p>
                          <br />
                          <div class="font-size-20" id="total_non_result"></div>
                            </div> 
                         </div>
                      </div>
                      <div class="col l6 s12 m6">
                      <div class="card blue darken-3 pulse
 waves-effect waves-orange">
                        <div class="card-content white-text">
                          <p class="font-size-20">Number of Dl Method Result:</p>
                          <br />
                          <div class="font-size-20" id="total_dl_apply"></div>
                            </div> 
                         </div>
                      </div>
                  </div>
                    <br />
                   <div class="row">
                    <div class="col l6 s12 m6">
                      <div class="card blue darken-3 pulse
 waves-effect waves-orange">
                        <div class="card-content white-text">
                          <p class="font-size-20">Number win Above 100 Runs:</p>
                          <br />
                          <div class="font-size-20" id="total_runs_win"></div>
                            </div> 
                         </div>
                      </div>
                       <div class="col l6 s12 m6">
                      <div class="card blue darken-3
 waves-effect waves-orange">
                        <div class="card-content white-text">
                          <p class="font-size-20">Number of 10 wickets win is:</p>
                          <br />
                          <div class="font-size-20" id="total_wickets_win"></div>
                            </div> 
                         </div>
                  </div>
                  <br /><br />
                  <br /><br />
                  <div id="umpire_graph"></div>
                  <br /><br />
                  <div id="venue_graph"></div>
                  </div>
            </span>
        </span>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                matches_data :[]
            }
        },
        mounted : function(){
            this.matches();
           
        },
        methods : {
            matches : function(){
                 this.$http.get('../../data/matches.csv').then(response => {
                        this.matches_data = response.data;
                        
                         this.matches_data = this.matches_data.split("\n").map(function (d) {
                            return d.split(",");
                        });
                        this.matches_data.pop();
                        var headers = this.matches_data.splice(0, 1)[0];

                        this.matches_data = this.matches_data.map(function (v, i) {
                            var x = {};
                            headers.forEach(function (h, i) {
                                x[h] = v[i];
                            });
                            return x;
                        });
                        
                        //All variables get here
                         
                        var total_ties = 0;
                        var dl_apply = 0;
                        var win_by_hund_runs = 0;
                        var win_by_ten_wic = 0;
                        var umpires = [];
                        var umpires_unique = [];
                        var umpire_matches = [];
                        var i,j;
                        var venues = [];
                        var venues_unique = [];
                        var venues_total = [];
                         //End of all the variables
                         
                        (this.matches_data).forEach(function(obj){
                            if(obj.result == 'tie'){
                                total_ties++;
                            }
                            if(obj.dl_applied == 1){
                                dl_apply++;
                            }
                            if(obj.win_by_runs  > 100){
                                win_by_hund_runs++;
                            }
                            if(obj.win_by_wickets == 10){
                                win_by_ten_wic++;
                            }
                            umpires.push(obj.umpire1);
                            umpires.push(obj.umpire2);

                            venues.push(obj.venue);

                        });
                        
                        venues_unique = venues.unique(); 
                        
                        document.getElementById('total_non_result').innerHTML = total_ties;
                        document.getElementById('total_dl_apply').innerHTML = dl_apply;
                        document.getElementById('total_runs_win').innerHTML = win_by_hund_runs;
                        document.getElementById('total_wickets_win').innerHTML = win_by_ten_wic;
                        
                        umpires_unique = umpires.unique();
                        //console.log(umpires_unique.length);

                          for(i=0;i<umpires_unique.length;i++){
                            umpire_matches[i] = 0;
                        }

                        for(i=0;i<venues_unique.length;i++){
                            venues_total[i] = 0;
                        }
                        for(i=0;i<umpires_unique.length;i++){
                            (this.matches_data).forEach(function(obj){
                                if(umpires_unique[i] == obj.umpire1 || umpires_unique[i] == obj.umpire2){
                                    umpire_matches[i]++;
                                }
                            });
                        }
                        //Calculate no of matches
                         for(i=0;i<venues_unique.length;i++){
                            (this.matches_data).forEach(function(obj){
                                if(venues_unique[i] == obj.venue){
                                    venues_total[i]++;
                                }
                            });
                        }

                       
                        //Generate Highchart

                         Highcharts.chart('umpire_graph', {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'Umpire Vs Total Match'
                            },
                            subtitle: {
                                text: 'Kaggle.com'
                            },
                            xAxis: {
                                categories: umpires_unique
                            },
                            yAxis: {
                                title: {
                                    text: 'Temperature (°C)'
                                }
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }
                            },
                            series: [{
                                name: 'Number Of Matches',
                                data: umpire_matches
                            }]
                        });

                            Highcharts.chart('venue_graph', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Venue Matches happend'
                            },
                            subtitle: {
                                text: 'Kaggle.com'
                            },
                            xAxis: {
                                categories: venues_unique,
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Number of Matches:'
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: 'Number of Matches',
                                data: venues_total
                            }]
                        });
                        //Dont go beyond this
                    });
                
            }
        }
    }
</script>
<style scoped>
    .wrapper h1, p,h2,h4,h5,h6,h3,div,span{
        font-family:'Dosis' , sans-serif;
        letter-spacing:1px;
        color:white;
    }
    .font-size-20{
        font-size:18px;
    }
</style>