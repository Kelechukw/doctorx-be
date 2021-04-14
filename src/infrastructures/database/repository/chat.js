import BaseRepo from "./base";

export default class extends BaseRepo {
  constructor(Model) {
    super(Model);
    this.Model = Model;
  }

  async getAllMsgs(conversationId) {
    const data = await this.Model.find({ conversationId })
      .populate({ path: "from ", select: "firstName lastName -_id" })
      .populate({ path: "to ", select: "firstName lastName -_id" })
      .exec();

    return data.map(({ from, to, message, _id, type, createdAt }) => ({
      _id,
      from: `${from.firstName} ${from.lastName}`,
      to: `${to.firstName} ${to.lastName}`,
      message,
      type,
      createdAt,
    }));
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
}
