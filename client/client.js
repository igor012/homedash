Session.setDefault('playerResults', {mac: '', wol: '', standby: ''});
Session.setDefault('routerResults', {mac: '', linkstate: ''});
Session.setDefault('servicesIptvResults', "");
Session.setDefault('chromeCastInfoResults', {bssid:''});


Template.main.helpers({

	// Livebox Play
	macPlay: function(){
    return Session.get('playerResults')['mac'];
  },
	wol: function(){
    var active = Session.get('playerResults')['wol'] == 1 ? 'label-success' : 'label-danger';
    return active;
  },
	standby: function(){
	var active = Session.get('playerResults')['standby'] == 1 ? 'label-danger' : 'label-success';
    return active;
  },

  // Livebox Router
	macRouter: function () {
	var active = Session.get('routerResults')['mac'] ;
    return active;
  },
	linkstate: function () {
    var active = Session.get('routerResults')['linkstate'] == "up" ? 'label-success' : 'label-danger';
    return active;
  },
	iptv: function () {
    var active = Session.get('servicesIptvResults') == "Available" ? 'label-success' : 'label-danger';
    return active;
  },

  // ChromeCast
  	infoChromeCast: function () {
  	var active = Session.get('chromeCastInfoResults')["bssid"];
  	
  }

});

Template.main.events({


	"click .tab" : function(event){
		$id = $(event.target).parent("li").attr('id');
		$('.navtab').hide();
		$('.tab').removeClass("active");
		$(event.target).parent("li").addClass("active");
		$('.'+$id).show();
	}


});


    Meteor.call("checkPlay", function(error, playerResults) {
		var res =  Session.get('playerResults');
		res.mac = playerResults.data["result"].data["macAddress"];
		res.wol = playerResults.data["result"].data["wolSupport"];
		res.standby = playerResults.data["result"].data["activeStandbyState"];
		Session.set('playerResults', res);
    });


    Meteor.call("checkRouter", function(error, routerResults) {
		var res =  Session.get('routerResults');

		var json = JSON.parse(routerResults.content);
		res.mac = json["data"]["MACAddress"];
		res.linkstate = json["data"]["LinkState"];
		res.ipv4 = json["data"]["IPAddress"];
		res.ipv6 = json["data"]["IPv6Address"];
		res.ipv6pre = json["data"]["IPv6DelegatedPrefix"];
		Session.set('routerResults', res);
    });

    Meteor.call("checkIptvServices", function(error, servicesIptvResults) {
		var res =  Session.get('servicesIptvResults');

		var json = JSON.parse(servicesIptvResults.content);
		res = json["data"]["IPTVStatus"];
		Session.set('servicesIptvResults', res);
    });

        Meteor.call("chromeCastInfo", function(error, chromeCastInfoResults) {
		var res =  Session.get('chromeCastInfoResults');

		var json = JSON.parse(chromeCastInfoResults.content);
		res = json["bssid"];
		Session.set('chromeCastInfoResults', res);
		console.log(res);
    });