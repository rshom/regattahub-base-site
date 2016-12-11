var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RegattaSchema = new Schema(
    {event_name: String
     ,passkey: String
     ,host_id: String
     ,address: [ String ]
     ,lat: Number
     ,lng: Number
     ,event_date: Date
     ,event_length: Number
     ,class_list: [ String ]
     ,event_description: String
     ,registration_link: String
     ,email_verified: {type:Boolean, default: false}
     // more to come
     // somehow, results that could potentially include multiple fleets
    }
);

var ClubSchema = new Schema(
    {official_id: String
     ,name: String
     ,email: String
     ,regattas: []
     ,website: String
     ,passkey: String
     ,location:{zip: String
		,state: String
		,city: String
		,street: String
	       }
     ,created_at: {type: Date, default: Date.now}
    }
);

var SailorSchema = new Schema(
    {name: {first: String, last: String}
     ,email: String
     ,created_at: {type: Date, default: Date.now}
     ,stared_regattas: []
     // and more
     // a list of thier boats for sure
    }
);

mongoose.model('Regatta', RegattaSchema);
mongoose.model('Club', ClubSchema);
//mongoose.model('Sailor', SailorSchema);
