<template>
  <div id="app">
    <div id="wrapper">
            <nav>
                <div class="nav-wrapper nav-color">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li class="waves-effect waves-teal"><a href="">Dashboard</a></li>
                        <li class="waves-effect waves-teal"><a href="">IPL STATS</a></li>
                    </ul>
                </div>
            </nav>

            <ul id="slide-out" class="side-nav fixed blue-mg">
                <br /><br />
                <div class="logo">
                    <ul class="logo-text">
                        <li><img src="https://www.android-kiosk.com/wp-content/themes/androidkioskcom/images/brand_white.png"
                                 id="logo-image"/></li>
                        <li class="text-logo">{{title}}</li>
                    </ul>
                </div>

                <router-link tag="li" to="/matches" class="white-text side_nav_texts" exact><a class="side_nav_texts white-text waves-effect waves-teal">Matches Data</a></router-link>

                <router-link tag="li" to="/deliveries" class="white-text side_nav_texts" exact><a class="side_nav_texts white-text waves-effect waves-teal">Deliveries Data</a></router-link>
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
