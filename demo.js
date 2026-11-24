/* DEMO DATA ONLY.
   Every runner, run, ranking and number in this file is invented for the
   design preview. None of it is real and none of it is verified.
   When Supabase is connected, js/services/index.js stops reading this file. */
RC.demo = {
  cities: ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur', 'Nagaon', 'Tinsukia', 'Sivasagar'],

  levels: {
    Starter: 'New to running or coming back. Short goals, no pressure on pace.',
    Steady: 'Running most weeks. Goals that reward showing up.',
    Pro: 'High-mileage runners chasing big numbers.'
  },

  // pace = seconds per km
  runners: [
    { id: 'r1', name: 'Dipankar Bora', initials: 'DB', city: 'Guwahati', hue: 82, level: 'Pro', weeklyKm: 63.4, weeklyRuns: 6, monthKm: 201.6, monthRuns: 19, pace: 292, streak: 21, badges: 5 },
    { id: 'r2', name: 'Rimjhim Saikia', initials: 'RS', city: 'Guwahati', hue: 96, level: 'Pro', weeklyKm: 58.1, weeklyRuns: 6, monthKm: 184.9, monthRuns: 18, pace: 310, streak: 14, badges: 4 },
    { id: 'r3', name: 'Mridul Hazarika', initials: 'MH', city: 'Dibrugarh', hue: 120, level: 'Pro', weeklyKm: 55.7, weeklyRuns: 5, monthKm: 188.3, monthRuns: 16, pace: 303, streak: 9, badges: 4 },
    { id: 'r4', name: 'Nandini Gogoi', initials: 'NG', city: 'Jorhat', hue: 150, level: 'Steady', weeklyKm: 51.2, weeklyRuns: 6, monthKm: 172.4, monthRuns: 17, pace: 328, streak: 17, badges: 3 },
    { id: 'r5', name: 'Pranjal Das', initials: 'PD', city: 'Tezpur', hue: 70, level: 'Steady', weeklyKm: 49.8, weeklyRuns: 5, monthKm: 160.2, monthRuns: 15, pace: 315, streak: 6, badges: 3 },
    { id: 'r6', name: 'Bhaskar Kalita', initials: 'BK', city: 'Nagaon', hue: 105, level: 'Steady', weeklyKm: 46.3, weeklyRuns: 5, monthKm: 143.5, monthRuns: 15, pace: 341, streak: 8, badges: 2 },
    { id: 'r7', name: 'Ankita Baruah', initials: 'AB', city: 'Silchar', hue: 135, level: 'Steady', weeklyKm: 44.0, weeklyRuns: 5, monthKm: 149.7, monthRuns: 14, pace: 336, streak: 11, badges: 3 },
    { id: 'r8', name: 'Jyotirmoy Phukan', initials: 'JP', city: 'Tinsukia', hue: 88, level: 'Steady', weeklyKm: 41.5, weeklyRuns: 4, monthKm: 131.0, monthRuns: 13, pace: 322, streak: 5, badges: 2 },
    { id: 'r9', name: 'Priyanka Deka', initials: 'PK', city: 'Guwahati', hue: 160, level: 'Starter', weeklyKm: 38.9, weeklyRuns: 5, monthKm: 114.6, monthRuns: 14, pace: 362, streak: 10, badges: 2 },
    { id: 'r10', name: 'Manash Neog', initials: 'MN', city: 'Sivasagar', hue: 112, level: 'Starter', weeklyKm: 36.2, weeklyRuns: 4, monthKm: 118.8, monthRuns: 12, pace: 355, streak: 4, badges: 1 },
    { id: 'r11', name: 'Simanta Borah', initials: 'SB', city: 'Dibrugarh', hue: 78, level: 'Starter', weeklyKm: 33.6, weeklyRuns: 4, monthKm: 92.7, monthRuns: 11, pace: 370, streak: 3, badges: 1 },
    { id: 'r12', name: 'Rahul Choudhury', initials: 'RC', city: 'Silchar', hue: 140, level: 'Starter', weeklyKm: 30.1, weeklyRuns: 4, monthKm: 99.4, monthRuns: 11, pace: 378, streak: 2, badges: 1 }
  ],

  // The signed-in experience is previewed with this invented profile.
  me: { id: 'me', name: 'Anamika Dutta', initials: 'AD', city: 'Guwahati', hue: 94, level: 'Steady', weeklyRuns: 5, pace: 348 },

  // Mon 16 – Sun 22 Nov 2026 (matches the activity list below: 36.6 km)
  myWeek: [
    { d: 'Mon', km: 5.2 }, { d: 'Tue', km: 0 }, { d: 'Wed', km: 6.8 }, { d: 'Thu', km: 4.5 },
    { d: 'Fri', km: 0 }, { d: 'Sat', km: 12.0 }, { d: 'Sun', km: 8.1 }
  ],
  myProgress: [
    { challengeId: 'm-nov-80', done: 52.4, unit: 'km' },
    { challengeId: 'w-sunrise-21', done: 0, unit: 'km' }
  ],
  myActivities: [
    { id: 'a1', date: '2026-11-22', km: 8.1, time: '0:47:00', source: 'Strava screenshot', challenge: 'November 80K', status: 'pending' },
    { id: 'a2', date: '2026-11-21', km: 12.0, time: '1:09:36', source: 'GPX file', challenge: 'November 80K', status: 'pending' },
    { id: 'a3', date: '2026-11-19', km: 4.5, time: '0:26:06', source: 'Phone screenshot', challenge: 'November 80K', status: 'info', note: 'Screenshot is cropped. Add the full screen.' },
    { id: 'a4', date: '2026-11-18', km: 6.8, time: '0:39:26', source: 'Garmin export', challenge: 'November 80K', status: 'pending' }
  ],
  myBadges: [
    { mark: '5×', label: 'Streak 5', sub: 'Five days in a row', earned: true },
    { mark: '21', label: 'Sunrise 21', sub: '21 km in a challenge week', earned: true },
    { mark: '80', label: 'November 80', sub: 'Finish November 80K', earned: false },
    { mark: '100', label: 'Century', sub: '100 km in a month', earned: false }
  ],

  challenges: [
    {
      id: 'w-sunrise-21', kind: 'weekly', featured: true, title: 'Sunrise 21K',
      goal: { value: '21', unit: 'KM' }, start: '2026-11-23', end: '2026-11-29', level: 'Steady',
      counts: 'Total distance',
      blurb: 'Stack 21 km across the week. Any pace, any route, any time of day. Early starters welcome.',
      rules: [
        'Cover a combined 21 km between Monday 00:00 and Sunday 23:59 IST.',
        'Single runs under 1 km do not count.',
        'Every run needs proof: a screenshot or a GPX/FIT file.',
        'Runs count only after review. Review is planned and is not live in this preview.'
      ]
    },
    {
      id: 'w-weekend-10', kind: 'weekly', title: 'Weekend 10K Double',
      goal: { value: '10', unit: 'KM' }, start: '2026-11-28', end: '2026-11-29', level: 'Starter',
      counts: 'Total distance',
      blurb: 'Ten kilometres over one weekend. One long run or two short ones, your call.',
      rules: [
        'Cover a combined 10 km between Saturday 00:00 and Sunday 23:59 IST.',
        'Treadmill runs count with a clear screenshot of the final screen.',
        'Every run needs proof.'
      ]
    },
    {
      id: 'w-streak-5', kind: 'weekly', title: 'Five-Day Streak',
      goal: { value: '5', unit: 'DAYS' }, start: '2026-11-23', end: '2026-11-29', level: 'Steady',
      counts: 'Days with a 3 km+ run',
      blurb: 'Run at least 3 km on five different days this week. Consistency beats one big day.',
      rules: [
        'Five separate calendar days (IST) with at least 3 km each.',
        'Two runs on one day count as one day.',
        'Every run needs proof.'
      ]
    },
    {
      id: 'm-nov-80', kind: 'monthly', title: 'November 80K',
      goal: { value: '80', unit: 'KM' }, start: '2026-11-01', end: '2026-11-30', level: 'Steady',
      counts: 'Total distance',
      blurb: 'Eighty kilometres across the month. About 2.7 km a day, or a few longer runs.',
      rules: [
        'Combined distance from 1 to 30 November, IST.',
        'Runs under 1 km do not count.',
        'Every run needs proof.'
      ]
    },
    {
      id: 'm-dec-100', kind: 'monthly', title: 'December 100K',
      goal: { value: '100', unit: 'KM' }, start: '2026-12-01', end: '2026-12-31', level: 'Steady',
      counts: 'Total distance',
      blurb: 'A hundred kilometres to close the year. Cool mornings do half the work.',
      rules: [
        'Combined distance from 1 to 31 December, IST.',
        'Runs under 1 km do not count.',
        'Every run needs proof.'
      ]
    },
    {
      id: 'm-dec-20', kind: 'monthly', title: 'Consistency Club 20',
      goal: { value: '20', unit: 'ACTIVE DAYS' }, start: '2026-12-01', end: '2026-12-31', level: 'Starter',
      counts: 'Active days with 2 km+',
      blurb: 'Show up on twenty days. Two kilometres is enough. Pace does not matter here.',
      rules: [
        'Twenty calendar days (IST) with at least 2 km each.',
        'Walk-run intervals are fine if the total distance is logged.',
        'Every run needs proof.'
      ]
    },
    {
      id: 'm-dec-150', kind: 'monthly', title: 'Century Plus 150K',
      goal: { value: '150', unit: 'KM' }, start: '2026-12-01', end: '2026-12-31', level: 'Pro',
      counts: 'Total distance',
      blurb: 'One hundred and fifty kilometres in a month for runners who already log big weeks.',
      rules: [
        'Combined distance from 1 to 31 December, IST.',
        'Runs under 2 km do not count.',
        'Every run needs proof, and reviewers may ask for the original file.'
      ]
    }
  ],

  steps: [
    { n: 1, icon: 'flag', title: 'Join a challenge', short: 'Pick a weekly or monthly challenge that fits your level. Free during beta.',
      detail: 'Every challenge lists its goal, dates and rules up front. Starter, Steady and Pro levels give every pace a place. There is no entry fee.' },
    { n: 2, icon: 'route', title: 'Run your way', short: 'Your streets, your schedule. Road, trail or treadmill.',
      detail: 'Run wherever you are in Assam or anywhere in India, with a watch or a phone app. Treadmill runs are allowed when the final screen is clear in your proof.' },
    { n: 3, icon: 'upload', title: 'Submit your run', short: 'Add distance, time and proof from your watch or running app.',
      detail: 'Enter the date, distance and time, then attach a screenshot or a GPX/FIT file. Proof files are planned to sit in private storage that only you and reviewers can open.' },
    { n: 4, icon: 'shield', title: 'Get reviewed, get ranked', short: 'Reviewers check each run against the rules. Reviewed runs count.',
      detail: 'Each submission is checked against the challenge rules. Runs move through Pending, Needs info, Accepted or Not accepted. Only accepted runs count on the leaderboard.' }
  ],

  rewards: [
    { id: 'badges', icon: 'medal', title: 'Challenge badges', status: 'Planned for beta', tone: 'amber',
      text: 'Hit a challenge goal and the badge is yours. Every runner who reaches the number gets it.' },
    { id: 'certs', icon: 'file', title: 'Finisher certificates', status: 'Planned for beta', tone: 'amber',
      text: 'A shareable digital certificate after you complete a monthly challenge.' },
    { id: 'top10', icon: 'trophy', title: 'Top 10 recognition', status: 'Planned for beta', tone: 'amber',
      text: 'Weekly and monthly Top 10 runners get a profile highlight and a Top 10 badge.' },
    { id: 'gear', icon: 'bolt', title: 'Partner gear', status: 'Exploring', tone: 'neutral',
      text: 'We are talking to local running stores and brands about gear for top finishers. Nothing is confirmed yet.' }
  ],

  medals: [
    { mark: '21', label: 'Sunrise 21', sub: '21 km in one challenge week' },
    { mark: '5×', label: 'Streak 5', sub: 'Five active days in one week' },
    { mark: '80', label: 'November 80', sub: 'Finish November 80K' },
    { mark: '100', label: 'Century', sub: '100 km in one month' },
    { mark: '150', label: 'Century Plus', sub: '150 km in one month' },
    { mark: 'T10', label: 'Top 10', sub: 'Finish a board in the top ten' }
  ],

  faq: [
    ['Is Runner\'s Club really free?', 'Yes. The beta is free. There are no entry fees, memberships or payments of any kind.'],
    ['Do I need a GPS watch?', 'No. A phone running app works. Treadmill runs are allowed when the final screen is clear in your proof.'],
    ['How are rewards decided?', 'By your results against the published rules of each challenge. There are no lucky draws or raffles.'],
    ['Is anything on this site verified?', 'No. This is a design preview. Every runner, run and ranking is DEMO DATA. The review process is planned and is not running yet.'],
    ['Can beginners join?', 'Yes. Starter challenges are built for new runners and anyone coming back after a break.'],
    ['Which cities can take part?', 'Assam first. The beta is aimed at runners across Assam, with more of India planned after that.']
  ]
};
