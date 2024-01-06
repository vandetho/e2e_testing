import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { CreateUserDTO } from '@/tembre/user/dto/create-user.dto';
import { CreateFeedbackDto } from '@/tembre/feedback/dto/create-feedback.dto';
import { database, imports } from './constants';
import * as path from 'path';
import { existsSync, rmSync } from 'fs';

beforeAll(async () => {
    await mongoose.connect(database);
    await mongoose.connection.db.dropDatabase();
    const uploadPath = path.join(`${__dirname}/../public`, process.env.FEEDBACK_IMAGE_FOLDER);
    if (existsSync(uploadPath)) {
        rmSync(uploadPath, { recursive: true, force: true });
    }
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Feedback (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports,
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/feedbacks (GET) 200 Without feedback', () => {
        return request(app.getHttpServer())
            .get('/api/feedbacks')
            .set('Accept', 'application/json')
            .expect(({ body }) => {
                expect(body).toHaveLength(0);
            })
            .expect(HttpStatus.OK);
    });

    const createFeedbackDto: CreateFeedbackDto = {
        name: faker.person.fullName(),
        content: faker.lorem.text(),
    };

    it('/api/feedbacks (POST) 201 Without User', () => {
        return request(app.getHttpServer())
            .post('/api/feedbacks')
            .set('Accept', 'application/json')
            .send(createFeedbackDto)
            .expect(({ body }) => {
                expect(body.name).toEqual(createFeedbackDto.name);
                expect(body.content).toEqual(createFeedbackDto.content);
                expect(body.user).toBeUndefined();
            })
            .expect(HttpStatus.CREATED);
    });

    it('/api/feedbacks (GET) 200 with 1', () => {
        return request(app.getHttpServer())
            .get('/api/feedbacks')
            .set('Accept', 'application/json')
            .expect(({ body }) => {
                expect(body).toHaveLength(1);
            })
            .expect(HttpStatus.OK);
    });

    const email = faker.internet.email();
    const password = faker.internet.password();

    const user: CreateUserDTO = {
        email,
        password,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    };

    let jwtToken: string = undefined;

    it('/api/sign-up (POST) 201', () => {
        return request(app.getHttpServer())
            .post('/api/sign-up')
            .set('Accept', 'application/json')
            .send(user)
            .expect(({ body }) => {
                jwtToken = body.accessToken;

                expect(body.accessToken).toBeDefined();
                expect(body.refreshToken).toBeDefined();
                expect(body.user.email).toEqual(user.email);
                expect(body.user.emailCanonical).toEqual(user.email.toLowerCase());
                expect(body.user.firstName).toEqual(user.firstName);
                expect(body.user.lastName).toEqual(user.lastName);
                expect(body.user.password).toBeUndefined();
            })
            .expect(HttpStatus.CREATED);
    });

    const createFeedbackDtoWithUser: CreateFeedbackDto = {
        name: faker.person.fullName(),
        content: faker.lorem.text(),
    };

    it('/api/feedbacks (POST) 201 With User', () => {
        return request(app.getHttpServer())
            .post('/api/feedbacks')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(createFeedbackDtoWithUser)
            .expect(({ body }) => {
                expect(body.name).toEqual(createFeedbackDtoWithUser.name);
                expect(body.content).toEqual(createFeedbackDtoWithUser.content);
                expect(body.user.email).toEqual(user.email);
                expect(body.user.emailCanonical).toEqual(user.email.toLowerCase());
                expect(body.user.firstName).toEqual(user.firstName);
                expect(body.user.lastName).toEqual(user.lastName);
                expect(body.user.password).toBeUndefined();
            })
            .expect(HttpStatus.CREATED);
    });

    it('/api/feedbacks (GET) 200 with 2', () => {
        return request(app.getHttpServer())
            .get('/api/feedbacks')
            .set('Accept', 'application/json')
            .expect(({ body }) => {
                expect(body).toHaveLength(2);
            })
            .expect(HttpStatus.OK);
    });
});
