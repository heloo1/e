const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // get / news
    index(rep, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // res.render('home');
    }
    // [Get] /news/:slug
    search(rep, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
