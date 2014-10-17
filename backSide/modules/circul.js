var pool = require('../conDB');

var Circul = module.exports = function () {

};

var circul = Circul.prototype;

circul.load = function (id, callback){
  console.log("circul load!");
  var self = this;
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query("SELECT me.id, me.imgUrl, circul.says, circul.time FROM circul JOIN me ON circul.id = me.id WHERE me.id IN (SELECT follow FROM follow WHERE flag = 1 AND id = '"+id+"') OR me.id = '"+id+"' ORDER BY circul.time DESC", function(err, rows) {
      if (err) throw err;
      var result = rows.map(function(row){
        return {
          id: row.id,
          says: row.says,
          time: row.time,
          imgUrl: row.imgUrl
        };
      });
      self.result = result;
      callback(err);
      //console ouput
      console.log("circul query success.",id);
      //done connection
      connection.release();
    });
  });
};

// circul.insert = function (id, says, callback){
  circul.insert = function (say, callback){
  var self = this;
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query("INSERT INTO circul(id, says) values('"+say.id+"','"+say.talk+"')", function(err, rows) {
      if (err) throw err;
      callback(err);
      //console ouput
      console.log("circul insert success.",say.id);
      //done connection
      connection.release();
    });
  });
};