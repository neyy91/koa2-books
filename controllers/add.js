'use strict'

const _ = require('lodash')
const constData = require('../constants/support')

class addBookController {
    constructor(db) {
        this.db = db
    }

    async insertBook(params) {

        let dataIn = _.pick(params, constData.BOOK_DATA)

        if (Object.keys(dataIn).length !== constData.BOOK_DATA.length) {
            throw new Error('Invalid input params: ' + Object.keys(dataIn));
        }

        let insertResult = await this.db.queryToMaster("INSERT INTO catalog SET ?", dataIn);

        return insertResult.insertId

    }

}


exports.addBook = addBookController;