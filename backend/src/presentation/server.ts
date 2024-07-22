import { envs } from "../config/plugins";
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

import express from 'express';
import cors from 'cors';
import AppRoutes from "../interfaces/http/routes/app.routes";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

export class Server {

    public static start() {

        try {

            const app = express();
            app.use(cors());
            app.use(express.json());

            app.get('/', (_,res) => {
                res.send('Welcome to danmcode Access API');
            });

            app.listen(envs.PORT, ()=>{
                console.log(`App started on http://localhost:${envs.PORT}`);
            });

            new AppRoutes(app);

            const log = new LogEntity({
                message: `Starting server at port: ${envs.PORT}`,
                level: LogSeverityLevel.low,
                origin: 'server.ts',
            });

            fileSystemLogRepository.saveLog(log);
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.low,
                origin: 'server.ts',
            });

            fileSystemLogRepository.saveLog(log);
        }

    }

}