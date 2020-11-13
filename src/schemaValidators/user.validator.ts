import Ajv from "ajv";
const ajv = Ajv();

const addUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

const updateUserSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
  },
  additionalProperties: false,
}


export const UserValidators = {
  addValidator: ajv.compile(addUserSchema),
  updateValidator: ajv.compile(updateUserSchema),
};