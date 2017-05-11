<template>
	<div>
		<br /><br /><br /><br /><br /><br/><br />
		<p class="white-text font-size">Teams</p>
		<br /><br />
		<ul>
			<li v-for="t in final" class="white-text">
				<div class="col s12 m6 l6 waves-effect waves-teal">
				 <div class="card indigo darken-4 ">
		            <div class="card-content">
		              <span class="card-title">{{t.team_name}}</span>
		              <span class="temp_organise">Match Win: {{t.match}}</span>
		            </div>   
			      </div>
			     </div>
		    </li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				teams : [],
				data : [],
				match : [],
				final : []
			}
		},
		mounted: function(){
			this.loading();
		},
		methods : {
			loading : function(){
				 this.$http.get('../../data/matches.csv').then(response => {
                        this.data = response.data;
                        //console.log(this.data);

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
                
                        var squad = [];
                        var squad_unique = [];
                        var i;
                        var no_of_matches = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                        //console.log(headers);
                        //console.log(this.data);
                        (this.data).forEach(function(obj){
                        	(squad).push(obj.team1);
                        })
                       
                        squad_unique = (squad).unique();
                        //console.log(squad_unique);
                        this.teams = squad_unique;

                        for(i=0;i<squad_unique.length;i++){
                        	(this.data).forEach(function(x){
                        		if(squad_unique[i] == x.winner){
                        			no_of_matches[i]++;
                        		}
                        	})
                        }
                        
                        this.match = no_of_matches;
                   		for(i=0;i<13;i++){
                   			var temp = {};
                   			temp.team_name = squad_unique[i];
                   			temp.match = no_of_matches[i];
                   			this.final.push(temp);
                   		}
                   		console.log(this.final);
                   });
			}
		}	
	}
</script>


<style scoped>
	.font-size{
		font-size:24px;
		font-family:'Dosis' , sans-serif;
		letter-spacing:1px;
	}
	.card{
		width:270px !important;
		height:115px !important;
	}
	@media all and(max-width : 900px){
		.card{
			margin: 0 auto;
		}
	}
	.temp_organise{
		color:red;
		font-family:'Dosis';
	}
</style>