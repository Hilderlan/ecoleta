const knex = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items).split(',').map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct();

    return res.json({ points });
  },

  async show(req, res) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if(!point){
      return res.status(400).json({ message: 'Point not found.' })
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

      return res.json({ point, items });
  },

  async create(req, res) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;
  
    const trx = await knex.transaction();

    const point = {
      image: 'Image test',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }
  
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItens = items.map(item_id => {
      return {
        item_id,
        point_id
      }
    });
  
    await trx('point_items').insert(pointItens);

    await trx.commit();
  
    return res.json({
      id: point_id,
      ...point
    });
  }
}
