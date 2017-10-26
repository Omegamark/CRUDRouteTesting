var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

// *** GET all shows *** //
router.get("/shows", function(req, res, next) {
  queries.getAll().then(function(shows) {
    res.status(200).json(shows);
  });
});

// *** GET a single show *** //
router.get("/shows/:id", function(req, res, next) {
  queries
    .getSingle(req.params.id)
    .then(function(show) {
      res.status(200).json(show);
    })
    .catch(function(error) {
      next(error);
    });
});

router.post("/shows", function(req, res, next) {
  queries
    .addShow(req.body)
    .then(function(showID) {
      return queries.getSingle(showID);
    })
    .then(function(show) {
      res.status(200).json(show);
    })
    .catch(function(error) {
      next(error);
    });
});

router.put("/shows/:id", function(req, res, next) {
  // ** MARK ** This "if" statement checks to see if an "id" property exists and if so, sends an error.
  if (req.body.hasOwnProperty("id")) {
    return res.status(422).json({
      error: "You cannot update the id field"
    });
  }
  queries
    .updateShow(req.params.id, req.body)
    .then(function() {
      return queries.getSingle(req.params.id);
    })
    .then(function(show) {
      res.status(200).json(show);
    })
    .catch(function(error) {
      next(error);
    });
});

router.delete("/shows/:id", function(req, res, next) {
  queries
    .getSingle(req.params.id)
    .then(function(show) {
      queries
        .deleteShow(req.params.id)
        .then(function() {
          res.status(200).json(show);
        })
        .catch(function(error) {
          next(error);
        });
    })
    .catch(function(error) {
      next(error);
    });
});

module.exports = router;
