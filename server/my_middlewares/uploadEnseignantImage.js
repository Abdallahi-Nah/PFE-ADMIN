const sharp = require("sharp");
const cloudinary = require("../configs/cloudinary");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiErrors.utils");

const uploadEnseignantImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("Aucune image fournie", 400));
  }

  const resizedImageBuffer = await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  const streamUpload = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "enseignants", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(resizedImageBuffer);
    });

  const result = await streamUpload();
  req.body.profileImg = result.secure_url;

  next();
});

module.exports = uploadEnseignantImage;
