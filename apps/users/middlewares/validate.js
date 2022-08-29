const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      nullable: false
    },
    firstname: {
      type: "string"
    },
    lastname: {
      type: "string"
    },
    url: {
      type: "string"
    }
  },
  required: ["id", "firstname", "lastname", "url"],
  additionalProperties: true
};



module.exports = {
  validateUserModel(req, res, next) {
    try {
      const {
        id,
        firstname,
        lastname,
        imageUrl
      } = req.body;

      const info = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        url: imageUrl
      };
      
      const valid = ajv.validate(schema, info);
      console.log(valid);
      
      if (!valid) {
        console.log(ajv.errors);

        res.writeHead(500, {
          "Content-Type": "application/json"
        });
        res.end(
          JSON.stringify({
            message: "user information is not valid. please send: id, firstname, lastname, imageUrl"
          })
        );
      }
      req.body.id += req.body.id;
      return true;
    } catch (e) {
      console.log(e);
      res.writeHead(500, {
        "Content-Type": "application/json"
      });
      res.end(
        JSON.stringify({
          message: "oops! Something went wrong!",
          addtionalInfo: e.message,
        })
      );
    }
  }
};