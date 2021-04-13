import aws from "aws-sdk";
import config from "../../config/env";

console.log(config.AWSAccessKey);

try {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: "AKIAZM7SIHCE3YC5OAQY",
    secretAccessKey: "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",
    region: "us-east-1",
  });
} catch (error) {
  throw error;
}

const s3 = new aws.S3();

export default s3;
