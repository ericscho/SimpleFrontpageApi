var articles = require('../models/articles.js');

var appRouter = function(app) {
  app.get("/", function(req, res) {
      res.send("Hello World");
  });

  app.get("/articles/:id", function(req, res) {
    /*
      var accountMock = {
          "username": "frontpage",
          "password": "Front!page"
      }

      if(!req.query.username) {
          return res.send({"status": "error", "message": "missing username"});
      } else if(req.query.username != accountMock.username) {
          return res.send({"status": "error", "message": "wrong username"});
      } else if(req.query.password != accountMock.password) {
          return res.send({"status": "error", "message": "wrong password"});
      }
      */

    articles.get_article(req.params.id, (err,data) => {
      console.log("ROUTE: Article ID " + req.params.id + " requested");
        if (err) {
          console.log(err);
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Article not found with id ${id}"
            });
          }
          res.status(500).send({message: "An error occured while retrieving article"});
        }
        else {
          if (data != null)
            res.send(data);
          else {
            res.send({message : "Article not found"});
          }
        }

      });

  });

  /*
  app.post("/account", function(req, res) {
      if(!req.body.username || !req.body.password || !req.body.twitter) {
          return res.send({"status": "error", "message": "missing a parameter"});
      } else {
          return res.send(req.body);
      }
  });
  */
};

module.exports = appRouter;
