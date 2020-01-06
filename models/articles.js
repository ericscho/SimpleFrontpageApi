var sql = require('../db.js');
// dit los trekken
// voorbeeld https://bezkoder.com/node-js-rest-api-express-mysql/

exports.get_article = (id, result) => {
    console.log('Artikcle requested wih id ' + id);
    // sql query database for article with id = :id
    sql.query("SELECT * FROM frontpage WHERE id = ?",[id],function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
          if (res.length > 0) {
            console.log("Article found " + res[0].Id );
              result(null, res[0]);
          }
          else {
              console.log("Article not found !");
              result("Article not found", null);
          }
        }
    });
}
