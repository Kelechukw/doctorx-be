import aws from "aws-sdk";
import config from "../../config/env";

try {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: config.AWSAccessKey,
    secretAccessKey: config.secretAccessKey,
    region: config.awsRegion,
  });
} catch (error) {
  throw error;
}

const s3 = new aws.S3();

export default s3;
