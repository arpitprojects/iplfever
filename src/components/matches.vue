<template>
    <div>
    <br /><br /><br /><br /><br /><br />
       <div class="matches-wrapper">
            <p class="text-matches-title">{{title}}</p>
            <br />
            <p class="text-main-title">Number of matches year-wise!</p>
            <br /><br/>
            <div id="basic_match_graph"></div>
            <br />
            <br/>
            <div id="match_played_win"></div>
            
            <br /><br />
            <div id="toss_win_matches"></div>
            <br /><br />
            <div id="toss_data_details"></div>
            <br /><br />
            <p>Is toss winner also match winner?</p>
            <br />
            <div id="toss_matches_win_total"></div>
            
       </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                title : 'Basic Stats',
                data : [],
                season_arr : []
                
            }
        },
        mounted : function(){
            this.loading();
        },
        methods : {
            loading : function(){
                    this.$http.get('../../data/matches.csv').then(response => {
                        this.data = response.data;


                        this.data = this.data.split("\n").map(function (d) {
                            return d.split(",");
                        });
                        this.data.pop();
                        var headers = this.data.splice(0, 1)[0];

                        this.data = this.data.map(function (v, i) {
                            var x = {};
                            headers.forEach(function (h, i) {
                                x[h] = v[i];
                            });
                            return x;
                        });
                

                        //console.log(headers);
                        //console.log(this.data);
                        
                        //First graph manupilation
                        
                        var season_arr = [0,0,0,0,0,0,0,0,0];
                        
                        (this.data).forEach(function(obj) {
                            
                            if(obj.season == 2008){
                                season_arr[0]++;
                            } 
                             if(obj.season == 2009){
                                season_arr[1]++;
                            }
                             if(obj.season == 2010){
                                season_arr[2]++;
                            }
                             if(obj.season == 2011){
                                season_arr[3]++;
                            }
                             if(obj.season == 2012){
                                season_arr[4]++;
                            }
                             if(obj.season == 2013){
                                season_arr[5]++;
                            }
                             if(obj.season == 2014){
                                season_arr[6]++;
                            }
                             if(obj.season == 2015){
                                season_arr[7]++;
                            }
                             if(obj.season == 2016){
                                season_arr[8]++;
                            }
                        });
                        
                        //Second graph manupilation
                        
                        
                        var team_arr = [];
                        var duplicates =[];
                        (this.data).forEach(function(obj){
                             duplicates.push(obj.team1);
                           
                        });
                        //console.log(duplicates);
                        //To get the uniques values from any given graph
                        
                        var uniques = duplicates.unique(); 
                        
                        console.log(uniques);
                        
                        var match_win = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                        var team_win =  [0,0,0,0,0,0,0,0,0,0,0,0,0];
                        var i;
                        var toss_win = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                        (this.data).forEach(function(obj){
                            for(i=0;i<uniques.length;i++){
                                if(duplicates[i] == obj.winner){
                                    match_win[i]++;
                                }  
                            }      
                        });
                        
                        (this.data).forEach(function(obj){
                            for(i=0;i<uniques.length;i++){
                                if((duplicates[i] == obj.team1) || (duplicates[i] == obj.team2)){
                                team_win[i]++;
                                }
                            }
                        });
                        console.log(match_win);
                        console.log(team_win); 
                        
                        
                        //Max toss winner
                        //We have uniques as an array for the team to.
                         (this.data).forEach(function(obj){
                            for(i=0;i<uniques.length;i++){
                               if(uniques[i] == obj.toss_winner){
                                    toss_win[i]++;
                               }
                            }   
                        });
                        console.log(toss_win);
                        //Map the two array to oen two dimwsional array
                        var toss_data_temp =[[]];
                        var toss_data = [[]];
                        var temp_arr = [];
                        var j;
                        var result = [];
                        var total_matches = 0;
                       
                        toss_data = $.map(uniques, function (el, idx) {
                            return [[el, toss_win[idx]]];
                        });
                        
                        var toss_matches_wins = 0;
                        var toss_match_final_data = [[]];
                        
                        (this.data).forEach(function(obj){
                            total_matches++;
                            
                            if(obj.toss_winner == obj.winner){
                                 toss_matches_wins++;  
                            } 
                            
                        });
                        
                        
                        var temp_arr_yes_no = ['Yes' , 'No'];    
                        var toss_final_arr_data = [toss_matches_wins , (total_matches - toss_matches_wins)];
                        
                         toss_match_final_data = $.map(temp_arr_yes_no , function (el, idx) {
                            return [[el, toss_final_arr_data[idx]]];
                        });
                        
                        
                        console.log(toss_match_final_data);
                        
                       
                        
                        Highcharts.chart('basic_match_graph', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Number of matches played in IPL so far'
                            },
                            subtitle: {
                                text: 'Kaggle.com'
                            },
                            xAxis: {
                                categories: [
                                    '2008' , 
                                    '2009' , 
                                    '2010' , 
                                    '2011' , 
                                    '2012' , 
                                    '2013',
                                    '2014',
                                    '2015',
                                    '2016'
                                ],
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'No of matches playes'
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
                                name: 'No of matches',
                                data: season_arr
                            }]
                        });
                        
                        //Second Chart
                        Highcharts.chart('match_played_win', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Team Wise: Match Played Vs Match Win'
                            },
                            xAxis: {
                                categories:uniques
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Number of matches'
                                },
                                stackLabels: {
                                    enabled: true,
                                    style: {
                                        fontWeight: 'bold',
                                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                    }
                                }
                            },
                            legend: {
                                align: 'right',
                                x: -30,
                                verticalAlign: 'top',
                                y: 25,
                                floating: true,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false
                            },
                            tooltip: {
                                headerFormat: '<b>{point.x}</b><br/>',
                                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true,
                                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                    }
                                }
                            },
                            series: [{
                                name: 'Match Played',
                                data: team_win
                            }, {
                                name: 'Match Win',
                                data: match_win
                            }]
                        });
                        Highcharts.chart('toss_data_details', {
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 35,
                                    beta: 0
                                }
                            },
                            title: {
                                text: 'Team Wise : Toss Win'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    depth: 35,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    }
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: 'Toss Win',
                                data:toss_data
                            }]
                        });
                        
                           Highcharts.chart('toss_matches_win_total', {
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 35,
                                    beta: 0
                                }
                            },
                            title: {
                                text: 'Is Toss Winner Also Match Winner?'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    depth: 35,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    }
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: 'Toss Win',
                                data:toss_match_final_data
                            }]
                        });
                        
                        
                    } , error => {
                        console.log(error);
                    })
                }
            }
        }
</script>

<style scoped>
    .text-matches-title{
        font-family:'Dosis' , sans-serif;
        font-size:20px;
        color:#000;
        font-weight:700;
        margin-left:1%;
    }
    .text-main-title{
        font-weight:700;
        font-family:'Dosis' , sans-serif;
        font-size:24px;
        color:#000;
        margin-left:1%;
    }
</style>