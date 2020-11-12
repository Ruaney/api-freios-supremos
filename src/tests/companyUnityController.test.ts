import { CompanyUnityController } from "../controllers";
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
    return mocksRepository.update({_id: id}, data);
  }
  delete(id) {
    return mocksRepository.delete({_id: id});
  }
}

describe("CompanyUnity Controller", () => {
  const repositoryMock = new RepositoryMock();
  const companyUnityController = new CompanyUnityController(
    repositoryMock as any
  );

  const res: any = {
    send: jest.fn(),
    status: jest.fn(),
  };

  const next = jest.fn();

  describe("#save", () => {
    it("Should store a new CompanyUnity", async () => {
      const req = {
        body: {
          name: "Nova Unidade",
          address: "Endereco",
          company: "idCompany",
        },
      } as any;
      await companyUnityController.save(req, res, next);
      return expect(mocksRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: req.body.name,
          address: req.body.address,
          company: req.body.company,
        })
      );
    });
    it("Calls next function with an error when required property is not given", async () => {
      const req = {
        body: {},
      } as any;

      mocksRepository.save.mockImplementation((data) => {
        if (!data.name || !data.company) {
          throw new Error();
        }
      });
      await companyUnityController.save(req, res, next);
      return expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("#get", () => {
    it("should return all CompanyUnity", async () => {
      const req = {} as any;
      await companyUnityController.get(req, res, next);

      return expect(mocksRepository.get).toHaveBeenCalled;
    });
  });

  describe("#getOne", () => {
    it("should return a CompanyUnity by a given id", async () => {
      const req = {
        params: {
          id: "companyUnityid",
        },
      } as any;
      const expectedResponse = {
        _id: "companyUnityid",
        name: "Nome unidade",
        address: "Endereco unidade",
        company: "compania",
      };

      mocksRepository.getOne.mockImplementation((query) => {
        if (query._id === expectedResponse._id) {
          return expectedResponse;
        } else {
          return null;
        }
      });
      await companyUnityController.getOne(req, res, next);
      return expect(mocksRepository.getOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: expectedResponse._id })
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
      await companyUnityController.getOne(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("#update", () => {
    
    it("should call update function with data", async() => {
      const req = {
        params: {
          id: 'companyunityid'
        },
        body: {
          name: 'new companyunity name'
        }
      } as any;

      await companyUnityController.update(req, res, next);
      return expect(mocksRepository.update).toHaveBeenCalledWith({_id: req.params.id}, expect.objectContaining({name: req.body.name}));
    });

    it("should call response with 400 status when given invalid id", async () => {
      const req = {
        params: {
          id: 'invalidid'
        },
        body: {}
      } as any;

      let res = {
        status: jest.fn(() => ({send: jest.fn()}))
      } as any;

      await companyUnityController.update(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
