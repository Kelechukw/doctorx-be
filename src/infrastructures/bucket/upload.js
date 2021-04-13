import fs from "fs";
import s3 from "./aws";

const upload = (req) => {
  return new Promise((res, rej) => {
    if (!req.file) rej("No file sent");
    const params = {
      ACL: "public-read",
      Bucket: "doctorxs3",
      Body: fs.createReadStream(req.file.path),
      Key: `file/${req.file.originalname}`,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        rej(err);
      }

      if (data) {
        fs.unlinkSync(req.file.path);
        const locationUrl = data.Location;

        res(locationUrl);
      }
    });
  });
};

export default upload;
