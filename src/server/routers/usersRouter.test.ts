import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import { mockUserCredentials } from "../mocks/users";
import paths from "../paths";
import connectDB from "../../database";
import User from "../../database/models/User";

let server: MongoMemoryServer;
const existingUser = {
  username: "exists",
  password: "exists",
  name: "John",
  email: "john@doe.com",
};

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoURL = server.getUri();

  await connectDB(mongoURL);
});

beforeEach(async () => {
  await User.create(existingUser);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

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

  describe("When it receives an existing user", () => {
    test("Then it should respond with 409 and 'Existing username or email'", async () => {
      const { body } = await request(app)
        .post(paths.users + paths.registerUser)
        .send(existingUser)
        .expect(409);

      expect(body).toHaveProperty("error", "Existing username or email");
    });
  });
});
