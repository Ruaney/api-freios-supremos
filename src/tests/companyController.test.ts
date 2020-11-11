import { Request, Response } from "express";
import { CompanyController, CompanyControllerInstance } from "../controllers";
import { Repository } from "../repositories";
import { CompanyRepository } from "../repositories/companyRepository";

const mocksRepository = {
  get: jest.fn(),
  getOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
};
class RepositoryMock implements Repository {
  get() {
    return mocksRepository.get();
  }
  getOne(query) {
    return mocksRepository.getOne(query);
  }
  save(data) {
    return mocksRepository.save(data);
  }
  update(data) {
    return mocksRepository.update();
  }
}

describe("Company Controller", () => {
  const repositoryMock = new RepositoryMock();
  const companyController = new CompanyController(repositoryMock as any);

  const res: any = {
    send: jest.fn(),
    status: jest.fn(),
  };

  const next = jest.fn();

  describe("#save", () => {
    it("Should store a new Company", async () => {
      const req = {
        body: {
          name: "Empresa 1 teste",
        },
      } as Request;
      await companyController.save(req, res, next);

      expect(mocksRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ name: req.body.name })
      );
    });

    it("Calls next functions with an error when required property is not given", async () => {
      const req = {
        body: {},
      } as Request;
      mocksRepository.save.mockImplementation((data) => {
        if (!data.name) {
          throw new Error();
        }
      });
      await companyController.save(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("#get", () => {
    it("Return all companies", async () => {
      const req = {} as Request;
      await companyController.get(req, res, next);

      return expect(mocksRepository.get).toHaveBeenCalled;
    });
  });

  describe("#getOne", () => {
    it("Returns a company by a given id", async () => {
      const req = {
        params: {
          id: "companyId",
        },
      } as any;
      const expectedResponse = {
        _id: "companyId",
        name: "Empresa teste",
      };

      mocksRepository.getOne.mockImplementation((query) => {
        if (query._id === expectedResponse._id) {
          return expectedResponse;
        } else {
          return null;
        }
      });
      await companyController.getOne(req, res, next);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expectedResponse._id,
          name: expectedResponse.name,
        })
      );
      return expect(mocksRepository.getOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: "companyId" })
      );
    });

    it("Calls reponse with 404 error when there is not resource with given id", async () => {
      const req = {
        params: {
          id: "idinvalido",
        },
      } as any;
      const res = {
        status: jest.fn(() => ({ send: jest.fn() })),
      } as any;

      await companyController.getOne(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});