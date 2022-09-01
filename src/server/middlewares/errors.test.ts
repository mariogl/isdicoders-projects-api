import { Response } from "express";
import CustomError from "../../utils/CustomError";
import { generalError, notFoundError } from "./errors";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call next function with 404 status and 'Endpoint not found'", () => {
      const message = "Endpoint not found";
      const next = jest.fn();
      const error = new CustomError(400, message, message);

      notFoundError(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a 'Test error' error with status 405 and a res function", () => {
    const status = 405;
    const message = "Test error";
    const error = new CustomError(status, message, "");
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as Partial<Response>;

    test("Then it should call res' status method with 405", () => {
      generalError(error, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
