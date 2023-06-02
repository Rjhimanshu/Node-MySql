const mysql = require('mysql');

var config =
{
    host: 'node.mysql.database.azure.com',
    user: 'hr',
    password: 'Himanshu198@',
    database: 'app_mod_team',
    port: 3306,
 
    ssl: {
         rejectUnauthorized:true
    }
};
const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established."); 
    
    }
});

module.exports = conn ;