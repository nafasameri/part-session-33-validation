const profileController = require("./controllers/profile.controller");
const parser = require("../../modules/parser");
const { validateUserModel } = require("./middlewares/validate");

const routes = [
  {
    url: "profiles",
    method: "GET",
    controller: profileController.getAllProfiles,
    middlewares: [parser.fetchQueryStringFromURL],
  },
  {
    url: "profiles",
    method: "POST",
    controller: profileController.updateProfile,
    middlewares: [
      parser.getPostData,
      validateUserModel
    ],
  },
];

module.exports = routes;
