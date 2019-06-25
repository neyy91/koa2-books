'use strict'

const _ = require('lodash')
const constData = require('../constants/support')

class getBookController {
    constructor(db) {
        this.db = db
    }

    async getBookData(params) {

        let dataIn = _.pick(params, ['type'])


        let limits = _.pick(params, ['offset', 'count'])

        limits.offset = Number(limits.offset ? limits.offset : constData.LIMITS.OFFSET)
        limits.count = Number(limits.count ? limits.count : constData.LIMITS.COUNT)

        dataIn.type = dataIn.type ? dataIn.type : 'id'

        if (Object.keys(dataIn).length == 0 || constData.BOOK_DATA.indexOf(dataIn.type) === -1 && dataIn.type !== 'id') {
            throw new Error('Invalid input params: ' + Object.keys(dataIn));
        }

        let getResult = await this.db.queryToMaster("SELECT * FROM catalog ORDER BY `" + dataIn.type + "` ASC LIMIT ?,?", Object.values(limits));

        return getResult
    }

}


exports.getBook = getBookController;