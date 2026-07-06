// NEB (National Examinations Board, Nepal) — Grade 11/12 curriculum snapshot
export type Subject = {
  id: string;
  code: string;
  name: string;
  icon: string;
  accent: string; // tailwind color name suffix (accent-science etc)
  progress: number;
  units: { title: string; done: boolean }[];
};

export const SUBJECTS: Subject[] = [
  {
    id: "science",
    code: "SCI-402",
    name: "Physics",
    icon: "science",
    accent: "science",
    progress: 92,
    units: [
      { title: "Mechanics — Kinematics & Dynamics", done: true },
      { title: "Rotational Motion & Gravitation", done: true },
      { title: "Heat & Thermodynamics", done: true },
      { title: "Waves & Optics", done: true },
      { title: "Electricity & Magnetism", done: false },
      { title: "Modern Physics", done: false },
    ],
  },
  {
    id: "math",
    code: "MTH-501",
    name: "Mathematics",
    icon: "calculate",
    accent: "math",
    progress: 78,
    units: [
      { title: "Sets, Relations & Functions", done: true },
      { title: "Algebra — Complex Numbers, Matrices", done: true },
      { title: "Trigonometry", done: true },
      { title: "Coordinate Geometry & Vectors", done: true },
      { title: "Calculus — Limits, Derivatives, Integration", done: false },
      { title: "Statistics & Probability", done: false },
    ],
  },
  {
    id: "english",
    code: "ENG-302",
    name: "English",
    icon: "history_edu",
    accent: "english",
    progress: 85,
    units: [
      { title: "Short Stories — Neighbours, A Respectable Woman", done: true },
      { title: "Poems — Corona Says, A Red, Red Rose", done: true },
      { title: "Essays — On Libraries, Humility", done: true },
      { title: "One Act Plays — Refund, Trifles", done: false },
      { title: "Grammar & Writing", done: false },
    ],
  },
  {
    id: "nepali",
    code: "NEP-101",
    name: "Nepali",
    icon: "translate",
    accent: "nepali",
    progress: 71,
    units: [
      { title: "गद्य — कथा र निबन्ध", done: true },
      { title: "पद्य — कविता र गीत", done: true },
      { title: "नाटक — एकाङ्की", done: false },
      { title: "व्याकरण र लेखन", done: false },
    ],
  },
  {
    id: "social",
    code: "SOC-201",
    name: "Social Studies",
    icon: "public",
    accent: "social",
    progress: 64,
    units: [
      { title: "History of Nepal", done: true },
      { title: "Geography of Nepal", done: true },
      { title: "Civics & Constitution 2072", done: false },
      { title: "Economics — Basic Concepts", done: false },
    ],
  },
  {
    id: "computer",
    code: "CS-301",
    name: "Computer Science",
    icon: "memory",
    accent: "computer",
    progress: 88,
    units: [
      { title: "Computer System & Number System", done: true },
      { title: "C Programming Fundamentals", done: true },
      { title: "Data Structures", done: true },
      { title: "Web Technology — HTML/CSS/JS", done: true },
      { title: "DBMS & SQL", done: false },
    ],
  },
];

export const RESOURCES = [
  { id: "r1", title: "NEB Grade 12 Physics — Solved Model Questions 2081", subject: "Physics", type: "PDF", size: "4.2 MB", url: "https://neb.gov.np/" },
  { id: "r2", title: "Calculus Cheat Sheet — Derivatives & Integrals", subject: "Mathematics", type: "PDF", size: "820 KB", url: "https://tutorial.math.lamar.edu/" },
  { id: "r3", title: "Muna Madan — Full Text (Laxmi Prasad Devkota)", subject: "Nepali", type: "PDF", size: "1.1 MB", url: "https://ne.wikisource.org/" },
  { id: "r4", title: "Nepal Constitution 2072 — English Translation", subject: "Social Studies", type: "PDF", size: "2.8 MB", url: "https://www.lawcommission.gov.np/" },
  { id: "r5", title: "Refund by Fritz Karinthy — Study Notes", subject: "English", type: "Notes", size: "310 KB", url: "https://en.wikipedia.org/" },
  { id: "r6", title: "C Programming — Complete Reference (Balagurusamy)", subject: "Computer Science", type: "PDF", size: "9.7 MB", url: "https://neb.gov.np/" },
  { id: "r7", title: "NEB Past Papers Archive — 2075 to 2080", subject: "All", type: "Archive", size: "24 MB", url: "https://neb.gov.np/" },
];
