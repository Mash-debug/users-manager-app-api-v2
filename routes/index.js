const router = require("express").Router();

router.use("/", require(`./register`));
router.use("/", require(`./login`));
router.use("/", require(`./users`));
router.use("/", require(`./edit`));
router.use("/", require(`./logout`));
router.use("/", require(`./account`))

module.exports = router;