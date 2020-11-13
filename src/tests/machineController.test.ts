import { Request } from "express";
import { MachineController } from "../controllers";
import { Repository } from "../repositories";

const mocksRepository = {
  get: jest.fn(),
  getOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
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
    return mocksRepository.update({ _id: id }, data);
  }
  delete(id) {
    return mocksRepository.delete({ _id: id });
  }
}

const validatorsMock = {
  addValidator: jest.fn(),
  updateValidator: jest.fn()
}

describe("Machine Controller", () => {
  const repositoryMock = new RepositoryMock();
  const machineController = new MachineController(repositoryMock as any, validatorsMock);

  const next = jest.fn();

  describe("#save", () => {
    it("Should store a new Machine", async () => {
      const req = {
        file: {
          path: "image",
        },
        body: {
          name: "Maquina 1",
          description: "descricao maquina 1",
          model: "modelId",
          responsable: "userId",
        },
      } as any;
      let res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      validatorsMock.addValidator.mockImplementation(() => true);
      await machineController.save(req, res, next);
      expect(mocksRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ name: req.body.name })
      );
    });

    it("Calls next function with an error when required property is not given", async () => {
      const req = {
        body: {},
      } as Request;
      let res = {
        status: jest.fn(() => ({send: jest.fn()})),
      } as any;
      validatorsMock.addValidator.mockImplementation(() => false);
      await machineController.save(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("#get", () => {
    it("should return all machines", async () => {
      const req = {} as Request;
      let res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      await machineController.get(req, res, next);

      return expect(mocksRepository.get).toHaveBeenCalled;
    });
  });

  describe("#getOne", () => {
    it("should return a Machine by a given id", async () => {
      const req = {
        params: {
          id: "MachineId",
        },
      } as any;
      let res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      const expectedResponse = {
        _id: "MachineId",
        name: "maquina teste",
        description: "descricao maquina",
        image: "urldaImage",
        model: "some model",
        responsable: "some responsable",
        status: "available",
      };

      mocksRepository.getOne.mockImplementation((query) => {
        if (query._id === expectedResponse._id) {
          return expectedResponse;
        } else {
          return null;
        }
      });
      await machineController.getOne(req, res, next);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expectedResponse._id,
          name: expectedResponse.name,
          description: expectedResponse.description,
          image: expectedResponse.image,
          model: expectedResponse.model,
          responsable: expectedResponse.responsable,
          status: expectedResponse.status,
        })
      );
      return expect(mocksRepository.getOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: "MachineId" })
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
      await machineController.getOne(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("#update", () => {
    it("should call update function with data", async () => {
      const req = {
        params: {
          id: "Machineid",
        },
        body: {
          name: "new Machine name",
        },
      } as any;
      let res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      validatorsMock.updateValidator.mockImplementation(() => true);
      await machineController.update(req, res, next);
      return expect(mocksRepository.update).toHaveBeenCalledWith(
        { _id: req.params.id },
        expect.objectContaining({ name: req.body.name })
      );
    });

    it("should call response with 400 status when given invalid id", async () => {
      const req = {
        params: {
          id: "invalidid",
        },
        body: {},
      } as any;

      const res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      validatorsMock.updateValidator.mockImplementation(() => true);
      await machineController.update(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("#delete", () => {
    it("should call delete function of repository to delete", async () => {
      const req = {
        params: {
          id: "Machineid",
        },
      } as any;
      const res: any = {
        send: jest.fn(),
        status: jest.fn(),
      };
      await machineController.delete(req, res, next);
      return expect(mocksRepository.delete).toHaveBeenCalledWith(
        expect.objectContaining({ _id: req.params.id })
      );
    });
  });
});
