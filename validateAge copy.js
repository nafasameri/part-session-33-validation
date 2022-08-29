
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "integer",
  maximum: 120,
  minimum: 13
}

const ageValidation = ajv.compile(schema)


function validateAge(age) {
  const valid = ageValidation(age);
  if (!valid) {
    throw new Error('age is not valid, '+ ageValidation.errors.map(e => e.message).join(', '));
  }
}
function testValidateAge() {
  try {
    validateAge("test");
    console.error("FAIL: 'test' is not valid age");
  }
  catch (err) {
    console.log("PASS: 'test' is not valid age, Error message: ", err.message);
  }

  try {
    validateAge(false);
    console.error("FAIL: 'false' is not valid age");
  }
  catch (err) {
    console.log("PASS: 'false' is not valid age, Error message: ", err.message);
  }

  try {
    validateAge(-10);
    console.error("FAIL: '-10' is not valid age");
  }
  catch (err) {
    console.log("PASS: '-10' is not valid age, Error message: ", err.message);
  }

  try {
    validateAge(0);
    console.error("FAIL: '0' is not valid age");
  }
  catch (err) {
    console.log("PASS: '0' is not valid age, Error message: ", err.message);
  }

  try {
    validateAge(1000);
    console.error("FAIL: '1000' is not valid age");
  }
  catch (err) {
    console.log("PASS: '1000' is not valid age, Error message: ", err.message);
  }

  try {
    validateAge();
    console.error("FAIL: 'undefined' is not valid age");
  }
  catch (err) {
    console.log("PASS: 'undefined' is not valid age, Error message: ", err.message);
  }

  try {
    validateAge(20.5);
    console.error("FAIL: '20.5' is a valid age but not accepted!, Error message: ");
  }
  catch (err) {
    console.log("PASS: '20.5' is not valid age", err.message);
  }

  try {
    validateAge(20);
    console.log("PASS: '20' is valid age");
  }
  catch (err) {
    console.error("FAIL: '20' is a valid age but not accepted!, Error message: ", err.message);
  }
}

testValidateAge();