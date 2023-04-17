import * as Upload from "upload-js-full";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

import User from "../models/User.js";
import File from "../models/File.js";
import { formatFileSize } from "../helpers/common.js";

dotenv.config();

const MAX_FILE_SIZE = 52428800;

const uploadManager = new Upload.UploadManager(
  new Upload.Configuration({
    fetchApi: fetch,
    apiKey: process.env.UPLOAD_API_KEY,
  })
);

const fileApi = new Upload.FileApi(
  new Upload.Configuration({
    fetchApi: fetch,
    apiKey: process.env.UPLOAD_API_KEY,
  })
);

class UploadService {
  constructor() {
    this.baseUrl = "/clique";
    this.photoStorageUrl = `${this.baseUrl}/user_photos`;
    this.fileStorageUrl = `${this.baseUrl}/spaces_files`;
  }

  async uploadUserPhotoAndUpdateUser(userId, picture) {
    if (!userId) {
      throw new Error("id was not provided for uploading photos");
    }

    try {
      const user = await User.findOne({ user_id: userId });
      const buffer = picture.data;
      const bufferSize = picture.size;

      const rawPhoto = await uploadManager
        .upload({
          accountId: process.env.UPLOAD_API_ACCOUNT_ID,
          data: buffer,
          size: parseInt(bufferSize),
          mime: "image/jpeg",
          path: {
            fileName: `${userId}.jpeg`,
            fileNameVariablesEnabled: true,
            folderPath: `${this.photoStorageUrl}/raw`,
            folderPathVariablesEnabled: true,
          },
        })
        .then(
          (result) => {
            return result;
          },
          (error) => {
            console.error(error);
            return null;
          }
        );

      if (rawPhoto && user) {
        const processedUrl = await this.processPhotoToWebp(rawPhoto);
        const updateData = { user_id: userId };
        const date = Date.now();
        updateData["user_image"] = `${processedUrl}&last_updated=${date}`;

        const updatedUser = await User.findOneAndUpdate(
          { user_id: userId },
          updateData,
          { new: true }
        );

        return updatedUser;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async uploadPhotoFromTelegram(url, userId, path = "raw") {
    if (!url || !userId) {
      throw new Error("url or id was not provided for uploading photos");
    }
    try {
      const cdnPhoto = await fetch(url).then(async (response) => {
        const buffer = Buffer.from(await response.arrayBuffer());
        const bufferSize = buffer.byteLength;
        return await uploadManager
          .upload({
            accountId: process.env.UPLOAD_API_ACCOUNT_ID,
            data: buffer,
            size: parseInt(bufferSize),
            mime: "image/jpeg",
            path: {
              fileName: `${userId}.jpeg`,
              fileNameVariablesEnabled: true,
              folderPath: `${this.photoStorageUrl}/${path}`,
              folderPathVariablesEnabled: true,
            },
          })
          .then(
            (result) => {
              return result;
            },
            (error) => {
              console.error(error);
              return null;
            }
          );
      });

      return cdnPhoto;
    } catch (error) {
      console.log(error);
    }
  }

  async processPhotoToWebp({ accountId, filePath }) {
    try {
      return await fileApi
        .processFile({
          accountId: accountId,
          cache: true,
          cache_perm: "auto",
          cache_ttl: 31536000,
          filePath: filePath,
          large: false,
          transformation: "telegramWepb",
          version: "1",
        })
        .then(
          (result) => {
            return result.raw.url;
          },
          (error) => {
            console.error(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePhoto(userId, extension = "jpg") {
    if (!userId) {
      throw new Error("id for photo was not provided");
    }
    try {
      const result = await fileApi
        .deleteFile({
          accountId: process.env.UPLOAD_API_ACCOUNT_ID,
          filePath: `${this.photoStorageUrl}/raw/${userId}.${extension}`,
        })
        .then(
          () => {
            return {
              status: true,
              message: `Photo ${id}.${extension} was succesfully deleted`,
            };
          },
          (error) => {
            console.error(error);
            return {
              status: false,
              message: "Error during deleting the photo",
            };
          }
        );

      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async uploadFile(spaceId, file) {
    if (!spaceId) {
      throw new Error(
        "id for space was not provided and file was not uploaded"
      );
    }

    try {
      const buffer = file.data;
      const bufferSize = file.size;
      const mimeType = file.mimetype;
      const fileName = file.name;

      if (bufferSize >= MAX_FILE_SIZE) {
        throw new Error(
          "File for upload is too big, try to reduce size before upload"
        );
      }

      const uploadedFile = await uploadManager
        .upload({
          accountId: process.env.UPLOAD_API_ACCOUNT_ID,
          data: buffer,
          size: parseInt(bufferSize),
          mime: mimeType,
          path: {
            fileName: fileName,
            fileNameVariablesEnabled: true,
            folderPath: `${this.fileStorageUrl}/${spaceId}`,
            folderPathVariablesEnabled: true,
          },
        })
        .then(
          (result) => {
            return result;
          },
          (error) => {
            console.error(error);
            return null;
          }
        );

      if (uploadedFile) {
        const fileData = {
          space_id: spaceId,
          file_name: fileName,
          file_id: uuidv4(),
          file_size: formatFileSize(uploadedFile.size),
          file_type: mime.extension(uploadedFile.mime)?.toUpperCase(),
          file_url: uploadedFile.fileUrl,
          file_date: Date.now(),
        };

        const savedFile = File.create(fileData);
        return savedFile;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async deleteFile(fileId) {
    if (!fileId) {
      throw new Error("file id was not provided");
    }

    try {
      const file = await File.findOne({ file_id: fileId });

      if (file) {
        const result = await fileApi
          .deleteFile({
            accountId: process.env.UPLOAD_API_ACCOUNT_ID,
            filePath: `${this.fileStorageUrl}/${file.space_id}/${file.file_name}`,
          })
          .then(
            () => {
              return {
                status: true,
                message: `File ${file.file_name} was succesfully deleted`,
              };
            },
            (error) => {
              console.error(error);
              throw new Error(error);
            }
          );
        return result;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllFiles() {
    const allFiles = await File.find();
    return allFiles;
  }
}

export default new UploadService();
