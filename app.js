const config = require('config');
const helmet = require('helmet');
const Joi = require('joi');
const Logger = require('./logger');
const express = require('express');
const chalk = require('chalk');
const commonDebug = require('debug')('app:common');
const dbDebug = require('debug')('app:db');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

console.log(`Node Env: ${process.env.NODE_ENV}`);
console.log(`App Env: ${app.get('env')}`);

console.log(chalk.blue('Application name: ') + chalk.green(config.get('name')));
console.log(chalk.blue('Application mail: ') + chalk.green(config.get('mail.host')));
console.log(chalk.blue('Mail password: ') + chalk.green(config.get('mail.password')));

commonDebug('ENV controlled debugger...');
dbDebug('DB connected...');

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log(`${chalk.green('Morgan loaded...')}`);
}

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
// app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const courses = [{
        id: 1,
        name: 'Course 1'
    },
    {
        id: 2,
        name: 'Course 2'
    },
    {
        id: 3,
        name: 'Course 3'
    }
]

bookRouter.route('/')
    .get((req, res) => {
        res.render('books', {
            title: 'My Books',
            links: [{
                path: '/books',
                title: 'Books'
            }, {
                path: '/authors',
                title: 'Authors'
            }]
        });
    });

bookRouter.route('/one')
    .get((req, res) => {
        res.render('index', {
            title: 'Book One',
            links: [{
                path: '/books',
                title: 'Books'
            }, {
                path: '/authors',
                title: 'Authors'
            }]
        });
    });

bookRouter.route('/single')
    .get((req, res) => {
        res.send('Hello Single Book');
    });

app.use('/books', bookRouter);

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', {
        title: 'My Directory',
        links: [{
            path: '/books',
            title: 'Books'
        }, {
            path: '/authors',
            title: 'Authors'
        }]
    });
});

app.listen(port, () => {
    // console.log(module);
    console.log(__dirname);
    console.log(`listening on port - ${chalk.green(port)}`);
    // console.log(`listening on port ${chalk.red('3000')}`);
});



// const path = require('path');
// const os = require('os');
// const fs = require('fs');
// const EventEmitter = require('events');

// // Path module
// var pathObject = path.parse(__filename);
// // console.log(pathObject);

// // OS module
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// // console.log(`Total memory: ${totalMemory / (1024 * 1024 * 1024)} GB`);
// // console.log(`Free memory: ${freeMemory / (1024 * 1024 * 1024)} GB`);

// // FS module
// const files = fs.readdirSync('./');
// // console.log(files);

// fs.readdir('./', function(err, files) {
//     if (err) console.log(err);
//     // else console.log('Result', files)
// });


// // Raise: logging (data: message)
// const Logger = require('./logger');
// const logger = new Logger();

// //Register a listner
// logger.on('messageLogged', (arg) => {
//     console.log('listener called', arg);
// });

// // logger.log('message');


// // HTTP module

// const http = require('http');
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello World');
//         res.end();
//     }

//     if (req.url === '/api/courses') {
//         res.write(JSON.stringify([1, 2, 3]));
//         res.end();
//     }
// });

// server.on('connection', (socket) => {
//     console.log('New connection');
// });
// server.listen(3000);

// console.log('listening on port 3000...');