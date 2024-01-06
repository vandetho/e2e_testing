import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { database, imports } from './constants';
import { CreateFeedbackDto } from '../src/feedback/dto/create-feedback.dto';

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
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

  it('/api/feedbacks (POST) 201', () => {
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
});
