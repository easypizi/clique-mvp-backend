import UploadService from "../service/UploadService.js";

class FileController {
  async uploadPhoto(request, response) {
    try {
      await UploadService.uploadUserPhotoAndUpdateUser(
        request.body.user_id,
        request.files.picture
      );

      return response.status(200).json({
        status: "success",
        message: "User photo successfully uploaded",
      });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async uploadFile(request, response) {
    try {
      const fileUploaded = await UploadService.uploadFile(
        request.body.space_id,
        request.files.file
      );

      return response.status(200).json({
        status: "success",
        message: "User file successfully uploaded",
        data: fileUploaded,
      });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async deleteFile(request, response) {
    try {
      const deletedFile = await UploadService.deleteFile(request.params.fileId);
      return response
        .status(200)
        .json({ status: "success", data: deletedFile });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getAllFiles(request, response) {
    try {
      const allFiles = await UploadService.getAllFiles();
      return response.status(200).json(allFiles);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }
}

export default new FileController();
