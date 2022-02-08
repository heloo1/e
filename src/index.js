var express = require('express');
var methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');

const SortMiddleware = require('./app/middleware/SortMiddleware');
// connect db
db.connect();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
//http logger morgan
app.use(morgan('combined'));
//template engine

app.use(methodOverride('_method'));

app.use(SortMiddleware);
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'bi bi-chevron-contract',
                    desc: 'bi bi-sort-down',
                    asc: 'bi bi-sort-down-alt',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];

                return ` <a href="?_sort&column=${field}&type=${type}">
               <i class="${icon}"></i>
              
                        </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
