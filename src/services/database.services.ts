import { MongoClient, Db, Collection, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
import { envConfig } from '~/constants/config'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import Tweet from '~/models/schemas/Tweet.shema'
import Like from '~/models/schemas/Like.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'

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

  get likes(): Collection<Like> {
    return this.db.collection(envConfig.dbLikesCollection)
  }

  get hashtags(): Collection<Hashtag> {
    return this.db.collection(envConfig.dbHashtagsCollection)
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
