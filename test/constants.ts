import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from '@/tembre/auth/auth.module';
import { UserModule } from '@/tembre/user/user.module';
import { EventModule } from '@/tembre/event/event.module';
import { ParticipantModule } from '@/tembre/participant/participant.module';
import { FeedbackModule } from '@/tembre/feedback/feedback.module';

export const database = process.env.MONGO_URI_DEV;

export const imports = [
    MongooseModule.forRoot(database),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
        rootPath: path.join(__dirname, '..', 'public'),
        exclude: ['/api/(.*)'],
    }),
    AuthModule,
    UserModule,
    EventModule,
    ParticipantModule,
    FeedbackModule,
];
