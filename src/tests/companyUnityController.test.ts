import { CompanyUnityController } from "../controllers";
import { Repository } from "../repositories";

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
});
