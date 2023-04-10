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
}

export default new FileController();
