import { Request } from "express";
import { MachineModelController } from "../controllers";
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

const validatorsMock = {
  addValidator: jest.fn(),
  updateValidator: jest.fn()
}

describe("MachineModel Controller", () => {
  const repositoryMock = new RepositoryMock();
  const machineModelController = new MachineModelController(repositoryMock as any, validatorsMock);

  let res: any = {
    send: jest.fn(),
    status: jest.fn(),
  };

  const next = jest.fn();

  describe("#save", () => {
    it("Should store a new MachineModel", async () => {
      const req = {
        body: {
          name: "modelo 1",
          description: "descricao modelo 1"
        },
      } as Request;
      validatorsMock.addValidator.mockImplementation(() => true);
      await machineModelController.save(req, res, next);

      expect(mocksRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ name: req.body.name })
      );
    });

    it("should call res with status 400 when property properties is not given", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn(() => ({send: jest.fn()}))
      } as any;
      validatorsMock.addValidator.mockImplementation(() => false);

      await machineModelController.save(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("#get", () => {
    it("should return all MachineModel", async () => {
      const req = {} as Request;
      await machineModelController.get(req, res, next);

      return expect(mocksRepository.get).toHaveBeenCalled;
    });
  });

  describe("#getOne", () => {
    it("should return a MachineModel by a given id", async () => {
      const req = {
        params: {
          id: "machineModelId",
        },
      } as any;
      const expectedResponse = {
        _id: "machineModelId",
        name: "modelo 1",
        description: "descricao modelo 1"
      };

      mocksRepository.getOne.mockImplementation((query) => {
        if (query._id === expectedResponse._id) {
          return expectedResponse;
        } else {
          return null;
        }
      });
      await machineModelController.getOne(req, res, next);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expectedResponse._id,
          name: expectedResponse.name,
          description: expectedResponse.description
        })
      );
      return expect(mocksRepository.getOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: "machineModelId" })
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

      await machineModelController.getOne(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(404);
    });
  });
  
  describe("#update", () => {
    
    it("should call update function with data", async() => {
      const req = {
        params: {
          id: 'machineModelid'
        },
        body: {
          name: 'new model name',
          description: 'model description'
        }
      } as any;

      validatorsMock.updateValidator.mockImplementation(() => true);
      await machineModelController.update(req, res, next);
      return expect(mocksRepository.update).toHaveBeenCalledWith({_id: req.params.id}, expect.objectContaining({name: req.body.name}));
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

      await machineModelController.update(req, res, next);
      return expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('#delete', () => {
    it('should call delete function of repository to delete', async() => {
      const req = {
        params: {
          id: 'machineModelid'
        }
      } as any;

      await machineModelController.delete(req, res, next);
      return expect(mocksRepository.delete).toHaveBeenCalledWith(expect.objectContaining({_id: req.params.id}));
    });
  })
});

