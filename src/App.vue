<template>
  <div id="app">
    <div id="wrapper">
            <nav>
                <div class="nav-wrapper nav-color">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li class="waves-effect waves-teal"><a href="https://github.com/arpitprojects/iplfever">Github</a></li>
                        <li class="waves-effect waves-teal" ><a href="#modal1"><i class="material-icons">question_answer</i></a></li>
                    </ul>
                </div>
            </nav>

            <ul id="slide-out" class="side-nav fixed blue-mg">
                <br /><br />
                <div class="logo">
                    <ul class="logo-text">
                        <li><img class="" src="https://www.android-kiosk.com/wp-content/themes/androidkioskcom/images/brand_white.png"
                                 id="logo-image"/></li>
                        <li class="text-logo">{{title}}</li>
                    </ul>
                </div>

                <router-link tag="li" to="/matches" class="white-text side_nav_texts" exact><a class="side_nav_texts white-text waves-effect waves-teal">Matches Data</a></router-link>
                
                
                
                <router-link tag="li" to="/analytic" class="white-text side_nav_texts" exact><a class="side_nav_texts white-text waves-effect waves-teal">Interesting Facts</a></router-link>

                    <router-link tag="li" to="/teams" class="white-text side_nav_texts" exact><a class="side_nav_texts blue darken-4 white-text waves-effect waves-teal">Know About Teams</a></router-link>

                <router-link tag="li" to="/player" class="white-text side_nav_texts" exact><a class="side_nav_texts white-text waves-effect waves-teal">Basic Stats</a></router-link>

                <router-link tag="li" to="/deliveries" class="white-text side_nav_texts" exact><a class="side_nav_texts white-text waves-effect waves-teal">Player Stats <span style="color:red;"> Loading takes time</span></a></router-link>
            </ul>
            <div class="container">
                <div class="row">
                    <div class="col s12 m12 l8 offset-l2" id="mobile-main-container">
                        <!--Router View-->
                        <router-view>
                            
                        </router-view>
                    </div>
                </div>
            </div>
           <div id="modal1" class="modal">
                <div class="modal-content">
                  <h6>Details About Application</h6>
                  <br /><br />
                  <p style="font-size:18px;font-family:'Dosis'; ">
                    1.)  Hover on each stats section/ line/ pie to get actual values of that part!
                    <br />
                    2.)  Few Routes have more than 1.5 lacs row, so manupilating is taking too much time.
                    <br />
                    3.)  Service worker works are going on for online stats!
                  </p>
                </div>
                <div class="modal-footer">
                  <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Thank You!</a>
                </div>
              </div>
          
         
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title : 'IPL FEVER'
        } 
    }
}
</script>

<style>
    
</style>
