const knex = require("knex")

exports.up = async function (knex) {
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary()

    table.string("image").notNullable()
    table.string("name").notNullable()
    table.string("email").notNullable()
    table.string("whatsapp").notNullable()
    table.decimal("latitude").notNullable()
    table.decimal("longitude").notNullable()
    table.string("city").notNullable()
    table.string("uf").notNullable()
  })
}

exports.down = async function (knex) {
  return knex.schema.dropTable("points")
}
