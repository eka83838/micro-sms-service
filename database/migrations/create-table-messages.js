
exports.up = function (knex, Promise) {
  return knex.schema.createTable('messages', function (table) {
    table.increments('id')
    table.string('content')
    table.string('sender')
    table.string('recipient')
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'))
  })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('messages')
}
