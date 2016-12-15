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

const GET_ALL_TODOS = 'SELECT * FROM todos WHERE completed = FALSE ORDER BY id DESC'

const GET_ALL_COMP = 'SELECT * FROM todos WHERE completed = TRUE ORDER BY id DESC'

const DELETE_TODO = 'DELETE FROM todos WHERE id = $1'

const UPDATE_NAME = 'UPDATE todos SET name = $1 WHERE id=$2'

const UPDATE_DESC = 'UPDATE todos SET description = $1 WHERE id=$2'

const MARK_COMPLETE = 'UPDATE todos SET completed = TRUE WHERE id = $1'


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
  deleteTodo: ( todoID ) => {
    return db.none( DELETE_TODO, [todoID] )
  },
  updateName: ( name, id ) => {
    console.log('Update NAME!', name, id);
    return db.none( UPDATE_NAME, [name, id])
  },
  updateDesc: ( desc, id ) => {
    console.log('Update DESC', desc, id);
    return db.none( UPDATE_DESC, [desc, id])
  },
  markComplete: ( todoID ) => {
    return db.none( MARK_COMPLETE, [todoID])
  },
  getAll: () =>{
        return Promise.all( [db.any(GET_ALL_TODOS),db.any(GET_ALL_COMP)]      )
  },

}

module.exports = {Todos};
