const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
AWS.config.setPromisesDependency(Promise)

const ses = new AWS.SES()

const { MAIL_FROM, MAIL_TO } = process.env

const main = async () => {
  const params = {
    Source: MAIL_FROM,
    Destination: {
      ToAddresses: [MAIL_TO]
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello, SES',
          Charset: 'utf-8'
        }
      },
      Subject: {
        Data: 'Hello',
        Charset: 'utf-8'
      }
    }
  }

  const result = await ses
    .sendEmail(params)
    .promise()
    .catch(err => console.error(err))

  console.log(result)
}

main()
