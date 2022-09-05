import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import { mockUser, mockUserCredentials } from "../mocks/users";
import { loginUser, registerUser } from "./users";
import CustomError from "../../utils/CustomError";

const req = {
  body: mockUserCredentials,
} as Partial<Request>;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as Partial<Response>;

beforeEach(() => {
  (res.status as jest.Mock).mockClear();
  (res.json as jest.Mock).mockClear();
});

describe("Given a registerUser controller", () => {
  describe("When it receives valid data and non existing username or email", () => {
    test("Then it should call status with 201 and json with ok message", async () => {
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

describe("Given a loginUser controller", () => {
  describe("When it receives valid credentials", () => {
    test("Then it should call status with 200 and json with the token", async () => {
      const expectedStatus = 200;
      const token = "token";

      User.findOne = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);

      const expectedResponse = {
        token,
      };

      await loginUser(req as Request, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives an unexistent user", () => {
    test("Then it should call next with a 403 status and 'Wrong credentials' error", async () => {
      const expectedStatus = 403;

      User.findOne = jest.fn().mockResolvedValue(null);
      const next = jest.fn() as NextFunction;
      const expectedError = new CustomError(
        expectedStatus,
        "username doesn't exist",
        "Wrong credentials"
      );

      await loginUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("And it receives wrong password", () => {
    test("Then it should call next with 403 and 'Wrong credentials'", async () => {
      const expectedStatus = 403;

      bcrypt.compare = jest.fn().mockRejectedValue(true);
      User.findOne = jest.fn().mockResolvedValue(mockUser);
      const next = jest.fn() as NextFunction;
      const expectedError = new CustomError(
        expectedStatus,
        "Wrong password",
        "Wrong credentials"
      );

      await loginUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
