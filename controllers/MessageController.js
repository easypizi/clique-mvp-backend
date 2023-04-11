import MessageService from "../service/MessageService.js";

class MessageController {
  async getAllMessages(request, response) {
    try {
      const allMessages = await MessageService.getAllMessages();
      return response.status(200).json(allMessages);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async createMessage(request, response) {
    try {
      const message = await MessageService.createMessage(request.body);
      return response.status(200).json({ status: "success", data: message });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async updateMessage(request, response) {
    try {
      const updatedMessage = await MessageService.updateMessage(request.body);
      return response
        .status(200)
        .json({ status: "success", data: updatedMessage });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async deleteMessage(request, response) {
    try {
      const deletedMessage = await MessageService.deleteMessage(
        request.params.group,
        request.params.id
      );
      return response
        .status(200)
        .json({ status: "success", data: deletedMessage });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }
}

export default new MessageController();
