const router = require("express").Router();
const Paths = require("../constants/paths");

router.use("/", require(`.${Paths.register}`));
router.use("/", require(`.${Paths.login}`));
router.use("/", require(`.${Paths.users}`));
router.use("/", require(`.${Paths.edit}`));
router.use("/", require(`.${Paths.logout}`));
router.use("/", require(`.${Paths.account}`))
router.use("/", require(`.${Paths.task}`));

module.exports = router;