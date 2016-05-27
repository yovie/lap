var express = require('express');
var router = express.Router();

var table = require('../models/table');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('dashboard/home', { title: 'Dashboard' });
});

router.all('/map', function(req, res, next) {
	var data = {};
	data.tanggal = req.body.tanggal;
	if( data.tanggal!=undefined ) {
		table.get_where('AIS_POSITION_REPORT_IND', " TANGGAL=TO_DATE('" +data.tanggal+ "','YYYY-MM-DD') ").then( function(result) {
			data.result = {};
			// console.log( result.rows[1] );
			for(i=0; i<result.rows.length; i++) {
				if( data.result[ result.rows[i].MMSI ]==undefined ) {
					data.result[ result.rows[i].MMSI ] = new Array;
				}
				data.result[ result.rows[i].MMSI ].push( result.rows[i] );
			}
			res.send( data )
			// res.render('dashboard/posisi', { title: 'Live Map, Posisi Kapal', view: 1, data:data });
		} );
	} else {
  		res.render('dashboard/posisi', { title: 'Live Map, Posisi Kapal', view: 1 });
  	}
});

router.get('/atmosfer', function(req, res, next) {
  	res.render('dashboard/map', { title: 'Atmosfer' });
});

router.get('/laut', function(req, res, next) {
  	res.render('dashboard/map', { title: 'Laut' });
});

router.get('/posisi_ikan', function(req, res, next) {
  	res.render('dashboard/map', { title: 'Posisi Ikan' });
});

router.get('/satelite', function(req, res, next) {
  	res.render('dashboard/map', { title: 'Satelite' });
});

router.get('/land_based', function(req, res, next) {
  	res.render('dashboard/map', { title: 'Land-Based' });
});

module.exports = router;
