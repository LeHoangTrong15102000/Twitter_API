import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string // Chỉ null khi tweet gốc, không thì tweet_id cha dạng string

  // Sau này dùng tên trong mảng hashtags rồi lặp qua tìm ra hashtags_id rồi thêm vào mảng `objectId - hashtags` của một collection tweet
  hashtags: string[] // tên của hashtag dạng ['javascript', 'typescript']
  mentions: string[] // user_id[]
  medias: Media[]
}

export interface TweetParam extends ParamsDictionary {
  tweet_id: string
}

export interface TweetQuery extends Pagination, Query {
  tweet_type: string
}

export interface Pagination {
  limit: string
  page: string
}
