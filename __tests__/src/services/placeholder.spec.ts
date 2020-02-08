import test from 'ava';
import sinon from 'sinon';
import knexClient from 'knex';
import { getTracker, mock, unmock } from 'mock-knex';

const tracker = getTracker();
const knex = knexClient({
  client: 'mysql',
});

test.beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock(knex as any);
  tracker.install();
});

test.afterEach(() => {
  tracker.uninstall();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unmock(knex as any);
  sinon.restore();
});

test('placeholder (Happy)', t => {
  t.is(1, 1);
});
