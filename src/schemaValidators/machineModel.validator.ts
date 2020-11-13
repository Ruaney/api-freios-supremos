import Ajv from "ajv";
const ajv = Ajv();

const addMachineModelSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: {type: "string"},
  },
  required: ["name", "description"],
  additionalProperties: false,
};

const updateMachineModelSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},
  },
  additionalProperties: false,
}


export const MachineModelValidators = {
  addValidator: ajv.compile(addMachineModelSchema),
  updateValidator: ajv.compile(updateMachineModelSchema),
};