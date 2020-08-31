import 'babel-polyfill';
import MenuService from "../../src/client/services/MenuService";

function fakeResponse(status, data) {
  return {
    status,
    json: () => Promise.resolve(data)
  };
}

describe("MenuService", () => {
  describe("fetchItems", () => {
    const menuService = new MenuService;
    it("fetch successfully", () => {
      const response = fakeResponse(200, {
        item: 'Teddy Bear'
      });

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve(fakeResponse));

      menuService.fetchItems().then(response => {
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.item).toBe('Teddy Near');
      });
    });

    it("fetch failed", () => {
      const response = fakeResponse(404, {
        error: 'Something went wrong!'
      });

      window.fetch = jest.fn().mockImplementation(() => Promise.reject(fakeResponse));

      menuService.fetchItems().then(response => {
        console.log(response);
        expect(response.status).toBe(404);
      });
    });
  });
});

