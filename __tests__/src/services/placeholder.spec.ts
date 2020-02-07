import test from 'ava';
import sinon from 'sinon';
import knexClient from 'knex';
import { QueryDetails, getTracker, mock, unmock } from 'mock-knex';

const tracker = getTracker();
const knex = knexClient({
  client: 'mysql',
});

test.beforeEach(() => {
  mock(knex as any);
  tracker.install();
});

test.afterEach(() => {
  tracker.uninstall();
  unmock(knex as any);
  sinon.restore();
});

test('placeholder (Happy)', async t => {
  t.is(1, 1);
});
