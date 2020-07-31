import Datastore from 'nedb-promises'
import { resolve } from 'path'

export const quotesDb = new Datastore({ filename: resolve('data', 'quotes.db'), autoload: true, timestampData: true })
