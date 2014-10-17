var pool = require('../../conDB');

pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query( 'SELECT 1+1 AS solution', function(err, rows) {
  	// err happend
  	if (err) throw err;
  	//print solution in console
  	console.log("the solution is", rows[0].solution);
    // And done with the connection.
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});

