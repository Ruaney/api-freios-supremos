import Ajv from "ajv";
const ajv = Ajv();

const addCompanySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

const updateCompanySchema = {
  type: "object",
  properties: {
    name: {type: "string"}
  },
  additionalProperties: false,
}

export const CompanyValidators = {
  addValidator: ajv.compile(addCompanySchema),
  updateValidator: ajv.compile(updateCompanySchema)
};
