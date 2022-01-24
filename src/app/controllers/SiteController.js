class SiteController {
    // get / news
    index(rep, res) {
        res.render('home');
    }
    // [Get] /news/:slug
    search(rep, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
