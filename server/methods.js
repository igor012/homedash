    var 
    playURL = "http://192.168.1.39:8080",
    routerURL = "http://192.168.1.254/sysbus";
    chromecastURL = "http://192.168.1.8:8008"

    Meteor.methods({
        checkPlay: function () {
            this.unblock();
            return HTTP.call("GET", playURL+ "/remoteControl/cmd?operation=10");
        },
        checkRouter: function () {
            this.unblock();
            return HTTP.call("POST",  routerURL+ "/NMC:getWANStatus", { "parameters":{}});
        },
        checkIptvServices: function () {
            this.unblock();
            return HTTP.call("POST", routerURL+ "/NMC/OrangeTV:getIPTVStatus", { "parameters":{}});
        },

        chromeCastInfo:function () {
            try {
                this.unblock();
                return HTTP.call("GET", chromecastURL+ "/setup/eureka_info?options=detail")
            } catch (errorCall) {
                console.log(errorCall.message);
            }
            return 0;
        }
    });