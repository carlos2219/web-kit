import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ROUTES, matchRoute } from './router.js'

test('every route matches itself, with trailing slash and any case', () => {
  for (const path of Object.keys(ROUTES)) {
    assert.equal(matchRoute(path), path)
    assert.equal(matchRoute(path.toUpperCase() + '/'), path)
  }
})

test('unknown paths return null', () => {
  assert.equal(matchRoute('/no-existe'), null)
  assert.equal(matchRoute('/index.html'), null)
})
