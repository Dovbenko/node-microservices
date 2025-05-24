/** @module Catalog */

const ItemModel = require("../models/Item");

class Catalog {

  static async getAll() {
    return ItemModel.find({}).sort({ createdAt: -1 }).exec();
  }

  static async getOne(itemId) {
    return ItemModel.findById(itemId).exec();
  }

  static async create(data) {
    const item = new ItemModel(data);
    return item.save();
  }

  static async update(itemId, data) {
    return ItemModel.findByIdAndUpdate(itemId, data, { new: true }).exec();
  }

  static async remove(itemId) {
    return ItemModel.deleteOne({ _id: itemId }).exec();
  }
}

module.exports = Catalog;
