const Router = require('koa-router');
const addBookController = require('../controllers/add')
const editBookController = require('../controllers/edit')
const getBookController = require('../controllers/get')

var mysqlContr = require('../db/mysql');
const db = new mysqlContr.mysql()
db.connect()


const addBook = new addBookController.addBook(db)
const editBook = new editBookController.editBook(db)
const getBook = new getBookController.getBook(db)

const router = new Router();
router.post('/book', addBookToCatalog);
router.get('/book', getBookFromCatalog);
router.put('/book', editBookInCatalog);


async function addBookToCatalog(ctx, next) {
    try {

        let result = await addBook.insertBook(ctx.request.body)
        ctx.body = {
            error: false,
            code: 200,
            data: {
                success: true,
                id: result
            }
        };
        next()
    } catch (err) {
        errorHandle(err)(ctx);
    }
}

async function editBookInCatalog(ctx, next) {
    try {

        let result = await editBook.editBookData(ctx.request.body)
        ctx.body = {
            error: false,
            code: 200,
            data: {
                success: true,
                changedRows: result
            }
        };
        next()
    } catch (err) {
        errorHandle(err)(ctx);
    }
}

async function getBookFromCatalog(ctx, next) {
    try {

        let result = await getBook.getBookData(ctx.request.query)
        ctx.body = {
            error: false,
            code: 200,
            data: result
        };
        next()
    } catch (err) {
        errorHandle(err)(ctx);
    }
}

const errorHandle = (err) => (ctx) => {
    ctx.status = err.status || 500;

    ctx.body = {
        status: err.status || 500,
        message: err.message
    }
    ctx.app.emit('error', err, ctx);
};




module.exports = router