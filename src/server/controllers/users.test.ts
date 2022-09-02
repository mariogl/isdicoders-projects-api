import { Request, Response } from "express";
import mockUserCredentials from "../mocks/users";
import registerUser from "./users";

describe("Given a registerUser controller", () => {
  describe("When it receives", () => {
    test("Then it should", async () => {
      const req = {
        body: mockUserCredentials,
      } as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as Partial<Response>;
      const expectedStatus = 201;

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({
        message: `Created ${mockUserCredentials.name}`,
      });
    });
  });
});
