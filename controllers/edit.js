'use strict'

const _ = require('lodash')
const constData = require('../constants/support')

class editBookDataController {
    constructor(db) {
        this.db = db
    }

    async editBookData(params) {

        let dataIn = _.pick(params, constData.BOOK_DATA)

        let idData = _.pick(params, ['id'])

        idData.id = Number(idData.id)

        if (Object.keys(dataIn).length == 0 || Object.keys(params).length > constData.BOOK_DATA.length + 1 || Object.keys(idData).length === 0) {
            throw new Error('Invalid input params: ' + Object.keys(dataIn));
        }

        let updateParams = ''
        Object.keys(dataIn).map((key, index) => {
            index == Object.keys(dataIn).length - 1 ? updateParams = updateParams + key + '=? ' : updateParams = updateParams + key + '=?, '
        })

        let dataInValues = _.union(Object.values(dataIn), Object.values(idData))

        let updateResult = await this.db.queryToMaster("UPDATE catalog SET " + updateParams + " WHERE id=? LIMIT 1;", dataInValues);

        return updateResult && updateResult.changedRows

    }

}


exports.editBook = editBookDataController;