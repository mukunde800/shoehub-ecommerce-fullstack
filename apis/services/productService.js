const { Op } = require('sequelize');
const { Product, Category } = require('../models');

exports.listProducts = async (query) => {
  const {
    page = 1, limit = 12, search, categoryId,
    minPrice, maxPrice, brand, size, sort = 'createdAt', order = 'DESC',
  } = query;

  const where = { isActive: true };
  if (search) where.name = { [Op.like]: `%${search}%` };
  if (categoryId) where.categoryId = categoryId;
  if (brand) where.brand = brand;
  if (size) where.sizes = { [Op.like]: `%${size}%` };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = minPrice;
    if (maxPrice) where.price[Op.lte] = maxPrice;
  }

  const { rows, count } = await Product.findAndCountAll({
    where,
    include: [{ model: Category, attributes: ['id', 'name', 'slug'] }],
    order: [[sort, order.toUpperCase()]],
    limit: parseInt(limit),
    offset: (page - 1) * limit,
  });

  return {
    data: rows,
    pagination: { total: count, page: +page, pages: Math.ceil(count / limit) },
  };
};