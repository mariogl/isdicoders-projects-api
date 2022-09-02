import request from "supertest";
import app from "..";
import mockUserCredentials from "../mocks/users";
import paths from "../paths";

describe("Given a POST /users/register", () => {
  describe("When it receives valid credentials", () => {
    test("Then it should respond with 201 and a message", async () => {
      await request(app)
        .post(paths.users + paths.registerUser)
        .send(mockUserCredentials)
        .expect(201);
    });
  });

  describe("When it receives bad credentials", () => {
    test("Then it should respond with 400 and a message", async () => {
      mockUserCredentials.password = "aaa";

      await request(app)
        .post(paths.users + paths.registerUser)
        .send(mockUserCredentials)
        .expect(400);
    });
  });
});
