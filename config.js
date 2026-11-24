/* RUNNER'S CLUB — app configuration.
   One place to switch data sources later. Nothing here is a secret:
   when Supabase is connected, only the public URL and anon key belong here. */
window.RC = window.RC || {};
RC.config = {
  name: "RUNNER'S CLUB",
  tagline: 'RUN MORE. WIN MORE.',
  beta: true,
  // 'demo'     = static sample data from js/data/demo.js (current)
  // 'supabase' = real auth, Postgres and private storage (not built yet)
  dataSource: 'demo',
  supabase: { url: null, anonKey: null },
  contactEmail: 'hello@runnersclub.example', // placeholder until launch
  region: 'Assam, India'
};
RC.pages = {};
