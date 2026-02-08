import * as superheroController from '../controllers/superhero.controller.js';
import * as superheroService from '../services/superhero.service.js';

jest.mock('../services/superhero.service.js', () => {
  return {
    getSuperheroes: jest.fn(),
    getSuperheroById: jest.fn(),
    createSuperhero: jest.fn(),
    updateSuperhero: jest.fn(),
    deleteSuperhero: jest.fn(),
    addImages: jest.fn(),
  };
});

describe('Superhero Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, query: {}, body: {}, files: [] };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it('getAllSuperheroes returns heroes', async () => {
    const heroes = { items: [], total: 0, page: 1, totalPages: 1 };
    superheroService.getSuperheroes.mockResolvedValue(heroes);

    await superheroController.getAllSuperheroes(req, res);

    expect(res.json).toHaveBeenCalledWith(heroes);
  });

  it('getSuperhero returns 404 if not found', async () => {
    superheroService.getSuperheroById.mockResolvedValue(null);
    req.params.id = '1';

    await superheroController.getSuperhero(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Hero not found' });
  });

  it('createNewSuperhero returns 201', async () => {
    const hero = { id: 1, name: 'Hero1' };
    superheroService.createSuperhero.mockResolvedValue(hero);
    req.body = { name: 'Hero1' };

    await superheroController.createNewSuperhero(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(hero);
  });
});
