const router = require('express').Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userID: req.session.userID
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userID: req.session.userID,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No post with this id was found."});
            return;
        }

        res.status(200).json(postData)
    }   catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;