// Todo

import { check, checkSchema } from 'express-validator'
import { TweetType } from '~/constants/enums'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const createTweetValidator = validate(
  checkSchema(
    {
      //  Todo
    },
    ['params', 'body']
  )
)

export const tweetIdValidator = validate(
  checkSchema(
    {
      // Todo
    },
    ['params', 'body']
  )
)

export const audienceValidator = validate(
  checkSchema({
    // Todo
  })
)

export const getTweetChildrenValidator = validate(
  checkSchema(
    {
      tweet_type: {
        isIn: {
          options: [TweetType],
          errorMessage: TWEETS_MESSAGES.INVALID_TYPE
        }
      }
    },
    ['query']
  )
)

export const paginationValidator = validate(
  checkSchema(
    {
      //  Todo
    },
    ['query']
  )
)
