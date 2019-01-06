const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
AWS.config.setPromisesDependency(Promise)

const ses = new AWS.SES()

const { MAIL_FROM, MAIL_TO } = process.env

const main = async () => {
  const result = await Promise.all(
    [...new Set([MAIL_FROM, MAIL_TO])].map(EmailAddress =>
      ses.verifyEmailIdentity({ EmailAddress }).promise()
    )
  ).catch(err => console.error(err))
  console.log(result)
}

main()
