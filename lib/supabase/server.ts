const emptyResult = { data: [], error: null, count: 0, status: 200, statusText: 'OK' };
const nullResult = { data: null, error: null, status: 200, statusText: 'OK' };

function mockTable() {
  const p = Promise.resolve(emptyResult);
  return Object.assign(p, {
    select: () => mockTable(),
    order: () => mockTable(),
    eq: () => mockTable(),
    neq: () => mockTable(),
    in: () => mockTable(),
    gte: () => mockTable(),
    lte: () => mockTable(),
    limit: () => mockTable(),
    range: () => mockTable(),
    single: () => Promise.resolve(nullResult),
    maybeSingle: () => Promise.resolve(nullResult),
    insert: () => {
      const r = Promise.resolve(nullResult);
      return Object.assign(r, {
        select: () => ({
          single: () => Promise.resolve({ data: { id: 'mock-id' }, error: null, status: 201 }),
        }),
      });
    },
    update: () => {
      const r = Promise.resolve(nullResult);
      return Object.assign(r, { eq: () => Promise.resolve(nullResult) });
    },
    delete: () => {
      const r = Promise.resolve(nullResult);
      return Object.assign(r, { eq: () => Promise.resolve(nullResult) });
    },
  });
}

let warned = false;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (url && key) {
    try {
      const mod = require('@supabase/supabase-js');
      return mod.createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
    } catch {
      if (!warned) { warned = true; }
    }
  } else if (!warned) {
    warned = true;
  }

  return { from: () => mockTable() };
}
