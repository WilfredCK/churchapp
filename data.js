'use strict';
/* ALL DATA BELOW IS FICTIONAL DEMO DATA. Not official church records. */
const NOW = new Date();
const dt = (n, h = 9, m = 0) => { const d = new Date(NOW); d.setDate(d.getDate() + n); d.setHours(h, m, 0, 0); return d.toISOString(); };
const pick = (a, i) => a[Math.abs(i) % a.length];

const CREDS = [
  { code: 'MEM10045', pw: 'demo1234', role: 'member' },
  { code: 'MEM10046', pw: 'demo1234', role: 'member' },
  { code: 'ADM001', pw: 'admin1234', role: 'super' },
  { code: 'ADM002', pw: 'admin1234', role: 'admin' },
  { code: 'TRS001', pw: 'admin1234', role: 'treasurer' },
  { code: 'PST001', pw: 'admin1234', role: 'pastor' }
];

const ROLES = {
  member: { label: 'Member', perms: [] },
  super: { label: 'Super Administrator', perms: ['*'] },
  admin: { label: 'Church Administrator', perms: ['members', 'announcements', 'events', 'leadership', 'groups', 'sermons', 'documents', 'notifications', 'attendance', 'volunteers', 'reports', 'audit', 'settings', 'alerts'] },
  treasurer: { label: 'Treasurer', perms: ['giving', 'pledges', 'reports'] },
  pastor: { label: 'Pastor', perms: ['members', 'prayers', 'confidential', 'attendance', 'volunteers', 'groups', 'reports', 'alerts'] }
};

const FUNDS = [
  { id: 'tithes', name: 'Tithes', icon: '🙏' },
  { id: 'sunday', name: 'Sunday Offerings', icon: '🕊️' },
  { id: 'thanks', name: 'Thanksgiving', icon: '🎁' },
  { id: 'building', name: 'Building Fund', icon: '🏛️' },
  { id: 'missions', name: 'Missions', icon: '🌍' },
  { id: 'youth', name: 'Youth Ministry', icon: '🎸' },
  { id: 'welfare', name: 'Welfare', icon: '🤝' },
  { id: 'special', name: 'Special Projects', icon: '⭐' }
];

const VERSES = [
  { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', note: 'God’s love is not distant. It moved toward us. Today, rest in being loved and share that love with one person.' },
  { ref: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.', note: 'A shepherd provides, guides and protects. Name one area where you need to trust His care today.' },
  { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', note: 'Strength is received, not manufactured. Ask for the strength you need for today’s task.' },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', note: 'Surrender your plan for today in prayer, then walk forward with open hands.' },
  { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', note: 'Fear loses its grip when we remember who is with us. Speak this verse over your day.' },
  { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', note: 'Even difficult chapters are held in God’s hands. Thank Him for one thing He is working on.' },
  { ref: 'Joshua 1:9', text: 'Have not I commanded thee? Be strong and good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', note: 'Courage is obedience with God beside you. What step is He asking you to take?' }
];

/* ---- members ---- */
const MEMBER_ROWS = [
  ['Collin Wilfred', 'MEM10045', '+255 700 000 045', 'collin.w@example.com', 'Active', 'g1', -900],
  ['Neema Joseph', 'MEM10046', '+255 700 000 046', 'neema.j@example.com', 'Active', 'g2', -700],
  ['John Mwangi', 'MEM10012', '+255 700 000 012', 'john.m@example.com', 'Active', 'g1', -2100],
  ['Grace Mushi', 'MEM10020', '+255 700 000 020', 'grace.m@example.com', 'Active', 'g1', -1500],
  ['Peter Kileo', 'MEM10031', '+255 700 000 031', 'peter.k@example.com', 'Active', 'g3', -1100],
  ['Esther Lyimo', 'MEM10033', '+255 700 000 033', 'esther.l@example.com', 'Active', 'g2', -800],
  ['Daudi Massawe', 'MEM10050', '+255 700 000 050', 'daudi.m@example.com', 'Inactive', 'g4', -400],
  ['Rehema Shirima', 'MEM10052', '+255 700 000 052', 'rehema.s@example.com', 'Active', 'g3', -300],
  ['Samuel Ndege', 'MEM10060', '+255 700 000 060', 'samuel.n@example.com', 'Active', 'g4', -200],
  ['Lucy Mrema', 'MEM10061', '+255 700 000 061', 'lucy.m@example.com', 'Active', 'g1', -120],
  ['Baraka Temba', 'MEM10070', '+255 700 000 070', 'baraka.t@example.com', 'Active', 'g2', -60],
  ['Joyce Kimaro', 'MEM10071', '+255 700 000 071', 'joyce.k@example.com', 'Active', 'g1', -30],
  ['Admin User', 'ADM001', '+255 700 000 001', 'admin@faithcommunity.example', 'Active', '', -3000],
  ['Office Admin', 'ADM002', '+255 700 000 002', 'office@faithcommunity.example', 'Active', '', -2000],
  ['Treasurer Sara', 'TRS001', '+255 700 000 003', 'treasurer@faithcommunity.example', 'Active', '', -2500],
  ['Pastor David', 'PST001', '+255 700 000 004', 'pastor.d@faithcommunity.example', 'Active', '', -3500]
];
const members = MEMBER_ROWS.map((r, i) => ({ id: 'm' + i, name: r[0], code: r[1], phone: r[2], email: r[3], status: r[4], jumuiya: r[5], joined: dt(r[6]), ministries: i % 2 ? ['Choir'] : ['Ushering', 'Prayer Team'], address: 'Dar es Salaam (fictional)' }));

const groups = [
  { id: 'g1', name: 'Emmanuel Jumuiya', leader: 'John Mwangi', assistant: 'Grace Mushi', venue: 'Mwangi Residence, Mikocheni (fictional)', schedule: 'Thursdays, 6:30 PM', phone: '+255 700 000 012' },
  { id: 'g2', name: 'Bethel Jumuiya', leader: 'Esther Lyimo', assistant: 'Neema Joseph', venue: 'Church Annex Hall', schedule: 'Wednesdays, 6:00 PM', phone: '+255 700 000 033' },
  { id: 'g3', name: 'Shalom Jumuiya', leader: 'Peter Kileo', assistant: 'Rehema Shirima', venue: 'Kileo Residence, Sinza (fictional)', schedule: 'Fridays, 6:30 PM', phone: '+255 700 000 031' },
  { id: 'g4', name: 'Hosanna Jumuiya', leader: 'Samuel Ndege', assistant: 'Daudi Massawe', venue: 'Community Centre, Kinondoni', schedule: 'Tuesdays, 7:00 PM', phone: '+255 700 000 060' }
];

/* ---- announcements ---- */
const ANN_ROWS = [
  ['Special Thanksgiving Service this Sunday', 'Important', 'High', 0, 'Join us for a joyful thanksgiving service this Sunday at 10:30 AM. Bring a testimony and a grateful heart. Children’s ministry will run in parallel.', true, '🙌'],
  ['Annual Conference Registration is Open', 'Events', 'Normal', 1, 'Registration for the Faith & Family Conference is now open. Reserve your seat through the Events page. Early registration closes in two weeks.', true, '🎤'],
  ['Building Extension: Progress Update', 'Important', 'Normal', 2, 'Foundations for the new fellowship hall are complete. Thank you for your faithful giving and pledges. A full report is available in Documents.', true, '🏛️'],
  ['Choir Auditions for New Voices', 'Ministry', 'Normal', 3, 'The Worship Choir is welcoming new singers. Auditions take place after Wednesday prayer meeting. All voices are welcome.', false, '🎶'],
  ['Youth Night Photos Available', 'Ministry', 'Low', 5, 'Photos from last month’s Youth Night are now in the shared album. Thank you to all volunteers who made it special.', false, '📸'],
  ['Mid-week Prayer Meeting Time Change', 'Important', 'High', 6, 'Beginning this week, the mid-week prayer meeting starts at 6:00 PM instead of 6:30 PM.', false, '🕕'],
  ['Women’s Ministry Breakfast', 'Events', 'Normal', 8, 'A warm invitation to all women for a breakfast of fellowship and encouragement. Please RSVP so we can plan the seating.', false, '☕'],
  ['Community Outreach: Clean-up Day', 'Events', 'Normal', 10, 'We will serve our neighbourhood with a clean-up and a free health screening. Volunteers needed from 8:00 AM.', false, '🧹'],
  ['New Members Class Starts Soon', 'Ministry', 'Normal', 12, 'If you recently joined or would like to know more about our church, the New Members Class begins next month.', false, '🤝'],
  ['Church Office Hours', 'General', 'Low', 15, 'The church office is open Monday to Friday, 9:00 AM – 4:00 PM. For urgent pastoral needs, contact the Church Administrator.', false, '🏢'],
  ['Bible Study: Book of Romans', 'Ministry', 'Normal', 18, 'A new study through Romans starts Tuesday evenings. Study guides are available in the Documents Center.', true, '📖'],
  ['Annual General Meeting Notice', 'Important', 'Normal', 22, 'Members are invited to the Annual General Meeting. Agenda and annual report are attached for review.', true, '📋'],
  ['Scheduled: Christmas Choir Concert (draft)', 'Events', 'Normal', -14, 'Save the date for the Christmas Choir Concert. Details to follow.', false, '🎄']
];
const announcements = ANN_ROWS.map((r, i) => ({ id: 'a' + i, title: r[0], cat: r[1], priority: r[2], date: dt(-r[3], 8), body: r[4], attach: r[5], img: r[6], status: r[3] < 0 ? 'Scheduled' : 'Published' }));

/* ---- events ---- */
const EV_ROWS = [
  ['Youth Night: Rise Up', 'Youth Events', -21, 18, 3, 'Main Sanctuary', 'An evening of worship, a short message and games for ages 13–25.', 'Youth Pastor Brian · +255 700 000 090', 150, '🎸'],
  ['Women’s Ministry Breakfast', 'Women\'s Ministry', -9, 9, 2, 'Church Annex Hall', 'Breakfast, fellowship and a testimony session.', 'Mama Grace · +255 700 000 091', 80, '☕'],
  ['Mid-week Prayer Meeting', 'Prayer Meetings', 2, 18, 2, 'Main Sanctuary', 'Corporate prayer for the church, the nation and families.', 'Pastor David · +255 700 000 004', 300, '🙏'],
  ['Thanksgiving Sunday Service', 'Sunday Services', 6, 10, 3, 'Main Sanctuary', 'A special service of thanksgiving with testimonies and communion.', 'Church Office · +255 700 000 100', 600, '🕊️'],
  ['Romans Bible Study', 'Bible Study', 8, 18, 2, 'Church Annex Hall', 'Verse-by-verse study through Paul’s letter to the Romans.', 'Elder Joseph · +255 700 000 092', 60, '📖'],
  ['Faith & Family Conference', 'Conferences', 14, 9, 8, 'Church Grounds & Sanctuary', 'A full-day conference with guest speakers, workshops and worship.', 'Conference Desk · +255 700 000 093', 400, '🎤'],
  ['Neighbourhood Clean-up & Health Screening', 'Community Outreach', 20, 8, 5, 'Sinza Market Area', 'Serving our neighbours with a clean-up and free basic health screening.', 'Outreach Team · +255 700 000 094', 100, '🧹'],
  ['Men’s Fellowship Breakfast', 'Men\'s Ministry', 24, 8, 2, 'Church Annex Hall', 'Breakfast and a talk on faithful fatherhood.', 'Elder Peter · +255 700 000 095', 70, '🍳'],
  ['Building Fund Dinner', 'Fundraising', 33, 18, 3, 'Serena Garden Hall (fictional)', 'A gala dinner to raise support for the fellowship hall extension.', 'Finance Team · +255 700 000 096', 200, '🍽️'],
  ['Choir Practice', 'Choir Practice', 4, 17, 2, 'Choir Room', 'Weekly rehearsal for the Worship Choir.', 'Choir Leader Mary · +255 700 000 097', 40, '🎶'],
  ['Sunday Worship Service', 'Sunday Services', 13, 8, 2, 'Main Sanctuary', 'Our regular Sunday worship service.', 'Church Office · +255 700 000 100', 600, '⛪']
];
const events = EV_ROWS.map((r, i) => { const s = dt(r[2], r[3]); const e = new Date(new Date(s).getTime() + r[4] * 3600000).toISOString(); return { id: 'e' + i, title: r[0], cat: r[1], start: s, end: e, venue: r[5], desc: r[6], organizer: r[7], cap: r[8], img: r[9], baseReg: 20 + i * 11 }; });

/* ---- giving ---- */
const TX_ROWS = [
  ['tithes', 250000, 1, 'M-Pesa', 'Verified', ''], ['sunday', 20000, 1, 'Cash (Office)', 'Verified', ''],
  ['building', 100000, 3, 'Bank Transfer', 'Verified', 'p1'], ['youth', 50000, 5, 'M-Pesa', 'Verified', 'p3'],
  ['missions', 40000, 6, 'Tigo Pesa', 'Verified', 'p2'], ['thanks', 75000, 8, 'M-Pesa', 'Verified', ''],
  ['welfare', 30000, 9, 'Cash (Office)', 'Verified', ''], ['tithes', 250000, 31, 'M-Pesa', 'Verified', ''],
  ['sunday', 15000, 30, 'Cash (Office)', 'Verified', ''], ['building', 75000, 34, 'Bank Transfer', 'Verified', 'p1'],
  ['special', 60000, 36, 'M-Pesa', 'Verified', ''], ['youth', 50000, 40, 'M-Pesa', 'Verified', 'p3'],
  ['missions', 40000, 44, 'Tigo Pesa', 'Verified', 'p2'], ['tithes', 250000, 61, 'M-Pesa', 'Verified', ''],
  ['building', 50000, 64, 'Bank Transfer', 'Verified', 'p1'], ['sunday', 25000, 65, 'Cash (Office)', 'Verified', ''],
  ['thanks', 100000, 70, 'M-Pesa', 'Verified', ''], ['youth', 50000, 72, 'M-Pesa', 'Verified', 'p3'],
  ['missions', 40000, 75, 'Tigo Pesa', 'Verified', 'p2'], ['building', 100000, 95, 'Bank Transfer', 'Verified', 'p1'],
  ['tithes', 250000, 92, 'M-Pesa', 'Verified', ''], ['welfare', 20000, 3, 'M-Pesa', 'Pending', ''],
  ['sunday', 10000, 2, 'Airtel Money', 'Failed', ''], ['tithes', 250000, 122, 'M-Pesa', 'Verified', '']
];
const transactions = TX_ROWS.map((r, i) => ({ id: 'TX-' + (1001 + i), mc: 'MEM10045', fund: r[0], amount: r[1], date: dt(-r[2], 9 + (i % 6), (i * 7) % 60), method: r[3], ref: 'FCC-' + r[3].replace(/[^A-Z]/g, '').slice(0, 2) + '-' + (580200 + i * 37), status: r[4], pledge: r[5], source: 'Demo sample record' }));
const pledges = [
  { id: 'p1', mc: 'MEM10045', title: 'Building Extension Pledge', fund: 'building', total: 500000, start: dt(-120), target: dt(90), instr: 'Pay via M-Pesa Lipa Number (placeholder) using reference MEM10045-BLD, or at the church office.' },
  { id: 'p2', mc: 'MEM10045', title: 'Missions 2026 Pledge', fund: 'missions', total: 300000, start: dt(-80), target: dt(150), instr: 'Give through the Missions fund and quote your member code.' },
  { id: 'p3', mc: 'MEM10045', title: 'Youth Camp Sponsorship', fund: 'youth', total: 150000, start: dt(-80), target: dt(-5), instr: 'Completed. Thank you for sponsoring young people!' }
];

/* ---- sermons ---- */
const SER_ROWS = [
  ['Walking in Faith', 'Pastor David', 'Sunday Services', 1, '48:12'], ['The Power of Prayer', 'Pastor David', 'Bible Study', 3, '36:40'],
  ['Youth: Identity in Christ', 'Brian Mollel', 'Youth Services', 4, '41:05'], ['Songs of Worship – Live', 'Worship Choir', 'Choir & Worship', 6, '52:30'],
  ['Grace That Transforms', 'Pastor David', 'Sunday Services', 8, '45:20'], ['Romans 1: The Gospel Defined', 'Elder Joseph', 'Bible Study', 10, '58:00'],
  ['Conference Keynote: Family Altars', 'Guest Speaker Rev. Anna', 'Conferences', 15, '1:12:44'], ['Generosity of the Heart', 'Pastor David', 'Sunday Services', 15, '44:18'],
  ['Hope in Hard Seasons', 'Pastor David', 'Sunday Services', 22, '47:09'], ['Youth: Purpose and Purity', 'Brian Mollel', 'Youth Services', 25, '39:50'],
  ['Choir Night of Praise', 'Worship Choir', 'Choir & Worship', 29, '1:05:15'], ['Faith & Work', 'Elder Peter', 'Bible Study', 33, '34:27']
];
const sermons = SER_ROWS.map((r, i) => ({ id: 's' + i, title: r[0], preacher: r[1], cat: r[2], date: dt(-r[3]), duration: r[4], views: 120 + i * 37, ytId: 'DEMO' + i }));

/* ---- documents ---- */
const DOC_ROWS = [
  ['Church Constitution', 'Church Constitution', 'PDF', '1.2 MB', 200, 'The governing constitution of Faith Community Church.', 'No'],
  ['Membership Application Form', 'Membership Forms', 'DOCX', '86 KB', 150, 'Form for new members to register with the church.', 'No'],
  ['Baptism Registration Form', 'Baptism Forms', 'PDF', '240 KB', 120, 'Register for water baptism.', 'No'],
  ['Wedding Application Form', 'Wedding Forms', 'PDF', '310 KB', 100, 'Application and requirements for church weddings.', 'No'],
  ['Faith & Family Conference Programme', 'Event Programs', 'PDF', '2.1 MB', 5, 'Full programme and speaker list.', 'No'],
  ['Annual Report 2025', 'Annual Reports', 'PDF', '3.4 MB', 60, 'Summary of the church’s activities and growth.', 'No'],
  ['Council Financial Report Q3 (Restricted)', 'Financial Reports', 'XLSX', '540 KB', 12, 'Detailed financial report. Restricted to authorised leadership.', 'Yes'],
  ['Romans Study Guide', 'Bible Study Materials', 'PDF', '1.8 MB', 18, 'Weekly study guide with discussion questions.', 'No'],
  ['Child Safeguarding Policy', 'Church Policies', 'PDF', '420 KB', 90, 'Policy for protecting children and vulnerable adults.', 'No'],
  ['Ushering Ministry Handbook', 'Ministry Resources', 'DOCX', '720 KB', 45, 'Guidelines for the ushering team.', 'No']
];
const documents = DOC_ROWS.map((r, i) => ({ id: 'd' + i, name: r[0], cat: r[1], type: r[2], size: r[3], date: dt(-r[4]), desc: r[5], restricted: r[6] }));

/* ---- leadership ---- */
const LD_ROWS = [
  ['Rev. David Mrisho', 'Senior Pastor', 'Senior Pastor', 'Pastoral Care', '+255 700 000 004', 'pastor.d@faithcommunity.example', 'Tue–Thu 10:00–14:00'],
  ['Pastor Anna Mushi', 'Assistant Pastor', 'Assistant Pastors', 'Discipleship', '+255 700 000 081', 'anna.m@faithcommunity.example', 'Mon–Wed 9:00–13:00'],
  ['Elder Joseph Kimaro', 'Church Elder', 'Elders', 'Bible Study', '+255 700 000 092', 'joseph.k@faithcommunity.example', 'By appointment'],
  ['Deacon Michael Temba', 'Deacon', 'Deacons', 'Welfare', '+255 700 000 083', 'michael.t@faithcommunity.example', 'Sundays after service'],
  ['Sister Agnes Lema', 'Church Administrator', 'Church Administrator', 'Administration', '+255 700 000 100', 'office@faithcommunity.example', 'Mon–Fri 9:00–16:00'],
  ['Brian Mollel', 'Youth Pastor', 'Youth Leaders', 'Youth Ministry', '+255 700 000 090', 'brian.m@faithcommunity.example', 'Sat 10:00–14:00'],
  ['Mama Grace Mushi', 'Women’s Ministry Leader', 'Women\'s Ministry', 'Women’s Ministry', '+255 700 000 091', 'grace.m@faithcommunity.example', 'Wed 10:00–13:00'],
  ['Elder Peter Kileo', 'Men’s Ministry Leader', 'Men\'s Ministry', 'Men’s Ministry', '+255 700 000 095', 'peter.k@faithcommunity.example', 'Sat 9:00–12:00'],
  ['Mary Kimambo', 'Choir Director', 'Choir Leaders', 'Worship', '+255 700 000 097', 'mary.k@faithcommunity.example', 'Thu 17:00–19:00'],
  ['John Mwangi', 'Jumuiya Leader – Emmanuel', 'Jumuiya Leaders', 'Home Fellowships', '+255 700 000 012', 'john.m@example.com', 'Thursdays 18:30'],
  ['Sara Msuya', 'Finance Department Head', 'Department Leaders', 'Finance', '+255 700 000 003', 'treasurer@faithcommunity.example', 'Mon & Fri 10:00–15:00']
];
const leaders = LD_ROWS.map((r, i) => ({ id: 'l' + i, name: r[0], position: r[1], group: r[2], ministry: r[3], phone: r[4], email: r[5], hours: r[6] }));

/* ---- notifications ---- */
const NT_ROWS = [
  ['announcements', 'New announcement', 'Special Thanksgiving Service this Sunday', 0, false], ['events', 'Event reminder', 'Mid-week Prayer Meeting is in 2 days', 0, false],
  ['live', 'Sermon uploaded', 'Walking in Faith is now available to watch', 1, false], ['jumuiya', 'Emmanuel Jumuiya', 'Thursday meeting will be at the Mwangi residence', 1, false],
  ['giving', 'Giving update', 'A contribution was recorded. Open the app to view details.', 1, true], ['admin', 'Church office', 'Your membership details were confirmed', 3, true],
  ['events', 'Registration open', 'Faith & Family Conference registration is open', 3, false], ['announcements', 'New announcement', 'Building Extension: Progress Update', 2, true],
  ['jumuiya', 'Emmanuel Jumuiya', 'New prayer request shared by a member', 4, true], ['live', 'Live service', 'Sunday service was streamed live', 8, true],
  ['events', 'Event reminder', 'Women’s Ministry Breakfast tomorrow', 10, true], ['giving', 'Pledge reminder', 'Your Building Extension pledge has a balance remaining', 9, true],
  ['announcements', 'New announcement', 'Choir Auditions for New Voices', 3, true], ['admin', 'Church office', 'Annual General Meeting notice published', 22, true],
  ['jumuiya', 'Emmanuel Jumuiya', 'Attendance for last week has been updated', 7, true]
];
const notifications = NT_ROWS.map((r, i) => ({ id: 'n' + i, type: r[0], title: r[1], body: r[2], date: dt(-r[3], 7 + (i % 10)), read: r[4] }));

/* ---- prayer ---- */
const prayers = [
  { id: 'pr1', mc: 'MEM10045', text: 'Please pray for wisdom as I make a career decision this month.', privacy: 'Anonymous', status: 'Being prayed for', date: dt(-3) },
  { id: 'pr2', mc: 'MEM10045', text: 'Thanksgiving for my family’s good health.', privacy: 'Public', status: 'Answered', date: dt(-20) },
  { id: 'pr3', mc: 'MEM10045', text: 'I would like a pastor to visit me regarding a personal matter.', privacy: 'Confidential', status: 'Pastor assigned', date: dt(-6) },
  { id: 'pr4', mc: 'MEM10020', text: 'Pray for healing for my mother.', privacy: 'Public', status: 'Being prayed for', date: dt(-2) },
  { id: 'pr5', mc: 'MEM10012', text: 'Pray for the Emmanuel Jumuiya outreach next month.', privacy: 'Public', status: 'Being prayed for', date: dt(-4) },
  { id: 'pr6', mc: 'MEM10061', text: 'Seeking guidance for a family reconciliation.', privacy: 'Confidential', status: 'Received', date: dt(-1) }
];

const plans = [
  { id: 'rp1', title: 'Gospel of John in 21 Days', days: 21, book: 'John', desc: 'Meet Jesus through John’s Gospel, one chapter a day.' },
  { id: 'rp2', title: 'Psalms of Comfort', days: 7, list: ['Psalm 23', 'Psalm 27', 'Psalm 34', 'Psalm 46', 'Psalm 91', 'Psalm 121', 'Psalm 139'], desc: 'A week of psalms for anxious and weary hearts.' },
  { id: 'rp3', title: 'Proverbs for Daily Wisdom', days: 31, book: 'Proverbs', desc: 'A chapter of Proverbs for each day of the month.' },
  { id: 'rp4', title: 'Romans: The Gospel Explained', days: 16, book: 'Romans', desc: 'Read Paul’s letter alongside our Tuesday Bible study.' },
  { id: 'rp5', title: 'Sermon on the Mount', days: 5, list: ['Matthew 5:1-16', 'Matthew 5:17-48', 'Matthew 6:1-18', 'Matthew 6:19-34', 'Matthew 7'], desc: 'Five days in the teaching of Jesus.' }
];

const opps = [
  ['Ushering Team', 'Welcome and seat worshippers, assist visitors.', 'Friendly, punctual, Sunday availability.', 'Elder Joseph', 12], ['Worship Choir', 'Sing in the choir at services and special events.', 'Audition required; weekly rehearsal.', 'Mary Kimambo', 6],
  ['Children’s Ministry', 'Teach and care for children during services.', 'Background check and safeguarding training.', 'Mama Grace', 8], ['Media & Livestream', 'Operate cameras, sound and the YouTube livestream.', 'Basic technical skills; training provided.', 'Brian Mollel', 4],
  ['Hospitality', 'Prepare refreshments for events and visitors.', 'Food-hygiene awareness.', 'Deacon Michael', 10], ['Community Outreach', 'Serve in clean-ups, visits and screenings.', 'Willingness to serve on Saturdays.', 'Outreach Team', 20],
  ['Prayer Team', 'Intercede for requests and pray with members.', 'Maturity and confidentiality.', 'Pastor David', 15], ['Youth Mentors', 'Mentor teens and young adults.', 'Aged 25+; safeguarding training.', 'Brian Mollel', 6]
].map((r, i) => ({ id: 'v' + i, name: r[0], desc: r[1], requirements: r[2], coordinator: r[3], slots: r[4] }));

const alerts = [
  { id: 'al1', title: 'Service relocated due to road works', body: 'Sunday’s 8:00 AM service will be held in the Annex Hall because of drainage works near the sanctuary. Please arrive 15 minutes early.', priority: 'High', issuer: 'Church Administrator', date: dt(-1, 17), required: true }
];

const jgmembersRoles = { MEM10012: 'Leader', MEM10020: 'Assistant Leader' };

/* ---- aggregate sample analytics (church-wide, demo only) ---- */
const monthLabels = []; for (let i = 11; i >= 0; i--) { const d = new Date(NOW.getFullYear(), NOW.getMonth() - i, 1); monthLabels.push(d.toLocaleString('en-GB', { month: 'short' })); }
const gm = {}; FUNDS.forEach((f, fi) => { gm[f.id] = monthLabels.map((_, i) => Math.round((2200000 / (fi + 1.3)) * (0.8 + ((i * 7 + fi * 3) % 9) / 20) / 10000) * 10000); });
const agg = {
  months: monthLabels, giving: gm,
  attendance: [212, 230, 225, 248, 240, 262, 255, 270, 281, 276, 290, 298],
  volunteerByMinistry: { Ushering: 12, Choir: 18, Children: 8, Media: 4, Hospitality: 10, Outreach: 20 }
};

const chat = [
  { id: 'c1', from: 'John Mwangi', mc: 'MEM10012', text: 'Greetings Emmanuel family! This Thursday we meet at 6:30 PM.', date: dt(-2, 19) },
  { id: 'c2', from: 'Grace Mushi', mc: 'MEM10020', text: 'Amen. I will bring tea and snacks.', date: dt(-2, 19, 12) },
  { id: 'c3', from: 'Lucy Mrema', mc: 'MEM10061', text: 'Please remember to pray for our outreach next month.', date: dt(-1, 8, 30) }
];

const audit = [
  { id: 'au1', who: 'ADM001', action: 'Published announcement "Special Thanksgiving Service"', date: dt(-1, 8, 15) },
  { id: 'au2', who: 'TRS001', action: 'Verified giving record TX-1001', date: dt(-1, 10, 5) },
  { id: 'au3', who: 'ADM002', action: 'Updated event "Faith & Family Conference"', date: dt(-3, 14, 40) },
  { id: 'au4', who: 'PST001', action: 'Assigned pastoral follow-up (confidential request)', date: dt(-6, 11, 0) }
];

const SEED = {
  church: { name: 'Faith Community Church', code: 'FCC123', currency: 'TZS', tagline: 'Connecting Faith & Community', phone: '+255 700 000 100', email: 'office@faithcommunity.example', address: 'Plot 12, Sample Road, Dar es Salaam (fictional)', youtube: 'https://www.youtube.com/@faithcommunitychurch', marketplace: false, serviceTimes: 'Sundays 8:00 AM & 10:30 AM', mapQuery: 'Dar es Salaam church' },
  funds: FUNDS, members, groups, announcements, events, transactions, pledges, sermons, documents, leaders, notifications, prayers, plans, opps, alerts, agg, chat, audit, jgroles: jgmembersRoles,
  checkin: { open: false, code: '', service: '' },
  market: [
    { id: 'mk1', name: 'Church Catering Team', desc: 'Church-approved caterers for weddings and events (listing demo).', contact: 'Deacon Michael' },
    { id: 'mk2', name: 'Tutoring Volunteers', desc: 'Free homework help for children on Saturdays.', contact: 'Mama Grace' }
  ],
  attendance: [0, 7, 14, 21, 28, 35, 42, 49].map((o, i) => ({ date: dt(-(o + ((NOW.getDay() + 7) % 7)), 8), service: 'Sunday Worship Service', status: i === 3 || i === 6 ? 'Absent' : 'Present' }))
};
