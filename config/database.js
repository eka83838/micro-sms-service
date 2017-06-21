var database = {
  'production': {
    'client': process.env.DB_PRD_DIALECT,
    connection: {
      'host': process.env.DB_PRD_HOST,
      'user': process.env.DB_PRD_USER,
      'password': process.env.DB_PRD_PASS,
      'database': process.env.DB_PRD_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: '../database/seeds'
    }
  },
  'development': {
    'client': process.env.DB_DEV_DIALECT,
    connection: {
      'host': process.env.DB_DEV_HOST,
      'user': process.env.DB_DEV_USER,
      'password': process.env.DB_DEV_PASS,
      'database': process.env.DB_DEV_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  'test': {
    'client': process.env.DB_TEST_DIALECT,
    connection: {
      'host': process.env.DB_TEST_HOST,
      'user': process.env.DB_TEST_USER,
      'password': process.env.DB_TEST_PASS,
      'database': process.env.DB_TEST_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
}
module.exports = database
