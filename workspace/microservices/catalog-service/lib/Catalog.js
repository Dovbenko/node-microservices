/**
 * @module Catalog
 * @description Core service for product catalog management. Handles all item-related database operations.
 */

// Import the Item model from mongoose
const ItemModel = require("../models/Item");

/**
 * Catalog service implementation
 * @class Catalog
 * @description Static service class providing CRUD operations for catalog items with MongoDB integration.
 */
class Catalog {
  /**
   * Retrieves all catalog items
   * @method getAll
   * @static
   * @returns {Promise<Array>} List of items sorted by creation date (newest first)
   * @throws {Error} On database query failure
   */
  static async getAll() {
    return ItemModel.find({}).sort({ createdAt: -1 }).exec();
  }

  /**
   * Retrieves a specific catalog item
   * @method getOne
   * @static
   * @param {string} itemId - MongoDB ObjectId of the target item
   * @returns {Promise<Object>} Single item object if found
   * @throws {Error} When item not found or query fails
   */
  static async getOne(itemId) {
    return ItemModel.findById(itemId).exec();
  }

  /**
   * Adds a new item to the catalog
   * @method create
   * @static
   * @param {Object} data - Item details
   * @param {string} data.name - Product name
   * @param {number} data.price - Product price
   * @param {string} data.description - Product description
   * @param {string} data.imageUrl - Product image URL (optional)
   * @returns {Promise<Object>} Created item object
   * @throws {Error} On validation or database error
   */
  static async create(data) {
    const item = new ItemModel(data);
    return item.save();
  }

  /**
   * Modifies an existing catalog item
   * @method update
   * @static
   * @param {string} itemId - MongoDB ObjectId of the item to update
   * @param {Object} data - Updated item properties
   * @param {string} data.name - New product name (optional)
   * @param {number} data.price - New product price (optional)
   * @param {string} data.description - New product description (optional)
   * @param {string} data.imageUrl - New product image URL (optional)
   * @returns {Promise<Object|null>} Updated item object or null if not found
   * @throws {Error} On validation or database error
   */
  static async update(itemId, data) {
    return ItemModel.findByIdAndUpdate(itemId, data, { new: true }).exec();
  }

  /**
   * Deletes an item from the catalog
   * @method remove
   * @static
   * @param {string} itemId - MongoDB ObjectId of the item to delete
   * @returns {Promise<Object>} Deletion operation result
   * @throws {Error} On database operation failure
   */
  static async remove(itemId) {
    return ItemModel.deleteOne({ _id: itemId }).exec();
  }
}

module.exports = Catalog;
