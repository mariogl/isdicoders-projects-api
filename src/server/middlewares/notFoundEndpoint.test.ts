import request from "supertest";
import app from "..";

describe("Given a GET /test endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 404 and a 'Endpoint not found' error", async () => {
      const { body } = await request(app).get("/test").expect(404);

      expect(body).toHaveProperty("error", "Endpoint not found");
    });
  });
});
