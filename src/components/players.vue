<template>
    <div>	
    	<br /><br /><br /><br /><br /><br /><br />
    	<div id="player_container">
    		<div class="text">{{title}}</div>
    		<hr/>
    		<br />
    		<div id="player_of_match_graph"></div>
    		<br /><br />
    		<div id="toss_bat_bowl"></div>
    	</div>
    </div>
</template>

<script>
	export default{
		data(){
			return {
				title  :'Individual player Stats!',
				data : []
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
                

                 		
                        var player_of_match = [];
                        var player_of_match_unique = [];
                        var i,j;
                        var player_of_match_unique_total = [];
                        var player_of_match_unique_total_store = [];
                        var player_of_match_unique_total_ten = [];
                        var player_of_match_unique_total_ten_index = [];
                        var man_of_match_name = [];
                        var man_of_match_num = [];
                        (this.data).forEach(function(obj){
                        	player_of_match.push(obj.player_of_match);
                        });
                        player_of_match_unique = player_of_match.unique();
                        

                        for(i=0;i<player_of_match_unique.length;i++){
                        	player_of_match_unique_total[i] = 0;
                        	player_of_match_unique_total_store[i] = 0;
                        }


                        for(i=0;i<player_of_match_unique.length;i++){
                        	(this.data).forEach(function(obj){
                        		if(player_of_match_unique[i] == obj.player_of_match){
                        			player_of_match_unique_total[i]++;
                        			player_of_match_unique_total_store[i]++;
                        		}
                        	})
                        }
                        
                        //sort the details;
                        player_of_match_unique_total.sort(function(a, b) {
                          return a - b;
                        });
                        
                        for(i=player_of_match_unique_total.length-1;i > player_of_match_unique_total.length - 11;i--){
                        	player_of_match_unique_total_ten.push(player_of_match_unique_total[i]);	

                        }

                         player_of_match_unique_total_ten.forEach(function(x){
                            for(i=0;i<player_of_match_unique_total_store.length;i++){
                                if(x === player_of_match_unique_total_store[i]){
                                    player_of_match_unique_total_ten_index.push(i);
                                }
                            }
                       });
                       
                       player_of_match_unique_total_ten_index = player_of_match_unique_total_ten_index.unique();
                       

                        player_of_match_unique_total_ten_index.forEach(function(x){
                            man_of_match_name.push(player_of_match_unique[x]);
                            man_of_match_num.push(player_of_match_unique_total_store[x]);
                        });
                        //Player of match Bolwer and batamsn
                        //console.log(player_of_match_unique);		

                        //Toss decision 

                        var toss_decision_bat = 0;
                        var toss_decision_bowl = 0;

                        (this.data).forEach(function(obj){
                        	if(obj.toss_decision == 'field'){
                        		toss_decision_bowl++;
                        	}else{
                        		toss_decision_bat++;
                        	}
                        })
                        console.log(toss_decision_bowl + " "+toss_decision_bat);
                        var toss_match_final_data = [['Field First', toss_decision_bowl ] , ['Bat First' , toss_decision_bat]];
                        
                          Highcharts.chart('toss_bat_bowl', {
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 35,
                                    beta: 0
                                }
                            },
                            title: {
                                text: 'Toss: Chossing field or Bat?'
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
                                    },
                                     showInLegend: true
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: 'Percent: ',
                                data:toss_match_final_data
                            }]
                        });

                        Highcharts.chart('player_of_match_graph', {
                        chart: {
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 12,
                                beta: 15,
                                depth: 70
                            }
                        },
                        title: {
                            text: 'Highest Number Of player Of Match'
                        },
                        subtitle: {
                            text: 'Maximum number of awards'
                        },
                        plotOptions: {
                            column: {
                                depth: 25
                            }
                        },
                        xAxis: {
                            categories: man_of_match_name
                        },
                        yAxis: {
                            title: {
                                text: 'Number of sixes'
                            }
                        },
                        series: [{
                            name: 'Player Name',
                            data: man_of_match_num
                        }]
                    });

                        //End of all codes
             });
		}
	}
}
</script>


<style scoped>
	.text{
		font-family:'Dosis' , sans-serif;
		font-size:20px;
		color:#fff;
		letter-spacing:1px;

	}
	.sub-text{
		font-family:'Dosis' , sans-serif;
		font-size:16px;
		color:#e9e9e9;
		letter-spacing:1px;
	}
</style>