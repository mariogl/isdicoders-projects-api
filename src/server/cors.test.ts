import request from "supertest";
import app from ".";
import paths from "./paths";

describe("Given any endpoint", () => {
  describe("When it receives a request from an unauthorized origin", () => {
    test("Then it should respond with a 403 'Not allowed by CORS' error", async () => {
      const { body } = await request(app)
        .get(paths.loginUser)
        .set("Origin", "http://test.com:3000")
        .expect(403);

      expect(body).toHaveProperty("error", "Not allowed by CORS");
    });
  });
});
