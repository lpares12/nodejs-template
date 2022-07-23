'use strict';

const mongoose = require('mongoose');

const dbHandler = require('../dbSetup');

const userModel = require('../../src/user/models/user.js');
const authTokenModel = require('../../src/user/models/authToken.js');
const userRepo = require('../../src/user/repository.js');

beforeAll(async () => { await dbHandler.connect() });
afterEach(async () => { await dbHandler.clearDatabase() });
afterAll(async () => { await dbHandler.closeDatabase() });

describe('userRepositoryAuthentication', () => {
  it('Can authenticate with email', async() => {
    await expect(userRepo.save(createData)).resolves.not.toThrow();
    const now = new Date();

    const data = await userRepo.authenticate(emailLoginData);
    expect(data.user.lastLogin.getTime()).toBeGreaterThan(now.getTime());
    expect(data.user.password).toEqual(null);

    expect(data.authToken).not.toEqual(null);

    var nDocs = await authTokenModel.countDocuments();
    expect(nDocs).toEqual(1);
    var authDoc = await authTokenModel.findOne({userId: data.user._id});
    expect(authDoc.createdAt.getTime()).toBeGreaterThan(now.getTime());
  });

  it('Can authenticate with username', async() => {
    await expect(userRepo.save(createData)).resolves.not.toThrow();
    const now = new Date();

    const data = await userRepo.authenticate(usernameLoginData);
    expect(data.user.lastLogin.getTime()).toBeGreaterThan(now.getTime());
    expect(data.user.password).toEqual(null);

    expect(data.authToken).not.toEqual(null);

    var nDocs = await authTokenModel.countDocuments();
    expect(nDocs).toEqual(1);
    var authDoc = await authTokenModel.findOne({userId: data.user._id});
    expect(authDoc.createdAt.getTime()).toBeGreaterThan(now.getTime());
  });

  it('Non existing email', async() => {
    await expect(userRepo.save(createData)).resolves.not.toThrow();

    await expect(userRepo.authenticate(unexistingEmailData)).rejects.toThrow("Invalid username or password");
  });

  it('Non existing username', async() => {
    await expect(userRepo.save(createData)).resolves.not.toThrow();

    await expect(userRepo.authenticate(unexistingUsernameData)).rejects.toThrow("Invalid username or password");
  });

  it('Incorrect password', async() => {
    await expect(userRepo.save(createData)).resolves.not.toThrow();

    await expect(userRepo.authenticate(incorrectPassword)).rejects.toThrow("Invalid username or password");
  });

  it('Empty data', async() => {
    await expect(userRepo.save(createData)).resolves.not.toThrow();

    await expect(userRepo.authenticate()).rejects.toThrow("Cannot read properties of undefined (reading 'username')");
    await expect(userRepo.authenticate({})).rejects.toThrow("Invalid username or password");
    await expect(userRepo.authenticate({'username': 'hello'})).rejects.toThrow("Invalid username or password");
    await expect(userRepo.authenticate({'password': 'hello'})).rejects.toThrow("Invalid username or password");
  });
});

var trialEnd = new Date();
trialEnd.setDate(trialEnd.getDate() + parseInt(process.env.TRIAL_DAYS));

const createData = {
  'email': 'test@test.com',
  'username': 'tester',
  'password': 'Tester23+',
  'subscriptionEndDate': trialEnd,
};

const emailLoginData = {
  'username': 'test@test.com',
  'password': 'Tester23+',
};

const usernameLoginData = {
  'username': 'tester',
  'password': 'Tester23+',
};

const incorrectPassword = {
  'username': 'tester',
  'password': 'Tester23',
};

const unexistingEmailData = {
  'username': 'hello@hello.com',
  'password': 'Tester23+',
};

const unexistingUsernameData = {
  'username': 'hello',
  'password': 'Tester23+',
};
