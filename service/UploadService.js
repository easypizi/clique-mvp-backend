import * as Upload from "upload-js-full";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

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
    this.photosStorageUrl = `${this.baseUrl}/user_photos`;
  }

  async checkPhotoExistense(userId, extension = "jpg") {
    if (!userId) {
      throw new Error("id for photo was not provided");
    }
    const result = await fileApi
      .getFileDetails({
        accountId: process.env.UPLOAD_API_ACCOUNT_ID,
        filePath: `${this.photosStorageUrl}/${userId}.${extension}`,
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

    return result;
  }

  async uploadPhotoFromTelegram(url, userId) {
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
              folderPath: `${this.photosStorageUrl}/raw`,
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

    const result = await fileApi
      .deleteFile({
        accountId: process.env.UPLOAD_API_ACCOUNT_ID,
        filePath: `${this.photosStorageUrl}${userId}.${extension}`,
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
          return { status: false, message: "Error during deleting the photo" };
        }
      );

    return result;
  }
}

export default new UploadService();
