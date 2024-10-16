import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import * as dotenv from 'dotenv';
import PersonalExpenseRoutes from './routes/PersonalExpenseRoutes';
import BusinessExpenseRoutes from './routes/BusinessExpenseRoutes';

dotenv.config();

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/personal-expense', PersonalExpenseRoutes);
        this.app.use('/api/business-expense', BusinessExpenseRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();