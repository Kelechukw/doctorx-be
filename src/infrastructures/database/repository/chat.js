const BaseRepo = require("./base");

module.exports = class extends BaseRepo {
  constructor(Model) {
    super(Model);
    this.Model = Model;
  }

  async getAllConversation(id) {
    const pipeline = [
      {
        $addFields: {
          toId: { $toString: "$to" },
          fromId: { $toString: "$from" },
        },
      },
      { $match: { $or: [{ from: id }, { to: id }] } },
      // { $project: { ...FIELDS } },
      { $sort: { timestamp: -1 } },

      {
        $group: {
          _id: {
            to: "$to",
            from: "$from",
          },
          to: { $first: "$to" },
          from: { $first: "$from" },
          message: { $last: "$message" },
          timestamp: { $last: "$createdAt" },
        },
      },
    ];

    return await this.Model.aggregate(pipeline);
  }
};
