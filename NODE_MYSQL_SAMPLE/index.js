const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'luke',
    password: '123456',
    database: 'acme'
});

db.connect();

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.listen(5000, () => console.log('Server started'));


// Let's first make it clear what's going on.

// MySQL 8 has supports pluggable authentication methods. By default, one of them named caching_sha2_password is used rather than our good old mysql_native_password (source). It should be obvious that using a crypto algorithm with several handshakes is more secure than plain password passing that has been there for 24 years!

// Now, the problem is mysqljs in Node (the package you install with npm i mysql and use it in your Node code) doesn't support this new default authentication method of MySQL 8, yet. The issue is in here: https://github.com/mysqljs/mysql/issues/1507 and is still open, after 3 years, as of July 2019. (UPDATE June 2019: There is a new PR in mysqljs now to fix this!)

// Your options
// Option 1) Downgrade "MySQL" to authenticate using good old "native_password"
// That's what everybody suggests here (e.g. top answer above). You just get into mysql and run a query saying root is fine using old native_password method for authnetication:

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password ...
// The good thing is, life is going to be simple and you can still use good old tools like Sequel Pro without any issue. But the problem is, you are not taking advantage of a more secure (and cool, read below) stuffs available to you.

// Option 2) Replace "Node" package with MySQL Connecter X DevAPI
// MySQL X DevAPI for Node is a replacement to Node's Mysqljs package, provided by http://dev.mysql.com official guys.

// It works like a charm supporting caching_sha2_password authentication. (Just make sure you use port 33060 for X Protocol commmunications.)

// The bad thing is, you have left our old mysql package that everyone is so used to and relies on.

// The good thing is, your app is more secure now and you can take advantage of a ton of new things that our good old friends didn't provide! Just check out the tutorial of X DevAPI and you'll see it has a ton of new sexy features that can come in handy. You just need to pay the price of a learning curve, which expectedly comes with any technology upgrade. :)

// PS. Unfortunately, this XDevAPI Package doesn't have types definition (understandable by TypeScript) yet, so if you are on typescript, you will have problems. I tried to generate .d.ts using dts-gen and dtsmake, but no success. So keep that in mind.

