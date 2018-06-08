var categoryRespository = require('../repository/categoryRespository');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    categoryRespository.loadAll().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

//get by id
router.post('/catedetail', (req, res) => {
    if (req.body.cateid) {
        var id = req.body.cateid;
        if (isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }
        var arr = new Array();
            arr.push(req.body.cateid); 
        
        console.log(arr);

        categoryRespository.getCateDetail(arr)
            .then(rows => {
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.statusCode = 204;
                    res.end();

                }
            })
            .catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.json('error');
            });

    } else {
        res.statusCode = 400;
        res.json('error');
    }
});

router.post('/', (req, res) => {
    categoryRespository.insert(req.body)
        .then(insertId => {
            var poco = {
                madanhmuc: insertId,
                tendanhmuc: req.body.tendanhmuc
            };
            res.statusCode = 201;
            res.json(poco);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();

        });
});

router.delete('/:id', (req, res) => {
    if (req.params.id) {
        var id = req.params.id;
        if (isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        categoryRespository.delete(id).then(affectedRows => {
            res.json({
                affectedRows: affectedRows
            });

        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.json('error');
        });
    } else {
        res.statusCode = 400;
        res.json('error');
    }
});

module.exports = router;