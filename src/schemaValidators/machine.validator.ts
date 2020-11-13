import Ajv from "ajv";
const ajv = Ajv();

const addMachineSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: {type: "string"},
    model: {type: "string"},
    responsable: {type: "string"}
  },
  required: ["name", "description", "model", "responsable"],
  additionalProperties: false,
};

const updateMachineSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},
    model: {type: "string"},
    responsable: {type: "string"}
  },
  additionalProperties: false,
}


export const MachineValidators = {
  addValidator: ajv.compile(addMachineSchema),
  updateValidator: ajv.compile(updateMachineSchema),
};