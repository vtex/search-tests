const fs = require('fs')

const AWS = require('aws-sdk')

const BUCKET = 'vtex-id-hc'
const KEY_PREFIX = 'healthcheck/tests/'
const ACL = 'public-read'
const REGION = 'us-east-1'

AWS.config.update({
  region: REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.HORUS_COGNITO_CREDENTIALS,
  }),
})

const s3 = new AWS.S3()

const uploadFile = async (src, dst, contentType = null) => {
  const key = KEY_PREFIX + dst

  try {
    await s3
      .putObject({
        ACL,
        Bucket: BUCKET,
        Body: fs.readFileSync(src),
        Key: key,
        ContentType: contentType,
      })
      .promise()

    return {
      url: `https://${BUCKET}.s3.amazonaws.com/${key}`,
      signed: s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: key }),
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

module.exports = { uploadFile }
