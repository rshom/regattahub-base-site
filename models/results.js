var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RegattaSchema = new Schema(
    {created_by: String // email
     ,created_at: {type: Date, default: Date.now}
     ,event_name: String
     ,event_location: String
     ,event_date: String
     ,results: [ {} ]
     ,passkey: String
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
mongoose.model('Sailor', SailorSchema);
mongoose.model('Club', ClubSchema);
