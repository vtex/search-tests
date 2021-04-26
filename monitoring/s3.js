const fs = require('fs')

const AWS = require('aws-sdk')

const BUCKET = 'vtex-id-hc'
const KEY_PREFIX = 'healthcheck/tests/'
const ACL = 'public-read'
const REGION = 'us-east-1'

AWS.config.update(***REMOVED***
  region: REGION,
  credentials: new AWS.CognitoIdentityCredentials(***REMOVED***
    IdentityPoolId: process.env.HORUS_COGNITO_CREDENTIALS,
***REMOVED***),
***REMOVED***)

const s3 = new AWS.S3()

const uploadFile = async (src, dst, contentType = null) => ***REMOVED***
  const key = KEY_PREFIX + dst

  try ***REMOVED***
    await s3
      .putObject(***REMOVED***
        ACL,
        Bucket: BUCKET,
        Body: fs.readFileSync(src),
        Key: key,
        ContentType: contentType,
    ***REMOVED***)
      .promise()

    return ***REMOVED***
      url: `https://$***REMOVED***BUCKET***REMOVED***.s3.amazonaws.com/$***REMOVED***key***REMOVED***`,
      signed: s3.getSignedUrl('getObject', ***REMOVED*** Bucket: BUCKET, Key: key ***REMOVED***),
  ***REMOVED***
***REMOVED*** catch (err) ***REMOVED***
    // eslint-disable-next-line no-console
    console.log(err)
***REMOVED***
***REMOVED***

module.exports = ***REMOVED*** uploadFile ***REMOVED***
