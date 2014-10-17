var pool = require('../conDB');

var Me = module.exports = function () {

};

var me = Me.prototype;

me.load = function (id, callback){
  var self = this;
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query('SELECT * FROM me WHERE id = \''+id+'\'', function(err, rows) {
      if (err) throw err;
      self.id = rows[0].id;
      self.gender = rows[0].gender;
      self.address = rows[0].address;
      self.telephone = rows[0].telphone;
      self.habit = rows[0].habit;
      self.imgUrl = rows[0].imgUrl;
      self.myStyle = rows[0].myStyle;
      callback(err);
      //console ouput
      console.log("me query success.", rows[0].name);
      //done connection
      connection.release();
    });
  });
};

me.update = function (me, callback){
  var self = this;
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query("UPDATE me SET gender="+me.gender+", address='"+me.address+"', telphone='"+me.telephone+"', habit= '"+me.habit+"',imgUrl='"+me.imgUrl+"' , myStyle= '"+me.myStyle+"'WHERE id='"+me.id+"'", function(err, rows) {
      if (err) throw err;

      callback(err);
      //console ouput
      console.log("me update success.", me.id);
      //done connection
      connection.release();
    });
  });
};