const express = require('express');

const formule = require(`../controllers/formulationController.js`);

const router = express.Router();

router.route('/name/:name').get(formule.findName);
router.route('/id/:id').get(formule.findID);

module.exports = router;
