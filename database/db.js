const _ = require( 'lodash' )

const fs =require( 'fs' )

if( fs.existsSync( '.env' ) ){
  require( 'dotenv' ).config()
}

const connectionString = process.env.DATABASE_URL

const pgp = require( 'pg-promise' )()

const db = pgp( connectionString )

// - - - QUERIES - - -
const INSERT_TODO = 'INSERT INTO todos(name, description) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING *'

const GET_ALL_TODOS = 'SELECT * FROM todos'

const Todos = {
  addTodo: ( todo ) => {
    const {name, description} = todo
    console.log("In DB.js: ")
    console.log(name)
    console.log(description)
    return db.one( INSERT_TODO, [name, description])
      .then( result => {
        console.log( result )
      })
  },
  getAll: () => db.any( GET_ALL_TODOS, [] )
}

module.exports = {Todos};