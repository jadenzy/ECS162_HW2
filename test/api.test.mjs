import { expect } from 'chai';
import sinon from 'sinon';
import { fetchArticles } from '../src/lib/api.js';
import fetch from 'node-fetch';

global.fetch = fetch;

describe('fetchArticles', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('returns 9 articles', async () => {
    const mockDocs = Array.from({ length: 12 }, (_, i) => ({ id: i }));
    fetchStub.resolves({
      ok: true,
      json: async () => ({ response: { docs: mockDocs } }),
    });

    const result = await fetchArticles('fake-key');
    expect(result.articles.length).to.greaterThan(0);
  });
});
