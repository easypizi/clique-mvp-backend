import Message from "../models/Message.js";
import Space from "../models/Space.js";

class MessageService {
  async getAllMessages() {
    const allMessages = await Message.find();
    return allMessages;
  }

  async createMessage(messageData) {
    try {
      const { message_group_id, message_tags } = messageData;
      const spaces = await Space.find({
        space_groups_id: { $in: [message_group_id] },
      });

      if (spaces && spaces.length) {
        const properSpaces = spaces
          .filter((space) =>
            space?.space_message_hashtags.some((item) =>
              message_tags.includes(item)
            )
          )
          .map((spaceItem) => spaceItem.space_id);

        if (properSpaces && properSpaces.length) {
          const messageDataWithSpacesId = {
            ...messageData,
            message_space: properSpaces,
          };

          const createdMessage = await Message.create(messageDataWithSpacesId);
          return createdMessage;
        } else {
          throw new Error("No hashtags matched with this message");
        }
      } else {
        throw new Error("Message from unknown space");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateMessage(messageData) {
    if (!messageData.message_id || !messageData.message_group_id) {
      throw new Error("can't update without message id and message group id");
    }

    const message = await Message.findOne({
      message_id: messageData.message_id,
      message_group_id: messageData.message_group_id,
    });

    if (!message) {
      throw new Error("there is no message with such id or group id");
    }

    const updatedMessage = await Message.findOneAndUpdate(
      {
        message_id: messageData.message_id,
        message_group_id: messageData.message_group_id,
      },
      messageData,
      { new: true }
    );

    return updatedMessage;
  }

  async deleteMessage(group, id) {
    if (!id || !group) {
      throw new Error("can't delete message without id or group id");
    }

    const deletedMessage = await Message.findOneAndDelete({
      message_id: id,
      message_group_id: group,
    });

    return deletedMessage;
  }
}

export default new MessageService();