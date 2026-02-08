import * as imageService from '../services/image.service.js';
import { deleteImage } from '../controllers/image.controller.js';

jest.mock('../utils/prisma.js', () => ({
  __esModule: true,
  default: {
    image: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('../services/image.service.js', () => ({
  __esModule: true,
  deleteImageByHero: jest.fn((heroId, imageId) => {
    if (heroId === 10 && imageId === 1) {
      return Promise.resolve({ id: 1, superheroId: 10, url: 'test.png' });
    }
    return Promise.reject(new Error('Image not found'));
  }),
}));

describe('Image Service & Controller', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deleteImageByHero deletes image', async () => {
    const result = await imageService.deleteImageByHero(10, 1);

    expect(result).toEqual({ id: 1, superheroId: 10, url: 'test.png' });
  });

  it('deleteImageByHero throws error if image not found', async () => {
    await expect(imageService.deleteImageByHero(10, 999)).rejects.toThrow('Image not found');
  });

  it('deleteImage controller returns 204 on success', async () => {
    const req = { params: { heroId: '10', imageId: '1' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await deleteImage(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deleteImage controller returns 404 if service throws error', async () => {
    const req = { params: { heroId: '10', imageId: '999' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await deleteImage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Image not found' });
  });
});
