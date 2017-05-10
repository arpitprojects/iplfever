<template>
     <div id="container_delivery">
        <br /><br /><br /><br /><br /><br />
        <p class="text-matches-title">Runs Across the seasons</p>
        <br />
        <div id="player_runs_graph"></div>
        <br /><br /><br />
        <div id="six_total_play"></div>
        <br /><br />
        <div id="most_wickets"></div>
         <div id="loader-wrapper">
            <div id="loader"></div>        
            <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>
            <p >Analysing 1.5 lacs rows</p>
        </div>
    </div>
</template>

<script>
   export default{
        data(){
            return {
                title : 'Basic Stats',
                data : [],
                matches_data : []
            }
        },
        mounted :function() {
            this.loading();
        },
        methods:{
            loading : function(){
              
                    setTimeout(function() {
                        document.getElementById('container_delivery').className = 'loaded';      
                    }, 2000);
                

                 this.$http.get('../../data/deliveries.csv').then(response => {
                        this.data = response.data;
                        var parsed_data;
                         Papa.parse(this.data, {
                              header: true,
                              dynamicTyping: true,
                              complete: function(results) {
                                parsed_data = results.data;
                              }
                        });
                        //console.log(parsed_data);
                        //Do all the manupilations
                         var headers = [];
                        var i , j;

                       
                        headers = (parsed_data).splice(0, 1)[0];
                        var headers_key = Object.keys(headers)    
                        //console.log(headers_key);   
                        
                        //Optimizations 

                        var keep = ['batsman' , 'batsman_runs' , 'bowler' , 'dismissal_kind'];

                        for(var i = 0;i < parsed_data.length; i++){

                            for(var key in parsed_data[i]){
                                if(keep.indexOf(key) === -1)delete parsed_data[i][key];
                            }

                        }
                        

                        //First graph manupilations
                        var topscore_all = [];
                        var topscore_unique = [];
                        var topscore_unique_runs =[];
                        var top_new = [];
                        var bowlers = [];
                        var bowlers_unique = [];
                        var total_wickets = [];
                        var total_wickets_store = [];
                         (parsed_data).forEach(function(obj){
                                topscore_all.push(obj.batsman);
                                bowlers.push(obj.bowler);
                         });
                         
                         topscore_unique = topscore_all.unique();
                         bowlers_unique = bowlers.unique();
                         
                         
                         
                         //Initialize the array with zero
                         var total_six_batsman = [];
                         var total_six_non_sort = [];
                         for(i=0;i<topscore_unique.length;i++){
                            topscore_unique_runs[i] = 0;
                            top_new[i] = 0;
                            total_six_batsman[i] = 0;
                            total_six_non_sort[i] = 0;
                         }
                        
                        for(i=0;i<bowlers_unique.length;i++){
                            total_wickets[i] = 0;
                            total_wickets_store[i] = 0;
                        }
                        
                        
                        //console.log(total_wickets);    
                         for(i=0;i<topscore_unique.length;i++){
                            parsed_data.forEach(function(obj){
                                if(topscore_unique[i] == obj.batsman){
                                    topscore_unique_runs[i]+= obj.batsman_runs;
                                    top_new[i] += obj.batsman_runs;
                                    if(obj.batsman_runs == 6){
                                        total_six_batsman[i]++;
                                        total_six_non_sort[i]++;
                                    }
                                    
                                }
                            });
                        }
                        //for loop for the stroring the number of wivckers
                        
                        for(i=0;i<bowlers_unique.length;i++){
                            parsed_data.forEach(function(obj){
                                if(bowlers_unique[i] == obj.bowler){
                                    if(obj.dismissal_kind == 'caught' || obj.dismissal_kind == 'lbw' || obj.dismissal_kind == 'bowled' || obj.dismissal_kind == 'stumped' || obj.dismissal_kind == 'caught and bowled'){
                                        total_wickets[i]++;
                                        total_wickets_store[i]++;
                                    }
                                }
                            });
                        }
                        //console.log(total_wickets);
                       //console.log(total_six_batsman);
                       
                        var topscore_unique_runs_index = [];
                        var topscore_unique_runs_index_ten = [];
                        var topscore_unique_runs_index_ten_index = [];
                        var total_six_batsman_six_index = [];
                        var total_six_batsman_six_index_index = [];
                        var total_wickets_ten = [];
                        var total_wickets_ten_index = [];
                        topscore_unique_runs_index = topscore_unique_runs;
                        
                        //Sort the array
                        topscore_unique_runs_index.sort(function(a, b) {
                          return a - b;
                        });
                        
                         total_six_batsman.sort(function(a, b) {
                          return a - b;
                        });
                        total_wickets.sort(function(a, b) {
                          return a - b;
                        });
                       
                        for(i=topscore_unique_runs_index.length-2; i > topscore_unique_runs_index.length - 12 ;i--){
                            topscore_unique_runs_index_ten.push(topscore_unique_runs_index[i]);
                        }
                        for(i=total_six_batsman.length-1;i > total_six_batsman.length-11;i--){
                            total_six_batsman_six_index.push(total_six_batsman[i]);
                        }
                        for(i=total_wickets.length-1;i > total_wickets.length-11;i--){
                            total_wickets_ten.push(total_wickets[i]);   
                        }
                        
                        
                       topscore_unique_runs_index_ten.forEach(function(x){
                            for(i=0;i<top_new.length;i++){
                                if(x === top_new[i]){
                                    topscore_unique_runs_index_ten_index.push(i);
                                }
                            }
                       });
                       total_wickets_ten.forEach(function(x){
                            for(i=0;i<total_wickets_store.length;i++){
                                if(x ===total_wickets_store[i] ){
                                    total_wickets_ten_index.push(i);
                                }
                            }
                       })
                        
                        
                       total_six_batsman_six_index.forEach(function(x){
                            for(i=0;i<total_six_non_sort.length;i++){
                                if(x === total_six_non_sort[i]){
                                    total_six_batsman_six_index_index.push(i);
                                }
                            }
                       });
                       
                       
                        topscore_unique_runs_index_ten_index.splice(9 , 2);
                        
                        var name_final_first_graph=[];
                        var runs_final_score_graph = [];
                        var six_name = [];
                        var six_num = [];
                        var wickets_name = [];
                        var wickets_num = [];
                        topscore_unique_runs_index_ten_index.forEach(function(x){
                             name_final_first_graph.push(topscore_unique[x]);
                            runs_final_score_graph.push(top_new[x]);
                        });
                        //Second graph manupilations
                        
                        total_six_batsman_six_index_index.forEach(function(x){
                             six_name.push(topscore_unique[x]);
                            six_num.push(total_six_non_sort[x]);
                        });
                        //Third graph manupilations
                        
                        total_wickets_ten_index.forEach(function(x){
                            wickets_name.push(bowlers_unique[x]);
                            wickets_num.push(total_wickets_store[x]);
                        })
                        
                            /*High charts Graph*/
                            
                            Highcharts.chart('player_runs_graph', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Maximum Runs By the Individual'
                            },
                            subtitle: {
                                text: 'Source : Kaggle.com'
                            },
                            xAxis: {
                                categories: name_final_first_graph,
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Total Runs'
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
                                name: 'Runs Scored',
                                data: runs_final_score_graph
                            }]
                        });
                        
                        Highcharts.chart('six_total_play', {
                        chart: {
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 10,
                                beta: 25,
                                depth: 70
                            }
                        },
                        title: {
                            text: 'Most Sixes By the Batsman'
                        },
                        subtitle: {
                            text: 'Hover to get the number of sixes'
                        },
                        plotOptions: {
                            column: {
                                depth: 25
                            }
                        },
                        xAxis: {
                            categories: six_name
                        },
                        yAxis: {
                            title: {
                                text: 'Number of sixes'
                            }
                        },
                        series: [{
                            name: 'Batsman Name',
                            data: six_num
                        }]
                    });
                        Highcharts.chart('most_wickets', {
                            title: {
                                text: 'Highest Wicket Taker in IPL.'
                            },
                            xAxis: {
                                categories: wickets_name
                            },
                            labels: {
                                items: [{
                                    html: 'Total Wickets By bowler',
                                    style: {
                                        left: '50px',
                                        top: '18px',
                                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                    }
                                }]
                            },
                            series: [{
                                type: 'column',
                                name: 'Number Of Wickets',
                                data: wickets_num
                            },{
                                type: 'spline',
                                name: 'Number Of Wickets',
                                data: wickets_num,
                                marker: {
                                    lineWidth: 2,
                                    lineColor: Highcharts.getOptions().colors[3],
                                    fillColor: 'white'
                                }
                            }],
                                center: [100, 80],
                                size: 100,
                                showInLegend: false,
                                dataLabels: {
                                    enabled: false
                                }
                            });
                        
                        /*All the highchart*/
                         
                         
                         
                    });
                
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
    .preloader-wrapper.big{
        height:125px;
        width:125px;
    }
</style>