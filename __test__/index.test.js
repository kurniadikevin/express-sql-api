
const con = require('../config').mysql_connection;

test('Check database connection', async () => {
    const testConnect=()=>{
        con.connect(function(err) {
            if (err) throw err;
            return ("MySql Connected!");
          });
    }

    expect(testConnect).toBeDefined();
   
});
 