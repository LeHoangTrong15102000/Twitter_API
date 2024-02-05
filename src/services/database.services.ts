import { MongoClient, Db, Collection, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
import { envConfig } from '~/constants/config'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import Tweet from '~/models/schemas/Tweet.shema'
import Like from '~/models/schemas/Like.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import Bookmark from '~/models/schemas/Bookmark.schema'

config() // lấy thằng config() để có thể sử dụng được thằng env
const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@cluster0.jzb6290.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(envConfig.dbName)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  async indexUsers() {
    const isExists = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])

    if (!isExists) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 }, { unique: true })
    }
  }

  async indexRefreshTokens() {
    const isExists = await this.refreshTokens.indexExists(['exp_1', 'token_1'])

    if (!isExists) {
      this.refreshTokens.createIndex({ token: 1 })
      this.refreshTokens.createIndex(
        { exp: 1 },
        {
          // dựa vào móc thời gian là exp, sau khi exp hết hạn thì MongoDB nó sẽ tự động xoá đi refresh_token hết hạn
          // Nên set theo mốc thời gian vì trong db thì các exp đều có các mốc thời gian
          expireAfterSeconds: 0
        }
      )
    }
  }

  async indexVideoStatus() {
    const isExists = await this.videoStatus.indexExists(['name_1'])

    if (!isExists) {
      this.videoStatus.createIndex({ name: 1 })
    }
  }

  async indexFollowers() {
    const isExists = await this.followers.indexExists(['user_id_1_followed_user_id_1'])

    if (!isExists) {
      this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
    }
  }

  async indexTweets() {
    const isExists = await this.tweets.indexExists(['content_text'])

    if (!isExists) {
      this.tweets.createIndex({ content: 'text' }, { default_language: 'none' })
    }
  }

  async disconnect() {
    await this.client.close()
  }

  // getter users() nó sẽ trả về một collection `users` trong db(nếu collection đó chưa có trong db thì nó sẽ tạo), kiểu trả về là một collection có generictype là User
  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(envConfig.dbFollowersCollection)
  }

  get tweets(): Collection<Tweet> {
    return this.db.collection(envConfig.dbTweetsCollection)
  }

  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(envConfig.dbVideoStatusCollection)
  }

  get likes(): Collection<Like> {
    return this.db.collection(envConfig.dbLikesCollection)
  }

  get hashtags(): Collection<Hashtag> {
    return this.db.collection(envConfig.dbHashtagsCollection)
  }

  get bookmarks(): Collection<Bookmark> {
    return this.db.collection(envConfig.dbBookmarksCollection)
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
