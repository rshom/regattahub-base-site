var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RegattaSchema = new Schema(
    {created_by: String // email
     ,created_at: {type: Date, default: Date.now}
     ,event_name: String
     ,event_location: {country: String
		       ,state: String
		       ,city: String
		       ,street: String
		       ,lat: Number
		       ,lng: Number
		      }
     ,event_host: String
     ,event_date: Date
     ,boat_class: String
     ,sailing_rules:{dsq: Number
		     ,throwout_dsq: Boolean
		     ,dnf: Number
		     ,throwout_dnf: Boolean
		     ,throwouts: [ Number ]
		    }
     ,results: [ ]
     ,passkey: String
     ,published: {type: Boolean, default: false}
     // and more
    }
);

var SailorSchema = new Schema(
    {name: {first: String, last: String}
     ,email: String
     ,created_at: {type: Date, default: Date.now}
     // and more
     // a list of thier boats for sure
    }
);

var ClubSchema = new Schema(
    {owner: String
     ,email: String
     ,created_at: {type: Date, default: Date.now}
    }
);

mongoose.model('Regatta', RegattaSchema);
//mongoose.model('Sailor', SailorSchema);
//mongoose.model('Club', ClubSchema);
