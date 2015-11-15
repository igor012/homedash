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
            this.unblock();
            return HTTP.call("GET", chromecastURL+ "/setup/eureka_info?options=detail")

        }
        // auth: function () {
        //     try {
        //         if (ApiPassword.validate({username: 'admin', password: '150785f@bien'})) {
        //            console.log('password is valid for this user');
        //         } else {
        //               console.log('password is not valid');
        //         }

        //     } catch (exc) {
        //         console.log(exc.message);
        //         // possible causes: 'User is not found', 'User has no password set'
        //     }
        //     this.unblock();
        //     return HTTP.call("POST", "http://192.168.1.254/authenticate?username='admin'&password=''", { "parameters":{}});
        // }
    });