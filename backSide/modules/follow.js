var pool = require('../conDB');

var Follow = module.exports = function () {

};

var follow = Follow.prototype;

follow.load = function (id, callback){

  pool.getConnection(function(err, connection){
    if (err) throw err;
    //follow
    // flag=0:none, flag=1:关注, flag=2:被关注, flag=3:互粉。
    // 简化关注功能 flag=0:none, flag=1:关注。
    connection.query("SELECT M.*, R.* FROM ( (SELECT id AS others, address, telphone, gender, imgUrl FROM me) AS M JOIN (SELECT id AS ID, follow, flag FROM follow) AS R ON M.others = R.follow ) WHERE R.ID = '"+id+"'", function(err, rows) {
      if (err) throw err;
      var result = rows.map(function(row){
        return {
          id: row.others,
          gender: row.gender,
          habit: row.habit,
          imgUrl: row.imgUrl,
          address: row.address,
          flag : row.flag
        };
      });

      console.log("follow query result:",result);
      callback(err, result);
      //console ouput
      console.log("follow query success.",id);
      //done connection
      connection.release();
    });
  });
};
// first sign in
follow.firstLoad = function (id, callback){

  pool.getConnection(function(err, connection){
    if (err) throw err;
    //follow
    connection.query("SELECT A.*, B.* FROM (SELECT user.id AS ID , me.gender, me.habit, me.imgUrl, me.address FROM user JOIN me ON user.id = me.id ) AS A , (SELECT id ,count(says) AS frequence from circul group by id) AS B WHERE A.ID = B.id AND A.ID != '"+id+"' AND B.id != '"+id+"' ORDER BY B.frequence DESC", function(err, rows) {
      if (err) throw err;
      var result = rows.map(function(row){
        return {
          id: row.ID,
          gender: row.gender,
          habit: row.habit,
          imgUrl: row.imgUrl,
          address: row.address,

        };
      });

      
      callback(err, result);
      //console ouput
      console.log("follow recomend query success.",id);
      //done connection
      connection.release();
    });
  });
};

//update function
follow.update = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query("UPDATE follow SET flag = "+data.flag+" WHERE id = '"+data.id+"' AND follow = '"+data.friend+"'", function(err, rows) {
      if(err) throw err;
      console.log('follow update rows:',rows);
      console.log('follow update affectedRows:',rows.affectedRows);
      callback(err, rows.affectedRows);
      connection.release();
    });
  });
};

//insert function
follow.insert = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query("INSERT INTO follow(id, follow, flag) values ('"+data.id+"', '"+data.friend+"', 1)", function(err, rows) {
      if(err) throw err;
      console.log('follow insert success.',rows);
      callback(err);
      connection.release();
    });
  });
}

