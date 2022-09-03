import { Request, Response } from "express";
import User from "../../database/models/User";
import mockUserCredentials from "../mocks/users";
import registerUser from "./users";

describe("Given a registerUser controller", () => {
  const req = {
    body: mockUserCredentials,
  } as Partial<Request>;

  describe("When it receives valid data and non existing username or email", () => {
    test("Then it should call status with 201 and json with ok message", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as Partial<Response>;
      const expectedStatus = 201;
      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue(true);

      await registerUser(req as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({
        message: `Created user ${mockUserCredentials.username}`,
      });
    });
  });

  describe("When it throws an error", () => {
    test("Then it should call next function with the error", async () => {
      const next = jest.fn();
      const error = new Error("test error");
      User.findOne = jest.fn().mockRejectedValue(error);

      await registerUser(req as Request, {} as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
