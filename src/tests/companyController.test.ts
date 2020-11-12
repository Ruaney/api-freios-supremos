import { Request } from "express";
import { CompanyController } from "../controllers";
import { Repository } from "../repositories";

const mocksRepository = {
  get: jest.fn(),
  getOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
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
  update(id, data) {
    return mocksRepository.update(id, data);
  }
  delete(id) {
    return mocksRepository.delete(id);
  }
}

describe("Company Controller", () => {
  const repositoryMock = new RepositoryMock();
  const companyController = new CompanyController(repositoryMock as any);

  let res: any = {
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

    it("Calls next function with an error when required property is not given", async () => {
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
    it("should return all companies", async () => {
      const req = {} as Request;
      await companyController.get(req, res, next);

      return expect(mocksRepository.get).toHaveBeenCalled;
    });
  });

  describe("#getOne", () => {
    it("should return a company by a given id", async () => {
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

    it("should response with 404 when there is no resourec for given id", async () => {
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
  
  describe("#update", () => {
    
    it("should call update function with data", async() => {
      const req = {
        params: {
          id: 'companyid'
        },
        body: {
          name: 'new company name'
        }
      } as any;

      await companyController.update(req, res, next);
      return expect(mocksRepository.update).toHaveBeenCalledWith(req.params.id, expect.objectContaining({name: req.body.name}));
    });

    it("should call response with 400 status when given invalid id", async () => {
      const req = {
        params: {
          id: 'invalidid'
        },
        body: {}
      } as any;

      res = {
        status: jest.fn(() => ({send: jest.fn()}))
      } as any;

      await companyController.update(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
