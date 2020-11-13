import Ajv from "ajv";
const ajv = Ajv();

const addCompanyUnitySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    address: {type: "string"},
    company: {type: "string"}
  },
  required: ["name", "company"],
  additionalProperties: false,
};

const updateCompanyUnitySchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    address: {type: "string"},
    company: {type: "string"}
  },
  additionalProperties: false,
}

const addMachineCompanyUnitySchema = {
  type: "object",
  properties: {
    machineId: {type: "string"}
  },
  required: ["machineId"],
  additionalProperties: false
}


export const CompanyUnityValidators = {
  addValidator: ajv.compile(addCompanyUnitySchema),
  updateValidator: ajv.compile(updateCompanyUnitySchema),
  addMachineValidator: ajv.compile(addMachineCompanyUnitySchema)
};
