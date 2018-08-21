import PouchDB from 'pouchdb-browser'
import { DB_NAME } from '../constants/local'

export default new PouchDB(DB_NAME)