var pool = require('../conDB');

var User = module.exports = function () {

};

var user = User.prototype;

user.load = function (id, callback) {
  var self = this;

  pool.getConnection(function(err, connection) {
  	if (err) throw err;
  // Use the connection
  	connection.query( 'SELECT * FROM user WHERE id ='+'\''+id+'\'', function(err, rows) {
  	  // err happend
  	  // if (err) throw err;
  	  self.id = rows[0].id;
      self.password = rows[0].password;
  	  callback(err);
      //print solution in console
  	  console.log("users query success.", rows[0].id);
   	  // And done with the connection.
      connection.release();


      // Don't use the connection here, it has been returned to the pool.
  	});
  });

};
