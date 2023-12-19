const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        //Will find all posts and join with User
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ],
        });

        // Satalize the posts so that template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // passes satalized post data and session into template
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findbyPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render("post", {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth only allows access to profile if logged in
router.get("/profile", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userID, {
            attributes: {exclude: ["password"] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render("profile", {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    // Will get redirected to profile page if already logged in
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }

    res.render("login")
});

module.exports = router;