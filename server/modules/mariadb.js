const promiseMysql = require('promise-mysql');

const config = {
  connectionLimit: 50,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,  
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  debug: (process.env.DB_DEBUG) ? process.env.DB_DEBUG.split(',') : null
}

class Database {
  constructor() {
    this.init()
  }
  async init(){
    this.pool = await promiseMysql.createPool(config)
  }
  connect = fn => async (...args) => {  
    const con = await this.pool.getConnection()
    const result = await fn(con, ...args).catch(error => {
      /* 에러시 con을 닫아준다. */
      con.release()
      throw error
    })
    /* con을 닫아준다. */
    con.release()
    return result
  }
  transaction = fn => async (...args) => {
    /* DB 커넥션을 한다. */
    const con = await this.pool.getConnection()
    /* 트렌젝션 시작 */
    await con.beginTransaction()
    /* 비지니스 로직에 con을 넘겨준다. */
    const result = await fn(con, ...args).catch(async (error) => {
      /* rollback을 진행한다. */
      await con.rollback()
      /* 에러시 con을 닫아준다. */
      con.release()
      throw error
    })
    /* commit을 해준다. */
    await con.commit()
    /* con을 닫아준다. */
    con.release()
    return result
  }
}


module.exports = Database