/* ============================================================
   Proxima HR Analytics — Capstone, Practice & Interview Prep Hub
   Content + rendering. Numeric data comes from hr-data.js
   (window.HR), which is generated from the actual 18-table dataset.
   ============================================================ */
const HR = window.HR || {};
const V25 = (HR.V && HR.V["2025"]) || {};
const V24 = (HR.V && HR.V["2024"]) || {};
const fmtN = (n) => Number(n).toLocaleString("en-IN");
const f1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const CERTIVA_URL = "https://www.certiva.co.in/";
const CRACKANALYTICS_URL = "https://www.crackanalytics.com/";

/* ---------------- KPIs (from the KPI catalogue) ---------------- */
const P1_KPIS_OLD = new Set(["Headcount (Closing)", "Average Headcount", "New Hires", "Separations (Exits)", "Overall Attrition Rate %", "Voluntary Attrition %",
  "Regrettable Attrition %", "Retention Rate %", "Gender Diversity (Female %)", "Time to Fill (Days)", "Offer Acceptance Rate %", "Cost per Hire (INR)",
  "Total Employer Cost (INR Cr)", "Median Compa-Ratio", "Average Annual Hike %", "Gender Pay Gap % (Level-Adjusted)", "High Performer % (Rating 4-5)",
  "Promotion Rate %", "Training Hours per Employee", "Absenteeism Rate % (Unplanned)", "Employee Net Promoter Score (eNPS)", "Engagement Index %", "Early Attrition % (Tenure < 1 Year)"]);
const P1_KPIS = new Set(["Headcount (Closing)", "Average Headcount", "New Hires", "Separations (Exits)", "Overall Attrition Rate %", "Voluntary Attrition %",
  "Gender Diversity (Female %)", "Time to Fill (Days)", "Total Employer Cost (INR Cr)", "Employee Net Promoter Score (eNPS)"]);
const P2_KPIS = new Set(["Opening Headcount", "Net Headcount Change", "Headcount Growth %", "Average Tenure (Years)", "Regrettable Attrition %", "Early Attrition % (Tenure < 1 Year)",
  "Retention Rate %", "Top Voluntary Exit Reason", "Offer Acceptance Rate %", "Cost per Hire (INR)", "Open Requisitions", "Average Annual CTC (INR Lakh)", "Median Compa-Ratio",
  "Average Annual Hike %", "Gender Pay Gap % (Level-Adjusted)", "High Performer % (Rating 4-5)", "Promotion Rate %", "Training Hours per Employee", "Absenteeism Rate % (Unplanned)", "Engagement Index %"]);
const KPIS = (HR.kpis || []).map(k => ({
  id: k.id, name: k.name, cat: k.cat, q: k.q, desc: k.logic, plain: k.plain, formula: k.dax, table: k.tables,
  unit: k.unit, dir: k.dir, bench: k.bench, v24: k.v24, v25: k.v25, prio: P1_KPIS.has(k.name) ? "P1" : P2_KPIS.has(k.name) ? "P2" : "P3",
}));
const KPI_CATS = ["All", "Workforce", "Attrition", "Recruitment", "Compensation & Payroll", "Performance", "Learning & Development", "Attendance & Leave", "Engagement"];

/* ---------------- STATS (hero strip) ---------------- */
const STATS = [
  { num: "2,299", lbl: "Employee records (2021–2025)" },
  { num: fmtN(HR.hc || 1338), lbl: "Active on 31-Dec-2025" },
  { num: "18", lbl: "Tables in the model" },
  { num: "10 → 67", lbl: "Must-know P1 KPIs → full library" },
  { num: f1(V25.ATTR || 13.5) + "%", lbl: "Attrition, CY2025" },
];

/* ---------------- LEARNING JOURNEY ---------------- */
const JOURNEY = [
  { id: "j1", t: "Understand the Business Problem", d: "Read the problem statement, the stakeholder requirements and the 8 business questions. Write down, in one line, what leadership wants to decide.", go: "problem", track: "business" },
  { id: "j2", t: "Explore the Dataset", d: "Open all 18 tables. Note each table's grain, row count and coverage window: workforce history from 2021, operational data from 2023.", go: "dataset", track: "business" },
  { id: "j3", t: "Build the Data Model", d: "Load the dimensions first, then Employees, then facts. Create the relationships (active + inactive) exactly as in the join guide.", go: "model", track: "model" },
  { id: "j4", t: "Clean & Validate the Data", d: "Run the data-quality checks: orphan keys, duplicates, date logic, expected blanks. Document what is a real defect and what is by design.", go: "quality", track: "model" },
  { id: "j5", t: "Write SQL Queries", d: "Load into MySQL, run the exploration and KPI queries, and create the vw_employee_snapshot mart view.", go: "sql", track: "sql" },
  { id: "j6", t: "Create KPIs", d: "Implement the P1 KPIs first: headcount at a date, attrition %, hiring, compensation, engagement. Then the rest of the 67.", go: "kpis", track: "kpi" },
  { id: "j7", t: "Build the Tableau Dashboard", d: "Connect Tableau to MySQL and build the six gallery pages, starting with Workforce Overview and Attrition & Retention.", go: "dashboards", track: "tableau" },
  { id: "j8", t: "Build the Power BI Dashboard", d: "Same pages in Power BI on the star schema: DAX measures, USERELATIONSHIP for exit and hire dates, a proper Date table.", go: "dashboards", track: "powerbi" },
  { id: "j9", t: "Perform QA", d: "Reconcile every KPI between SQL, Tableau and Power BI within ±0.1. Fill in the reconciliation table and sign off the checklist.", go: "qa", track: "qa" },
  { id: "j10", t: "Present Your Business Insights", d: "Turn the numbers into 5 insights and 5 recommendations, rehearse the 90-second pitch, and update your resume and LinkedIn.", go: "analysis", track: "career" },
];

/* ---------------- DELIVERABLES ---------------- */
const DELIVERABLES = [
  { id: "d1", t: "Business Requirement Document", d: "Problem, stakeholders, requirements, KPI list, page wireframes.", where: "Problem & Business Questions", track: "business" },
  { id: "d2", t: "Data Dictionary", d: "Every table and column with type, meaning and key role.", where: "Data Dictionary", track: "model" },
  { id: "d3", t: "Data Model", d: "Star/galaxy schema with relationships, cardinality and active/inactive flags.", where: "Data Model", track: "model" },
  { id: "d4", t: "SQL Queries", d: "Load scripts, exploration, KPI queries and the mart view, saved as a .sql file.", where: "SQL Lab", track: "sql" },
  { id: "d5", t: "KPI Definitions", d: "Business question, logic, formula and DAX for every KPI you implemented.", where: "KPI Library", track: "kpi" },
  { id: "d6", t: "Excel Analysis", d: "Headcount, attrition and pivot analysis with live formulas.", where: "Excel Analysis", track: "excel" },
  { id: "d7", t: "Tableau Dashboard", d: "The six-page HR dashboard published to Tableau Public (.twbx).", where: "Dashboard Gallery", track: "tableau" },
  { id: "d8", t: "Power BI Dashboard", d: "Same pages in Power BI (.pbix) with the DAX measures.", where: "Dashboard Gallery", track: "powerbi" },
  { id: "d9", t: "QA Validation", d: "Reconciliation sheet: SQL vs Tableau vs Power BI for every P1 KPI.", where: "QA & Reconciliation", track: "qa" },
  { id: "d10", t: "Business Insights", d: "5 insights + 5 recommendations backed by numbers.", where: "Business Analysis", track: "career" },
  { id: "d11", t: "Project Presentation", d: "10–12 slide deck: problem → data → model → KPIs → dashboard → insights.", where: "90-sec Project Pitch", track: "career" },
  { id: "d12", t: "Resume Project Description", d: "Copy-ready project block and 3 tailored bullets.", where: "Resume, LinkedIn & Portfolio", track: "career" },
];

/* ---------------- BEFORE vs AFTER ---------------- */
const BEFORE_AFTER = {
  before: ["Separate Excel files from HRMS, payroll, attendance and the ATS", "Headcount reported differently by HR, Finance and each department", "Manual monthly reports, usually 10–15 days late", "Attrition discovered after people had already left", "No link between pay, performance, engagement and exits", "No single source of truth for leadership"],
  after: ["SQL HR data warehouse (18 tables)", "Validated & reconciled data", "Standard KPI definitions (67 KPIs)", "Tableau / Power BI dashboards", "Business insights → decisions"],
};

/* ---------------- PROBLEM STATEMENT ---------------- */
const PROBLEM_STATEMENT = [
  { icon: "1", h: "No Single Source of Truth", p: "HRMS, payroll, attendance, learning and recruitment data sit in separate systems and spreadsheets, so headcount differed depending on who you asked." },
  { icon: "2", h: "Attrition Is Seen Too Late", p: "Leadership learned about attrition from resignation emails. There was no early-warning view linking exits to pay, workload, engagement or tenure." },
  { icon: "3", h: "Hiring Is a Black Box", p: "No visibility into time to fill, offer acceptance, renege rates or which sourcing channels actually deliver hires at a sensible cost." },
  { icon: "4", h: "Pay Fairness Is Unproven", p: "Compa-ratio, hike distribution by rating and the gender pay gap had never been measured consistently across levels and departments." },
  { icon: "5", h: "People Programs Can't Show ROI", p: "Training spend, engagement surveys and the return-to-office push had no KPIs, so nobody could say whether they were working." },
];

const REQUIREMENTS = [
  ["R1", "Workforce Overview", "HR Head, CEO", "Headcount on any date, hires, exits, growth %, diversity, age & tenure profile by department / location / level", "P1"],
  ["R2", "Attrition & Retention", "HR Head, Dept Heads", "Attrition %, voluntary vs involuntary, regrettable %, early attrition, exit reasons, drivers (compa-ratio, overtime, engagement, tenure)", "P1"],
  ["R3", "Talent Acquisition", "TA Lead, Hiring Managers", "Open reqs, time to fill / hire / join, funnel conversion, offer acceptance & renege, source mix and cost per hire", "P1"],
  ["R4", "Compensation & Payroll", "CFO, CHRO, Payroll", "Monthly employer cost, CTC by level, compa-ratio, hike % by rating, gender pay gap, statutory (PF/ESI/PT/TDS) summary", "P1"],
  ["R5", "Performance, Promotions & L&D", "CHRO, L&D Manager", "Rating distribution, 9-box, promotion rate, years since promotion, training hours/cost, compliance completion", "P2"],
  ["R6", "Engagement, Attendance & Leave", "HR Business Partners", "eNPS, engagement index, intent to stay, attendance %, absenteeism, leave mix, WFO compliance, overtime hotspots", "P2"],
  ["R7", "Global filters", "All users", "Date / FY, Department, Location, Job Level, Gender, Employment Type on every page", "P1"],
  ["R8", "Data governance", "HR Ops, QA", "Every KPI reconciles to SQL within ±0.1; definitions documented in the KPI library", "P1"],
];

/* ---------------- BUSINESS QUESTIONS ---------------- */
function bq() {
  const vd = HR.vol_attr_dept || [];
  const top = vd[0] || ["Customer Success & Support", 17.3];
  const second = vd[1] || ["Sales & Business Development", 16.5];
  const compa = HR.vol_by_compa || []; const ot = HR.vol_by_ot || []; const en = HR.vol_by_enps || []; const ten = HR.vol_by_tenure || [];
  const g = (arr, i) => (arr[i] ? arr[i][1] : "–");
  return [
    { q: "Why are people leaving Proxima?", data: "Exit_Details (ExitType, ExitReason, LastWorkingDate), Employees", kpi: "Voluntary Attrition %, Top Exit Reason, Regrettable %",
      analysis: "Filter voluntary exits with LastWorkingDate in 2025, count by ExitReason and ExitReasonCategory, then split by department and level.",
      insight: `${f1(V25.VOL)}% voluntary attrition in 2025. "${(HR.reasons_2025||[["Better Compensation"]])[0][0]}" is the #1 reason (${(V25.TOPREASON||"").split("(")[1]?.replace(")","") || "25%"} of voluntary exits), followed by career growth. ${f1(V25.REGRET)}% of leavers were rated 4–5 (regrettable).`,
      rec: "Run a targeted market-correction cycle for roles below band mid-point, and publish a promotion-readiness framework so growth exits have a visible path." },
    { q: "Which departments have the highest attrition?", data: "Exit_Details, Employees (DepartmentID), Dim_Department", kpi: "Attrition % by department (exits ÷ average headcount)",
      analysis: "Compute average headcount per department (opening + closing ÷ 2) and divide that department's 2025 exits by it. Don't divide by total company headcount.",
      insight: `${top[0]} (${top[1]}% voluntary) and ${second[0]} (${second[1]}%) lose people fastest, well above the company's ${f1(V25.VOL)}%.`,
      rec: "Put stay-interviews and a shift/incentive review in front of those two departments first. They also have the highest overtime and the lowest pay bands." },
    { q: "Are we paying below market, and does it cost us people?", data: "Salary_History (AnnualCTC), Dim_Designation (BandMidCTC), Exit_Details", kpi: "Compa-Ratio, Voluntary attrition by compa band",
      analysis: "Compa-ratio = CTC ÷ band mid-point of the employee's designation. Bucket employees active on 1-Jan-2025 and measure who left in 2025.",
      insight: `Employees paid below 0.85 compa-ratio left at ${g(compa,0)}% vs ${g(compa,3)}% for those above 1.05, almost 2× the rate. Median compa-ratio today is ${Number(V25.COMPA||0.98).toFixed(2)}.`,
      rec: "Budget a correction for the < 0.85 group (it's cheaper than replacing them: cost per hire + 45-day vacancy + ramp-up)." },
    { q: "Is workload (overtime) driving exits?", data: "Attendance_Monthly (OvertimeHours), Exit_Details", kpi: "Overtime hours per employee per month, attrition by overtime band",
      analysis: "Average each employee's monthly overtime in 2024, band it, then compare 2025 voluntary exit rates.",
      insight: `People averaging 15+ overtime hours a month left at ${g(ot,3)}% vs ${g(ot,0)}% for 0–3 hours. Support and IT Infrastructure have the highest overtime.`,
      rec: "Set an overtime alert (> 12 hrs/month for 3 months) for managers, and review rostering in Support and Cloud Ops." },
    { q: "Does the engagement survey predict who will leave?", data: "Engagement_Survey (eNPS_Score, IntentToStay12M), Exit_Details", kpi: "eNPS, Engagement Index, attrition by eNPS group",
      analysis: "Join the October 2024 survey response to 2025 exits. Compare detractors (0–6), passives (7–8) and promoters (9–10).",
      insight: `Detractors left at ${g(en,0)}% vs ${g(en,2)}% for promoters. The survey is a genuine early-warning signal, and company eNPS is +${f1(V25.ENPS)}.`,
      rec: "Share department-level detractor counts with HRBPs within 2 weeks of each survey, and track action plans on the dashboard." },
    { q: "Are we losing people in their first year (hiring or onboarding problem)?", data: "Employees (HireDate), Exit_Details (LastWorkingDate)", kpi: "Early Attrition %, attrition by tenure band",
      analysis: "Tenure at exit = LastWorkingDate − HireDate. Band it and compare exit rates by tenure.",
      insight: `${f1(V25.EARLY)}% of 2025 exits had less than 1 year of tenure. Employees under 1 year left at ${g(ten,0)}% vs ${g(ten,4)}% for 7+ years.`,
      rec: "Add a 30-60-90 day check-in and a buddy program; review which sources and hiring managers have the highest first-year exits." },
    { q: "Is the hiring funnel efficient, and which channel is worth the money?", data: "Job_Requisitions, Candidates (Source, stage dates, SourcingCostINR)", kpi: "Time to Fill, Offer Acceptance %, Cost per Hire, Referral %",
      analysis: "Funnel counts by stage, time to fill by level, offer acceptance and renege %, and cost per hire by source.",
      insight: `Time to fill is ${f1(V25.TTF)} days on average (L4+ roles take 55–65 days). Offer acceptance is ${f1(V25.OAR)}%. Consultants cost ~₹1.5 L per hire vs ~₹34 K for a referral, yet referrals are only ${f1(V25.REF)}% of hires.`,
      rec: "Raise the referral bonus for L3–L5 and move consultant spend to hard-to-fill L4+ roles only." },
    { q: "Is there a gender pay gap?", data: "Salary_History (current CTC), Employees (Gender), Dim_Designation (JobLevel)", kpi: "Gender Pay Gap % (level-adjusted), Women in Leadership %",
      analysis: "Compare average CTC of men and women within the same JobLevel, then weight the gaps by headcount. A raw company-wide comparison is misleading because of level mix.",
      insight: `Level-adjusted gap is ${f1(V25.GPG)}%. Women are ${f1(V25.FEM)}% of the workforce but ${f1(V25.WIL)}% of L5+ leadership.`,
      rec: "Review offers and hikes for women at L1–L3 where the gap is widest, and track women-in-leadership as a quarterly KPI." },
  ];
}

/* ---------------- TOOLS ---------------- */
const TOOLS = [
  { logo: "assets/excel-logo.jpg", name: "Excel", role: "Stage 1 · Work directly on the data", desc: "Work on the Employees + Exit_Details extract: headcount at a date with SUMPRODUCT, attrition %, female %, then a first-pass pivot dashboard, before touching a database." },
  { logo: "assets/mysql-logo.png", name: "SQL", role: "Stage 2 · Load it into a database", desc: "Load all 18 tables into MySQL with primary/foreign keys, run the exploration and KPI queries, and build vw_employee_snapshot, the one-row-per-employee mart view." },
  { logo: "assets/tableau-logo.jpg", name: "Tableau", role: "Stage 3 · Connect to SQL, not the file", desc: "Tableau connects to MySQL and builds the HR dashboard pages: workforce, attrition, hiring funnel, compensation and engagement." },
  { logo: "assets/powerbi-logo.png", name: "Power BI", role: "Stage 4 · Connect to SQL, not the file", desc: "Power BI imports the star schema, uses a proper Date table and inactive relationships (USERELATIONSHIP) for hire and exit dates, and implements the DAX measures." },
  { logo: "assets/sia-avatar.png", name: "AI / Insights", role: "Stage 4 (optional) · Ask the warehouse", desc: "An optional natural-language layer (Power BI Q&A / Copilot, or a simple chatbot) so an HR Business Partner can ask \"what's attrition in Sales this quarter?\"" },
  { logo: "assets/mysql-logo.png", name: "QA / SQL", role: "Stage 5 · Match backend to dashboard", desc: "Run SQL directly against the warehouse and reconcile every KPI (headcount, attrition, payroll cost, time to fill, eNPS) against Tableau and Power BI." },
];

/* ---------------- DOMAIN PRIMER ---------------- */
const DOMAIN_WHAT = "HR (people) analytics turns the trail every hire, promotion, pay revision, leave request, survey response and resignation leaves behind into a measurable picture of the workforce. Instead of each team keeping its own headcount spreadsheet, one connected data model lets leadership see who is joining, who is leaving and why, whether pay is fair and competitive, which hiring channels work, and whether people programs like training, engagement and hybrid work actually move the numbers.";
const DOMAIN_WHERE = [
  "CHRO & leadership: workforce planning, headcount vs budget, attrition risk and succession for critical roles.",
  "Talent acquisition: time to fill, offer acceptance, renege rates and cost per hire by channel.",
  "Compensation & payroll: compa-ratio, hike budgets, pay equity, statutory cost (PF, ESI, gratuity, TDS).",
  "HR business partners: engagement, absenteeism, overtime hotspots and department-level action plans.",
];
const DOMAIN_DATA_TYPES = ["Employee master (HRMS)", "Job & promotion history", "Salary revisions & CTC break-up", "Monthly payroll", "Attendance & WFH", "Leave applications",
  "Performance appraisals & 9-box", "Training & certifications", "Engagement surveys & eNPS", "Requisitions & candidate pipeline (ATS)", "Exit interviews & F&F"];

const FLOW = [
  { t: "Data Preparation", d: "Explore the Excel/CSV export, understand each table's grain, compute headcount and attrition in Excel, and agree KPI definitions up front." },
  { t: "SQL Integration", d: "Load the 18 tables into MySQL in dependency order, set primary and foreign keys, run data-quality checks, and build vw_employee_snapshot." },
  { t: "BI Tool Connection", d: "Connect Tableau & Power BI to MySQL, build the star schema with a Date table, and set active/inactive relationships for hire and exit dates." },
  { t: "Dashboard Development", d: "Build the six pages (Workforce, Attrition, Talent Acquisition, Compensation, Performance & L&D, Engagement & Attendance) with global filters." },
  { t: "QA & Validation", d: "Reconcile every KPI between SQL and both BI tools, especially headcount-at-date, attrition denominator and payroll totals, and document root causes." },
];

/* Timeline — same schedule as the other capstones; only project wording changed */
const TIMELINE = [
  { d: "Week 1", t: "", task: "Project kick-off: BRD & KPI catalogue walkthrough" },
  { d: "Week 1-2", t: "", task: "Implement core KPIs in Excel: Headcount, Attrition %, Hires & Exits" },
  { d: "Week 2-3", t: "", task: "SQL schema setup + vw_employee_snapshot mart view" },
  { d: "Week 3-4", t: "", task: "Dashboard development in Tableau & Power BI, all P1 KPIs" },
  { d: "Week 4-5", t: "", task: "QA & reconciliation, final presentation prep" },
];

/* ---------------- RULES (unchanged) ---------------- */
const RULES = [
  { icon: "⚠", ok: false, h: "Attendance is mandatory", p: "Missing more than two meetings results in removal from the project. Join every meeting under the same name you registered with, because an unrecognized name gets marked absent." },
  { icon: "⚠", ok: false, h: "Attendance alone isn't enough", p: "Sitting in on meetings without actively contributing will also lead to removal. Participation is graded on contribution, not presence." },
  { icon: "✓", ok: true, h: "Flag non-contributing teammates early", p: "If a team member isn't contributing, it's on the group to inform management by call, WhatsApp, email, or during the weekly review, rather than letting it slide." },
  { icon: "✓", ok: true, h: "Contribute across every tool", p: "You're expected to contribute to Excel, SQL, Tableau, Power BI, and the final PPT. Skipping even one tool entirely puts your place on the project at risk." },
  { icon: "✓", ok: true, h: "Weekly review presentations", p: "Each group presents its progress every week. Consistent updates and a prepared walkthrough are expected, not just a working dashboard at the end." },
];
const FOCUS_AREAS = [
  { h: "Active Contribution", p: "Show up engaged. Participate in discussion, don't just observe the build." },
  { h: "Sharing Insights", p: "Bring your own observations to the team rather than waiting to be assigned tasks." },
  { h: "Timely Completion", p: "Deliver assigned work inside the agreed deadline, every sprint." },
  { h: "Collaboration Over Competition", p: "Optimize for the team's dashboard, not for individual credit." },
  { h: "Clear Communication", p: "Say what you're blocked on before the deadline, not after." },
  { h: "Active Listening", p: "Actually absorb teammates' updates in review meetings, because you'll be asked about their work too." },
  { h: "Recognizing Contributions", p: "Acknowledge teammates' work. It costs nothing and keeps morale up." },
  { h: "Daily Team Connectivity", p: "A short daily check-in catches blockers before they become a missed deadline." },
];

/* ---------------- SOCIAL ---------------- */
const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/mahendra-singh-%F0%9F%87%AE%F0%9F%87%B3%F0%9F%9A%80%E2%9D%84%EF%B8%8F-%F0%9F%90%8D-%F0%9F%A6%84-83699485/",
  medium: "https://medium.com/@mahendraa1188",
  youtube: "https://www.youtube.com/channel/UC2q-vZWSlQpiGiMcSLUqnIg",
};

/* ---------------- SETUP & DOWNLOADS ---------------- */
const SETUP_STEPS = [
  { i: "⬇️", t: "Get the dataset", d: "Your trainer shares the Excel workbook (18 sheets) and a CSV zip." },
  { i: "🗄️", t: "Import into MySQL", d: "Create the schema, load dimensions first, then Employees, then fact tables." },
  { i: "✅", t: "Verify the load", d: "Row counts must match the Dataset page exactly (e.g. Employees = 2,299)." },
  { i: "📊", t: "Connect BI tools", d: "Point Tableau and Power BI at MySQL, not at the Excel file." },
];
const SOFTWARE_LINKS = [
  { name: "How to import a CSV into MySQL", desc: "Step-by-step guide: load the dataset before connecting Tableau or Power BI", icon: "🗄️", type: "link", href: "https://medium.com/@mahendraa1188/how-to-import-csv-into-mysql-c3bbce297910" },
  { name: "Tableau Desktop — free download", desc: "Official installer from Tableau (free trial / Public edition)", icon: "📈", type: "link", href: "https://www.tableau.com/products/desktop-free/download" },
  { name: "Power BI Desktop — free download", desc: "Official installer from Microsoft", icon: "⚡", type: "link", href: "https://www.microsoft.com/en-us/download/details.aspx?id=58494" },
];
const DOCUMENTS = [
  { name: "HR Excel Starter Template.xlsx", desc: "Employees + Exit_Details extract with live formulas for headcount at a date, hires, exits, attrition %, voluntary attrition %, female % and a department table. Change the as-of date and it recalculates.", icon: "🧮", type: "download", href: "assets/docs/Proxima_HR_Excel_Starter.xlsx", filename: "Proxima_HR_Excel_Starter.xlsx" },
];

/* ---------------- DATASET PAGE ---------------- */
const COVERAGE_TEXT = "Employees, Job_History, Salary_History, Performance_Reviews and Exit_Details cover 01-Jan-2021 → 31-Dec-2025 (the HRMS went live in Jan-2021, so older employees start with an \"Opening Balance (HRMS Migration)\" record). Payroll_Monthly, Attendance_Monthly, Leave_Requests and Training_Records cover Jan-2023 → Dec-2025. Engagement_Survey runs every October (2023–2025). Job_Requisitions & Candidates start with the ATS go-live (Oct-2022), so they cover hires from Jan-2023 plus requisitions still open on 31-Dec-2025. Snapshot date: 31-Dec-2025. Fiscal year: April–March. Currency: INR.";
const STORY = [
  ["2021–22", "Post-COVID \"Great Resignation\"", "Hiring at full speed, attrition 18–19%, \"Better Compensation\" the #1 exit reason", "Attrition trend, exit reasons by year"],
  ["Jun-2023", "Hiring freeze + restructuring", "46 roles made redundant (mostly Sales, Marketing, Support); campus joining deferred to September", "Involuntary exits spike, hires drop"],
  ["2024–25", "Stabilisation & growth", "Attrition back to ~12–13%, headcount growing again, return-to-office push raises office days", "WFO % trend 52% → 62%"],
  ["Every April", "Appraisal cycle", "Ratings for the FY (Apr–Mar), increments effective 1-April, paid in June payroll with Apr–May arrears", "June payroll spike, Salary_History"],
  ["Always", "Attrition drivers", "Below-band pay, overtime, low engagement, long commute, first 2 years of tenure, Support & Sales roles", "Business Analysis page"],
];

/* ---------------- DATA MODEL ---------------- */
const TABLE_TYPES = { "Dim_Date": "Dimension", "Dim_Department": "Dimension", "Dim_Designation": "Dimension", "Dim_Location": "Dimension", "Dim_LeaveType": "Dimension",
  "Dim_TrainingProgram": "Dimension", "Employees": "Employee master", "Job_History": "Fact (SCD2)", "Salary_History": "Fact (SCD2)", "Performance_Reviews": "Fact",
  "Exit_Details": "Fact", "Payroll_Monthly": "Fact", "Attendance_Monthly": "Fact", "Leave_Requests": "Fact", "Training_Records": "Fact", "Engagement_Survey": "Fact",
  "Job_Requisitions": "Fact", "Candidates": "Fact" };
const TABLE_PK = { "Dim_Date": "Date", "Dim_Department": "DepartmentID", "Dim_Designation": "DesignationID", "Dim_Location": "LocationID", "Dim_LeaveType": "LeaveTypeCode",
  "Dim_TrainingProgram": "ProgramID", "Employees": "EmployeeID", "Job_History": "JobHistoryID", "Salary_History": "SalaryRecordID", "Performance_Reviews": "PerformanceReviewID",
  "Exit_Details": "ExitID", "Payroll_Monthly": "PayrollID", "Attendance_Monthly": "AttendanceID", "Leave_Requests": "LeaveRequestID", "Training_Records": "TrainingRecordID",
  "Engagement_Survey": "SurveyResponseID", "Job_Requisitions": "RequisitionID", "Candidates": "CandidateID" };
const TABLE_FK = { "Employees": "DepartmentID, DesignationID, LocationID, ManagerID", "Job_History": "EmployeeID, DepartmentID, DesignationID, LocationID",
  "Salary_History": "EmployeeID, DesignationID", "Performance_Reviews": "EmployeeID, ReviewerID", "Exit_Details": "EmployeeID", "Payroll_Monthly": "EmployeeID, PayMonth",
  "Attendance_Monthly": "EmployeeID, AttendanceMonth", "Leave_Requests": "EmployeeID, LeaveTypeCode, ApproverID", "Training_Records": "EmployeeID, ProgramID",
  "Engagement_Survey": "EmployeeID", "Job_Requisitions": "DepartmentID, DesignationID, LocationID, HiringManagerID", "Candidates": "RequisitionID, EmployeeID", "Dim_Designation": "DepartmentID" };
const TABLE_GRAIN = { "Dim_Date": "1 row per day, 2021–2026", "Dim_Department": "1 row per department", "Dim_Designation": "1 row per job title + salary band",
  "Dim_Location": "1 row per office", "Dim_LeaveType": "1 row per leave type", "Dim_TrainingProgram": "1 row per program", "Employees": "1 row per employee (current / last state)",
  "Job_History": "1 row per job change (EffectiveFrom → EffectiveTo)", "Salary_History": "1 row per salary revision", "Performance_Reviews": "1 row per employee per FY cycle",
  "Exit_Details": "1 row per separation", "Payroll_Monthly": "1 row per employee per month", "Attendance_Monthly": "1 row per employee per month",
  "Leave_Requests": "1 row per leave application", "Training_Records": "1 row per enrolment", "Engagement_Survey": "1 row per survey response",
  "Job_Requisitions": "1 row per requisition", "Candidates": "1 row per application" };
const RELATIONSHIPS = [
  "Employees → Dim_Department / Dim_Designation / Dim_Location (Many:1, active)",
  "Employees.ManagerID → Employees.EmployeeID (self-reference; use PATH() for the hierarchy)",
  "All employee facts → Employees.EmployeeID (Many:1, single direction)",
  "Payroll_Monthly.PayMonth, Attendance_Monthly.AttendanceMonth → Dim_Date (active)",
  "Exit_Details.ResignationDate → Dim_Date (active) · LastWorkingDate → Dim_Date (inactive, USERELATIONSHIP for attrition)",
  "Employees.HireDate → Dim_Date (inactive; headcount uses date logic inside DAX)",
  "Leave_Requests → Dim_LeaveType · Training_Records → Dim_TrainingProgram",
  "Candidates → Job_Requisitions (Many:1) · Candidates.EmployeeID → Employees (1:1, joined only, inactive)",
  "Job_Requisitions → Dim_Department / Dim_Designation / Dim_Location (inactive to avoid ambiguous paths)",
];
const LOAD_ORDER = ["1. Dim_Date, Dim_Location, Dim_Department, Dim_LeaveType, Dim_TrainingProgram", "2. Dim_Designation (needs Dim_Department)",
  "3. Employees (needs the three org dimensions; ManagerID is a self-reference, so load it, then add the FK)", "4. Job_History, Salary_History, Performance_Reviews, Exit_Details",
  "5. Payroll_Monthly, Attendance_Monthly, Leave_Requests, Training_Records, Engagement_Survey", "6. Job_Requisitions, then Candidates"];
const CALC_FIELDS = [
  "Age = DATEDIFF(Employees[DateOfBirth], TODAY() or the selected date, YEAR). Never store a static Age column.",
  "Tenure (years) = DATEDIFF(HireDate, COALESCE(ExitDate, as-of date), DAY) / 365.25, then a Tenure Band column (<1, 1–2, 2–4, 4–7, 7+)",
  "Is Active at date: a measure, not a column (HireDate <= d && (ExitDate blank || ExitDate > d))",
  "Compa-Ratio = Salary_History[AnnualCTC] / RELATED(Dim_Designation[BandMidCTC])",
  "Age Band, Tenure Band, Compa Band, Overtime Band: calculated columns used as slicers on the attrition page",
  "Dim_Date[FiscalYear] / [FiscalQuarter] already exist (Apr–Mar). Mark Dim_Date as the date table",
];
const GOTCHAS = [
  { t: "Headcount is a point-in-time measure", d: "You can't SUM headcount over months. Headcount on a date = HireDate ≤ d AND (ExitDate blank OR ExitDate > d). Average headcount = (opening + closing) ÷ 2. Summing monthly headcounts gives a meaningless number." },
  { t: "Attrition denominator = average headcount", d: `Exits ÷ closing headcount, or exits ÷ total employees ever, both give the wrong rate. CY2025 = ${HR.ans ? HR.ans.exits_2025 : 175} exits ÷ ${f1(V25.AVGHC || 1299.5)} average headcount = ${f1(V25.ATTR)}%.` },
  { t: "Serving Notice ≠ Exited", d: "26 employees resigned in 2025 but their last working day falls in 2026. They are still active headcount and are NOT 2025 exits. Filter Exit_Details on ExitStatus = 'Exited' and use LastWorkingDate, not ResignationDate." },
  { t: "SCD Type 2 tables need a date filter", d: "Job_History and Salary_History have several rows per employee. Joining them to Employees without EffectiveFrom ≤ d ≤ EffectiveTo (or IsCurrent = 'Yes') fans out rows and inflates every count and sum." },
  { t: "Operational facts start in 2023", d: "Payroll, attendance, leave and training begin in Jan-2023 while workforce history starts in 2021. A 2021–22 payroll trend that shows zero is a coverage window, not a bug." },
  { t: "Two date relationships on one fact", d: "Exit_Details has ResignationDate and LastWorkingDate. Only one can be active in Power BI. Resignations trend uses the active one; attrition must use USERELATIONSHIP(LastWorkingDate)." },
  { t: "June payroll spike is real", d: "Increments are effective 1-April but paid in June with Apr–May arrears, plus the annual bonus. Don't 'fix' the June spike. Explain it." },
  { t: "Gender pay gap must be level-adjusted", d: "A raw male vs female average compares different job-level mixes. Compare within each JobLevel, then weight. L7/L8 have tiny counts, so don't headline them." },
];
const GLOBAL_FILTERS = [["Date / Fiscal Year", "Dim_Date[Date], Dim_Date[FiscalYear]"], ["Department", "Dim_Department[DepartmentName]"], ["Location", "Dim_Location[City]"],
  ["Job Level", "Employees[JobLevel] / Dim_Designation[JobLevel]"], ["Gender", "Employees[Gender]"], ["Employment Type", "Employees[EmploymentType]"], ["Work Mode", "Employees[WorkMode]"]];
const DASHBOARDS = [
  ["1", "Workforce Overview", "CEO, CHRO", "Headcount, Hires, Exits, Growth %, Female %, Avg Tenure", "KPI cards, headcount trend, dept/location/level bars, age & tenure bands"],
  ["2", "Attrition & Retention", "CHRO, Dept Heads", "Attrition %, Voluntary %, Regrettable %, Early attrition", "Monthly exits, attrition by dept, exit reasons, driver bands"],
  ["3", "Talent Acquisition", "TA Lead, Hiring Managers", "Open reqs, Time to Fill, Offer Acceptance, Cost per Hire", "Funnel, source mix, TTF by level, decline reasons"],
  ["4", "Compensation & Payroll", "CFO, CHRO", "Employer cost, Avg CTC, Compa-ratio, Hike %, Pay gap", "Monthly cost, CTC by level, compa histogram, hike by rating"],
  ["5", "Performance & L&D", "CHRO, L&D", "High performer %, Promotion %, Training hrs, Compliance %", "Rating bell curve, 9-box, promotions trend, hours by category"],
  ["6", "Engagement & Attendance", "HRBPs", "eNPS, Engagement Index, Attendance %, Absenteeism, WFO %", "eNPS by dept, survey items, leave mix, WFO trend, overtime by dept"],
];

/* ---------------- DATA QUALITY ---------------- */
const NULL_NOTES = [
  "Employees.ExitDate is blank for 1,338 active and serving-notice employees. That's expected, and it's what makes them active.",
  "Employees.ManagerID is blank only for the CEO (top of the hierarchy). Any other blank manager would be a defect.",
  "Job_History.EffectiveTo and Salary_History.EffectiveTo are blank on the current record (SCD Type 2 open row). Exception: the 26 Serving Notice employees already have EffectiveTo = their 2026 last working day, so their IsCurrent = 'No'. Prefer the date filter (EffectiveFrom ≤ d ≤ EffectiveTo) over IsCurrent.",
  "Performance_Reviews exist only for employees who joined at least 6 months before the cycle ended (e.g. before 1-Oct-2024 for FY2024-25), and CXOs (L8) are not rated in this cycle.",
  "Candidates.EmployeeID is filled only for candidates who joined. OfferDate / OfferedCTC are blank for anyone rejected before the offer stage.",
  "Training_Records.AssessmentScore is blank for onboarding programs and for anything not completed, and CompletionDate is blank for Overdue / Dropped / In Progress.",
  "Leave_Requests.ApprovedOn is blank for Rejected / Cancelled requests. ApproverID is blank for the CEO's own leave.",
  "Payroll and attendance start in Jan-2023, so employees who left in 2021–22 have no payroll rows. That's a coverage window, not missing data.",
  "Exit_Details.LastWorkingDate can be in 2026 for 26 'Serving Notice' rows (resigned in late 2025).",
];
const DQ_RULES = [
  ["Row counts", "COUNT(*) per table matches the Dataset page", "All 18 tables", "Critical"],
  ["Primary key uniqueness", "No duplicate EmployeeID, PayrollID, (EmployeeID, PayMonth) in payroll, etc.", "All tables", "Critical"],
  ["Referential integrity", "Every FK finds its parent (no orphan EmployeeID, DesignationID, RequisitionID…)", "All facts", "Critical"],
  ["Date logic", "HireDate < ExitDate; ResignationDate ≤ LastWorkingDate; StartDate ≤ EndDate; EffectiveFrom ≤ EffectiveTo", "Employees, Exits, Leave, SCD tables", "High"],
  ["Age sanity", "Age at hire between 18 and 60", "Employees", "Medium"],
  ["Status consistency", "EmploymentStatus = 'Exited' ⇔ ExitDate not blank ⇔ Exit_Details row with ExitStatus = 'Exited'", "Employees, Exit_Details", "High"],
  ["Payroll arithmetic", "NetPay = GrossEarnings − TotalDeductions; Gross = Basic + HRA + Special + Shift + Bonus + Arrears", "Payroll_Monthly", "High"],
  ["Attendance arithmetic", "PresentDays + PaidLeaveDays + LOPDays = EligibleWorkingDays", "Attendance_Monthly", "Medium"],
  ["SCD overlap", "Only one current row per employee in Job_History / Salary_History", "SCD tables", "High"],
  ["Candidate funnel order", "Applied ≤ Screening ≤ Round1 ≤ Round2 ≤ HR ≤ Offer ≤ Response ≤ Joining", "Candidates", "Medium"],
];

const TABLE_DATE = { "Dim_Date": "Date", "Employees": "HireDate, ExitDate", "Job_History": "EffectiveFrom / EffectiveTo", "Salary_History": "EffectiveFrom / EffectiveTo",
  "Performance_Reviews": "ReviewDate (cycle: ReviewCycle)", "Exit_Details": "ResignationDate, LastWorkingDate", "Payroll_Monthly": "PayMonth", "Attendance_Monthly": "AttendanceMonth",
  "Leave_Requests": "StartDate / EndDate", "Training_Records": "StartDate", "Engagement_Survey": "ResponseDate (SurveyYear)", "Job_Requisitions": "OpenDate, ClosedDate", "Candidates": "AppliedDate … ActualJoiningDate" };
const TABLE_PURPOSE = {
  "Dim_Date": ["Calendar for every time-based visual (with Indian FY and holidays).", "Facts store dates, but you need month names, fiscal years and working-day flags to slice them consistently."],
  "Dim_Department": ["Department names, cost centres, heads and approved headcount.", "Keeps department attributes in one place; the approved headcount powers the vacancy-rate KPI."],
  "Dim_Designation": ["Job titles, levels and FY2025-26 salary bands.", "Bands are what make compa-ratio possible: CTC alone can't tell you if someone is under- or over-paid."],
  "Dim_Location": ["Office city, state and region.", "State drives Professional Tax rules and lets you compare offices."],
  "Dim_LeaveType": ["Leave types with policy entitlement.", "Separates paid from unpaid (LOP) leave and documents the policy behind the numbers."],
  "Dim_TrainingProgram": ["Training catalogue with category, cost and hours.", "Lets you analyse learning by category and compute cost per employee."],
  "Employees": ["One row per person: the centre of the model.", "Every fact joins here; HireDate + ExitDate let you compute headcount on any date."],
  "Job_History": ["Every promotion and transfer with effective dates.", "Employees only holds the CURRENT job. To know someone's level on a past date, or count promotions, you need history."],
  "Salary_History": ["Every salary revision with the full CTC break-up.", "Salary changes over time. This table preserves each version, so you can do point-in-time compensation and hike analysis."],
  "Performance_Reviews": ["Annual ratings, goals, potential and 9-box.", "Ratings change every cycle; linking them to exits and hikes shows whether pay and retention follow performance."],
  "Exit_Details": ["Why, when and how people left.", "Employees.ExitDate says THAT someone left; this table says WHY (reason, type, regrettable), which is the heart of attrition analysis."],
  "Payroll_Monthly": ["What each employee was actually paid each month.", "CTC is a promise; payroll is what was paid after LOP, bonus, arrears and statutory deductions. Finance reconciles to this."],
  "Attendance_Monthly": ["Present days, WFH/WFO, LOP, late marks and overtime per month.", "Shows workload and absence patterns (overtime, absenteeism) that predict burnout and exits."],
  "Leave_Requests": ["Every leave application and its status.", "Explains WHY someone was absent, and leave seasonality (Diwali, December)."],
  "Training_Records": ["Who attended which program, with hours, score and cost.", "Needed to measure L&D investment and compliance completion."],
  "Engagement_Survey": ["Annual survey answers, including eNPS.", "Captures how people feel, the early-warning signal that comes BEFORE a resignation."],
  "Job_Requisitions": ["Every position the company tried to fill.", "Time to fill and open vacancies are measured on requisitions, not on employees."],
  "Candidates": ["Every applicant and how far they got.", "The hiring funnel, offer acceptance and cost per hire come from candidates, including the many who were never hired."],
};
const INTERVIEW_TRAPS = [
  ["Attrition = Exits ÷ Closing Headcount", "Attrition = Exits ÷ Average Headcount ((opening + closing) ÷ 2)"],
  ["Headcount can be summed across months", "Headcount is semi-additive: take the month-end value or average it, never sum it"],
  ["Resignation date = exit date", "Use LastWorkingDate for exits; resignation date + notice period ≠ the same month"],
  ["Current salary answers historical salary questions", "Use Salary_History with EffectiveFrom ≤ date ≤ EffectiveTo"],
  ["Active employees = EmploymentStatus 'Active'", "Serving-notice employees are still on the rolls: use the HireDate / ExitDate rule"],
  ["A raw male vs female average is the pay gap", "Compare within the same job level, then weight by headcount"],
  ["Join history tables straight to Employees", "Filter SCD tables to the record valid on the date, or rows fan out and totals inflate"],
  ["Payroll should be zero before 2023 = missing data", "It's a coverage window: operational data starts Jan-2023"],
];
const PRESENTATION = [
  ["01", "Business Problem", "30 sec", "HR data in silos; attrition seen too late; no single headcount."],
  ["02", "Dataset", "30 sec", "18 tables, 2,299 employees, 2021–2025; what's in each area."],
  ["03", "Data Model", "45 sec", "Star/galaxy schema, Employees at the centre, SCD history, inactive date relationships."],
  ["04", "KPIs", "45 sec", "The 10 P1 KPIs and how attrition and headcount are defined."],
  ["05", "Dashboard", "90 sec", "Walk through 2–3 pages live: workforce, attrition, hiring or pay."],
  ["06", "Insights", "45 sec", "13.5% attrition; below-band pay, overtime and low eNPS predict exits."],
  ["07", "Recommendations", "30 sec", "Targeted pay correction, overtime alerts, survey follow-ups, and how you'd measure them."],
];
/* ---------------- SQL LAB ---------------- */
const SQL_BLOCKS = [
  { cat: "Setup", title: "1 · Create the core tables (MySQL)", desc: "Dimensions first, then Employees, then facts. The full DDL for all 18 tables follows the same pattern: copy the column list from the Data Dictionary.",
    sql: "CREATE DATABASE proxima_hr;\nUSE proxima_hr;\n\nCREATE TABLE Dim_Department (\n  DepartmentID     VARCHAR(5) PRIMARY KEY,\n  DepartmentName   VARCHAR(60),\n  FunctionGroup    VARCHAR(20),\n  CostCenter       VARCHAR(10),\n  DepartmentHeadID VARCHAR(10),\n  ApprovedHeadcount_FY2025_26 INT\n);\n\nCREATE TABLE Employees (\n  EmployeeID   VARCHAR(10) PRIMARY KEY,\n  FirstName    VARCHAR(40), LastName VARCHAR(40), FullName VARCHAR(80),\n  Gender       VARCHAR(10), DateOfBirth DATE, MaritalStatus VARCHAR(10),\n  HireDate     DATE NOT NULL, ExitDate DATE NULL,\n  EmploymentStatus VARCHAR(20), EmploymentType VARCHAR(15),\n  DepartmentID VARCHAR(5), DesignationID VARCHAR(6), JobLevel VARCHAR(3),\n  LocationID   VARCHAR(5), ManagerID VARCHAR(10) NULL,\n  -- ... remaining columns from the Data Dictionary ...\n  FOREIGN KEY (DepartmentID) REFERENCES Dim_Department(DepartmentID)\n);\n\nCREATE TABLE Exit_Details (\n  ExitID VARCHAR(8) PRIMARY KEY,\n  EmployeeID VARCHAR(10) NOT NULL,\n  ResignationDate DATE, LastWorkingDate DATE,\n  ExitType VARCHAR(15), ExitReason VARCHAR(60), ExitStatus VARCHAR(20),\n  FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)\n);" },
  { cat: "Setup", title: "2 · Verify the load: row counts", desc: "Every count must match exactly before you build anything.",
    sql: "SELECT 'Employees' t, COUNT(*) FROM Employees            -- 2,299\nUNION ALL SELECT 'Job_History', COUNT(*) FROM Job_History        -- 2,809\nUNION ALL SELECT 'Salary_History', COUNT(*) FROM Salary_History  -- 7,322\nUNION ALL SELECT 'Performance_Reviews', COUNT(*) FROM Performance_Reviews -- 5,110\nUNION ALL SELECT 'Exit_Details', COUNT(*) FROM Exit_Details      -- 987\nUNION ALL SELECT 'Payroll_Monthly', COUNT(*) FROM Payroll_Monthly -- 45,807\nUNION ALL SELECT 'Attendance_Monthly', COUNT(*) FROM Attendance_Monthly -- 45,807\nUNION ALL SELECT 'Leave_Requests', COUNT(*) FROM Leave_Requests  -- 41,134\nUNION ALL SELECT 'Training_Records', COUNT(*) FROM Training_Records -- 15,229\nUNION ALL SELECT 'Engagement_Survey', COUNT(*) FROM Engagement_Survey -- 2,983\nUNION ALL SELECT 'Job_Requisitions', COUNT(*) FROM Job_Requisitions -- 627\nUNION ALL SELECT 'Candidates', COUNT(*) FROM Candidates          -- 10,644" },
  { cat: "Exploration", title: "3 · Headcount on a given date", desc: "The single most important HR query. An employee is on the rolls if they joined on/before the date and haven't left by it.",
    sql: "SET @d = '2025-12-31';\nSELECT COUNT(*) AS headcount\nFROM Employees\nWHERE HireDate <= @d\n  AND (ExitDate IS NULL OR ExitDate > @d);      -- 1,338\n\n-- by department\nSELECT d.DepartmentName, COUNT(*) AS headcount\nFROM Employees e\nJOIN Dim_Department d ON d.DepartmentID = e.DepartmentID\nWHERE e.HireDate <= @d AND (e.ExitDate IS NULL OR e.ExitDate > @d)\nGROUP BY d.DepartmentName\nORDER BY headcount DESC;                         -- Engineering 481 first" },
  { cat: "KPI", title: "4 · Attrition % for a year (average-headcount method)", desc: "Exits with LastWorkingDate in the year ÷ average of opening and closing headcount.",
    sql: "SET @s = '2025-01-01', @e = '2025-12-31';\nWITH hc AS (\n  SELECT\n    SUM(HireDate <= DATE_SUB(@s, INTERVAL 1 DAY)\n        AND (ExitDate IS NULL OR ExitDate > DATE_SUB(@s, INTERVAL 1 DAY))) AS opening_hc,  -- 1,261\n    SUM(HireDate <= @e AND (ExitDate IS NULL OR ExitDate > @e))  AS closing_hc               -- 1,338\n  FROM Employees\n), ex AS (\n  SELECT COUNT(*) AS exits,                                                       -- 175\n         SUM(ExitType = 'Voluntary') AS vol_exits                                -- 150\n  FROM Exit_Details\n  WHERE ExitStatus = 'Exited' AND LastWorkingDate BETWEEN @s AND @e\n)\nSELECT exits, vol_exits,\n       ROUND(100 * exits / ((opening_hc + closing_hc) / 2), 1)     AS attrition_pct,  -- 13.5\n       ROUND(100 * vol_exits / ((opening_hc + closing_hc) / 2), 1) AS vol_attr_pct    -- 11.5\nFROM hc, ex;" },
  { cat: "KPI", title: "5 · Voluntary attrition by department", desc: "Each department's exits divided by that department's own average headcount.",
    sql: "SET @s = '2025-01-01', @e = '2025-12-31';\nSELECT d.DepartmentName,\n  SUM(e.HireDate <= DATE_SUB(@s, INTERVAL 1 DAY) AND (e.ExitDate IS NULL OR e.ExitDate > DATE_SUB(@s, INTERVAL 1 DAY))) AS opening_hc,\n  SUM(e.HireDate <= @e AND (e.ExitDate IS NULL OR e.ExitDate > @e)) AS closing_hc,\n  SUM(x.ExitType = 'Voluntary' AND x.ExitStatus = 'Exited' AND x.LastWorkingDate BETWEEN @s AND @e) AS vol_exits,\n  ROUND(100 * SUM(x.ExitType = 'Voluntary' AND x.ExitStatus = 'Exited' AND x.LastWorkingDate BETWEEN @s AND @e)\n      / ((SUM(e.HireDate <= DATE_SUB(@s, INTERVAL 1 DAY) AND (e.ExitDate IS NULL OR e.ExitDate > DATE_SUB(@s, INTERVAL 1 DAY)))\n        + SUM(e.HireDate <= @e AND (e.ExitDate IS NULL OR e.ExitDate > @e))) / 2), 1) AS vol_attr_pct\nFROM Employees e\nJOIN Dim_Department d ON d.DepartmentID = e.DepartmentID\nLEFT JOIN Exit_Details x ON x.EmployeeID = e.EmployeeID\nGROUP BY d.DepartmentName\nORDER BY vol_attr_pct DESC;   -- Customer Success & Support ≈ 17.3%" },
  { cat: "KPI", title: "6 · Current CTC and compa-ratio (SCD Type 2)", desc: "Pick the salary record valid on the date. Never join Salary_History to Employees without this filter.",
    sql: "SET @d = '2025-12-31';\nSELECT e.EmployeeID, e.JobLevel, s.AnnualCTC, g.BandMidCTC,\n       ROUND(s.AnnualCTC / g.BandMidCTC, 2) AS compa_ratio\nFROM Employees e\nJOIN Salary_History s\n  ON s.EmployeeID = e.EmployeeID\n AND s.EffectiveFrom <= @d\n AND (s.EffectiveTo IS NULL OR s.EffectiveTo >= @d)\nJOIN Dim_Designation g ON g.DesignationID = s.DesignationID\nWHERE e.HireDate <= @d AND (e.ExitDate IS NULL OR e.ExitDate > @d);\n-- AVG(AnnualCTC) for this set ≈ ₹15.88 lakh" },
  { cat: "KPI", title: "7 · Hiring KPIs: time to fill, offer acceptance, cost per hire", desc: "Campus requisitions are excluded from time to fill because they're opened months before joining.",
    sql: "-- Time to fill (CY2025): ~45.0 days\nSELECT ROUND(AVG(DATEDIFF(ClosedDate, OpenDate)), 1) AS time_to_fill\nFROM Job_Requisitions\nWHERE Status = 'Filled' AND RequisitionType <> 'Campus Hiring'\n  AND YEAR(ClosedDate) = 2025;\n\n-- Offer acceptance (offers released in 2025): ~86.2%\nSELECT ROUND(100 * SUM(ApplicationStatus IN ('Joined','Offer Accepted - Yet to Join','Offer Accepted - Did Not Join'))\n       / COUNT(*), 1) AS offer_acceptance_pct\nFROM Candidates\nWHERE OfferDate IS NOT NULL AND YEAR(OfferDate) = 2025;\n\n-- Cost per hire by source (joined in 2025)\nSELECT Source, COUNT(*) hires, ROUND(AVG(SourcingCostINR)) cost_per_hire\nFROM Candidates\nWHERE ApplicationStatus = 'Joined' AND YEAR(ActualJoiningDate) = 2025\nGROUP BY Source ORDER BY cost_per_hire DESC;" },
  { cat: "KPI", title: "8 · eNPS by survey year", desc: "Promoters (9–10) minus detractors (0–6), as a percentage of responses.",
    sql: "SELECT SurveyYear,\n       COUNT(*) AS responses,\n       ROUND(100 * (SUM(eNPS_Score >= 9) - SUM(eNPS_Score <= 6)) / COUNT(*), 1) AS enps\nFROM Engagement_Survey\nGROUP BY SurveyYear;      -- 2023: 15.2 · 2024: 15.2 · 2025: 16.1" },
  { cat: "Mart view", title: "9 · vw_employee_snapshot: the mart view", desc: "One row per employee with everything an attrition analysis needs. Tableau can connect to this directly.",
    sql: "CREATE OR REPLACE VIEW vw_employee_snapshot AS\nSELECT\n  e.EmployeeID, e.FullName, e.Gender, e.HireDate, e.ExitDate, e.EmploymentStatus,\n  TIMESTAMPDIFF(YEAR, e.DateOfBirth, COALESCE(e.ExitDate, '2025-12-31'))      AS age,\n  ROUND(DATEDIFF(COALESCE(e.ExitDate, '2025-12-31'), e.HireDate) / 365.25, 1) AS tenure_yrs,\n  d.DepartmentName, g.DesignationTitle, e.JobLevel, l.City, e.WorkMode,\n  s.AnnualCTC, ROUND(s.AnnualCTC / g.BandMidCTC, 2)                          AS compa_ratio,\n  pr.FinalRating                                                             AS last_rating,\n  x.ExitType, x.ExitReason, x.RegrettableAttrition\nFROM Employees e\nJOIN Dim_Department d  ON d.DepartmentID  = e.DepartmentID\nJOIN Dim_Designation g ON g.DesignationID = e.DesignationID\nJOIN Dim_Location l    ON l.LocationID    = e.LocationID\nLEFT JOIN Salary_History s ON s.EmployeeID = e.EmployeeID\n     AND s.EffectiveFrom <= COALESCE(e.ExitDate, '2025-12-31')\n     AND (s.EffectiveTo IS NULL OR s.EffectiveTo >= COALESCE(e.ExitDate, '2025-12-31'))\nLEFT JOIN Performance_Reviews pr ON pr.EmployeeID = e.EmployeeID\n     AND pr.ReviewDate = (SELECT MAX(ReviewDate) FROM Performance_Reviews p2 WHERE p2.EmployeeID = e.EmployeeID)\nLEFT JOIN Exit_Details x ON x.EmployeeID = e.EmployeeID;\n\nSELECT COUNT(*) FROM vw_employee_snapshot;   -- must be 2,299 (one row per employee)" },
];

const QA_SQL = [
  { title: "QA 1 · Referential integrity (all should return 0)", desc: "Orphans silently drop out of joined visuals.",
    sql: "SELECT COUNT(*) FROM Payroll_Monthly p LEFT JOIN Employees e ON e.EmployeeID = p.EmployeeID WHERE e.EmployeeID IS NULL;   -- 0\nSELECT COUNT(*) FROM Employees e LEFT JOIN Dim_Designation g ON g.DesignationID = e.DesignationID WHERE g.DesignationID IS NULL; -- 0\nSELECT COUNT(*) FROM Candidates c LEFT JOIN Job_Requisitions r ON r.RequisitionID = c.RequisitionID WHERE r.RequisitionID IS NULL; -- 0\nSELECT COUNT(*) FROM Employees e LEFT JOIN Employees m ON m.EmployeeID = e.ManagerID\nWHERE e.ManagerID IS NOT NULL AND m.EmployeeID IS NULL;                                                            -- 0" },
  { title: "QA 2 · Duplicates at each table's grain", desc: "Payroll and attendance are one row per employee per month, so any duplicate is an ETL bug.",
    sql: "SELECT EmployeeID, PayMonth, COUNT(*) FROM Payroll_Monthly GROUP BY EmployeeID, PayMonth HAVING COUNT(*) > 1;       -- 0 rows\nSELECT EmployeeID, ReviewCycle, COUNT(*) FROM Performance_Reviews GROUP BY 1,2 HAVING COUNT(*) > 1;               -- 0 rows\nSELECT EmployeeID, COUNT(*) FROM Salary_History WHERE IsCurrent = 'Yes' GROUP BY 1 HAVING COUNT(*) > 1;           -- 0 rows" },
  { title: "QA 3 · Status consistency", desc: "Employees, Exit_Details and the headcount rule must agree with each other.",
    sql: "-- exited in Employees but no matching exit row\nSELECT COUNT(*) FROM Employees e\nLEFT JOIN Exit_Details x ON x.EmployeeID = e.EmployeeID AND x.ExitStatus = 'Exited'\nWHERE e.EmploymentStatus = 'Exited' AND x.ExitID IS NULL;               -- 0\n\n-- Employees.ExitDate must equal Exit_Details.LastWorkingDate\nSELECT COUNT(*) FROM Employees e JOIN Exit_Details x ON x.EmployeeID = e.EmployeeID\nWHERE x.ExitStatus = 'Exited' AND e.ExitDate <> x.LastWorkingDate;    -- 0" },
  { title: "QA 4 · Payroll arithmetic & December reconciliation", desc: "Compare the SQL totals with your Payroll page cards for Dec-2025.",
    sql: "SELECT COUNT(*) FROM Payroll_Monthly WHERE NetPay <> GrossEarnings - TotalDeductions;   -- 0\n\nSELECT COUNT(*) AS employees_paid,          -- 1,351\n       SUM(GrossEarnings) AS gross,         -- 14,68,21,207\n       SUM(TDS) AS tds,                     -- 1,87,95,278\n       SUM(NetPay) AS net_pay,              -- 12,03,20,615\n       SUM(TotalEmployerCost) AS cost       -- 15,73,65,100\nFROM Payroll_Monthly\nWHERE PayMonth = '2025-12-01';" },
  { title: "QA 5 · Attendance arithmetic", desc: "Every working day must be accounted for as present, paid leave or LOP.",
    sql: "SELECT COUNT(*) FROM Attendance_Monthly\nWHERE PresentDays + PaidLeaveDays + LOPDays <> EligibleWorkingDays;   -- 0\nSELECT COUNT(*) FROM Attendance_Monthly\nWHERE WorkFromOfficeDays + WorkFromHomeDays <> PresentDays;           -- 0" },
];

const QA_CHECKLIST = [
  { id: "q1", t: "Row counts match", d: "All 18 tables match the Dataset page." },
  { id: "q2", t: "Headcount rule verified", d: "SQL, Tableau and Power BI show 1,338 on 31-Dec-2025." },
  { id: "q3", t: "Attrition denominator", d: "Uses average headcount and LastWorkingDate, excludes Serving Notice." },
  { id: "q4", t: "SCD filter applied", d: "Salary/Job history filtered to the record valid on the date." },
  { id: "q5", t: "Filters behave", d: "Department/location/level slicers change every visual consistently." },
  { id: "q6", t: "Payroll ties out", d: "Dec-2025 gross, TDS and net match SQL to the rupee." },
  { id: "q7", t: "No blank / (Blank) labels", d: "Every visual's category axis is fully populated." },
  { id: "q8", t: "Definitions documented", d: "Each KPI card links back to its KPI Library definition." },
];

/* ---------------- EXCEL ---------------- */
const EXCEL_TASKS = [
  ["Headcount on a date", "=SUMPRODUCT((HireDate<=D)*(((ExitDate=\"\")+(ExitDate>D))>0))", "1,338 on 31-Dec-2025", "Starter ✓"],
  ["Hires in a year", "=COUNTIFS(HireDate,\">=\"&DATE(Y,1,1),HireDate,\"<=\"&DATE(Y,12,31))", "252 in 2025", "Starter ✓"],
  ["Exits in a year", "=COUNTIFS(LWD,\">=\"&DATE(Y,1,1),LWD,\"<=\"&DATE(Y,12,31),ExitStatus,\"Exited\")", "175 in 2025", "Starter ✓"],
  ["Attrition %", "=Exits / ((Opening HC + Closing HC)/2)", "13.5% in 2025", "Starter ✓"],
  ["Female %", "=SUMPRODUCT(active * (Gender=\"Female\")) / Closing HC", "35.8%", "Starter ✓"],
  ["Age", "=DATEDIF(DateOfBirth, AsOfDate, \"y\")", "Avg 31.4 yrs (active)", "Your task"],
  ["Tenure band", "=IFS(t<1,\"<1\",t<2,\"1-2\",t<4,\"2-4\",t<7,\"4-7\",TRUE,\"7+\")", "Use in a pivot", "Your task"],
  ["Department lookup", "=XLOOKUP(DepartmentID, Dim_Department[DepartmentID], Dim_Department[DepartmentName])", "13 departments", "Your task"],
  ["Compa-ratio", "=AnnualCTC / XLOOKUP(DesignationID, Dim_Designation[DesignationID], Dim_Designation[BandMidCTC])", "Median 0.98", "Your task"],
  ["eNPS", "=(COUNTIF(score,\">=9\")-COUNTIF(score,\"<=6\"))/COUNT(score)", "+16.1 in 2025", "Your task"],
];
const PIVOTS = [
  { n: "01", h: "Headcount by department × level", p: "Rows: DepartmentName · Columns: JobLevel · Values: Count of EmployeeID (active filter). Spot the top-heavy departments." },
  { n: "02", h: "Exits by month and exit type", p: "Rows: Month of LastWorkingDate · Columns: ExitType · filter ExitStatus = Exited. The 2023 restructuring jumps out." },
  { n: "03", h: "Exit reasons by department", p: "Rows: ExitReason · Columns: Department · filter Voluntary. Which department leaves for pay vs growth?" },
  { n: "04", h: "Payroll cost by month", p: "From Payroll_Monthly: Rows: PayMonth · Values: Sum of TotalEmployerCost. Explain the June spike (bonus + arrears)." },
  { n: "05", h: "Rating distribution by department", p: "From Performance_Reviews FY2024-25: Rows: Department · Columns: FinalRating · Show values as % of row total." },
];

/* ---------------- DASHBOARD GALLERY ---------------- */
function galleryPages() {
  const H = HR, v = V25;
  return [
    { n: "01", t: "Workforce Overview", q: "How has the size and shape of our workforce changed?", ins: "Headcount grew 6.1% in 2025 to 1,338; Engineering is 36% of the company.", iq: "Why can't monthly headcount simply be summed?", aud: "CEO · CHRO", keys: ["Headcount", "Hires", "Exits", "Female %"],
      desc: "Who works here today, where, at what level, and how the workforce changed over five years.",
      mock: { title: "Workforce Overview — CY2025", sub: "As of 31-Dec-2025, computed from Employees + Dim tables",
        kpis: [{ v: fmtN(v.HC), l: "Headcount (closing)" }, { v: fmtN(v.HIRES), l: "New hires" }, { v: fmtN(v.EXITS), l: "Exits" }, { v: f1(v.FEM) + "%", l: "Female %" }, { v: Number(v.TEN).toFixed(2) + " yrs", l: "Avg tenure" }, { v: Number(v.SPAN).toFixed(1), l: "Span of control" }],
        donuts: [{ title: "Gender mix", data: H.hc_gender }, { title: "Work mode", data: H.hc_mode }],
        bars: [{ title: "Headcount by department", data: H.hc_dept }, { title: "Headcount by location", data: H.hc_loc }, { title: "Headcount by job level", data: H.hc_level }, { title: "Age band", data: H.hc_age }] },
      build: { tableau: ["Headcount as a calculated field with a date parameter: IF [HireDate] <= [p_AsOf] AND (ISNULL([ExitDate]) OR [ExitDate] > [p_AsOf]) THEN 1 END", "Year-end headcount trend: a scaffold of month-end dates, or one calc per year", "Dept / location bars sorted descending"],
               powerbi: ["Headcount measure with VAR d = MAX(Dim_Date[Date]) and FILTER(ALL(Employees))", "Line chart: Dim_Date[YearMonth] on axis + Headcount measure (no relationship needed)", "Card visuals with conditional formatting vs prior year"] } },
    { n: "02", t: "Attrition & Retention", q: "Who is leaving, from where, and why?", ins: "13.5% attrition; Customer Success & Support and Sales lose people fastest; pay is the #1 reason.", iq: "Why is the attrition denominator average headcount?", aud: "CHRO · Department heads", keys: ["Attrition %", "Voluntary %", "Regrettable %", "Early attrition"],
      desc: "How many people leave, from where, why, and which drivers predict it.",
      mock: { title: "Attrition & Retention — CY2025", sub: "Exits by last working day · average-headcount method",
        kpis: [{ v: f1(v.ATTR) + "%", l: "Attrition" }, { v: f1(v.VOL) + "%", l: "Voluntary attrition" }, { v: f1(v.REGRET) + "%", l: "Regrettable (of voluntary)" }, { v: f1(v.EARLY) + "%", l: "Exits < 1 yr tenure" }, { v: f1(v.RET) + "%", l: "Retention rate" }],
        donuts: [{ title: "Exit type", data: H.exit_type_2025 }],
        bars: [{ title: "Exits by month (LWD, 2025)", data: H.exits_by_month_2025 }, { title: "Voluntary attrition % by department", data: H.vol_attr_dept, suffix: "%" }, { title: "Top voluntary exit reasons", data: H.reasons_2025 }, { title: "Attrition % by year", data: (H.attr_trend || []).map(r => [r[0], r[1]]), suffix: "%" }] },
      build: { tableau: ["LOD for average headcount per department: {FIXED [Department]: ...}", "Reference line at company attrition % on the department bar", "Driver bars: Compa band / Overtime band as dimensions"],
               powerbi: ["Exits measure with USERELATIONSHIP(Exit_Details[LastWorkingDate], Dim_Date[Date])", "Attrition % = DIVIDE([Exits], [Avg HC])", "Decomposition tree on voluntary exits"] } },
    { n: "03", t: "Talent Acquisition", q: "How fast and how efficiently do we hire?", ins: "45 days to fill; offer acceptance 86%; referrals are the cheapest channel but under-used.", iq: "What is the difference between time to fill and time to hire?", aud: "TA Lead · Hiring managers", keys: ["Open reqs", "Time to fill", "Offer acceptance", "Cost per hire"],
      desc: "How fast and how efficiently Proxima hires, and which channels are worth the money.",
      mock: { title: "Talent Acquisition — CY2025", sub: "Job_Requisitions + Candidates (campus excluded from time metrics)",
        kpis: [{ v: fmtN(v.OPENREQ), l: "Open reqs (31-Dec)" }, { v: f1(v.TTF) + " d", l: "Time to fill" }, { v: f1(v.TTH) + " d", l: "Time to hire" }, { v: f1(v.OAR) + "%", l: "Offer acceptance" }, { v: "₹" + fmtN(Math.round(v.CPH)), l: "Cost per hire" }],
        donuts: [{ title: "Source of hire", data: (H.src_2025 || []).slice(0, 6) }],
        bars: [{ title: "Recruitment funnel (applications in 2025)", data: H.funnel_2025 }, { title: "Time to fill by level (days)", data: H.ttf_level }, { title: "Cost per hire by source (₹)", data: H.cost_by_source }, { title: "Offer decline reasons", data: H.decline_reasons }] },
      build: { tableau: ["Funnel: stage as dimension, COUNT of non-null stage dates", "TTF = DATEDIFF('day', [OpenDate], [ClosedDate])", "Filter RequisitionType <> Campus Hiring"],
               powerbi: ["Funnel visual with one measure per stage", "Relationship Candidates → Job_Requisitions (Many:1)", "Slicer on Source, Department"] } },
    { n: "04", t: "Compensation & Payroll", q: "What do people cost, and is pay competitive and fair?", ins: "₹199 Cr employer cost; median compa-ratio 0.98; June spikes from bonus + arrears.", iq: "How do you calculate compa-ratio from an SCD salary table?", aud: "CFO · CHRO · Payroll", keys: ["Employer cost", "Avg CTC", "Compa-ratio", "Pay gap"],
      desc: "What people cost, whether pay is competitive and fair, and how the appraisal budget was spent.",
      mock: { title: "Compensation & Payroll — CY2025", sub: "Payroll_Monthly + Salary_History + Dim_Designation bands",
        kpis: [{ v: "₹" + Number(v.PAYCOST).toFixed(1) + " Cr", l: "Employer cost" }, { v: "₹" + Number(v.AVGCTC).toFixed(1) + " L", l: "Avg CTC (active)" }, { v: Number(v.COMPA).toFixed(2), l: "Median compa-ratio" }, { v: f1(v.HIKE) + "%", l: "Avg hike incl. promotions" }, { v: f1(v.GPG) + "%", l: "Gender pay gap (level-adj.)" }],
        donuts: [{ title: "Compa-ratio bands (active)", data: H.compa_dist }],
        bars: [{ title: "Employer cost by month (₹ Cr)", data: H.paycost_month_2025 }, { title: "Average CTC by level (₹ L)", data: H.ctc_level }, { title: "Annual hike % by rating (Apr-2025)", data: H.hike_by_rating, suffix: "%" }, { title: "Gender pay gap % by level", data: H.gap_level, suffix: "%" }] },
      build: { tableau: ["Use the SCD filter: EffectiveFrom <= date <= EffectiveTo", "Compa histogram with bins of 0.1", "Annotate June: bonus + arrears"],
               powerbi: ["Employer Cost = SUM(Payroll_Monthly[TotalEmployerCost]) on PayMonth", "Compa ratio in a matrix by Level × Department with conditional colours", "Format ₹ Cr via measure ÷ 1e7"] } },
    { n: "05", t: "Performance & L&D", q: "Do we differentiate performance and invest in skills?", ins: "39% rated 4–5; promotion rate 10.9%; ~25 training hours per employee.", iq: "How would you show a 9-box grid?", aud: "CHRO · L&D Manager", keys: ["Rating mix", "9-box", "Promotion %", "Training hrs"],
      desc: "Are we differentiating performance, promoting the right people and investing in skills?",
      mock: { title: "Performance & L&D — FY2024-25 cycle / CY2025", sub: "Performance_Reviews, Job_History, Training_Records",
        kpis: [{ v: f1(v.HIPO) + "%", l: "Rated 4–5" }, { v: f1(v.PROMO) + "%", l: "Promotion rate" }, { v: Number(v.YSP).toFixed(2) + " yrs", l: "Avg yrs since promotion" }, { v: f1(v.TRHRS) + " h", l: "Training hrs / employee" }, { v: f1(v.COMPL) + "%", l: "Compliance completion" }],
        donuts: [{ title: "Rating distribution", data: H.rating_dist }],
        bars: [{ title: "9-box placement", data: H.ninebox }, { title: "Promotions by year", data: H.promos_year }, { title: "Training hours by category", data: H.trn_hours_cat }, { title: "Training record status", data: H.trn_status }] },
      build: { tableau: ["9-box: Performance band × PotentialRating highlight table", "Promotions from Job_History EventType", "Training hours on StartDate"],
               powerbi: ["Matrix visual for 9-box with counts", "Promotion % = promotions ÷ Avg HC", "Program slicer from Dim_TrainingProgram"] } },
    { n: "06", t: "Engagement & Attendance", q: "How do people feel and how do they show up?", ins: "eNPS +16; detractors leave at ~1.7× the rate of promoters; WFO up to 62%.", iq: "How do you calculate eNPS?", aud: "HR Business Partners", keys: ["eNPS", "Engagement index", "Absenteeism", "WFO %"],
      desc: "How people feel, how they show up, and where workload is too high.",
      mock: { title: "Engagement & Attendance — CY2025", sub: "Engagement_Survey (Oct-2025), Attendance_Monthly, Leave_Requests",
        kpis: [{ v: "+" + f1(v.ENPS), l: "eNPS" }, { v: f1(v.EI) + "%", l: "Engagement index" }, { v: f1(v.STAY) + "%", l: "Intent to stay" }, { v: f1(v.ABSENT) + "%", l: "Absenteeism" }, { v: f1(v.WFO) + "%", l: "Work-from-office" }],
        donuts: [{ title: "Approved leave days by type", data: (H.leave_type_2025 || []).slice(0, 6) }],
        bars: [{ title: "eNPS by department", data: H.enps_dept_2025 }, { title: "WFO % trend", data: H.wfo_trend, suffix: "%" }, { title: "Overtime hrs / employee / month", data: H.ot_dept_2025 }, { title: "Leave days by month", data: H.leave_month_2025 }] },
      build: { tableau: ["eNPS calc: (SUM(IF score>=9 THEN 1 END) - SUM(IF score<=6 THEN 1 END)) / COUNT", "Diverging bar for eNPS by department", "Dual axis: WFO % vs present days"],
               powerbi: ["eNPS measure + SurveyYear slicer", "Absenteeism % = (Sick + LOP) ÷ Eligible days", "Heatmap matrix: Department × Month overtime"] } },
  ];
}

/* ---------------- ASSIGNMENTS ---------------- */
const DEPT_NAMES = ["Customer Success & Support", "Sales & Business Development", "Data & Analytics", "Engineering", "Quality Assurance", "IT Infrastructure & Cloud Ops", "Marketing", "Human Resources", "Finance & Accounts", "Product Management", "Administration & Facilities", "Legal & Compliance"];
function assignments() {
  const a = HR.ans || {};
  return [
    { id: "a1", tool: "Data Exploration · Excel or SQL", track: "business", t: "How many employees were on the rolls on 31-Dec-2025?",
      task: ["Use Employees only.", "An employee counts if HireDate ≤ 31-Dec-2025 AND (ExitDate is blank OR ExitDate > 31-Dec-2025).", "Serving-notice employees are still on the rolls."],
      type: "num", ans: a.hc_2025, tol: 0, unit: "employees", hint: "Count both Active and Serving Notice statuses. Don't use EmploymentStatus = 'Active' alone.",
      sol: "SELECT COUNT(*)\nFROM Employees\nWHERE HireDate <= '2025-12-31'\n  AND (ExitDate IS NULL OR ExitDate > '2025-12-31');   -- " + a.hc_2025 },
    { id: "a2", tool: "SQL", track: "sql", t: "How many employees exited in calendar year 2025?",
      task: ["Use Exit_Details.", "Count separations whose LastWorkingDate is in 2025.", "Exclude rows that are still 'Serving Notice'."],
      type: "num", ans: a.exits_2025, tol: 0, unit: "exits", hint: "Filter on LastWorkingDate (not ResignationDate) and ExitStatus = 'Exited'.",
      sol: "SELECT COUNT(*)\nFROM Exit_Details\nWHERE ExitStatus = 'Exited'\n  AND LastWorkingDate BETWEEN '2025-01-01' AND '2025-12-31';   -- " + a.exits_2025 + " (" + a.vol_2025 + " voluntary)" },
    { id: "a3", tool: "SQL", track: "kpi", t: "What was the overall attrition rate % for 2025?",
      task: ["Attrition % = exits in 2025 ÷ average headcount × 100.", "Average headcount = (headcount on 31-Dec-2024 + headcount on 31-Dec-2025) ÷ 2.", "Give one decimal."],
      type: "num", ans: a.attr_2025, tol: 0.15, unit: "%", hint: "Opening headcount 31-Dec-2024 = 1,261; closing = 1,338.",
      sol: "-- exits / ((opening + closing) / 2)\n-- " + a.exits_2025 + " / ((1261 + 1338) / 2) = " + a.attr_2025 + "%\n\n-- DAX\nAttrition % = DIVIDE([Exits], [Avg HC])" },
    { id: "a4", tool: "SQL", track: "sql", t: "Which department had the highest VOLUNTARY attrition % in 2025?",
      task: ["Compute each department's average headcount for 2025.", "Divide that department's voluntary exits in 2025 by it.", "Pick the highest (ignore the 3-person Executive Office)."],
      type: "select", options: DEPT_NAMES, ans: (a.top_vol_dept || [])[0], hint: "It's a customer-facing team with rotational and night shifts.",
      sol: "-- See SQL Lab query 5\n-- Result: " + (a.top_vol_dept || [])[0] + " ≈ " + (a.top_vol_dept || [])[1] + "% voluntary attrition" },
    { id: "a5", tool: "Excel", track: "excel", t: "What was the total employer cost for 2025, in ₹ Crore?",
      task: ["Use Payroll_Monthly.", "Sum TotalEmployerCost for PayMonth in Jan–Dec 2025.", "Divide by 1,00,00,000 and give two decimals."],
      type: "num", ans: a.paycost_2025_cr, tol: 0.1, unit: "₹ Cr", hint: "A pivot with PayMonth grouped by year does this in seconds.",
      sol: "=SUMIFS(Payroll[TotalEmployerCost], Payroll[PayMonth], \">=\"&DATE(2025,1,1), Payroll[PayMonth], \"<=\"&DATE(2025,12,1)) / 1E7\n→ " + a.paycost_2025_cr + " Cr" },
    { id: "a6", tool: "Tableau", track: "tableau", t: "Build an exits-by-month bar chart for 2025. Which month had the most exits?",
      task: ["Data source: Exit_Details (ExitStatus = Exited).", "Columns: MONTH(LastWorkingDate) · Rows: COUNT(ExitID) · Filter: YEAR = 2025.", "Read off the tallest bar."],
      type: "select", options: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ans: (a.peak_exit_month || [])[0],
      hint: "Use LastWorkingDate, not ResignationDate, because those shift the curve by the notice period.",
      sol: "Peak month: " + (a.peak_exit_month || [])[0] + " with " + (a.peak_exit_month || [])[1] + " exits.\nTableau: drag LastWorkingDate → Columns (Month, discrete), CNT(ExitID) → Rows, filter ExitStatus = 'Exited' and YEAR(LastWorkingDate) = 2025." },
    { id: "a7", tool: "Power BI", track: "powerbi", t: "Write a Headcount DAX measure. What does it return for 30-Jun-2025?",
      task: ["Employees has no active relationship to Dim_Date.", "Measure must read the selected date: VAR d = MAX(Dim_Date[Date]).", "Put the measure on a card and filter Dim_Date to 30-Jun-2025."],
      type: "num", ans: a.hc_jun25, tol: 0, unit: "employees", hint: "FILTER(ALL(Employees), HireDate <= d && (ISBLANK(ExitDate) || ExitDate > d)).",
      sol: "Headcount =\nVAR d = MAX ( Dim_Date[Date] )\nRETURN\nCALCULATE (\n    COUNTROWS ( Employees ),\n    FILTER ( ALL ( Employees ),\n        Employees[HireDate] <= d &&\n        ( ISBLANK ( Employees[ExitDate] ) || Employees[ExitDate] > d ) ) )\n\n-- 30-Jun-2025 → " + a.hc_jun25 },
    { id: "a8", tool: "SQL · Recruitment", track: "kpi", t: "What was the offer acceptance rate % for offers released in 2025?",
      task: ["Use Candidates with OfferDate in 2025.", "Accepted = Joined + 'Offer Accepted - Yet to Join' + 'Offer Accepted - Did Not Join'.", "Give one decimal."],
      type: "num", ans: a.oar_2025, tol: 0.2, unit: "%", hint: "Reneged offers were still accepted, so they count in the numerator.",
      sol: "SELECT ROUND(100 * SUM(ApplicationStatus IN ('Joined','Offer Accepted - Yet to Join','Offer Accepted - Did Not Join')) / COUNT(*), 1)\nFROM Candidates\nWHERE OfferDate IS NOT NULL AND YEAR(OfferDate) = 2025;   -- " + a.oar_2025 },
    { id: "a9", tool: "QA", track: "qa", t: "Reconcile December 2025 payroll: what is the total NetPay?",
      task: ["Run the SQL for PayMonth = 2025-12-01.", "Build the same card in Power BI or Tableau.", "Both must match to the rupee: enter the total (no commas needed)."],
      type: "num", ans: a.dec_net, tol: 1, unit: "₹", hint: "1,351 employees were paid in December 2025 (including leavers' final month).",
      sol: "SELECT SUM(NetPay) FROM Payroll_Monthly WHERE PayMonth = '2025-12-01';\n-- ₹" + fmtN(a.dec_net) + "\nIf your dashboard differs: check the date relationship on PayMonth and that no visual-level filter is applied." },
    { id: "a10", tool: "Data Model", track: "model", t: "How many employees are 'Serving Notice' on 31-Dec-2025, and are they in headcount?",
      task: ["Use Employees.EmploymentStatus.", "Count Serving Notice rows.", "Think: should they be in the 1,338?"],
      type: "num", ans: a.serving_notice, tol: 0, unit: "employees", hint: "They resigned in late 2025 but their last working day is in 2026.",
      sol: "SELECT COUNT(*) FROM Employees WHERE EmploymentStatus = 'Serving Notice';   -- " + a.serving_notice + "\nYes, they are still on the rolls, so they're included in headcount and are NOT 2025 exits. They become 2026 exits." },
    { id: "a11", tool: "Engagement", track: "kpi", t: "What was the eNPS in the October 2025 survey?",
      task: ["Use Engagement_Survey where SurveyYear = 2025.", "eNPS = % promoters (9–10) − % detractors (0–6).", "One decimal."],
      type: "num", ans: a.enps_2025, tol: 0.2, unit: "", hint: "Passives (7–8) count in the denominator but not the numerator.",
      sol: "SELECT ROUND(100 * (SUM(eNPS_Score >= 9) - SUM(eNPS_Score <= 6)) / COUNT(*), 1)\nFROM Engagement_Survey WHERE SurveyYear = 2025;   -- " + a.enps_2025 },
    { id: "a12", tool: "Business Analysis", track: "career", t: "What was the #1 voluntary exit reason in 2025?",
      task: ["Filter Exit_Details: ExitType = Voluntary, ExitStatus = Exited, LastWorkingDate in 2025.", "Count by ExitReason.", "Pick the top one, then write one recommendation for it."],
      type: "select", options: ["Better Compensation", "Career Growth / Promotion", "Work-Life Balance / Workload", "Manager / Team Issues", "Personal / Family Reasons", "Higher Studies", "Relocation / Moving Cities"],
      ans: (a.top_reason || [])[0], hint: "Cross-check it against the compa-ratio driver on the Business Analysis page.",
      sol: (a.top_reason || [])[0] + " (" + (a.top_reason || [])[1] + " voluntary exits).\nRecommendation: market correction for employees below 0.85 compa-ratio, who leave at almost twice the rate of those paid above 1.05." },
  ];
}

/* ---------------- ANALYST THINKING LAB ---------------- */
const LAB = [
  { t: "Attrition jumped, headcount barely moved", scn: "Q3 attrition jumped from 11% to 16% annualised, but closing headcount fell only 1%. The CHRO wants to know if it's a crisis.",
    opts: [["Announce a retention bonus for everyone", "weak"], ["Check whether the spike is concentrated in one department, level or manager", "best"], ["Increase hiring targets", "weak"], ["Compare with last year's Q3 (seasonality)", "ok"]],
    exp: ["Concentration first: a company-wide average hides that one team may be driving it.", "Then seasonality (Q3 has post-appraisal exits) and voluntary vs involuntary split.", "Headcount barely moved because hiring kept pace, so the cost is in hiring spend and lost productivity, not size."] },
  { t: "Engagement up, attrition up", scn: "eNPS improved from +15 to +16, yet voluntary attrition rose from 10.4% to 11.5%.",
    opts: [["Conclude the survey is useless", "weak"], ["Check if leavers were survey non-respondents or detractors", "best"], ["Ignore eNPS from now on", "weak"], ["Look at response rate changes", "ok"]],
    exp: ["Averages can rise while the at-risk group gets worse. Join 2024 survey responses to 2025 exits.", "In this data, detractors left at ~15% vs ~9% for promoters, so the survey still predicts.", "Response rate fell from 86% to 79%: the unhappy may simply not be responding."] },
  { t: "Dashboard headcount ≠ HRMS headcount", scn: "Your Power BI card shows 1,312 on 31-Dec-2025. The HRMS report says 1,338. Finance is waiting.",
    opts: [["Hard-code 1,338 into the card", "weak"], ["Check if the measure filters EmploymentStatus = 'Active' only", "best"], ["Refresh the dataset", "ok"], ["Tell Finance HRMS is wrong", "weak"]],
    exp: ["1,338 − 1,312 = 26 = exactly the Serving Notice employees.", "A status filter drops people who resigned but are still on the rolls. Use the HireDate/ExitDate rule instead.", "Never force a number to match; find the definition difference and document it."] },
  { t: "\"Our attrition is 7.6%\"", scn: "A manager divided 175 exits in 2025 by all 2,299 employees ever in the system and reported 7.6% attrition.",
    opts: [["Accept it, as it's lower and leadership will be happy", "weak"], ["Recompute with average headcount for the year", "best"], ["Divide by closing headcount instead", "ok"], ["Use hires as the denominator", "weak"]],
    exp: ["The denominator must be the people at risk of leaving during the period: average headcount (1,299.5).", "Correct rate: 175 ÷ 1,299.5 = 13.5%.", "Closing headcount (13.1%) is a common shortcut but biased when the company is growing."] },
  { t: "June payroll spike", scn: "The CFO sees June 2025 employer cost at ₹31.4 Cr vs ~₹15 Cr in other months and asks if payroll was double-paid.",
    opts: [["Delete June from the chart", "weak"], ["Break June down by component: Basic/HRA vs Bonus vs Arrears", "best"], ["Check headcount in June", "ok"], ["Escalate to the payroll vendor", "weak"]],
    exp: ["Increments effective 1-April are paid in June with April–May arrears, and the annual performance bonus is also paid in June.", "A component breakdown shows fixed pay is flat; Bonus_Incentive and Arrears explain the spike.", "Add an annotation so nobody asks again."] },
  { t: "Referral vs consultant hiring", scn: "TA wants to double consultant usage because \"consultants close faster\". Budget is fixed.",
    opts: [["Approve, since speed matters most", "weak"], ["Compare time to fill, cost per hire and 1-year retention by source", "best"], ["Ban consultants", "weak"], ["Survey hiring managers", "ok"]],
    exp: ["Consultant cost ≈ 8.33% of CTC (~₹1.5 L per hire here) vs ~₹34 K for a referral.", "Check quality, not just speed: early attrition by source.", "Typical answer: consultants for hard-to-fill L4+ roles only, and invest the savings in referral bonuses."] },
  { t: "Gender pay gap headline", scn: "A raw comparison shows women earn about 6% less than men on average. The CEO wants that number on the board deck.",
    opts: [["Publish 18% as is", "weak"], ["Compare within the same job level and weight the gaps", "best"], ["Remove gender from the dashboard", "weak"], ["Compare medians instead of means", "ok"]],
    exp: ["A raw gap mixes level composition: fewer women in senior levels inflates it.", "Level-adjusted gap here is ~3%, which is the like-for-like pay question.", "Report both: the adjusted gap (pay equity) AND women in leadership (representation)."] },
  { t: "Rating inflation suspicion", scn: "One department rated 62% of its people 4 or 5, versus 39% company-wide.",
    opts: [["Force a bell curve immediately", "weak"], ["Compare their goal achievement %, promotions and attrition with other departments", "best"], ["Ignore it", "weak"], ["Ask the department head", "ok"]],
    exp: ["Check if outcomes support the ratings (goal achievement, revenue, project delivery).", "If ratings are high but goal achievement is average, it's leniency, which also inflates the hike budget.", "Bring calibration data to the next review cycle rather than overriding ratings."] },
  { t: "Return-to-office policy", scn: "Leadership mandated 3 office days a week (60%). WFO compliance is now 62%. They ask whether it's working.",
    opts: [["Declare success, since 62% > 60%", "ok"], ["Check compliance by team AND attrition/engagement for remote-preferring groups", "best"], ["Mandate 5 days", "weak"], ["Stop tracking it", "weak"]],
    exp: ["An average above target can hide teams far below it, and others exceeding it.", "Success also means no spike in exits or detractors among people who were remote before.", "Show WFO % with attrition and eNPS side by side, by department."] },
  { t: "Training ROI question", scn: "L&D spent about ₹14,000 per employee in 2025. The CFO asks what we got for it.",
    opts: [["Show total hours trained", "ok"], ["Compare promotion and attrition rates of trained vs untrained employees", "best"], ["Cut the budget", "weak"], ["Show feedback scores", "weak"]],
    exp: ["Hours and feedback are activity metrics, not outcomes.", "Outcome proxy: trained employees' promotion rate, rating movement and attrition vs a comparable untrained group.", "Be honest that it's correlation; better performers also choose more training."] },
  { t: "Offer declines rising", scn: "Offer acceptance dropped from 88.9% to 86.2% year over year.",
    opts: [["Increase all offers by 10%", "weak"], ["Break declines down by reason, level and location", "best"], ["Hire more recruiters", "weak"], ["Shorten interview rounds", "ok"]],
    exp: ["Reasons first: here 'Relocation not feasible' and 'Better offer elsewhere' lead.", "If relocation dominates, the fix is remote/hybrid options or local hiring, not money.", "Then look at time-to-offer: slow processes lose candidates to faster competitors."] },
  { t: "One manager, many exits", scn: "An HRBP flags that one L5 manager lost 6 of 14 reports in 12 months.",
    opts: [["Remove the manager", "weak"], ["Check exit reasons, ratings and survey scores for that team vs peers", "best"], ["Do nothing because it's a small sample", "ok"], ["Share the data in an all-hands", "weak"]],
    exp: ["6 of 14 is ~43%, which is far above company attrition, even if the sample is small.", "Check whether exits cite 'Manager / Team Issues' and whether the team's ManagerEffectiveness score is low.", "Handle it confidentially with the HRBP; data starts the conversation, it doesn't end it."] },
];

/* ---------------- INTERVIEW QUESTIONS ---------------- */
const QA_CATS = ["Explain This Project", "SQL", "Power BI & DAX", "Tableau", "Data Modeling", "HR Domain", "Scenario-Based", "General & HR", "Rapid Fire"];
const QA = [
  { cat: "Explain This Project", q: "Explain this project to me: what did you actually build?", a: "Structure it as a story: (1) the problem: Proxima's HR data lived in separate systems, so headcount and attrition were inconsistent and late; (2) the data: an 18-table HR warehouse covering 2,299 employees, 2021–2025, with payroll, attendance, leave, performance, training, engagement and recruitment; (3) the work: Excel first-pass, MySQL with a star schema and a mart view, six dashboard pages in Tableau and Power BI; (4) the finding: attrition 13.5% in 2025, with below-band pay, overtime and low engagement as the clearest drivers; (5) QA: every KPI reconciled to SQL. Keep it under two minutes.", signal: "Almost always the first question. It tests structure and communication before anything technical." },
  { cat: "Explain This Project", q: "What was the business problem?", a: "Leadership learned about attrition from resignation emails. HRMS, payroll, ATS and survey data weren't connected, so nobody could link exits to pay, workload or engagement, hiring speed and cost were invisible, and pay fairness had never been measured. One governed model with standard KPI definitions fixes all of that at once.", signal: "Tests whether you can state the 'why' behind the project." },
  { cat: "Explain This Project", q: "What data did you use?", a: "Name the scale precisely: 18 tables: 6 dimensions (Date, Department, Designation with salary bands, Location, Leave Type, Training Program), the Employees master (2,299 rows), two SCD Type 2 history tables (Job_History 2,809, Salary_History 7,322), and facts for performance (5,110), exits (987), payroll and attendance (45,807 each), leave (41,134), training (15,229), survey (2,983), requisitions (627) and candidates (10,644). It's a simulated dataset for a fictional company, built with real Indian HR rules.", signal: "Tests whether 'HR data' gets replaced with real numbers, and whether you're honest about the data being a case study." },
  { cat: "Explain This Project", q: "What did you personally do?", a: "Be specific: e.g. 'I built the attrition page: the headcount and attrition measures, the department and driver visuals, and I wrote the SQL reconciliation for those KPIs.' Vague answers like 'I worked on the dashboard' read as someone who watched rather than built.", signal: "Tests whether you can separate your contribution from the group's." },
  { cat: "Explain This Project", q: "What was the most interesting insight?", a: "Pay position predicted exits: employees below 0.85 compa-ratio left at about 14% versus 8% for those above 1.05, and 'Better Compensation' was the #1 voluntary exit reason. The engagement survey also worked as an early-warning signal: detractors left at ~15% vs ~9% for promoters. Both are actionable: a targeted pay correction and HRBP follow-ups after each survey.", signal: "Tests whether you can go beyond describing charts to a 'so what'." },
  { cat: "Explain This Project", q: "What would you improve with two more weeks?", a: "1) A proper attrition-risk score combining compa-ratio, overtime, tenure and eNPS. 2) Row-level security so each department head sees only their team. 3) A monthly headcount snapshot table so headcount trends don't need date logic in every measure.", signal: "Shows product thinking and self-awareness." },

  { cat: "SQL", q: "How do you calculate headcount on a specific date in SQL?", a: "<code>SELECT COUNT(*) FROM Employees WHERE HireDate &lt;= @d AND (ExitDate IS NULL OR ExitDate &gt; @d);</code><br>The OR with IS NULL is essential. Without it, every active employee drops out because NULL comparisons are never true. On 31-Dec-2025 this returns 1,338.", signal: "The core HR SQL pattern. Tests NULL handling." },
  { cat: "SQL", q: "How did you calculate attrition %, and why that denominator?", a: "Exits with LastWorkingDate in the period ÷ average headcount ((opening + closing) ÷ 2). The denominator should represent the people who could have left during the period. Dividing by closing headcount understates attrition in a growing company; dividing by all employees ever in the table is simply wrong. 2025: 175 ÷ 1,299.5 = 13.5%.", signal: "Tests whether you understand rate denominators, not just the formula." },
  { cat: "SQL", q: "How do you get each employee's salary as of a date from an SCD Type 2 table?", a: "Join on EmployeeID AND EffectiveFrom ≤ @d AND (EffectiveTo IS NULL OR EffectiveTo ≥ @d). Without the date condition you get one row per revision (7,322 rows instead of ~1,338), and every average and sum is wrong.", signal: "Tests slowly-changing-dimension awareness, a classic join trap." },
  { cat: "SQL", q: "Write a query for the top 3 exit reasons per department.", a: "<code>WITH r AS (<br>&nbsp;SELECT e.DepartmentID, x.ExitReason, COUNT(*) n,<br>&nbsp;&nbsp;ROW_NUMBER() OVER (PARTITION BY e.DepartmentID ORDER BY COUNT(*) DESC) rk<br>&nbsp;FROM Exit_Details x JOIN Employees e ON e.EmployeeID = x.EmployeeID<br>&nbsp;WHERE x.ExitType = 'Voluntary' GROUP BY e.DepartmentID, x.ExitReason)<br>SELECT * FROM r WHERE rk &lt;= 3;</code>", signal: "Window functions with PARTITION BY, a very common round-2 ask." },
  { cat: "SQL", q: "How would you find employees who haven't been promoted in 3+ years?", a: "Take the latest promotion or joining date per employee from Job_History (EventType LIKE 'Promotion%' OR 'New Joiner'), then DATEDIFF to today > 3 years, restricted to active employees. Mention that pre-2021 employees start with an 'Opening Balance (HRMS Migration)' record, so their true last promotion may be earlier than the data shows, which is a data limitation to state.", signal: "Tests multi-step logic and honesty about data limitations." },
  { cat: "SQL", q: "How do you calculate time to fill and why exclude campus hiring?", a: "AVG(DATEDIFF(ClosedDate, OpenDate)) for Filled requisitions. Campus requisitions open months before students graduate and join, so including them inflates the average and says nothing about the TA team's speed. ~45 days in 2025, longer (55–66 days) for L4+.", signal: "Tests whether you think about what a metric is supposed to measure." },
  { cat: "SQL", q: "How did you QA the payroll numbers?", a: "Three layers: (1) row-level arithmetic: NetPay = Gross − Deductions returns zero exceptions; (2) grain: no duplicate (EmployeeID, PayMonth); (3) reconciliation: SUM(NetPay) for Dec-2025 = ₹12,03,20,615 in SQL, Tableau and Power BI. Any gap is traced, never patched.", signal: "Tests a structured QA habit." },

  { cat: "Power BI & DAX", q: "Write the Headcount measure in DAX.", a: "<code>Headcount = VAR d = MAX(Dim_Date[Date]) RETURN CALCULATE(COUNTROWS(Employees), FILTER(ALL(Employees), Employees[HireDate] &lt;= d &amp;&amp; (ISBLANK(Employees[ExitDate]) || Employees[ExitDate] &gt; d)))</code><br>Headcount is a semi-additive, point-in-time measure: on a monthly axis it shows each month-end, and it should never be summed across months.", signal: "The defining DAX question for HR dashboards." },
  { cat: "Power BI & DAX", q: "Why are some relationships inactive, and how do you use them?", a: "Exit_Details has two dates (ResignationDate, LastWorkingDate) and Power BI allows only one active path to Dim_Date. I keep ResignationDate active and activate LastWorkingDate inside the attrition measure: <code>Exits = CALCULATE(COUNTROWS(Exit_Details), Exit_Details[ExitStatus]=\"Exited\", USERELATIONSHIP(Exit_Details[LastWorkingDate], Dim_Date[Date]))</code>.", signal: "Tests role-playing dates and USERELATIONSHIP." },
  { cat: "Power BI & DAX", q: "Calculated column or measure: give examples from this project.", a: "Columns: Age Band, Tenure Band, Compa-Ratio on Salary_History (row-level, static). Measures: Headcount, Attrition %, eNPS, Avg CTC, because they must respond to filters. Headcount as a column is impossible because it depends on the selected date.", signal: "Classic conceptual question." },
  { cat: "Power BI & DAX", q: "How would you show attrition % by department correctly?", a: "Keep the same [Attrition %] measure; the Department filter applies to both numerator (Exits via Employees) and denominator ([Avg HC]). Because Headcount uses FILTER(ALL(Employees)), I add KEEPFILTERS or use ALLSELECTED/REMOVEFILTERS on only the date-related columns so the department filter still flows. Then verify one department against SQL.", signal: "Tests filter-context understanding, where most HR measures break." },
  { cat: "Power BI & DAX", q: "How would you implement row-level security for department heads?", a: "Map user email → DepartmentID in a security table, relate it to Dim_Department, and create a role with <code>[Email] = USERPRINCIPALNAME()</code>. Test with 'View as role'. Salary pages usually need a stricter role than headcount pages.", signal: "RLS is standard for any people dashboard, since HR data is sensitive." },
  { cat: "Power BI & DAX", q: "How did you build the eNPS measure?", a: "<code>eNPS = (DIVIDE(CALCULATE(COUNTROWS(Engagement_Survey), Engagement_Survey[eNPS_Score] &gt;= 9), COUNTROWS(Engagement_Survey)) - DIVIDE(CALCULATE(COUNTROWS(Engagement_Survey), Engagement_Survey[eNPS_Score] &lt;= 6), COUNTROWS(Engagement_Survey))) * 100</code>, sliced by SurveyYear. 2025 = +16.1.", signal: "Tests a non-trivial ratio measure." },

  { cat: "Tableau", q: "How do you compute headcount over time in Tableau when there's no 'headcount' row?", a: "Either a date scaffold (a month-end calendar joined to Employees with HireDate ≤ month-end AND (ExitDate > month-end OR null)), or a parameter-driven calc for a single as-of date. The scaffold is better for trend lines.", signal: "Tests whether you understand that headcount is derived, not stored." },
  { cat: "Tableau", q: "How did you build attrition % by department with the right denominator?", a: "LOD: average headcount per department = ({FIXED [Department]: SUM([Opening flag])} + {FIXED [Department]: SUM([Closing flag])}) / 2, then exits ÷ that. A reference line shows the company rate so outliers stand out.", signal: "Tests LOD expressions." },
  { cat: "Tableau", q: "Extract or live connection for this dashboard?", a: "Extract with a daily refresh: HR data changes daily at most, extracts are faster, and they reduce load on the HRMS database. Live only if a real-time joiner/leaver feed is required.", signal: "Connection-mode judgment tied to refresh needs." },
  { cat: "Tableau", q: "How would you show the 9-box grid?", a: "A highlight table: Performance band (Low/Moderate/High from FinalRating) on rows, PotentialRating on columns, COUNT of employees as colour and label, filtered to one review cycle. Click-through to a list for talent reviews.", signal: "Tests matching a familiar HR artifact to a chart type." },

  { cat: "Data Modeling", q: "Why does Employees sit in the centre instead of being a fact table?", a: "It's the conformed employee dimension: one row per employee with descriptive attributes. Every fact (payroll, attendance, reviews, exits…) joins to it on EmployeeID. It also carries HireDate/ExitDate so headcount can be derived for any date.", signal: "Tests star/galaxy schema understanding." },
  { cat: "Data Modeling", q: "What is SCD Type 2 and where did you use it?", a: "Slowly Changing Dimension Type 2 keeps history by adding a new row per change with EffectiveFrom / EffectiveTo (and an IsCurrent flag). Job_History (promotions, transfers) and Salary_History (revisions) use it, so you can ask 'what was this person's level and CTC on 1-Apr-2024?'.", signal: "Very common modelling question." },
  { cat: "Data Modeling", q: "What is the grain of Payroll_Monthly vs Attendance_Monthly vs Leave_Requests?", a: "Payroll and attendance: one row per employee per month (45,807 each). Leave: one row per application, which can span days and even months (maternity). That's why monthly leave-day KPIs come from Attendance_Monthly, not from summing Leave_Requests by StartDate.", signal: "Grain awareness across fact tables." },
  { cat: "Data Modeling", q: "How do you handle the manager hierarchy?", a: "ManagerID is a self-reference to Employees. In Power BI use PATH(EmployeeID, ManagerID) and PATHITEM() to flatten levels; in SQL use a recursive CTE. Only the CEO has a blank ManagerID.", signal: "Tests parent-child hierarchy handling." },

  { cat: "HR Domain", q: "Voluntary vs involuntary vs regrettable attrition: what's the difference?", a: "Voluntary: the employee chose to leave (resignation). Involuntary: the company ended it (performance, misconduct, restructuring), plus retirement here. Regrettable: a voluntary leaver you wanted to keep, defined in this project as last rating 4–5. 2025: 11.5% voluntary, 1.9% involuntary, 27% of voluntary exits regrettable.", signal: "Basic HR vocabulary interviewers expect you to own." },
  { cat: "HR Domain", q: "What is compa-ratio and why does it matter?", a: "Employee pay ÷ midpoint of their salary band. 1.00 = paid at the market midpoint. Below ~0.90 signals flight risk; above ~1.15 signals someone who may have outgrown the band. Here, sub-0.85 employees left at almost twice the rate of those above 1.05.", signal: "Tests compensation literacy." },
  { cat: "HR Domain", q: "What are the main components of an Indian CTC?", a: "Basic (here 40% of fixed), HRA (50% of Basic), Special Allowance (balancing), Employer PF (12% of Basic), Gratuity (4.81% of Basic) and variable pay. Payroll deducts Employee PF, ESI if gross ≤ ₹21,000, state Professional Tax and TDS. CTC ≠ take-home: that's why NetPay is much lower than CTC/12.", signal: "Domain knowledge that makes payroll dashboards credible." },
  { cat: "HR Domain", q: "What is eNPS and what's a good score?", a: "'How likely are you to recommend this company as a place to work?' on 0–10. eNPS = % promoters (9–10) − % detractors (0–6). Anything above 0 is acceptable, +10 to +30 is good, +50 is excellent. Proxima is +16.1.", signal: "Engagement metric literacy." },
  { cat: "HR Domain", q: "Time to fill vs time to hire: what's the difference?", a: "Time to fill: requisition opened → offer accepted (process efficiency, owned by TA + hiring manager). Time to hire: candidate applied → offer accepted (candidate experience). Time to join adds the notice period, which in India is often 60–90 days.", signal: "Tests precise recruitment metric definitions." },

  { cat: "Scenario-Based", q: "The CHRO says: 'Sales attrition is 16.5%. Fix it.' What do you do first?", a: "Clarify: voluntary or total, which levels, which locations. Then slice Sales exits by tenure, compa-ratio, quota attainment (sales incentive), manager and exit reason. If most leavers are under 2 years and below 0.9 compa-ratio, it's a hiring-and-pay problem, not a manager one. Come back with one or two specific levers, not a generic retention plan.", signal: "Tests structured diagnosis before solutions." },
  { cat: "Scenario-Based", q: "Your headcount doesn't match Finance's number. What do you do?", a: "Compare definitions before data: Finance may count contractors, exclude serving-notice employees, or count on payroll-processed basis (1,351 people were paid in December including leavers' final month). Build a bridge table: HR 1,338 → − serving notice / + contractors / + final-month leavers → Finance number. Agree one official definition.", signal: "Tests reconciliation thinking and composure." },
  { cat: "Scenario-Based", q: "Leadership wants a single attrition-risk list of employees. How would you build it responsibly?", a: "Score using drivers proven in the data (compa-ratio, overtime, tenure, eNPS, time since promotion), validate it on last year's exits, share only with HRBPs, and use it for supportive actions (pay review, workload, career conversations), never for punitive ones. Document the model and its error rate.", signal: "Tests analytics plus ethics, increasingly asked in HR roles." },
  { cat: "Scenario-Based", q: "The June payroll is double the other months. Is it an error?", a: "No. Increments effective 1-April are paid in June with April–May arrears, and the annual bonus is paid in June. Break the month into components to prove fixed pay is flat, then annotate the chart.", signal: "Tests domain-driven explanation of an anomaly." },

  { cat: "General & HR", q: "What was your biggest challenge?", a: "Pick something concrete: e.g. our first Power BI headcount was 1,312 vs SQL's 1,338. We'd filtered EmploymentStatus = 'Active', which dropped 26 serving-notice employees. We rewrote the measure using the HireDate/ExitDate rule and added a QA test for it.", signal: "Tests whether your challenge story is specific and believable." },
  { cat: "General & HR", q: "How do you handle sensitive HR data?", a: "Minimum necessary access: aggregate by default, mask names and mobile numbers, RLS on salary pages, no small-group cuts (fewer than 5 people) that could identify individuals, and never export employee-level pay outside the HR team.", signal: "Tests data-privacy awareness, which is critical for HR analytics roles." },
  { cat: "General & HR", q: "How would you explain the dashboard to a non-technical HR head?", a: "Lead with decisions: 'This shows how many people we have, who's leaving and why, and where we're paying below market, so you can act before resignations, not after.' Save 'DAX measure, star schema' for when they ask how it's built.", signal: "One of the most common on-the-spot tests." },

  { cat: "Rapid Fire", q: "Headcount vs FTE?", a: "Headcount counts people; FTE counts workload (a half-time person = 0.5 FTE). This dataset is all full-time + contract, so headcount ≈ FTE.", signal: "Rapid-fire HR vocabulary." },
  { cat: "Rapid Fire", q: "Why DIVIDE() instead of '/' in DAX?", a: "DIVIDE() returns a blank or alternate result instead of an error when the denominator is zero, e.g. a department with no headcount in a filtered month.", signal: "Rapid-fire DAX screening question." },
  { cat: "Rapid Fire", q: "What is LOP?", a: "Loss of Pay: absence without paid-leave balance; the day's salary is deducted in payroll (PaidDays = EmployedDays − LOPDays).", signal: "Indian payroll vocabulary." },
  { cat: "Rapid Fire", q: "Retention rate vs attrition rate?", a: "Retention: % of employees at the start of the period still employed at the end (87.2% in 2025). Attrition: exits ÷ average headcount (13.5%). They aren't simple complements, because new joiners who leave in the same year affect attrition but not retention.", signal: "Tests precision." },
  { cat: "Rapid Fire", q: "What is a semi-additive measure?", a: "One that can be summed across some dimensions (department) but not across time. Headcount is the classic example; take the last value or the average over time instead.", signal: "Modeling vocabulary." },
];

const GLOSSARY = [
  { t: "Headcount", d: "Number of employees on the rolls on a specific date: HireDate ≤ date and (ExitDate blank or > date)." },
  { t: "Average headcount", d: "(Opening headcount + closing headcount) ÷ 2. The denominator for every rate KPI." },
  { t: "Attrition rate", d: "Exits in a period ÷ average headcount × 100." },
  { t: "Voluntary attrition", d: "Exits initiated by the employee (resignations)." },
  { t: "Involuntary attrition", d: "Exits initiated by the company: performance, misconduct, absconding, restructuring (plus retirement in this dataset)." },
  { t: "Regrettable attrition", d: "Voluntary leavers the company wanted to keep. Here, last rating of 4 or 5." },
  { t: "Retention rate", d: "Share of employees present at the start of a period who are still present at the end." },
  { t: "Early attrition", d: "Exits within the first year of joining. Signals hiring or onboarding issues." },
  { t: "Notice period", d: "Contractual days an employee must serve after resigning: 60 days (L1–L3) or 90 days (L4+) here." },
  { t: "Serving notice", d: "Resigned but not yet left. Still counted in headcount until the last working day." },
  { t: "CTC (Cost to Company)", d: "Total annual cost of an employee: fixed pay + variable + employer PF + gratuity." },
  { t: "Compa-ratio", d: "Employee CTC ÷ midpoint of the salary band for their designation. 1.00 = at market midpoint." },
  { t: "Salary band", d: "Min–mid–max range of CTC for a designation (Dim_Designation, FY2025-26 values)." },
  { t: "Gender pay gap (level-adjusted)", d: "Difference between average male and female pay within the same job level, weighted across levels." },
  { t: "EPF / ESI / PT / TDS", d: "Provident Fund (12% of Basic), Employees' State Insurance (if gross ≤ ₹21,000), Professional Tax (state-specific), Tax Deducted at Source." },
  { t: "LOP (Loss of Pay)", d: "Unpaid absence. Salary is pro-rated by paid days." },
  { t: "Arrears", d: "Back-pay for months where a revised salary was effective but not yet paid, e.g. Apr–May increments paid in June." },
  { t: "Time to fill", d: "Days from requisition opening to offer acceptance." },
  { t: "Time to hire", d: "Days from a candidate's application to offer acceptance." },
  { t: "Offer acceptance rate", d: "Accepted offers ÷ offers released." },
  { t: "Renege", d: "A candidate accepts an offer but doesn't join." },
  { t: "Cost per hire", d: "Sourcing cost (consultant fee, referral bonus, portal cost) ÷ hires." },
  { t: "eNPS", d: "Employee Net Promoter Score: % promoters (9–10) − % detractors (0–6)." },
  { t: "Engagement index", d: "Average of the 1–4 survey items (job, environment, work-life balance, relationships, involvement) as a % of 4." },
  { t: "9-box grid", d: "Talent matrix of performance (low/moderate/high) × potential (low/medium/high)." },
  { t: "PIP", d: "Performance Improvement Plan, triggered here by a rating of 1." },
  { t: "Span of control", d: "Average number of direct reports per manager." },
  { t: "SCD Type 2", d: "Slowly Changing Dimension that keeps history with one row per version (EffectiveFrom / EffectiveTo / IsCurrent)." },
  { t: "Grain", d: "What one row of a table represents, e.g. one employee per month in Payroll_Monthly." },
  { t: "Semi-additive measure", d: "A measure (like headcount) that can't be summed over time." },
  { t: "USERELATIONSHIP()", d: "DAX function that activates an inactive relationship inside one measure." },
  { t: "Mart view", d: "A pre-joined SQL view for BI consumption, here vw_employee_snapshot." },
  { t: "Indian fiscal year", d: "April to March, e.g. FY2025-26 = 1-Apr-2025 to 31-Mar-2026." },
];

const TIPS = [
  { n: "01", h: "Tell the project as a story, not a feature list", p: "Problem → data & scale → what you built → the challenge you hit → the insight → the business action. Interviewers remember stories." },
  { n: "02", h: "Always use real numbers", p: "\"HR dataset\" says nothing. \"2,299 employees, 18 tables, 13.5% attrition in 2025, and below-band employees left at almost twice the rate\" is defensible in any follow-up." },
  { n: "03", h: "Know the 'why', not just the 'what'", p: "Why average headcount as the denominator? Why LastWorkingDate and not ResignationDate? Why SCD Type 2? The 'why' is what gets tested." },
  { n: "04", h: "Different rounds test different depth", p: "L1 checks fundamentals (joins, GROUP BY, NULLs). L2 goes deeper: point-in-time headcount, SCD joins, USERELATIONSHIP, filter context." },
  { n: "05", h: "Lead every metric with the business question", p: "\"Compa-ratio tells us who is paid below market and therefore at risk\" beats \"here's a histogram of a ratio\"." },
  { n: "06", h: "Have one specific, honest challenge story", p: "e.g. 1,312 vs 1,338 headcount because of the serving-notice filter. Specific beats dramatic." },
  { n: "07", h: "Respect the data: it's people", p: "Mention privacy (masking, RLS, no tiny groups). HR interviewers notice when candidates treat employee data carefully." },
  { n: "08", h: "Practise explaining to a non-technical stakeholder", p: "\"Explain this dashboard to our HR head\" is a common on-the-spot test. Rehearse it out loud." },
  { n: "09", h: "Structure scenario answers the same way", p: "Clarify scope → diagnose with data → quantify impact → recommend one clear next step." },
];
const TIP_CALLOUT = "Cracking a data analyst interview isn't about reciting definitions. It's about showing how you think and handle messiness: headcount that has to be calculated for a date, a history table that fans out if you join it wrong, a status filter that silently drops 26 people, a stakeholder who wants one number. Every question in the Interview tab is really testing one of those.";
const WEAK_STRONG = [
  { q: "How did you calculate attrition?", weak: "I divided the number of people who left by the total number of employees.", strong: "Exits with a last working day in the period divided by average headcount, i.e. opening plus closing headcount over two. For 2025 that's 175 ÷ 1,299.5 = 13.5%. I used LastWorkingDate, not ResignationDate, and excluded 26 serving-notice employees, who are still on the rolls and become 2026 exits." },
  { q: "What is compa-ratio?", weak: "It's salary divided by some benchmark.", strong: "Employee pay divided by the midpoint of their designation's salary band, so 1.0 means paid at market mid. In our data, people below 0.85 left at about 14% versus 8% above 1.05, which is why we recommended a targeted correction rather than an across-the-board raise." },
  { q: "How did you build headcount in Power BI?", weak: "I counted the employee IDs.", strong: "A measure that reads the selected date with MAX(Dim_Date[Date]) and counts employees with HireDate on or before it and ExitDate blank or after it, using FILTER(ALL(Employees)) because Employees has no active date relationship. It's semi-additive, so the trend shows month-end values and is never summed." },
];

/* ---------------- 90-SEC PITCH ---------------- */
const PITCH_FLOW = [
  { t: "Business Problem", d: "HR data in silos; attrition seen too late.", s: "~10 s", key: ["problem", "attrition", "silo", "late"] },
  { t: "Data Sources", d: "18 tables: HRMS, payroll, attendance, ATS, survey; 2,299 employees.", s: "~10 s", key: ["18", "tables", "2,299", "2299", "payroll"] },
  { t: "Data Cleaning", d: "Coverage windows, status consistency, SCD checks.", s: "~10 s", key: ["clean", "quality", "valid"] },
  { t: "Data Model", d: "Star/galaxy schema, Employees in the centre, SCD Type 2.", s: "~10 s", key: ["model", "star", "schema", "scd"] },
  { t: "KPIs", d: "67 KPIs: headcount, attrition, compa-ratio, eNPS…", s: "~10 s", key: ["kpi", "attrition", "compa", "enps"] },
  { t: "Dashboard", d: "Six pages in Tableau and Power BI, SQL-reconciled.", s: "~10 s", key: ["dashboard", "tableau", "power bi"] },
  { t: "Insights", d: "13.5% attrition; below-band pay & overtime drive exits.", s: "~15 s", key: ["insight", "13.5", "drive", "compa"] },
  { t: "Business Impact", d: "Targeted pay correction, overtime alerts, survey follow-ups.", s: "~15 s", key: ["impact", "recommend", "reduce", "save"] },
];
const ELEVATOR_PITCH = "Proxima's HR team only found out about attrition after people had left: HRMS, payroll, recruitment and survey data lived in separate spreadsheets, so even headcount differed by who you asked. I built an HR analytics solution on an 18-table dataset covering 2,299 employees from 2021 to 2025. After validating the data, I modelled it as a star schema with Employees in the centre and slowly-changing history for jobs and salaries, then implemented 67 KPIs, from point-in-time headcount and attrition to compa-ratio, time to fill and eNPS, across six dashboard pages in Tableau and Power BI, reconciled to SQL. The key finding: attrition was 13.5% in 2025, and employees paid below 0.85 of their band mid-point left at almost twice the rate of those above it, with heavy overtime and low survey scores as early warnings. I recommended a targeted pay correction, overtime alerts for managers and HRBP follow-ups after each survey: actions leadership can take before people resign, not after.";
const PROJECT_FAQ = [
  { q: "Is this real company data?", a: "Be upfront: \"It's a realistic simulated dataset for a fictional company, built with real Indian HR rules: notice periods, CTC structure, PF/ESI/PT/TDS, appraisal cycles.\" Interviewers respect honesty; pretending it's a real employer's data is a red flag." },
  { q: "What if the interviewer isn't technical?", a: "Lead with the business problem and the outcome (13.5% attrition, pay position as the main driver, three concrete actions). Go into SQL/DAX only if they ask." },
  { q: "What if I only worked on one part?", a: "Say so and go deep on it. A detailed answer about the attrition page you built beats a vague claim to have done everything." },
  { q: "Why use two BI tools?", a: "The capstone requires KPI parity across Power BI and Tableau as a reconciliation exercise. In a real job you'd usually use one tool per organisation." },
  { q: "What if I forget a number?", a: "Give the direction honestly (\"roughly one in eight people left last year\") rather than inventing a precise figure." },
];

/* ---------------- CAREER ---------------- */
const RESUME_PROJECT = {
  title: "HR Workforce & Attrition Analytics — Proxima Business Services (Capstone)",
  tools: "Tools: SQL (MySQL) | Excel | Tableau | Power BI | DAX",
  bullets: [
    "Analyzed an 18-table HR dataset (2,299 employees, 45K+ payroll and attendance records, 10K+ candidates) covering 2021–2025",
    "Designed a star/galaxy data model with SCD Type 2 job and salary history and active/inactive date relationships",
    "Built 67 HR KPIs including point-in-time headcount, attrition %, compa-ratio, time to fill, offer acceptance and eNPS",
    "Developed six-page Tableau and Power BI dashboards for workforce, attrition, hiring, compensation, performance and engagement",
    "Performed SQL-to-BI reconciliation of all P1 KPIs (headcount, attrition, payroll cost) to ±0.1",
    "Identified that employees paid below 0.85 compa-ratio left at ~2× the rate of those above 1.05, and recommended a targeted pay correction",
  ],
};
const RESUME_BULLETS = [
  "Built an HR attrition dashboard in Power BI and Tableau over 2,299 employee records, computing point-in-time headcount and attrition (13.5% in 2025) reconciled to SQL within ±0.1%.",
  "Identified pay position as the strongest attrition driver (below-band employees left at ~2× the rate) and quantified overtime and engagement as early-warning signals for HR business partners.",
  "Modelled an 18-table HR warehouse (SCD Type 2 job/salary history, payroll, ATS funnel) and authored 67 KPI definitions with DAX for workforce, hiring, compensation and engagement reporting.",
];
const LINKEDIN_POST = "Just wrapped up my HR Analytics capstone 🚀\n\nThe problem: HR data lived in silos, so attrition was only noticed after people left.\n\nWhat I built:\n📊 An 18-table HR data model (2,299 employees, payroll, attendance, recruitment, engagement)\n🧮 67 HR KPIs: headcount, attrition, compa-ratio, time to fill, eNPS\n📈 Six-page dashboards in Tableau & Power BI, reconciled with SQL\n\nBiggest insight: employees paid below 85% of their salary-band midpoint left at almost twice the rate of those above it.\n\nThanks to Mahendra Singh for the guidance! Happy to walk anyone through the dashboard.\n\n#DataAnalytics #HRAnalytics #PowerBI #Tableau #SQL #PeopleAnalytics";
const PORTFOLIO = [
  { n: "01", h: "Publish to Tableau Public", p: "Upload the .twbx with a clear title, a one-line description and the KPI definitions in a tooltip or info icon." },
  { n: "02", h: "Record a 2-minute walkthrough", p: "Screen-record the dashboard while giving your 90-second pitch. Put it on LinkedIn and in your resume." },
  { n: "03", h: "GitHub repo", p: "SQL scripts, the data dictionary, KPI definitions and screenshots. A clean README is often read more than the code." },
  { n: "04", h: "Write a Medium post", p: "\"How I calculated point-in-time headcount and attrition correctly\" is a great technical write-up that recruiters find." },
  { n: "05", h: "Add it to LinkedIn Featured", p: "Pin the Tableau Public link and the walkthrough video in your Featured section." },
  { n: "06", h: "Prepare the deck", p: "10–12 slides: problem, data, model, KPIs, dashboard screenshots, 3 insights, 3 recommendations, QA approach." },
];

/* ---------------- LEARN MORE ---------------- */
const LEARNING_LINKS = [
  { title: "90-Day AI Learning", desc: "After this project, start your AI journey: a 90-day, week-by-week AI engineer learning plan with a project every week.", url: "https://90daysailearning.vercel.app/", source: "AI Learning" },
  { title: "Data Analyst Roadmap (roadmap.sh)", desc: "A step-by-step visual roadmap of every skill a data analyst needs, from Excel and SQL to statistics and BI tools. Use it to plan what to learn after this project.", url: "https://roadmap.sh/data-analyst", source: "roadmap.sh" },
  { title: "Tableau — Free Training Videos", desc: "Tableau's own on-demand video library: connecting to data, LOD expressions and dashboards.", url: "https://www.tableau.com/learn/training", source: "Tableau" },
  { title: "Tableau Public Gallery", desc: "Search \"HR dashboard\" or \"attrition\" for layout and design inspiration before you build your own.", url: "https://public.tableau.com/en-us/s/", source: "Tableau" },
  { title: "Power BI Learning Paths (Microsoft Learn)", desc: "Free, structured modules on data modeling, DAX measures and report building.", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", source: "Microsoft" },
  { title: "Star Schema Design Guidance", desc: "Official Power BI guidance on star schemas, role-playing dimensions and inactive relationships, all used in this project.", url: "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema", source: "Microsoft" },
  { title: "USERELATIONSHIP (DAX reference)", desc: "How to activate an inactive relationship inside a measure, needed for exit and hire dates.", url: "https://learn.microsoft.com/en-us/dax/userelationship-function-dax", source: "Microsoft" },
  { title: "MySQL Official Documentation", desc: "Installation, data import and SQL statements, straight from MySQL.", url: "https://dev.mysql.com/doc/", source: "MySQL" },
  { title: "Free SQL Tutorial — Joins & Aggregations (Mode)", desc: "Interactive SQL covering the joins, CASE and window functions this project's queries use.", url: "https://mode.com/sql-tutorial/", source: "Mode Analytics" },
  { title: "Excel Training (Microsoft Learn catalog)", desc: "Pivot tables, XLOOKUP and data prep, the Stage 1 tool in this project.", url: "https://learn.microsoft.com/en-us/training/browse/?products=excel", source: "Microsoft" },
];

/* ---------------- CHAT config ---------------- */
const SYNONYMS = {
  "attrition": ["turnover", "exits", "separation", "leaving"], "turnover": ["attrition"], "leave": ["leave", "exit", "attrition"],
  "salary": ["ctc", "pay", "compensation"], "pay": ["ctc", "salary", "compensation"], "ctc": ["salary", "compensation"],
  "hiring": ["recruitment", "requisition", "candidate", "offer"], "recruitment": ["hiring", "requisition", "candidate"],
  "headcount": ["active", "employees"], "survey": ["engagement", "enps"], "engagement": ["enps", "survey"],
  "dax": ["measure", "calculated column", "power bi"], "sql": ["query", "select"], "scd": ["slowly changing", "history", "effectivefrom"],
  "join": ["relationship", "grain"], "trap": ["gotcha", "mistake"], "mistake": ["gotcha", "trap"], "rls": ["row level security"],
};
const INTENT_RULES = [
  { re: /compa/i, title: "Compa-ratio" },
  { re: /headcount.*(dax|power bi|measure)|(dax|measure).*headcount/i, title: "Write the Headcount measure in DAX." },
  { re: /headcount/i, title: "How do you calculate headcount on a specific date in SQL?" },
  { re: /attrition.*(calc|formula|denominator)|how.*attrition/i, title: "How did you calculate attrition %, and why that denominator?" },
  { re: /\benps\b|net promoter/i, title: "eNPS" },
  { re: /scd|slowly changing/i, title: "What is SCD Type 2 and where did you use it?" },
  { re: /serving notice/i, title: "Serving Notice ≠ Exited" },
  { re: /userelationship|inactive/i, title: "Why are some relationships inactive, and how do you use them?" },
  { re: /june|arrear/i, title: "June payroll spike is real" },
];
const CHAT_POPULAR = ["How is attrition calculated?", "What is compa-ratio?", "Headcount DAX measure", "What is SCD Type 2?", "What is eNPS?", "Give me a scenario question"];
const QUICK_REPLY_POOL = ["How is attrition calculated?", "What is compa-ratio?", "Headcount on a date in SQL", "Why are relationships inactive?", "What is SCD Type 2?", "What is eNPS?",
  "Serving notice vs exited?", "Why the June payroll spike?", "Time to fill vs time to hire?", "Give me a scenario question"];
/* ============================================================
   Web-sourced HR analytics interview questions + industry
   sample dashboards. Answers are written for students; every
   question links back to the page it was sourced from.
   ============================================================ */
const SRC = {
  dd: ["DigitalDefynd: Top HR & People Analytics Interview Questions", "https://digitaldefynd.com/IQ/top-hr-people-analytics-interview-questions-and-answers/"],
  sjHR: ["startup.jobs: HR Data Analyst Interview Questions", "https://startup.jobs/interview-questions/hr-data-analyst"],
  sjPA: ["startup.jobs: People Analyst Interview Questions", "https://startup.jobs/interview-questions/people-analyst"],
  df: ["Dataford: People Data Analyst Interview Guide", "https://dataford.io/interview-guides/people/data-analyst"],
  vs: ["Vskills: HR Analytics Interview Questions", "https://www.vskills.in/interview-questions/hr-analytics-interview-questions"],
  ib: ["Interview Baba: HR Analyst Interview Questions", "https://interviewbaba.com/hr-analyst-interview-questions/"],
  cv: ["CVOwl: HR Analyst Interview Questions", "https://www.cvowl.com/blog/hr-analyst-interview-questions-answers"],
  hu: ["HR University: HRIS Analyst Interview Questions", "https://hr.university/career/hr-analyst/hris-analyst-interview-questions/"],
  hq: ["HireQuotient: Top HR Analyst Interview Questions", "https://www.hirequotient.com/blog/top-hr-analyst-interview-questions"],
};
const WEB_QA_CATS = ["HR Analytics Concepts", "HR Metrics & Formulas", "Recruitment & Workforce Planning", "Engagement, Performance & DEI", "HRIS, Data Quality & Privacy", "Behavioral (HR Analyst)"];
const WEB_QA = [
  // ---------- HR Analytics Concepts ----------
  { cat: "HR Analytics Concepts", s: "vs", q: "What is HR analytics, and why does a company need it?", a: "HR (people) analytics is the use of employee data (HRMS, payroll, recruitment, performance, surveys) to answer business questions about the workforce. It moves HR from opinion to evidence: which teams lose people and why, whether pay is competitive, which hiring channels work. In this project it's exactly what Proxima lacked: one trusted view of headcount, attrition and their drivers.", signal: "Opening definition question. Answer with a business outcome, not a textbook line." },
  { cat: "HR Analytics Concepts", s: "dd", q: "What is the difference between HR reporting and people analytics?", a: "Reporting answers <em>what happened</em> (\"175 people left in 2025\"). Analytics answers <em>why it happened and what to do</em> (\"employees below 0.85 compa-ratio left at almost twice the rate, so a targeted pay correction is the lever\"). A dashboard of counts is reporting; linking exits to pay, workload and engagement is analytics.", signal: "Tests whether you can go beyond building charts." },
  { cat: "HR Analytics Concepts", s: "dd", q: "Explain descriptive, predictive and prescriptive analytics with HR examples.", a: "Descriptive: what happened, e.g. attrition by department last year. Predictive: what is likely, e.g. which employees are at higher risk of leaving in the next 6 months based on compa-ratio, overtime and eNPS. Prescriptive: what should we do, e.g. which retention action (pay correction, workload rebalancing) gives the biggest reduction in exits per rupee.", signal: "Classic framework question. Give one HR example for each level." },
  { cat: "HR Analytics Concepts", s: "vs", q: "HR metrics vs HR analytics: what's the difference?", a: "A metric is a single measurement (attrition rate 13.5%, time to fill 45 days). Analytics combines metrics and data to explain and predict (attrition is highest where pay is below band and overtime is high). Metrics are the inputs; analytics is the reasoning on top of them.", signal: "Checks precision of vocabulary." },
  { cat: "HR Analytics Concepts", s: "vs", q: "What are the key data sources for HR analytics?", a: "HRIS/HRMS (employee master, job history), payroll (CTC, deductions), attendance & leave systems, ATS (requisitions, candidates), performance management (ratings, goals), LMS (training), engagement surveys, and exit interviews. This project has all of them as 18 tables, connected by EmployeeID.", signal: "Shows you know where HR data actually lives." },
  { cat: "HR Analytics Concepts", s: "dd", q: "What is a people analytics maturity model?", a: "A ladder of capability: (1) operational reporting (headcount lists), (2) advanced reporting (dashboards, benchmarks), (3) analytics (drivers, segmentation, correlation), (4) predictive (attrition-risk, workforce forecasting), (5) prescriptive (recommended actions, scenario planning). It helps a company set realistic expectations; most Indian mid-size companies sit at level 2.", signal: "Senior-leaning concept; shows strategic awareness." },
  { cat: "HR Analytics Concepts", s: "dd", q: "How do you align HR analytics with business strategy?", a: "Start from the business goal (e.g. grow revenue 20% without margin loss), translate it into people questions (can we hire 250 engineers in time? are we losing top performers?), pick 3–5 KPIs that answer them, and review them with leadership on a fixed cadence. Analytics that doesn't map to a business decision becomes a vanity dashboard.", signal: "Tests business acumen." },
  { cat: "HR Analytics Concepts", s: "dd", q: "What are the risks of relying too heavily on HR analytics?", a: "Biased historical data (models can repeat past unfair decisions), privacy violations, over-precision with small samples, and 'decision by dashboard' where context from managers is ignored. Mitigate with fairness checks, minimum group sizes (n ≥ 5), confidence intervals and human review of any people decision.", signal: "Tests maturity and ethics." },
  { cat: "HR Analytics Concepts", s: "dd", q: "How would you introduce people analytics in a company that has never used it?", a: "Start small with one high-value, low-sensitivity question (e.g. where is attrition highest?), fix the data needed for it, agree definitions with HR and Finance, publish a simple dashboard, then show one decision it changed. Credibility from a quick win funds the next phase.", signal: "Change-management thinking." },
  { cat: "HR Analytics Concepts", s: "dd", q: "What is employee lifetime value?", a: "An estimate of the net value an employee creates over their tenure: (productivity/revenue contribution − total cost of employment) × expected tenure, minus hiring and ramp-up cost. It's directional, but useful to show why reducing early attrition (15% of 2025 exits had < 1 year tenure) has real financial value.", signal: "Tests financial framing of HR." },

  // ---------- HR Metrics & Formulas ----------
  { cat: "HR Metrics & Formulas", s: "vs", q: "What is the turnover (attrition) rate and how do you calculate it?", a: "Separations in a period ÷ average headcount in that period × 100, with average headcount = (opening + closing) ÷ 2. For a monthly figure, annualise ×12 or sum 12 monthly rates. Always state whether it's total, voluntary or regrettable attrition.", signal: "Must-know formula; denominators are the common mistake." },
  { cat: "HR Metrics & Formulas", s: "ib", q: "Which metrics would you use to measure HR effectiveness?", a: "Attrition (voluntary & regrettable), time to fill, cost per hire, offer acceptance, quality of hire, absenteeism, engagement/eNPS, training hours and ROI, internal mobility/promotion rate, compa-ratio and pay equity, diversity at each level. Pick the few that map to current business priorities.", signal: "Breadth check; finish by prioritising." },
  { cat: "HR Metrics & Formulas", s: "sjHR", q: "How would you define and measure 'quality of hire'?", a: "Combine signals available 6–12 months after joining: first-year retention, first performance rating, time to productivity, and hiring-manager satisfaction. Normalise each to a 0–100 scale and average. Track it by source and recruiter, since that's what makes it actionable.", signal: "No single standard formula, so they test your judgment." },
  { cat: "HR Metrics & Formulas", s: "vs", q: "What is cost per hire?", a: "Total recruiting cost (external: agency fees, job boards, referral bonuses, campus; internal: recruiter time, tools) ÷ number of hires in the period. In this project it's sourcing cost per joined candidate, ₹37K on average in 2025, ranging from ~₹2.5K (career site) to ~₹1.5L (consultant).", signal: "Tests a standard recruitment formula." },
  { cat: "HR Metrics & Formulas", s: "ib", q: "What is absenteeism rate and how do you calculate it?", a: "Unplanned absence days ÷ scheduled working days × 100. Use sick leave and unpaid/unauthorised absence, not planned earned leave. Proxima's 2025 absenteeism is 1.6%. Pair it with overtime: high overtime plus rising sick days is an early burnout signal.", signal: "Formula + interpretation." },
  { cat: "HR Metrics & Formulas", s: "vs", q: "What is the difference between turnover and churn analysis?", a: "Turnover/attrition is the rate. Churn analysis is the investigation behind it: who leaves (segments), when (tenure curve), why (exit reasons, drivers) and what predicts it. A good churn analysis ends with targeted actions per segment.", signal: "Vocabulary + approach." },
  { cat: "HR Metrics & Formulas", s: "dd", q: "How do you benchmark HR metrics?", a: "Compare against (1) your own history (trend), (2) internal peers (department vs department), and (3) external benchmarks from industry salary/attrition surveys for the same industry, geography and role mix. Never compare a tech company's attrition with a manufacturing benchmark without adjusting.", signal: "Shows judgment about comparability." },
  { cat: "HR Metrics & Formulas", s: "dd", q: "What considerations matter for compensation benchmarking?", a: "Match jobs by level and role (not title alone), use total compensation (fixed + variable + benefits), use the market median for the same city tier, check pay compression (new hires paid more than tenured staff), and track compa-ratio and gender gap by level.", signal: "Comp analytics depth." },
  { cat: "HR Metrics & Formulas", s: "sjPA", q: "How would you approach a pay equity analysis with small samples?", a: "Compare like-for-like groups (same level, role family, location), then use a regression of pay on legitimate factors (level, tenure, performance, location) and check whether gender still explains a gap. With small groups, report ranges and avoid naming individuals; remediate case by case.", signal: "Tests statistical and ethical care." },

  // ---------- Recruitment & Workforce Planning ----------
  { cat: "Recruitment & Workforce Planning", s: "vs", q: "How can HR analytics improve recruitment?", a: "By measuring the funnel stage by stage (applications → screen → interviews → offer → join), comparing sources on cost, speed and quality, finding bottleneck stages (e.g. offers declined for relocation), and forecasting hiring needs from attrition and growth plans.", signal: "Practical recruitment analytics." },
  { cat: "Recruitment & Workforce Planning", s: "vs", q: "What is workforce planning, and how does analytics support it?", a: "Workforce planning matches future talent supply to business demand. Analytics provides the inputs: current headcount by skill and level, expected attrition (by segment), retirement, internal promotions, hiring lead time (45+ days) and notice periods (60–90 days in India). Gap = demand − projected supply → hiring plan.", signal: "Core strategic HR use case." },
  { cat: "Recruitment & Workforce Planning", s: "dd", q: "How would you forecast future hiring needs?", a: "Project closing headcount = current headcount − expected exits (attrition rate × headcount by segment) + approved growth. Use historical monthly patterns (e.g. April–June exits after appraisals) and add business drivers such as new projects. Validate the model on last year before using it.", signal: "Forecasting approach without heavy math." },
  { cat: "Recruitment & Workforce Planning", s: "sjHR", q: "Time-to-fill is defined differently by each team. How do you standardise it?", a: "Agree one definition (requisition approved → offer accepted), document it in a metrics dictionary, recompute history with the new definition, show old vs new side by side once, and lock it in the dashboard. In this project time to fill excludes campus requisitions.", signal: "Governance of KPI definitions." },
  { cat: "Recruitment & Workforce Planning", s: "sjHR", q: "How do you join ATS and HRIS data accurately?", a: "Use a stable key (candidate → employee ID mapping on joining), not names. Check that joining dates match HireDate, reconcile hires counted in ATS vs HRIS each month, and log mismatches. Here, Candidates.EmployeeID links to Employees for joined candidates only.", signal: "Data integration rigour." },
  { cat: "Recruitment & Workforce Planning", s: "sjPA", q: "How would you test whether a new interview step improves quality of hire?", a: "Run it as an experiment: randomly apply the new step to some requisitions, keep others as control, pre-define success metrics (first-year retention, first rating, time to fill), make sure groups are big enough, and compare after enough hires have matured.", signal: "Experimental design in HR." },
  { cat: "Recruitment & Workforce Planning", s: "hu", q: "HR says headcount is 1,338 and Finance says 1,351. How do you investigate?", a: "Compare definitions and dates first: Finance often counts everyone paid in the month (including leavers' final salary), contractors, or uses cost-centre timing. Build a bridge from one number to the other. In this dataset 1,351 employees were paid in Dec-2025 = 1,338 on the rolls + 13 who left during December.", signal: "Very common real-world reconciliation question." },

  // ---------- Engagement, Performance & DEI ----------
  { cat: "Engagement, Performance & DEI", s: "vs", q: "What is employee engagement and how do you measure it?", a: "The level of commitment and energy employees bring to work. Measure with a regular survey (engagement items, eNPS, intent to stay), plus behavioural signals: absenteeism, overtime, internal mobility and attrition. Proxima's engagement index is ~72% and eNPS +16.", signal: "Definition + measurement." },
  { cat: "Engagement, Performance & DEI", s: "sjHR", q: "How would you design an engagement survey that leads to action?", a: "Keep it short (15–25 items), use validated questions, include eNPS and intent to stay, guarantee anonymity with a minimum reporting group (n ≥ 5), pre-agree which team owns each driver, and re-survey to check if actions worked. Link responses to later exits to prove the survey predicts behaviour.", signal: "Tests survey design beyond 'send a form'." },
  { cat: "Engagement, Performance & DEI", s: "dd", q: "How do you measure the effectiveness of a training program?", a: "Use a before/after design with a comparison group: completion, assessment score, and then outcome metrics such as rating movement, promotion rate and attrition of trained vs similar untrained employees. Be honest that motivated people self-select into training.", signal: "Kirkpatrick-style thinking." },
  { cat: "Engagement, Performance & DEI", s: "dd", q: "How would you measure the ROI of an onboarding program?", a: "Compare cohorts before and after the program on time to productivity, 90-day and first-year attrition, and first performance rating. Translate reduced early exits into money: avoided replacement cost (cost per hire + vacancy days + ramp-up).", signal: "Financial framing of an HR program." },
  { cat: "Engagement, Performance & DEI", s: "vs", q: "How can HR analytics support diversity and inclusion?", a: "Measure representation at every stage (applicants, hires, promotions, leadership, exits), pay gap by level, and engagement by group. Look for where representation drops off: e.g. women are 36% of Proxima but 33% of L5+ leadership, so promotion and hiring at senior levels is where to focus.", signal: "DEI with numbers." },
  { cat: "Engagement, Performance & DEI", s: "sjPA", q: "How do you use analytics to improve fairness in performance calibration?", a: "Compare rating distributions by manager, department, gender and tenure; flag outliers (e.g. one team with 60% top ratings); check ratings against objective outcomes like goal achievement; and bring this data into calibration meetings rather than overriding ratings afterwards.", signal: "Performance analytics + fairness." },
  { cat: "Engagement, Performance & DEI", s: "vs", q: "How can analytics help identify burnout?", a: "Combine workload and wellbeing signals: sustained overtime, rising sick leave, unused annual leave, late logins, falling survey scores. In this project employees averaging 15+ overtime hours a month left at 16.7% vs 10.1% for those under 3 hours.", signal: "Uses data to protect people." },
  { cat: "Engagement, Performance & DEI", s: "sjPA", q: "What is your view on 'flight risk' scores for individuals?", a: "Useful as a cohort-level signal to target positive interventions (career conversations, pay review), risky as a label on individuals. Exclude protected attributes, audit for bias, restrict access to HRBPs, and never use it for punitive decisions.", signal: "Ethics question increasingly asked." },

  // ---------- HRIS, Data Quality & Privacy ----------
  { cat: "HRIS, Data Quality & Privacy", s: "ib", q: "How do you ensure the accuracy of HR data?", a: "Validate at source (mandatory fields, allowed values), run automated checks (duplicates, orphan keys, impossible dates), reconcile key totals across systems monthly (HRIS vs payroll headcount), and fix errors in the source system, not in the dashboard.", signal: "Data-quality discipline." },
  { cat: "HRIS, Data Quality & Privacy", s: "dd", q: "How do you handle missing or incomplete HR data?", a: "First find out why it's missing: by design (no rating for new joiners), process gap, or system error. Expected blanks are excluded from averages; process gaps are fixed at source; only use imputation for modelling, and state it. Never fill blanks with zero.", signal: "Missing-data judgment." },
  { cat: "HRIS, Data Quality & Privacy", s: "ib", q: "How do you protect confidential employee data?", a: "Least-privilege access and row-level security, mask personal identifiers (names, phone, PAN), aggregate with a minimum group size, encrypt exports, log access, and follow India's DPDP Act 2023 (and GDPR for EU staff). Salary pages should have a stricter audience than headcount pages.", signal: "Mandatory topic in any HR analytics interview." },
  { cat: "HRIS, Data Quality & Privacy", s: "hu", q: "How do you validate data before building a dashboard?", a: "Check row counts against the source, profile each column (nulls, ranges, distinct values), test join keys for orphans and duplicates, recompute 3–5 headline numbers in SQL, and get an HR owner to sanity-check one familiar number (e.g. last month's joiners).", signal: "Practical QA process." },
  { cat: "HRIS, Data Quality & Privacy", s: "hu", q: "An employee disappeared from the dashboard after a job change. What do you check?", a: "Effective dates in the job-history (SCD) table: is the new record's EffectiveFrom after the report date, or does the old record's EffectiveTo end before it? Also check whether the new department/designation exists in the dimension tables. It's usually a date or mapping issue, not a tool bug.", signal: "Tests understanding of effective-dated HR data." },
  { cat: "HRIS, Data Quality & Privacy", s: "hu", q: "You found duplicate employee records after an import. What do you do?", a: "Stop downstream refreshes, identify duplicates on stable attributes (ID, email, DOB + name), find the root cause in the import, merge or delete with an audit trail, re-run reports, and add a uniqueness check to the pipeline.", signal: "Incident handling." },
  { cat: "HRIS, Data Quality & Privacy", s: "vs", q: "What is an HRIS and how does it support analytics?", a: "A Human Resource Information System stores and manages employee records: master data, job history, compensation, leave, org structure. For analytics it's the system of record; a warehouse then combines it with payroll, ATS and survey data for reporting.", signal: "Systems vocabulary." },
  { cat: "HRIS, Data Quality & Privacy", s: "dd", q: "How would you design a pipeline that consolidates data from multiple HR systems?", a: "Extract from each system on a schedule, land raw data, standardise formats (dates, IDs, department codes), validate (counts, keys), and load into a star schema in a warehouse. Then point BI tools at the warehouse only. That's exactly this project's pipeline.", signal: "End-to-end data engineering awareness." },
  { cat: "HRIS, Data Quality & Privacy", s: "sjHR", q: "What is a metrics dictionary and why does HR need one?", a: "A single document defining every KPI: name, business question, formula, source fields, filters, owner and change history. It stops HR and Finance reporting different headcounts. The KPI Library on this site is a metrics dictionary.", signal: "Governance maturity." },

  // ---------- Behavioral ----------
  { cat: "Behavioral (HR Analyst)", s: "sjHR", q: "Walk me through an end-to-end HR analytics project you did.", a: "Use STAR with numbers: Situation (HR data in silos, attrition seen too late) → Task (build a single model and dashboards) → Action (18-table model, 67 KPIs, Tableau + Power BI, SQL reconciliation) → Result (13.5% attrition explained by pay position and workload; three specific recommendations).", signal: "Almost certain to be asked." },
  { cat: "Behavioral (HR Analyst)", s: "dd", q: "Tell me about a time you found a significant pattern in HR data.", a: "Pick one finding and its impact, e.g. \"Employees below 0.85 compa-ratio were leaving at almost twice the rate. I quantified the cost of replacing them versus a targeted correction and presented both options to the HR head.\"", signal: "Insight-to-action story." },
  { cat: "Behavioral (HR Analyst)", s: "dd", q: "Describe a time you had to correct a mistake after a report was shared.", a: "Own it quickly: \"Our first headcount excluded 26 serving-notice employees because of a status filter. I informed the stakeholders the same day with the corrected number and the reason, fixed the measure and added a QA test.\"", signal: "Accountability." },
  { cat: "Behavioral (HR Analyst)", s: "ib", q: "How would you explain a statistical finding to a non-technical HR manager?", a: "Lead with the decision, use plain language and one visual: \"People paid well below market leave about twice as often. Fixing pay for those 300 people is cheaper than replacing the ~40 we'd otherwise lose.\" Keep methods for follow-up questions.", signal: "Communication skill." },
  { cat: "Behavioral (HR Analyst)", s: "df", q: "Tell me about influencing a leader whose intuition contradicted the data.", a: "Acknowledge their view, show the data in their terms, test their hypothesis openly (\"you think it's the manager. Here is attrition by manager vs by pay band\"), and propose a small pilot rather than a big argument.", signal: "Influence without authority." },
  { cat: "Behavioral (HR Analyst)", s: "sjPA", q: "A VP asks: 'Is our attrition a problem?' How do you answer?", a: "Clarify what 'problem' means (cost, critical roles, trend). Then segment: voluntary vs involuntary, regrettable vs not, by department, level and tenure; compare with last year and an industry benchmark; and come back with where it is a problem and one action per hotspot.", signal: "Structured thinking under an open question." },
  { cat: "Behavioral (HR Analyst)", s: "ib", q: "How do you handle data discrepancies or inconsistencies?", a: "Verify against a second source, find the root cause (definition, timing, mapping), fix it at the source, document it, and add a check so it can't recur. Communicate the impact on any number already shared.", signal: "Process + communication." },
  { cat: "Behavioral (HR Analyst)", s: "sjHR", q: "How do you prioritise urgent executive requests against long-term analytics work?", a: "Triage by decision impact and deadline, keep a visible queue, reserve some weekly capacity for ad hoc requests, and tell stakeholders explicitly what moves when something urgent comes in.", signal: "Stakeholder management." },
  { cat: "Behavioral (HR Analyst)", s: "hq", q: "How do you stay updated with HR analytics trends?", a: "Mention concrete sources: SHRM and AIHR articles, Power BI/Tableau community galleries, LinkedIn people-analytics leaders, and practising on projects like this one. Add one thing you learned recently and applied.", signal: "Learning mindset." },
  { cat: "Behavioral (HR Analyst)", s: "sjPA", q: "What would your first 90 days look like as the first people analyst?", a: "Days 1–30: meet stakeholders, audit data and definitions, list the top questions. Days 31–60: build the core model and a headcount/attrition dashboard, agree a metrics dictionary. Days 61–90: launch a monthly review, deliver one deep-dive (e.g. attrition drivers) and plan the roadmap.", signal: "Planning and prioritisation." },
];
WEB_QA.forEach(x => { x.src = SRC[x.s]; });
QA_CATS.push(...WEB_QA_CATS);
QA.push(...WEB_QA);
const QA_REFERENCES = Object.values(SRC);

/* ---------------- Industry sample dashboards ---------------- */
const VIDI_URL = "https://vidi-corp.com/power-bi-hr-dashboard-examples/";
const SAMPLE_IMAGE_DASHBOARDS = [
  { img: "assets/sample-attrition-mokkup.png", t: "Attrition Dashboard", by: "Mokkup.ai (Power BI / Tableau template)",
    does: "Tracks how many people join and leave and where attrition concentrates.",
    kpis: "Total employees, joining, leaving, inbound/outbound ratio, average tenure (each vs previous period)",
    visuals: "Tenure donut, joining vs leaving trend, attrition by department and job role split by gender, exit reasons, tenure × salary-band heatmap",
    proxima: "Page 02 Attrition & Retention. Build the tenure × compa-band heatmap with our data." },
  { img: "assets/sample-recruitment-agile.gif", t: "HR Recruitment Dashboard", by: "Agile Analytics (Power BI)",
    does: "Follows the hiring pipeline from applicants to hires and shows which roles and sources fill vacancies.",
    kpis: "% vacancies filled, applicants, screening, interviews, assessment, offered, hired, screening-to-hire ratio",
    visuals: "Funnel KPI strip, active vacancies by month (year vs year), vacancies vs filled by department, filled roles by level & position type, filled roles by source",
    proxima: "Page 03 Talent Acquisition. Use Candidates stage dates for the funnel strip." },
];
const VIDI_DASHBOARDS = [
  { name: "HR Dashboard for the CEO (Executive Summary)", tool: "Power BI", tag: "One page that tells leadership the state of the workforce",
    context: "Built for C-suite and board reporting: a single executive summary that replaces a monthly pack of HR spreadsheets.",
    what: "Headline figures for headcount, hires and terminations, total workforce cost, diversity (gender, age band, and other demographics where legally collected) and a breakdown by location and department.",
    question: "What is the current state of our workforce, and is anything moving in the wrong direction?",
    who: "CEO, CFO, CHRO, board members",
    kpis: ["Headcount (closing)", "New hires", "Terminations / exits", "Attrition %", "Total workforce cost", "Female %", "Average age & tenure"],
    visuals: ["KPI cards with vs-last-period arrows", "Headcount by location (map or bar)", "Headcount by department", "Gender and age-band donuts", "Monthly hires vs exits trend"],
    filters: "Date / fiscal year, location, department",
    build: ["Headcount, Hires, Exits and Attrition % measures from the KPI Library", "Workforce cost = SUM(Payroll_Monthly[TotalEmployerCost])", "Location from Dim_Location, department from Dim_Department", "Keep it to one page: max 6 cards + 4 visuals"],
    proxima: "Closing headcount 1,338, 252 hires, 175 exits, 13.5% attrition, ₹199.25 Cr employer cost, 35.8% women (CY2025).", page: "01 Workforce Overview" },
  { name: "Employee Headcount Dashboard", tool: "Power BI", tag: "Where are our people, and what do they cost?",
    context: "Used by a mid-market organisation to report human-capital structure and cost to senior management.",
    what: "How headcount is distributed across roles, departments and demographics (gender, age, education), tenure analysis, and average monthly income by job role.",
    question: "How is our headcount distributed, and what are our human-capital costs by role?",
    who: "Senior management, HR heads, finance business partners",
    kpis: ["Headcount by department / role / level", "Average tenure", "Average monthly income by role", "Education mix", "Age-band mix"],
    visuals: ["Stacked bars: department × level", "Tenure-band histogram", "Bar: average monthly income by job role", "Donuts for gender and education"],
    filters: "Department, job role, gender, education, location",
    build: ["Employees joined to Dim_Designation (JobLevel, title) and Dim_Department", "Average monthly fixed gross from Payroll_Monthly (Basic + HRA + Special)", "Tenure band as a calculated column", "Education from Employees[EducationLevel] / [Qualification]"],
    proxima: "Engineering has 481 of 1,338 people; average CTC ranges from ₹3.9 L (L1) to ₹50 L (L6).", page: "01 Workforce Overview" },
  { name: "Recruitment Dashboard (Vacancies & Operational Risk)", tool: "Power BI", tag: "Which roles are still open, and where does that hurt?",
    context: "Built for a holiday provider that hires seasonally: recruiters needed to see open roles before the season started.",
    what: "Filled vs unfilled positions by job role, the locations (resorts) affected by vacancies, and vacancy tracking over time.",
    question: "Which roles must be filled, and which locations are at operational risk if they aren't?",
    who: "Recruiters, talent acquisition lead, operations managers",
    kpis: ["Open positions", "Filled positions", "% vacancies filled", "Vacancies by location", "Ageing of open requisitions"],
    visuals: ["Bar: filled vs unfilled by role", "Location table/map with open-role counts", "Vacancy trend line", "Ageing buckets (0–30, 31–60, 60+ days)"],
    filters: "Location, job role, department, requisition status",
    build: ["Job_Requisitions[Status] for Open / On Hold / Filled", "Ageing = DATEDIFF(OpenDate, as-of date)", "Location from Job_Requisitions[LocationID] (inactive relationship → USERELATIONSHIP)", "Compare with Dim_Department[ApprovedHeadcount_FY2025_26] for vacancy rate"],
    proxima: "55 requisitions open or on hold on 31-Dec-2025; vacancy rate 7.0% against the approved headcount plan.", page: "03 Talent Acquisition" },
  { name: "Recruitment Analytics Dashboard (Channel Cost)", tool: "Power BI", tag: "Which hiring channel gives the best value?",
    context: "Built to optimise recruitment budget allocation across job boards, agencies and referrals.",
    what: "Applications, costs and job offers by recruitment source, with cost per application, cost per interview and cost per offer for each channel.",
    question: "Which recruitment channels are the most cost-efficient, and where should next year's budget go?",
    who: "Talent acquisition lead, HR head, finance",
    kpis: ["Applications by source", "Cost per application", "Cost per interview", "Cost per offer / per hire", "Offer acceptance by source"],
    visuals: ["Funnel by source", "Bar: cost per hire by source", "Scatter: volume vs cost per hire", "Table: source × funnel stage"],
    filters: "Date, source, department, job level",
    build: ["Candidates[Source] + stage dates (ScreeningDate, Round1Date…, OfferDate)", "Cost per hire = SUM(SourcingCostINR) ÷ joined candidates", "Offer acceptance by source from ApplicationStatus", "Exclude Campus Placement from time metrics"],
    proxima: "Consultant hires cost ~₹1.48 L each vs ~₹34 K for referrals and ₹9 K for Naukri, yet referrals were only 17.9% of 2025 hires.", page: "03 Talent Acquisition" },
  { name: "Payroll & Compensation Dashboard", tool: "Power BI", tag: "What do our people really cost, and where?",
    context: "Built for a security-services company that needed the full cost of payroll, not just salaries.",
    what: "Payroll cost broken into wages, pension contributions and employee insurance, allocated to departments and projects.",
    question: "What is our full payroll cost, and how does it split across departments?",
    who: "CFO, payroll team, CHRO",
    kpis: ["Total employer cost", "Gross pay", "Employer statutory cost (PF, ESI, gratuity)", "Cost per employee", "Bonus / variable share"],
    visuals: ["Monthly cost trend (stacked by component)", "Bar: cost by department", "Waterfall: gross → deductions → net pay", "Table: department × component"],
    filters: "Pay month / FY, department, location, level",
    build: ["Payroll_Monthly: Basic, HRA, SpecialAllowance, Bonus_Incentive, Arrears, EPF/ESI employer, GratuityProvision", "Relate PayMonth to Dim_Date", "Department via Employees (or Job_History valid on PayMonth for accuracy)", "Show ₹ Cr with a ÷1e7 measure"],
    proxima: "₹199.25 Cr employer cost in 2025; June spikes to ₹31.4 Cr because of annual bonus + increment arrears.", page: "04 Compensation & Payroll" },
  { name: "Payroll per Project Dashboard", tool: "Power BI", tag: "Are people costs recovered from clients?",
    context: "Built to see how payroll cost maps onto client projects, and how much time is non-billable.",
    what: "Daily payroll cost by project, billable vs non-billable hours (e.g. training), and hours worked by employee and job role.",
    question: "How do payroll costs allocate to clients and projects, and how much time is billable?",
    who: "Delivery heads, project managers, finance",
    kpis: ["Payroll cost per project", "Billable hours %", "Non-billable (training) hours", "Cost per billable hour", "Hours by role"],
    visuals: ["Bar: cost by project", "Stacked bar: billable vs non-billable", "Trend of daily cost", "Matrix: employee × project hours"],
    filters: "Project, client, date, role",
    build: ["Proxima has no project/timesheet table, so this is a stretch exercise", "Proxy: training hours from Training_Records as non-billable time", "Present days × 8 h from Attendance_Monthly as available hours", "Discuss in interviews which table you'd need (Timesheets: EmployeeID, ProjectID, Date, Hours)"],
    proxima: "24.8 training hours per employee in 2025, a real non-billable cost you can quantify.", page: "Stretch idea (needs a timesheet table)" },
  { name: "HR Attrition Dashboard (Main Page)", tool: "Power BI", tag: "Who is leaving, and what does it cost us?",
    context: "Built to monitor workforce stability across business units and connect attrition to its cost.",
    what: "New joiners, resignations, attrition %, net headcount change by business unit, and overtime cost per person (the cost of covering for leavers).",
    question: "Which departments are hit by attrition, and what is the impact on cost and capacity?",
    who: "CHRO, department heads, HR business partners",
    kpis: ["New joiners", "Resignations", "Attrition % (exits ÷ average headcount)", "Net headcount change", "Overtime hours / cost per person"],
    visuals: ["KPI cards", "Bar: attrition % by department with a company reference line", "Line: joiners vs leavers by month", "Bar: overtime per person by unit"],
    filters: "Date, department, location, level, gender",
    build: ["Exits measure with USERELATIONSHIP(Exit_Details[LastWorkingDate], Dim_Date[Date])", "Average headcount = (opening + closing) ÷ 2", "Overtime from Attendance_Monthly[OvertimeHours]", "Net change = hires − exits"],
    proxima: "Customer Success & Support has 17.3% voluntary attrition and the highest overtime (8.6 h per person per month).", page: "02 Attrition & Retention" },
  { name: "Attrition Dashboard (Resignations Page)", tool: "Power BI", tag: "Why are people leaving?",
    context: "The drill-down page behind the attrition summary, used to set retention priorities.",
    what: "Resignations by department, job role and reason, plus attrition % by month.",
    question: "Why are employees leaving, and where should HR focus retention and recruitment effort?",
    who: "HR business partners, department heads",
    kpis: ["Voluntary exits", "Exit reasons (count & %)", "Regrettable attrition %", "Monthly attrition %", "Early attrition (< 1 year)"],
    visuals: ["Bar: exit reasons", "Matrix: department × reason", "Line: monthly attrition %", "Bar: exits by tenure band"],
    filters: "Department, job role, exit type, tenure band",
    build: ["Exit_Details[ExitReason] and [ExitReasonCategory]", "Filter ExitType = Voluntary and ExitStatus = Exited", "Tenure at exit = LastWorkingDate − Employees[HireDate]", "Regrettable = RegrettableAttrition = 'Yes'"],
    proxima: "Better Compensation is the #1 voluntary reason (25.3%); 27.3% of voluntary leavers were rated 4–5.", page: "02 Attrition & Retention" },
  { name: "Overtime Analysis Dashboard", tool: "Power BI", tag: "Is understaffing driving overtime?",
    context: "Built to check whether staffing actions after attrition were actually reducing overtime spend.",
    what: "Overtime hours and cost by location and business unit, with monthly overtime trends.",
    question: "How does attrition affect overtime spending, and are our staffing measures working?",
    who: "Operations managers, HR, finance",
    kpis: ["Overtime hours per employee per month", "Overtime cost", "Employees above an overtime threshold", "Overtime vs attrition by unit"],
    visuals: ["Heatmap: department × month overtime", "Bar: overtime by location", "Trend line", "Scatter: overtime vs attrition % by department"],
    filters: "Month, department, location, shift type",
    build: ["Attendance_Monthly[OvertimeHours] by AttendanceMonth", "Shift from Employees[ShiftType]", "Flag employees > 12 h/month for 3 months", "Correlate with 2025 exits by overtime band"],
    proxima: "Employees averaging 15+ overtime hours a month left at 16.7% vs 10.1% for 0–3 hours.", page: "06 Engagement & Attendance" },
  { name: "HR Diversity Dashboard (Gender & Age)", tool: "Power BI", tag: "Are there hidden biases in hiring or promotion?",
    context: "Built for a recruitment agency that needed to demonstrate fair hiring and spot discrimination risks.",
    what: "Age and gender distribution, and representation patterns across age groups and levels.",
    question: "Are there hidden biases in hiring or promotion, and where does representation drop off?",
    who: "DEI lead, CHRO, compliance",
    kpis: ["Female %", "Women in leadership (L5+) %", "Gender mix of hires vs applicants", "Promotion rate by gender", "Level-adjusted gender pay gap"],
    visuals: ["Population pyramid (age band × gender)", "Bar: female % by level", "Funnel by gender (applied → hired)", "Bar: pay gap % by level"],
    filters: "Department, level, location, year",
    build: ["Employees[Gender], [DateOfBirth] → age band", "Candidates[Gender] for the hiring funnel", "Job_History promotions by gender", "Pay gap: compare CTC within each JobLevel, then weight"],
    proxima: "Women are 35.8% of the workforce but 33.2% of L5+ leadership; level-adjusted pay gap 2.9%.", page: "01 Workforce / 05 Performance" },
  { name: "DEI Dashboard (Identity & Inclusion)", tool: "Power BI", tag: "Do our practices favour some groups unintentionally?",
    context: "Built to look for unintended hiring preferences using voluntary, self-reported demographic data.",
    what: "Employee counts by self-identified demographic groups, aggregated, to check representation at each stage.",
    question: "Do our hiring and promotion practices show unintended preferences?",
    who: "DEI lead (restricted access), CHRO",
    kpis: ["Representation by group and level", "Hiring rate by group", "Promotion and exit rate by group", "Survey inclusion score by group"],
    visuals: ["Aggregated bars only (no individual-level views)", "Stage funnel by group", "Trend of representation"],
    filters: "Level, department, year (with a minimum group size, e.g. n ≥ 5)",
    build: ["Proxima doesn't collect sensitive identity data, which is correct practice unless employees opt in", "Use only consented, aggregated data; hide groups smaller than 5", "Restrict with row-level security", "Interview point: explain why you would NOT build this without consent"],
    proxima: "Not in this dataset by design. Discuss the privacy and consent rules instead.", page: "Discussion only" },
  { name: "Tableau HR Dashboard (Headcount View)", tool: "Tableau", tag: "A 12-month view of headcount, joiners and leavers",
    context: "A Tableau workforce-planning dashboard showing monthly movement and departmental staffing trends.",
    what: "Month-start and month-end headcount, resignations, new joiners, demographic breakdown (age, gender, nationality), department headcount, 12-month hiring trend, and average tenure and age by department.",
    question: "What is our headcount status, diversity profile and departmental staffing trend?",
    who: "Workforce planning, HR operations, department heads",
    kpis: ["Opening & closing headcount", "Joiners", "Leavers", "Average tenure by department", "Average age by department"],
    visuals: ["Headcount bridge (opening + joiners − leavers = closing)", "12-month hiring trend", "Bar: headcount by department", "Demographic donuts"],
    filters: "Month, department, gender, location",
    build: ["Tableau: month-end date scaffold joined to Employees on HireDate ≤ month-end < ExitDate", "Joiners/leavers by month from HireDate / ExitDate", "Bridge chart with a waterfall (Gantt bar) mark", "Average tenure/age as LOD per department"],
    proxima: "2025 bridge: 1,261 opening + 252 joiners − 175 leavers = 1,338 closing.", page: "01 Workforce Overview" },
];
/* ============================================================
   Helpers
   ============================================================ */
const CHART_COLORS = ["#1677D2", "#F59E0B", "#22C3EE", "#7C3AED", "#16A34A", "#DC2626", "#5B6472", "#0EA5E9"];
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60); }
function copyText(text, btn, label) {
  const done = () => { if (btn) { const o = label || btn.textContent; btn.textContent = "✓ Copied"; setTimeout(() => { btn.textContent = o; }, 1500); } };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); if (cb) cb();
}

/* ---------------- Storage (never throws) ---------------- */
const STORE_KEY = "proxima_hr_state_v1";
let __memState = null;
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  if (!s) s = __memState;
  s = s || {};
  ["journey", "deliv", "assign", "lab", "qa", "qachk", "recon", "pitch"].forEach(k => { if (!s[k]) s[k] = {}; });
  return s;
}
function saveState(s) { __memState = s; try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {} }
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

/* ---------------- Charts (native SVG / CSS) ---------------- */
function svgDonut(data, size) {
  size = size || 120;
  const total = data.reduce((s, d) => s + Math.abs(d[1]), 0);
  const r = size / 2 - 10, cx = size / 2, cy = size / 2, C = 2 * Math.PI * r;
  let off = 0, circles = "";
  data.forEach((d, i) => {
    const dash = total ? (Math.abs(d[1]) / total) * C : 0;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${CHART_COLORS[i % CHART_COLORS.length]}" stroke-width="16" stroke-dasharray="${dash} ${C - dash}" stroke-dashoffset="${-off}" transform="rotate(-90 ${cx} ${cy})"/>`;
    off += dash;
  });
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img">${circles}</svg>`;
}
function renderDonutBlock(chart) {
  const data = chart.data || [];
  const total = data.reduce((s, d) => s + d[1], 0);
  const legend = data.map((d, i) => `<div class="li"><span class="sw" style="background:${CHART_COLORS[i % CHART_COLORS.length]}"></span>${esc(d[0])}: ${Number(d[1]).toLocaleString("en-IN")} (${total ? ((d[1] / total) * 100).toFixed(1) : "0.0"}%)</div>`).join("");
  return `<div class="mock-chart"><div class="ct">${esc(chart.title)}</div><div class="donut-wrap">${svgDonut(data)}<div class="mock-legend">${legend}</div></div></div>`;
}
function renderBarBlock(chart, opts) {
  const data = chart.data || [];
  const max = Math.max(...data.map(d => Math.abs(d[1])), 0);
  const suffix = chart.suffix || "", prefix = chart.prefix || "";
  const base = opts && opts.base;
  const rows = data.map((d, i) => {
    const pct = max ? (Math.abs(d[1]) / max) * 100 : 0;
    const color = base !== undefined ? (d[1] > base * 1.15 ? "#DC2626" : d[1] < base * 0.85 ? "#16A34A" : "#1677D2") : (d[1] < 0 ? "#DC2626" : CHART_COLORS[i % CHART_COLORS.length]);
    const extra = d[2] !== undefined ? ` <span style="color:var(--ink-muted);font-size:10.5px;">n=${d[2]}</span>` : "";
    return `<div class="bar-row"><div class="lab">${esc(d[0])}</div><div class="track"><div class="fill" style="width:${pct}%;background:${color}"></div></div><div class="val">${prefix}${Number(d[1]).toLocaleString("en-IN")}${suffix}${extra}</div></div>`;
  }).join("");
  return `<div class="mock-chart"><div class="ct">${esc(chart.title)}</div>${rows}</div>`;
}
function renderDashMock(d) {
  const kpis = d.kpis.map(k => `<div class="mock-kpi"><div class="v">${k.v}</div><div class="l">${esc(k.l)}</div></div>`).join("");
  const donuts = (d.donuts || []).map(c => renderDonutBlock(c)).join("");
  const bars = (d.bars || []).map(c => renderBarBlock(c)).join("");
  return `<div class="card dash-mock"><div class="mock-head"><h4>${esc(d.title)}</h4><p>${esc(d.sub)}</p></div><div class="mock-kpis">${kpis}</div><div class="mock-charts">${donuts}${bars}</div></div>`;
}

/* ============================================================
   Progress engine
   ============================================================ */
const TRACKS = [
  { id: "business", name: "Business Understanding" }, { id: "model", name: "Data Model & Quality" }, { id: "sql", name: "SQL" },
  { id: "kpi", name: "KPIs" }, { id: "excel", name: "Excel" }, { id: "tableau", name: "Tableau" }, { id: "powerbi", name: "Power BI" },
  { id: "qa", name: "QA" }, { id: "interview", name: "Interview" }, { id: "career", name: "Insights & Career" },
];
function trackScores() {
  const s = loadState();
  const sc = {}; TRACKS.forEach(t => sc[t.id] = [0, 0]);
  JOURNEY.forEach(j => { sc[j.track][1]++; if (s.journey[j.id]) sc[j.track][0]++; });
  DELIVERABLES.forEach(d => { sc[d.track][1]++; if (s.deliv[d.id]) sc[d.track][0]++; });
  assignments().forEach(a => { sc[a.track][1]++; if (s.assign[a.id] && s.assign[a.id].ok) sc[a.track][0]++; });
  const qaDone = QA.filter(q => s.qa[q.cat + "::" + q.q]).length;
  sc.interview[1] += 6; sc.interview[0] += 6 * (QA.length ? qaDone / QA.length : 0);
  sc.interview[1] += 1; if (s.pitch.practiced) sc.interview[0] += 1;
  const labDone = Object.keys(s.lab).length;
  sc.interview[1] += 3; sc.interview[0] += 3 * Math.min(1, labDone / LAB.length);
  const chk = QA_CHECKLIST.filter(c => s.qachk[c.id]).length;
  sc.qa[1] += 3; sc.qa[0] += 3 * (chk / QA_CHECKLIST.length);
  const out = TRACKS.map(t => ({ ...t, pct: sc[t.id][1] ? Math.round((sc[t.id][0] / sc[t.id][1]) * 100) : 0 }));
  const overall = Math.round(out.reduce((a, t) => a + t.pct, 0) / out.length);
  return { tracks: out, overall, qaDone, labDone };
}
function refreshProgress() {
  const { tracks, overall, qaDone } = trackScores();
  const fill = document.getElementById("sidebar-progress-fill"), cap = document.getElementById("sidebar-progress-caption");
  if (fill) fill.style.width = overall + "%";
  if (cap) cap.textContent = `${overall}% project complete · ${qaDone}/${QA.length} interview Qs`;
  const hp = document.getElementById("home-progress");
  if (hp) {
    const top = tracks.slice().sort((a, b) => b.pct - a.pct);
    hp.innerHTML = `<h4>Your Progress</h4><div class="big">${overall}%</div><div class="sub">overall project completion</div>
      <div class="track-list">${tracks.slice(0, 5).map(trackRow).join("")}</div>
      <button class="btn-outline" style="margin-top:14px;padding:8px 14px;" data-goto="progress">See full progress →</button>`;
    hp.querySelector("[data-goto]").addEventListener("click", () => switchView("progress"));
  }
  try { renderCertificate(); } catch (e) {}
  const po = document.getElementById("progress-overall");
  if (po) po.innerHTML = `<h4>Overall Progress</h4><div class="big">${overall}%</div><div class="sub">Average of the ten skill tracks below</div>`;
  const tl = document.getElementById("track-list");
  if (tl) tl.innerHTML = tracks.map(trackRow).join("");
  const todo = document.getElementById("progress-todo");
  if (todo) {
    const s = loadState();
    const openJ = JOURNEY.filter(j => !s.journey[j.id]);
    const openD = DELIVERABLES.filter(d => !s.deliv[d.id]);
    const openA = assignments().filter(a => !(s.assign[a.id] && s.assign[a.id].ok));
    const li = (arr, f) => arr.length ? arr.map(f).join("") : `<div style="padding:4px 0;">✓ All done</div>`;
    todo.innerHTML = `<h5 style="margin:0 0 6px;font-size:13px;color:var(--ink);">Journey steps (${openJ.length} open)</h5>${li(openJ.slice(0, 5), j => `<div style="padding:3px 0;">• <a href="#" data-go="${j.go}">${esc(j.t)}</a></div>`)}
      <h5 style="margin:14px 0 6px;font-size:13px;color:var(--ink);">Deliverables (${openD.length} open)</h5>${li(openD.slice(0, 6), d => `<div style="padding:3px 0;">• ${esc(d.t)}</div>`)}
      <h5 style="margin:14px 0 6px;font-size:13px;color:var(--ink);">Assignments (${openA.length} open)</h5>${li(openA.slice(0, 6), a => `<div style="padding:3px 0;">• ${esc(a.t)}</div>`)}`;
    todo.querySelectorAll("[data-go]").forEach(a => a.addEventListener("click", (e) => { e.preventDefault(); switchView(a.dataset.go); }));
  }
}
function trackRow(t) {
  return `<div class="track-row ${t.pct >= 100 ? "complete" : ""}"><div class="tl">${esc(t.name)}</div><div class="tb"><div class="tf" style="width:${t.pct}%"></div></div><div class="tv">${t.pct}%</div></div>`;
}

/* ============================================================
   Home
   ============================================================ */
function renderStats() {
  const wrap = document.getElementById("stat-strip");
  wrap.innerHTML = STATS.map(s => `<div class="stat"><div class="num">${s.num}</div><div class="lbl">${esc(s.lbl)}</div></div>`).join("");
}
function renderJourney() {
  const wrap = document.getElementById("journey"); const s = loadState();
  wrap.innerHTML = JOURNEY.map((j, i) => `
    ${i ? '<div class="journey-arrow">↓</div>' : ""}
    <div class="journey-step ${s.journey[j.id] ? "done" : ""}">
      <div class="jn">${String(i + 1).padStart(2, "0")}</div>
      <div><h4>${esc(j.t)}</h4><p>${esc(j.d)}</p></div>
      <div class="journey-actions">
        <button class="check-pill ${s.journey[j.id] ? "on" : ""}" data-j="${j.id}">${s.journey[j.id] ? "✓ Done" : "Mark done"}</button>
        <button class="start-btn" data-go="${j.go}">Start →</button>
      </div>
    </div>`).join("");
  wrap.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => switchView(b.dataset.go)));
  wrap.querySelectorAll("[data-j]").forEach(b => b.addEventListener("click", () => {
    const st = loadState(); st.journey[b.dataset.j] = !st.journey[b.dataset.j]; saveState(st); renderJourney(); refreshProgress();
  }));
}
function renderChecklist(containerId, items, bucket) {
  const wrap = document.getElementById(containerId); if (!wrap) return;
  const s = loadState();
  wrap.innerHTML = items.map(d => `
    <div class="deliv-item ${s[bucket][d.id] ? "on" : ""}" data-id="${d.id}" role="checkbox" aria-checked="${!!s[bucket][d.id]}" tabindex="0">
      <div class="box">${s[bucket][d.id] ? "✓" : ""}</div>
      <div><h4>${esc(d.t)}</h4><p>${esc(d.d)}</p>${d.where ? `<div class="where">→ ${esc(d.where)}</div>` : ""}</div>
    </div>`).join("");
  wrap.querySelectorAll(".deliv-item").forEach(it => {
    const toggle = () => { const st = loadState(); st[bucket][it.dataset.id] = !st[bucket][it.dataset.id]; saveState(st); renderChecklist(containerId, items, bucket); refreshProgress(); };
    it.addEventListener("click", toggle);
    it.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } });
  });
}
function renderBeforeAfter() {
  const html = `
    <div class="ba-col ba-before"><h4>❌ Before analytics</h4><ul>${BEFORE_AFTER.before.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="ba-mid">→</div>
    <div class="ba-col ba-after"><h4>✅ After analytics</h4><div class="ba-flow">${BEFORE_AFTER.after.map((x, i) => `${i ? '<div class="dn">↓</div>' : ""}<div class="node">${esc(x)}</div>`).join("")}</div></div>`;
  ["before-after", "before-after-2"].forEach(id => { const w = document.getElementById(id); if (w) w.innerHTML = html; });
}
function renderTools() {
  const wrap = document.getElementById("tool-grid");
  TOOLS.forEach((t, i) => {
    wrap.appendChild(el("div", "card tool-card", `<img class="tool-logo" src="${t.logo}" alt="${t.name} logo"><h4>${t.name}</h4><div class="role">${t.role}</div><p>${t.desc}</p>`));
    if (i < TOOLS.length - 1) wrap.appendChild(el("div", "tool-arrow", "→"));
  });
}
function renderDomainPrimer() {
  document.getElementById("domain-what").textContent = DOMAIN_WHAT;
  document.getElementById("domain-where").innerHTML = DOMAIN_WHERE.map(x => `<div style="padding:5px 0;">• ${esc(x)}</div>`).join("");
  document.getElementById("domain-data").innerHTML = DOMAIN_DATA_TYPES.map(x => `<span>${esc(x)}</span>`).join("");
}
function renderResourceCards(items, containerId) {
  const wrap = document.getElementById(containerId); if (!wrap) return;
  wrap.innerHTML = "";
  items.forEach(d => {
    const action = d.type === "download"
      ? `<a class="doc-download" href="${d.href}" download="${d.filename}" title="Download ${d.name}">⬇</a>`
      : `<a class="doc-download" href="${d.href}" target="_blank" rel="noopener" title="Open ${d.name}">↗</a>`;
    wrap.appendChild(el("div", "card doc-card", `<div class="doc-icon">${d.icon}</div><div class="doc-info"><h4>${esc(d.name)}</h4><p>${esc(d.desc)}</p></div>${action}`));
  });
}
function renderDocuments() {
  renderResourceCards(SOFTWARE_LINKS, "software-grid");
  renderResourceCards(DOCUMENTS, "doc-grid");
  renderResourceCards(DOCUMENTS, "doc-grid-2");
  const ss = document.getElementById("setup-steps");
  if (ss) ss.innerHTML = SETUP_STEPS.map((s, i) => `<div class="card setup-step"><div class="si">${s.i}</div><div class="sn">STEP ${i + 1}</div><h4>${esc(s.t)}</h4><p>${esc(s.d)}</p></div>`).join("");
}
function renderFlow() {
  document.getElementById("flow-grid").innerHTML = FLOW.map((f, i) => `<div class="flow-step"><div class="idx">${String(i + 1).padStart(2, "0")}</div><h4>${esc(f.t)}</h4><p>${esc(f.d)}</p></div>`).join("");
}
function renderTimeline() {
  document.getElementById("timeline").innerHTML = TIMELINE.map(r => `<div class="timeline-row"><div class="d">${r.d}</div><div class="t">${r.t}</div><div>${esc(r.task)}</div></div>`).join("");
}

/* ============================================================
   Business problem
   ============================================================ */
function renderProblem() {
  const pg = document.getElementById("problem-grid");
  pg.innerHTML = PROBLEM_STATEMENT.map(r => `<div class="card rule-card"><div class="head"><div class="icon-badge">${r.icon}</div><h4>${esc(r.h)}</h4></div><p>${esc(r.p)}</p></div>`).join("");
  const list = document.getElementById("bq-list");
  list.innerHTML = bq().map((b, i) => `
    <div class="bq-item ${i === 0 ? "open" : ""}">
      <div class="bq-head"><span class="bqn">Q${i + 1}</span><h4>${esc(b.q)}</h4><span class="chev">⌄</span></div>
      <div class="bq-body"><div class="chain">
        <div class="chain-step"><div class="cl">Question</div><p>${esc(b.q)}</p></div>
        <div class="chain-step"><div class="cl">Data</div><p>${esc(b.data)}</p></div>
        <div class="chain-step"><div class="cl">KPI</div><p>${esc(b.kpi)}</p></div>
        <div class="chain-step"><div class="cl">Analysis</div><p>${esc(b.analysis)}</p></div>
        <div class="chain-step"><div class="cl">Insight</div><p>${esc(b.insight)}</p></div>
        <div class="chain-step rec"><div class="cl">Recommendation</div><p>${esc(b.rec)}</p></div>
      </div></div>
    </div>`).join("");
  list.querySelectorAll(".bq-head").forEach(h => h.addEventListener("click", () => h.parentElement.classList.toggle("open")));
  document.getElementById("req-table").innerHTML = `<thead><tr><th>Req</th><th>Page / Area</th><th>Stakeholder</th><th>What it must answer</th><th>Priority</th></tr></thead>
    <tbody>${REQUIREMENTS.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}
function renderRules() {
  document.getElementById("rule-grid").innerHTML = RULES.map(r => `<div class="card rule-card ${r.ok ? "ok" : ""}"><div class="head"><div class="icon-badge">${r.icon}</div><h4>${esc(r.h)}</h4></div><p>${esc(r.p)}</p></div>`).join("");
  document.getElementById("focus-grid").innerHTML = FOCUS_AREAS.map(f => `<div class="card tip-card"><h4 style="margin-top:0;">${esc(f.h)}</h4><p>${esc(f.p)}</p></div>`).join("");
}

/* ============================================================
   Data pages
   ============================================================ */
function renderDataset() {
  document.getElementById("coverage-text").textContent = COVERAGE_TEXT;
  const rows = HR.rows || {};
  document.getElementById("ds-grid").innerHTML = Object.keys(TABLE_TYPES).map(t => {
    const ty = TABLE_TYPES[t]; const cls = ty === "Dimension" ? "dim" : ty === "Employee master" ? "master" : "fact";
    const pu = TABLE_PURPOSE[t] || ["", ""];
    return `<div class="card ds-card ${cls}"><div class="k">${esc(ty)}</div><h4>${t}</h4><div class="rows">${Number(rows[t] || 0).toLocaleString("en-IN")} rows</div>
      <dl class="ds-meta"><dt>Grain</dt><dd>${esc(TABLE_GRAIN[t])}</dd><dt>PK</dt><dd><code>${TABLE_PK[t]}</code></dd><dt>FK</dt><dd>${esc(TABLE_FK[t] || "—")}</dd><dt>Date</dt><dd>${esc(TABLE_DATE[t] || "—")}</dd><dt>Purpose</dt><dd>${esc(pu[0])}</dd></dl>
      <details class="ds-why"><summary>Why does this table exist?</summary><p>${esc(pu[1])}</p></details></div>`;
  }).join("");
  document.getElementById("story-table").innerHTML = `<thead><tr><th>When</th><th>Event</th><th>What happened</th><th>Where you'll see it</th></tr></thead>
    <tbody>${STORY.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}
function renderModel() {
  const rows = HR.rows || {};
  document.getElementById("schema-grid").innerHTML = Object.keys(TABLE_TYPES).map(t => {
    const ty = TABLE_TYPES[t]; const isFact = ty.startsWith("Fact");
    return `<div class="table-node ${isFact ? "fact" : ""} ${t === "Employees" ? "center" : ""}"><div class="hd"><span>${t}</span><span>${Number(rows[t] || 0).toLocaleString("en-IN")}</span></div>
      <div class="bd"><div><span class="pk">${TABLE_PK[t]}</span> · PK</div><div>FK: ${TABLE_FK[t] || "—"}</div><div style="margin-top:4px;opacity:.85;">${ty}</div></div></div>`;
  }).join("");
  const rel = document.getElementById("rel-list");
  rel.innerHTML = `<h4 style="font-size:15px;margin-bottom:6px;">Relationships</h4>` + RELATIONSHIPS.map(r => `<div class="r"><span class="card-arrow">↳</span><span>${esc(r)}</span></div>`).join("");
  document.getElementById("load-order").innerHTML = LOAD_ORDER.map(x => `<div style="padding:5px 0;">${esc(x)}</div>`).join("");
  document.getElementById("calc-fields").innerHTML = CALC_FIELDS.map(x => `<div style="padding:5px 0;">• ${esc(x)}</div>`).join("");
  document.getElementById("gotchas-list").innerHTML = GOTCHAS.map(g => `<div class="gotcha-card"><div class="gotcha-title">⚠️ ${esc(g.t)}</div><div class="gotcha-desc">${esc(g.d)}</div></div>`).join("");
  document.getElementById("global-filters").innerHTML = GLOBAL_FILTERS.map(([n, src]) =>
    `<div style="display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-top:1px solid var(--line-soft);"><span style="font-weight:600;color:var(--ink);">${esc(n)}</span><span style="font-family:var(--mono);font-size:12px;">${esc(src)}</span></div>`).join("");
  document.getElementById("join-guide-table").innerHTML = `<thead><tr><th>Type</th><th>Table</th><th>Primary Key</th><th>Foreign Keys</th><th>Grain</th><th>Rows</th></tr></thead>
    <tbody>${Object.keys(TABLE_TYPES).map(t => `<tr><td>${esc(TABLE_TYPES[t])}</td><td><code>${t}</code></td><td>${TABLE_PK[t]}</td><td>${TABLE_FK[t] || "—"}</td><td>${esc(TABLE_GRAIN[t])}</td><td class="num">${Number(rows[t] || 0).toLocaleString("en-IN")}</td></tr>`).join("")}</tbody>`;
  document.getElementById("dash-table").innerHTML = `<thead><tr><th>#</th><th>Page</th><th>Audience</th><th>Primary KPIs</th><th>Key visuals</th></tr></thead>
    <tbody>${DASHBOARDS.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
  const img = document.getElementById("model-img");
  if (img) img.addEventListener("click", () => openModal(`<img class="zoom-img" src="${img.src}" alt="${esc(img.alt)}">`));
}
let ddKind = "All";
function renderDataDictionary(filterText) {
  const wrap = document.getElementById("datadict-tables"); if (!wrap) return;
  const q = (filterText !== undefined ? filterText : (document.getElementById("dd-search") || {}).value || "").trim().toLowerCase();
  const pills = document.getElementById("dd-pills");
  if (pills && !pills.children.length) {
    ["All", "Dimension", "Master (Dimension)", "Fact", "Fact (SCD Type 2)"].forEach(k => {
      const b = el("button", "pill" + (k === ddKind ? " active" : ""), k === "Master (Dimension)" ? "Employee master" : k);
      b.dataset.k = k;
      b.addEventListener("click", () => { ddKind = k; pills.querySelectorAll(".pill").forEach(p => p.classList.toggle("active", p.dataset.k === k)); renderDataDictionary(); });
      pills.appendChild(b);
    });
  }
  wrap.innerHTML = "";
  (HR.dd || []).forEach(t => {
    if (ddKind !== "All" && t.kind !== ddKind) return;
    const rows = t.cols.filter(c => !q || (t.table + " " + c.join(" ")).toLowerCase().includes(q));
    if (!rows.length) return;
    const card = el("div", "card dd-table-card table-scroll");
    card.innerHTML = `<div class="hd"><h4>${t.table}</h4><span class="tag p2">${esc(t.rows)}</span></div>
      <table class="dtable"><thead><tr><th>Column</th><th>Type</th><th>Description</th><th>Example / blanks</th></tr></thead>
      <tbody>${rows.map(([c, ty, d, n]) => `<tr><td><code>${esc(c)}</code></td><td><span class="col-type">${ty}</span></td><td>${esc(d)}</td><td>${esc(n)}</td></tr>`).join("")}</tbody></table>`;
    wrap.appendChild(card);
  });
  if (!wrap.children.length) wrap.appendChild(el("div", "empty-state", "No columns match that search."));
}
function renderQuality() {
  document.getElementById("null-notes").innerHTML = NULL_NOTES.map(x => `<div style="padding:6px 0;border-top:1px solid var(--line-soft);">• ${esc(x)}</div>`).join("");
  document.getElementById("dq-table").innerHTML = `<thead><tr><th>Check</th><th>Rule</th><th>Tables</th><th>Severity</th></tr></thead>
    <tbody>${DQ_RULES.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}

/* ============================================================
   KPI Library
   ============================================================ */
let kpiActiveCat = "All", kpiSearch = "", kpiStarredOnly = false, kpiTier = "All";
function renderKpiTiers() {
  ["P1", "P2", "P3"].forEach(p => { const e = document.getElementById("kr-" + p.toLowerCase()); if (e) e.textContent = KPIS.filter(k => k.prio === p).length + " KPIs"; });
  const w = document.getElementById("kpi-tier-pills"); if (!w) return; w.innerHTML = "";
  [["All", "All tiers"], ["P1", "P1 · Must know"], ["P2", "P2 · Important"], ["P3", "P3 · Advanced"]].forEach(([v, l]) => {
    const b = el("button", "pill" + (v === kpiTier ? " active" : ""), l); b.addEventListener("click", () => { kpiTier = v; renderKpiTiers(); renderKpiGrid(); }); w.appendChild(b);
  });
}
function renderKpiPills() {
  const wrap = document.getElementById("kpi-pills"); wrap.innerHTML = "";
  KPI_CATS.forEach(c => {
    const n = c === "All" ? KPIS.length : KPIS.filter(k => k.cat === c).length;
    const b = el("button", "pill" + (c === kpiActiveCat ? " active" : ""), `${c} (${n})`);
    b.addEventListener("click", () => { kpiActiveCat = c; renderKpiPills(); renderKpiGrid(); });
    wrap.appendChild(b);
  });
}
function renderKpiGrid() {
  const wrap = document.getElementById("kpi-grid"); wrap.innerHTML = "";
  const q = kpiSearch.trim().toLowerCase(); const bm = getBookmarks();
  const list = KPIS.filter(k => (kpiTier === "All" || k.prio === kpiTier) && (kpiActiveCat === "All" || k.cat === kpiActiveCat) && (!q || (k.name + k.q + k.desc + k.formula + k.table).toLowerCase().includes(q)) && (!kpiStarredOnly || bm.kpi[k.name]));
  if (!list.length) { wrap.appendChild(el("div", "empty-state", kpiStarredOnly ? "No starred KPIs yet. Tap the ★ on any card to save it here." : "No KPIs match that search.")); return; }
  list.forEach(k => {
    const starred = !!bm.kpi[k.name];
    const c = el("div", "card kpi-card"); c.id = "kpi-" + slugify(k.name);
    c.innerHTML = `
      <div class="top"><h4>${esc(k.name)}</h4>
        <div class="card-top-actions"><span class="tag ${k.prio === "P1" ? "p1" : "p2"} tier-${k.prio}">${k.prio}</span>
          <button class="link-btn" title="Copy link to this KPI" data-link-kpi="${esc(k.name)}">🔗</button>
          <button class="star-btn ${starred ? "starred" : ""}" title="Star this KPI" data-star-kpi="${esc(k.name)}">${starred ? "★" : "☆"}</button></div></div>
      <p class="kpi-q">${esc(k.q)}</p>
      <p class="kpi-logic">${esc(k.desc)}</p>
      <div class="kpi-plain">${esc(k.plain)}</div>
      <div class="formula">${esc(k.formula)}</div>
      <div class="kpi-ans"><span>CY2024: ${esc(k.v24)}</span><span>CY2025: ${esc(k.v25)}</span>${k.bench ? `<span class="bm">Benchmark: ${esc(k.bench)}</span>` : ""}</div>
      <div class="meta"><span>${esc(k.table)}</span><span>${esc(k.cat)} · ${esc(k.dir)}</span></div>`;
    wrap.appendChild(c);
  });
  wrap.querySelectorAll("[data-star-kpi]").forEach(b => b.addEventListener("click", () => { toggleBookmark("kpi", b.dataset.starKpi); renderKpiGrid(); }));
  wrap.querySelectorAll("[data-link-kpi]").forEach(b => b.addEventListener("click", () => copyDeepLink("kpi", b.dataset.linkKpi)));
}

/* ============================================================
   SQL, Excel, Analysis
   ============================================================ */
let sqlCat = "All", sqlPractice = false;
function sqlHint(sql) {
  const kw = (sql.match(/\b(SELECT|JOIN|LEFT JOIN|WHERE|GROUP BY|HAVING|ORDER BY|WITH|CASE|SUM|COUNT|AVG|DATEDIFF|ROW_NUMBER|COALESCE|CREATE TABLE|CREATE OR REPLACE VIEW|UNION ALL)\b/gi) || []).map(x => x.toUpperCase());
  const tables = sql.match(/\b(Employees|Dim_\w+|Job_History|Salary_History|Performance_Reviews|Exit_Details|Payroll_Monthly|Attendance_Monthly|Leave_Requests|Training_Records|Engagement_Survey|Job_Requisitions|Candidates)\b/g) || [];
  return `Tables: ${[...new Set(tables)].join(", ") || "—"} · Key SQL: ${[...new Set(kw)].slice(0, 8).join(", ")}`;
}
function sqlBlockHtml(b, idx, prefix) {
  const exp = (b.sql.match(/--\s*[^\n]*\d[^\n]*/g) || []).slice(0, 3).map(x => x.replace(/^--\s*/, "")).join(" · ");
  if (prefix === "s" && sqlPractice) {
    return `<div class="card sql-block practice"><div class="hd"><div><h4>${esc(b.title)}</h4><p><strong>Your task:</strong> ${esc(b.desc)}</p></div></div>
      ${exp ? `<div class="sql-expect">🎯 Expected result: ${esc(exp)}</div>` : ""}
      <div class="sql-steps"><button class="btn-outline" data-hint="${idx}">💡 Show hint</button><button class="btn-blue" data-reveal="${idx}">🔓 Reveal solution</button></div>
      <div class="hint-text" id="sqlh-${idx}" style="display:none;">${esc(sqlHint(b.sql))}</div>
      <pre id="sqls-${idx}" style="display:none;">${esc(b.sql)}</pre></div>`;
  }
  const lv = b.level || ({ Setup: "Easy", Exploration: "Easy", KPI: "Medium", "Mart view": "Advanced", QA: "Medium" }[b.cat] || "Medium");
  return `<div class="card sql-block"><div class="hd"><div><h4><span class="lvl lvl-${lv.toLowerCase()}">${lv}</span> ${esc(b.title)}</h4><p>${esc(b.desc)}</p></div><button class="copy-btn" data-copy="${prefix}${idx}">Copy</button></div><pre>${esc(b.sql)}</pre></div>`;
}
function renderSql() {
  const pills = document.getElementById("sql-pills");
  const cats = ["All", ...new Set(SQL_BLOCKS.map(b => b.cat))];
  pills.innerHTML = "";
  cats.forEach(c => { const b = el("button", "pill" + (c === sqlCat ? " active" : ""), c); b.addEventListener("click", () => { sqlCat = c; renderSql(); }); pills.appendChild(b); });
  const wrap = document.getElementById("sql-list");
  wrap.innerHTML = SQL_BLOCKS.map((b, i) => (sqlCat === "All" || b.cat === sqlCat) ? sqlBlockHtml(b, i, "s") : "").join("");
  wrap.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", () => copyText(SQL_BLOCKS[+btn.dataset.copy.slice(1)].sql, btn, "Copy")));
  wrap.querySelectorAll("[data-hint]").forEach(b => b.addEventListener("click", () => { const x = document.getElementById("sqlh-" + b.dataset.hint); x.style.display = x.style.display === "none" ? "block" : "none"; }));
  wrap.querySelectorAll("[data-reveal]").forEach(b => b.addEventListener("click", () => { document.getElementById("sqls-" + b.dataset.reveal).style.display = "block"; b.remove(); }));
  const t = document.getElementById("sql-practice-toggle");
  if (t && !t._bound) { t._bound = true; t.addEventListener("click", () => { sqlPractice = !sqlPractice; t.textContent = sqlPractice ? "Turn practice mode OFF" : "Turn practice mode ON"; renderSql(); }); }
}
function renderExcel() {
  document.getElementById("excel-table").innerHTML = `<thead><tr><th>Calculation</th><th>Excel formula pattern</th><th>Expected result</th><th>Status</th></tr></thead>
    <tbody>${EXCEL_TASKS.map(r => `<tr><td>${esc(r[0])}</td><td><code>${esc(r[1])}</code></td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody>`;
  document.getElementById("pivot-grid").innerHTML = PIVOTS.map(t => `<div class="card tip-card"><div class="n">${t.n}</div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("");
}
function renderAnalysis() {
  document.getElementById("vol-base").textContent = (HR.vol_overall_base || 11.1) + "%";
  const base = HR.vol_overall_base || 11.1;
  const charts = [
    ["Pay position (compa-ratio on 1-Jan-2025)", "Below-band pay is the strongest driver", HR.vol_by_compa],
    ["Average overtime per month (2024)", "Workload pushes people out", HR.vol_by_ot],
    ["eNPS group (Oct-2024 survey)", "The survey predicts exits", HR.vol_by_enps],
    ["Tenure on 1-Jan-2025", "Newer employees are most at risk", HR.vol_by_tenure],
    ["Commute distance", "Long commutes add risk", HR.vol_by_dist],
  ];
  document.getElementById("driver-grid").innerHTML = charts.map(([t, s, data]) => `<div class="card chart-card"><h4>${esc(t)}</h4><div class="cs">${esc(s)} · voluntary exit rate in 2025</div>${renderBarBlock({ title: "", data: data || [], suffix: "%" }, { base })}</div>`).join("");
  document.getElementById("insights-grid").innerHTML = bq().slice(0, 6).map((k, i) => `
    <div class="card insight-card tint-${i % 6}"><div class="insight-label">Insight</div><p class="insight-text">${esc(k.insight)}</p>
    <div class="insight-label rec">Recommendation</div><p class="insight-text">${esc(k.rec)}</p></div>`).join("");
}

/* ============================================================
   Dashboard gallery + modal
   ============================================================ */
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal-overlay").classList.add("open");
}
function closeModal() { document.getElementById("modal-overlay").classList.remove("open"); }
function initModal() {
  const ov = document.getElementById("modal-overlay");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  ov.addEventListener("click", (e) => { if (e.target === ov) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}
function renderGallery() {
  const pages = galleryPages();
  document.getElementById("gallery-grid").innerHTML = pages.map((p, i) => `
    <div class="card gallery-card">
      <div class="gtop"><div class="gnum">${p.n}</div><h4>${esc(p.t)}</h4><div class="gk">${p.keys.map(k => `<span>${esc(k)}</span>`).join("")}</div></div>
      <div class="gbody"><div class="gq">❓ ${esc(p.q)}</div><p>${esc(p.desc)}</p><div class="gins">💡 ${esc(p.ins)}</div><div class="gaud">Audience: ${esc(p.aud)}</div><button class="btn-blue" data-dash="${i}">View Dashboard →</button></div>
    </div>`).join("");
  document.querySelectorAll("[data-dash]").forEach(b => b.addEventListener("click", () => {
    const p = pages[+b.dataset.dash];
    openModal(`<div class="flow-strip"><div><span>Business question</span>${esc(p.q)}</div><div><span>KPIs</span>${esc(p.keys.join(" · "))}</div><div><span>Key insight</span>${esc(p.ins)}</div><div><span>Interview question</span>${esc(p.iq)}</div></div>` + renderDashMock(p.mock) + `<div class="build-notes">
      <div class="card"><h5>📈 Build it in Tableau</h5><ul>${p.build.tableau.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="card"><h5>⚡ Build it in Power BI</h5><ul>${p.build.powerbi.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>`);
  }));
}

/* ============================================================
   QA page
   ============================================================ */
const RECON_KPIS = ["Headcount (Closing)", "New Hires", "Separations (Exits)", "Overall Attrition Rate %", "Voluntary Attrition %", "Gender Diversity (Female %)",
  "Time to Fill (Days)", "Offer Acceptance Rate %", "Total Employer Cost (INR Cr)", "Average Annual CTC (INR Lakh)", "High Performer % (Rating 4-5)", "Employee Net Promoter Score (eNPS)"];
function renderQA() {
  const wrap = document.getElementById("qa-sql-list");
  wrap.innerHTML = QA_SQL.map((b, i) => sqlBlockHtml(b, i, "q")).join("");
  wrap.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", () => copyText(QA_SQL[+btn.dataset.copy.slice(1)].sql, btn, "Copy")));
  const s = loadState();
  const rows = RECON_KPIS.map(n => KPIS.find(k => k.name === n)).filter(Boolean);
  const t = document.getElementById("recon-table");
  t.innerHTML = `<thead><tr><th>KPI (CY2025)</th><th>SQL / answer key</th><th>Your Tableau value</th><th>Your Power BI value</th><th>Status</th></tr></thead>
    <tbody>${rows.map(k => {
      const r = s.recon[k.id] || {};
      return `<tr data-id="${k.id}" data-ans="${esc(k.v25)}"><td>${esc(k.name)}</td><td class="num">${esc(k.v25)}</td>
        <td><input class="search-input" style="max-width:130px;padding:6px 10px;" data-f="tab" value="${esc(r.tab || "")}"></td>
        <td><input class="search-input" style="max-width:130px;padding:6px 10px;" data-f="pbi" value="${esc(r.pbi || "")}"></td>
        <td class="st"></td></tr>`;
    }).join("")}</tbody>`;
  const evalRow = (tr) => {
    const ans = parseFloat(String(tr.dataset.ans).replace(/[^0-9.\-]/g, ""));
    const vals = [...tr.querySelectorAll("input")].map(i => i.value.trim());
    const ok = vals.map(v => v !== "" && Math.abs(parseFloat(v.replace(/[^0-9.\-]/g, "")) - ans) <= 0.11);
    const st = tr.querySelector(".st");
    if (vals.every(v => v === "")) st.textContent = "";
    else if (ok.every(Boolean)) st.innerHTML = `<span class="recon-ok">✓ Ties out</span>`;
    else st.innerHTML = `<span style="color:var(--red);font-weight:700;">✗ Investigate</span>`;
  };
  t.querySelectorAll("tbody tr").forEach(tr => {
    evalRow(tr);
    tr.querySelectorAll("input").forEach(inp => inp.addEventListener("input", () => {
      const st = loadState(); st.recon[tr.dataset.id] = st.recon[tr.dataset.id] || {}; st.recon[tr.dataset.id][inp.dataset.f] = inp.value; saveState(st); evalRow(tr);
    }));
  });
  renderChecklist("qa-checklist", QA_CHECKLIST, "qachk");
}

/* ============================================================
   Assignments
   ============================================================ */
function renderAssignments() {
  const list = assignments(); const s = loadState();
  const done = list.filter(a => s.assign[a.id] && s.assign[a.id].ok).length;
  document.getElementById("assign-score").textContent = `${done} / ${list.length} assignments solved`;
  const wrap = document.getElementById("assign-list");
  wrap.innerHTML = list.map((a, i) => {
    const st = s.assign[a.id] || {};
    const input = a.type === "select"
      ? `<select data-in="${a.id}"><option value="">Choose…</option>${a.options.map(o => `<option ${st.last === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`
      : `<input type="text" inputmode="decimal" data-in="${a.id}" placeholder="Your answer${a.unit ? " (" + a.unit + ")" : ""}" value="${esc(st.last || "")}">`;
    return `<div class="card assign-card" id="as-${a.id}">
      <div class="assign-head"><span class="an">Assignment ${String(i + 1).padStart(2, "0")}</span><div><h4>${esc(a.t)}</h4><div class="tool">${esc(a.tool)}</div></div>
        <span class="status ${st.ok ? "ok" : ""}">${st.ok ? "✓ Solved" : st.tries ? `${st.tries} attempt${st.tries > 1 ? "s" : ""}` : "Not started"}</span></div>
      <div class="assign-steps"><button data-tab="task" class="active">1 · View Task</button><button data-tab="check">2 · Check Answer</button><button data-tab="sol">3 · Solution</button></div>
      <div class="assign-panel show" data-p="task"><strong>What to do</strong><ul>${a.task.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="assign-panel" data-p="check"><div class="answer-row">${input}<button class="btn-blue" data-check="${a.id}">Check</button><button class="btn-outline" data-hint="${a.id}">Hint</button></div>
        <div class="answer-feedback ${st.ok ? "good" : ""}">${st.ok ? "✓ Correct, and it matches the dataset." : ""}</div><div class="hint-text" style="display:none;">💡 ${esc(a.hint)}</div></div>
      <div class="assign-panel" data-p="sol">${st.tries ? `<pre>${esc(a.sol)}</pre>` : `<div class="hint-text">🔒 Make at least one attempt in <strong>Check Answer</strong> to unlock the solution.</div>`}</div>
    </div>`;
  }).join("");
  wrap.querySelectorAll(".assign-card").forEach(card => {
    card.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => {
      card.querySelectorAll("[data-tab]").forEach(x => x.classList.toggle("active", x === b));
      card.querySelectorAll("[data-p]").forEach(p => p.classList.toggle("show", p.dataset.p === b.dataset.tab));
    }));
  });
  wrap.querySelectorAll("[data-hint]").forEach(b => b.addEventListener("click", () => { const h = b.closest(".assign-panel").querySelector(".hint-text"); h.style.display = h.style.display === "none" ? "block" : "none"; }));
  wrap.querySelectorAll("[data-check]").forEach(b => b.addEventListener("click", () => {
    const a = list.find(x => x.id === b.dataset.check);
    const inp = wrap.querySelector(`[data-in="${a.id}"]`); const raw = inp.value.trim();
    if (!raw) return;
    let ok;
    if (a.type === "select") ok = raw === a.ans;
    else { const v = parseFloat(raw.replace(/[₹,%\s]/g, "")); ok = !isNaN(v) && Math.abs(v - a.ans) <= (a.tol || 0) + 1e-9; }
    const st = loadState(); const cur = st.assign[a.id] || { tries: 0 };
    cur.tries = (cur.tries || 0) + 1; cur.last = raw; if (ok) cur.ok = true; st.assign[a.id] = cur; saveState(st);
    renderAssignments(); refreshProgress();
    const card = document.getElementById("as-" + a.id);
    card.querySelectorAll("[data-tab]").forEach(x => x.classList.toggle("active", x.dataset.tab === "check"));
    card.querySelectorAll("[data-p]").forEach(p => p.classList.toggle("show", p.dataset.p === "check"));
    const fb = card.querySelector(".answer-feedback");
    fb.className = "answer-feedback " + (ok ? "good" : "bad");
    fb.textContent = ok ? "✓ Correct, and it matches the dataset." : "✗ Not quite. Re-check your filters (dates, status, denominator), use the hint, or open the solution.";
  }));
}

/* ============================================================
   Analyst Thinking Lab
   ============================================================ */
function renderLab() {
  const s = loadState();
  const answered = Object.keys(s.lab).length;
  const best = Object.entries(s.lab).filter(([i, c]) => LAB[+i] && LAB[+i].opts[c] && LAB[+i].opts[c][1] === "best").length;
  document.getElementById("lab-score").textContent = `${answered} / ${LAB.length} scenarios answered · ${best} best-first-move picks`;
  const wrap = document.getElementById("lab-list");
  wrap.innerHTML = LAB.map((l, i) => {
    const pick = s.lab[i];
    return `<div class="card lab-card"><div class="lab-n">Scenario ${String(i + 1).padStart(2, "0")}</div><h4>${esc(l.t)}</h4><p class="scn">${esc(l.scn)}</p>
      <div class="lab-opts">${l.opts.map((o, j) => `<button class="lab-opt ${pick !== undefined ? o[1] : ""}" data-l="${i}" data-o="${j}">${"ABCD"[j]}. ${esc(o[0])}${pick !== undefined ? (o[1] === "best" ? " ✓ best first move" : o[1] === "ok" ? " · reasonable, not first" : "") : ""}${pick === j ? " ← your pick" : ""}</button>`).join("")}</div>
      <div class="lab-explain ${pick !== undefined ? "show" : ""}"><strong>What an analyst checks first:</strong><ol>${l.exp.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div></div>`;
  }).join("");
  wrap.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => {
    const st = loadState(); st.lab[b.dataset.l] = +b.dataset.o; saveState(st); renderLab(); refreshProgress();
  }));
}

/* ============================================================
   Interview Q&A
   ============================================================ */
let qaActiveCat = "Explain This Project", qaSearch = "", qaStarredOnly = false;
function renderQaTabs() {
  const wrap = document.getElementById("qa-tabs"); wrap.innerHTML = "";
  QA_CATS.forEach(c => {
    const b = el("button", c === qaActiveCat ? "active" : "", `${c} (${QA.filter(q => q.cat === c).length})`);
    b.addEventListener("click", () => { qaActiveCat = c; renderQaTabs(); renderQaList(); });
    wrap.appendChild(b);
  });
}
function renderQaList() {
  const wrap = document.getElementById("qa-list"); wrap.innerHTML = "";
  const st = loadState(); const bm = getBookmarks(); const q = qaSearch.trim().toLowerCase();
  const list = QA.filter(it => (q ? true : it.cat === qaActiveCat) && (!q || (it.q + it.a).toLowerCase().includes(q)) && (!qaStarredOnly || bm.qa[it.q]));
  updateQaProgressBar();
  if (!list.length) { wrap.appendChild(el("div", "empty-state", qaStarredOnly ? "No starred questions yet. Tap the ★ on any question to save it here." : "No questions match that search.")); return; }
  list.forEach(item => {
    const id = item.cat + "::" + item.q; const done = !!st.qa[id]; const starred = !!bm.qa[item.q]; const isLong = item.a.length > 480;
    const card = el("div", "qa-item" + (done ? " reviewed" : "")); card.id = "qa-" + slugify(item.q);
    card.innerHTML = `
      <div class="qa-q"><span class="num">${esc(item.cat)}</span><span class="qtext">${esc(item.q)}</span>
        <button class="link-btn" title="Copy link to this question">🔗</button>
        <button class="star-btn ${starred ? "starred" : ""}" title="Star this question">${starred ? "★" : "☆"}</button><span class="chev">⌄</span></div>
      <div class="qa-a"><div class="qa-a-inner">
        <div class="answer-text ${isLong ? "clamped" : ""}"><p>${item.a}</p></div>
        ${isLong ? '<button type="button" class="show-full-btn">Show full answer ▾</button>' : ""}
        <div class="signal">Interviewer signal: ${esc(item.signal)}</div>
        ${item.src ? `<div class="q-src">📚 Source: <a href="${item.src[1]}" target="_blank" rel="noopener">${esc(item.src[0])} ↗</a></div>` : ""}
        <button class="mark-btn ${done ? "done" : ""}">${done ? "✓ Reviewed" : "Mark as reviewed"}</button></div></div>`;
    const aDiv = card.querySelector(".qa-a");
    card.querySelector(".qa-q").addEventListener("click", (ev) => {
      if (ev.target.closest(".star-btn") || ev.target.closest(".link-btn")) return;
      const open = card.classList.toggle("open"); aDiv.style.maxHeight = open ? aDiv.scrollHeight + "px" : "0px";
    });
    const sf = card.querySelector(".show-full-btn");
    if (sf) sf.addEventListener("click", (ev) => { ev.stopPropagation(); const t = card.querySelector(".answer-text"); const c = t.classList.toggle("clamped"); sf.textContent = c ? "Show full answer ▾" : "Show less ▴"; if (card.classList.contains("open")) aDiv.style.maxHeight = aDiv.scrollHeight + "px"; });
    const mb = card.querySelector(".mark-btn");
    mb.addEventListener("click", (ev) => { ev.stopPropagation(); const s2 = loadState(); s2.qa[id] = !s2.qa[id]; saveState(s2); mb.classList.toggle("done", s2.qa[id]); mb.textContent = s2.qa[id] ? "✓ Reviewed" : "Mark as reviewed"; card.classList.toggle("reviewed", !!s2.qa[id]); updateQaProgressBar(); refreshProgress(); });
    card.querySelector(".star-btn").addEventListener("click", (ev) => { ev.stopPropagation(); toggleBookmark("qa", item.q); renderQaList(); });
    card.querySelector(".link-btn").addEventListener("click", (ev) => { ev.stopPropagation(); copyDeepLink("qa", item.q); });
    wrap.appendChild(card);
  });
}
function updateQaProgressBar() {
  const st = loadState(); const done = QA.filter(it => st.qa[it.cat + "::" + it.q]).length; const pct = QA.length ? Math.round(done / QA.length * 100) : 0;
  const t = document.getElementById("progress-text"), b = document.getElementById("progress-bar");
  if (t) t.textContent = `${done} / ${QA.length} reviewed`; if (b) b.style.width = pct + "%";
}

/* ============================================================
   Pitch, career, glossary, tips, learn
   ============================================================ */
let pitchTimer = null, pitchLeft = 90;
function renderPitch() {
  document.getElementById("pitch-flow").innerHTML = PITCH_FLOW.map((p, i) => `<div class="pitch-step"><div class="ps-n">${String(i + 1).padStart(2, "0")} ${i < PITCH_FLOW.length - 1 ? "→" : ""}</div><h4>${esc(p.t)}</h4><p>${esc(p.d)}</p><div class="sec">${p.s}</div></div>`).join("");
  document.getElementById("elevator-pitch").textContent = ELEVATOR_PITCH;
  document.getElementById("copy-pitch-btn").addEventListener("click", (e) => copyText(ELEVATOR_PITCH, e.currentTarget, "📋 Copy pitch"));
  document.getElementById("project-faq").innerHTML = PROJECT_FAQ.map(f => `<div class="faq-item"><h4>${esc(f.q)}</h4><p>${esc(f.a)}</p></div>`).join("");
  const ta = document.getElementById("pitch-text"), timer = document.getElementById("pitch-timer");
  const st = loadState(); if (st.pitch.text) ta.value = st.pitch.text;
  const draw = () => { const m = Math.floor(Math.abs(pitchLeft) / 60), s = Math.abs(pitchLeft) % 60; timer.textContent = (pitchLeft < 0 ? "+" : "") + m + ":" + String(s).padStart(2, "0"); timer.className = "timer" + (pitchLeft < 0 ? " over" : pitchLeft <= 15 ? " warn" : ""); };
  const analyse = () => {
    const txt = ta.value.toLowerCase(); const words = (ta.value.trim().match(/\S+/g) || []).length;
    document.getElementById("pitch-meta").textContent = `${words} words · about ${Math.round(words / 2.5)} seconds spoken (target 200–230 words for 90 s)`;
    document.getElementById("pitch-checks").innerHTML = PITCH_FLOW.map(p => { const hit = p.key.some(k => txt.includes(k)); return `<span class="check-pill ${hit ? "on" : ""}">${hit ? "✓" : "○"} ${esc(p.t)}</span>`; }).join("");
  };
  ta.addEventListener("input", analyse); analyse(); draw();
  document.getElementById("pitch-start").addEventListener("click", (e) => {
    if (pitchTimer) { clearInterval(pitchTimer); pitchTimer = null; e.currentTarget.textContent = "▶ Resume"; return; }
    e.currentTarget.textContent = "⏸ Pause"; ta.focus();
    pitchTimer = setInterval(() => { pitchLeft--; draw(); }, 1000);
  });
  document.getElementById("pitch-reset").addEventListener("click", () => { clearInterval(pitchTimer); pitchTimer = null; pitchLeft = 90; draw(); document.getElementById("pitch-start").textContent = "▶ Start 90-sec timer"; });
  document.getElementById("pitch-save").addEventListener("click", (e) => {
    const s2 = loadState(); s2.pitch.text = ta.value; if (ta.value.trim().length > 40) s2.pitch.practiced = true; saveState(s2); refreshProgress();
    e.currentTarget.textContent = ta.value.trim().length > 40 ? "✓ Saved & marked practiced" : "Write a little more first";
    setTimeout(() => { e.currentTarget.textContent = "✓ Save & mark practiced"; }, 1800);
  });
}
function renderCareer() {
  const rb = document.getElementById("resume-block");
  const text = `${RESUME_PROJECT.title}\n${RESUME_PROJECT.tools}\nKey Contributions\n${RESUME_PROJECT.bullets.map(b => "- " + b).join("\n")}`;
  rb.innerHTML = `<h3>${esc(RESUME_PROJECT.title)}</h3><div class="tools-line">${esc(RESUME_PROJECT.tools)}</div><strong style="font-size:13.5px;">Key Contributions</strong>
    <ul>${RESUME_PROJECT.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul><div class="copy-row"><button class="btn-dark" id="copy-resume">📋 Copy Resume Description</button></div>`;
  document.getElementById("copy-resume").addEventListener("click", (e) => copyText(text, e.currentTarget, "📋 Copy Resume Description"));
  const bw = document.getElementById("resume-bullets");
  bw.innerHTML = RESUME_BULLETS.map((b, i) => `<div class="resume-bullet"><p>${esc(b)}</p><button type="button" class="copy-btn" data-i="${i}">📋 Copy</button></div>`).join("");
  bw.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => copyText(RESUME_BULLETS[+b.dataset.i], b, "📋 Copy")));
  document.getElementById("linkedin-post").textContent = LINKEDIN_POST;
  document.getElementById("copy-linkedin-btn").addEventListener("click", (e) => copyText(LINKEDIN_POST, e.currentTarget, "📋 Copy post"));
  document.getElementById("portfolio-grid").innerHTML = PORTFOLIO.map(t => `<div class="card tip-card"><div class="n">${t.n}</div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("");
}
function renderGlossary(filterText) {
  const wrap = document.getElementById("gloss-grid"); const q = (filterText || "").trim().toLowerCase();
  const list = GLOSSARY.filter(g => !q || (g.t + g.d).toLowerCase().includes(q));
  wrap.innerHTML = list.length ? list.map(g => `<div class="card gloss-card" id="gl-${slugify(g.t)}"><h4>${esc(g.t)}</h4><p>${esc(g.d)}</p></div>`).join("") : `<div class="empty-state">No terms match that search.</div>`;
}
function renderTips() {
  document.getElementById("tip-grid").innerHTML = TIPS.map(t => `<div class="card tip-card"><div class="n">${t.n}</div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("");
  document.getElementById("tip-callout").textContent = TIP_CALLOUT;
  document.getElementById("weak-strong-list").innerHTML = WEAK_STRONG.map(ws => `<div class="ws-card"><div class="ws-q">${esc(ws.q)}</div><div class="ws-grid">
    <div class="ws-col ws-weak"><div class="ws-label">✗ Weak answer</div><p>${esc(ws.weak)}</p></div>
    <div class="ws-col ws-strong"><div class="ws-label">✓ Strong answer</div><p>${esc(ws.strong)}</p></div></div></div>`).join("");
}
function renderLearningLinks() {
  document.getElementById("learn-grid").innerHTML = LEARNING_LINKS.map((l, i) => `<a class="learn-card tint-${i % 6}" href="${l.url}" target="_blank" rel="noopener"><span class="learn-source">${esc(l.source)}</span><h4>${esc(l.title)}</h4><p>${esc(l.desc)}</p><span class="learn-cta">Open resource ↗</span></a>`).join("");
}
function renderProgressPage() {
  const r = document.getElementById("reset-progress");
  if (r) r.addEventListener("click", () => {
    if (!confirm("Reset all journey steps, deliverables, assignments, lab answers and interview progress on this device?")) return;
    saveState({}); try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    renderJourney(); renderChecklist("deliv-grid", DELIVERABLES, "deliv"); renderAssignments(); renderLab(); renderQaList(); renderQA(); refreshProgress();
  });
}

function renderSamples() {
  const g = document.getElementById("sample-grid");
  if (g) {
    g.innerHTML = SAMPLE_IMAGE_DASHBOARDS.map((d, i) => `
      <div class="card sample-card">
        <img src="${d.img}" alt="${esc(d.t)} by ${esc(d.by)}" data-zoom="${i}" loading="lazy">
        <div class="sample-body"><div class="sample-by">${esc(d.by)}</div><h4>${esc(d.t)}</h4>
          <p><strong>What it does:</strong> ${esc(d.does)}</p><p><strong>KPIs:</strong> ${esc(d.kpis)}</p>
          <p><strong>Visuals:</strong> ${esc(d.visuals)}</p><div class="sample-px">➜ ${esc(d.proxima)}</div></div>
      </div>`).join("");
    g.querySelectorAll("[data-zoom]").forEach(im => im.addEventListener("click", () => openModal(`<img class="zoom-img" src="${im.src}" alt="${esc(im.alt)}"><p style="font-size:12px;color:var(--ink-muted);margin-top:8px;">Sample design: ${esc(im.alt)}. Shown for learning; values are not from the Proxima dataset.</p>`)));
  }
  const w = document.getElementById("vidi-cards");
  if (w) {
    const li = (arr) => `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    w.innerHTML = VIDI_DASHBOARDS.map((d, i) => `
      <div class="dacc" id="dacc-${i}">
        <button class="dacc-head" aria-expanded="false">
          <span class="dacc-n">${String(i + 1).padStart(2, "0")}</span>
          <span class="dacc-t"><strong>${esc(d.name)}</strong><span>${esc(d.tag)}</span></span>
          <span class="dacc-tool">${esc(d.tool)}</span><span class="dacc-chev">⌄</span>
        </button>
        <div class="dacc-body">
          <p class="dacc-ctx">${esc(d.context)}</p>
          <div class="dacc-grid">
            <div><h5>📋 What it shows</h5><p>${esc(d.what)}</p></div>
            <div><h5>❓ Business question it answers</h5><p>${esc(d.question)}</p></div>
            <div><h5>👥 Who uses it</h5><p>${esc(d.who)}</p></div>
            <div><h5>🎛️ Filters / slicers</h5><p>${esc(d.filters)}</p></div>
            <div><h5>📊 Key KPIs</h5>${li(d.kpis)}</div>
            <div><h5>📈 Visuals</h5>${li(d.visuals)}</div>
          </div>
          <div class="dacc-build"><h5>🛠️ Build it with the Proxima data</h5>${li(d.build)}</div>
          <div class="dacc-foot"><span class="dacc-insight">💡 Proxima example: ${esc(d.proxima)}</span><span class="dacc-page">Gallery page: ${esc(d.page)}</span></div>
        </div>
      </div>`).join("");
    const setOpen = (card, open) => { card.classList.toggle("open", open); card.querySelector(".dacc-head").setAttribute("aria-expanded", open); };
    w.querySelectorAll(".dacc").forEach(c => c.querySelector(".dacc-head").addEventListener("click", () => setOpen(c, !c.classList.contains("open"))));
    const oa = document.getElementById("acc-open-all"), ca = document.getElementById("acc-close-all");
    if (oa) oa.addEventListener("click", () => w.querySelectorAll(".dacc").forEach(c => setOpen(c, true)));
    if (ca) ca.addEventListener("click", () => w.querySelectorAll(".dacc").forEach(c => setOpen(c, false)));
  }
}
function renderQaRefs() {
  const w = document.getElementById("qa-refs"); if (!w) return;
  w.innerHTML = QA_REFERENCES.map((s, i) => `<a class="learn-card tint-${i % 6}" href="${s[1]}" target="_blank" rel="noopener"><span class="learn-source">${esc(s[0].split(":")[0])}</span><h4>${esc(s[0].split(": ").slice(1).join(": ") || s[0])}</h4><span class="learn-cta">Open source ↗</span></a>`).join("");
}
function initBrandHome() {
  document.querySelectorAll("#brand-home, .brand-home-link").forEach(a => a.addEventListener("click", (e) => {
    e.preventDefault(); if (location.hash) history.replaceState(null, "", location.pathname); switchView("overview");
  }));
}

function renderTraps() {
  const g = document.getElementById("trap-grid"); if (g) g.innerHTML = INTERVIEW_TRAPS.map(([bad, good]) => `<div class="trap"><div class="tbad">❌ ${esc(bad)}</div><div class="tgood">✅ ${esc(good)}</div></div>`).join("");
  const p = document.getElementById("pres-list"); if (p) p.innerHTML = PRESENTATION.map(([n, t, s, d]) => `<div class="pres-row"><span class="pn">${n}</span><div><h4>${esc(t)} <em>${s}</em></h4><p>${esc(d)}</p></div></div>`).join("");
}
function renderCertificate() {
  const box = document.getElementById("cert-box"); if (!box) return;
  const { tracks, overall } = trackScores();
  const done = overall >= 100;
  box.innerHTML = `<h4>${done ? "🎉 HR Analytics Capstone Completed" : "🏅 Completion certificate"}</h4>
    <div class="cert-ticks">${tracks.map(t => `<span class="${t.pct >= 100 ? "on" : ""}">${t.pct >= 100 ? "✓" : "○"} ${esc(t.name)}</span>`).join("")}</div>
    ${done ? `<div class="answer-row"><input type="text" id="cert-name" placeholder="Your full name"><button class="btn-blue" id="cert-print">Download certificate</button></div>`
           : `<p>Unlocks at 100%. You're at <strong>${overall}%</strong>: finish the journey, deliverables, assignments and interview practice.</p>`}`;
  const b = document.getElementById("cert-print");
  if (b) b.addEventListener("click", () => {
    const nm = (document.getElementById("cert-name").value || "").trim(); if (!nm) { chatToastMini("Type your name first."); return; }
    document.getElementById("print-sheet").innerHTML = `<div class="cert-print"><img src="assets/proxima-icon.png" alt="" style="width:70px;"><h1>Certificate of Completion</h1><p>This certifies that</p><h2>${esc(nm)}</h2>
      <p>has completed the <strong>Proxima HR Analytics Capstone</strong>: data model, SQL, Excel, Tableau, Power BI, KPI implementation, QA reconciliation, business analysis and interview preparation.</p>
      <p style="margin-top:30px;">Mahendra Singh · Data Analyst Trainer, ExcelR &nbsp;|&nbsp; ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      <p style="font-size:10px;color:#777;margin-top:20px;">Self-tracked completion on the Proxima HR Analytics learning hub. Proxima Business Services is a fictional case-study company.</p></div>`;
    setTimeout(() => window.print(), 80);
  });
}
/* ============================================================
   Navigation
   ============================================================ */
const LAST_VIEW_KEY = "proxima_hr_last_view_v1";
const VIEW_LABELS = {
  schedule: "Project Schedule & Status", progress: "My Progress", problem: "Problem & Business Questions", rules: "Rules & Regulations", dataset: "Dataset", model: "Data Model",
  datadict: "Data Dictionary", quality: "Data Quality", kpis: "KPI Library", sql: "SQL Lab", editor: "SQL Practice Editor", excel: "Excel Analysis", analysis: "Business Analysis",
  dashboards: "Dashboard Gallery", qa: "QA & Reconciliation", assignments: "Assignments", lab: "Analyst Thinking Lab", interview: "Interview Questions",
  pitch: "90-sec Project Pitch", career: "Resume, LinkedIn & Portfolio", glossary: "Glossary", tips: "Student Tips", learnmore: "Learn More",
};
function switchView(viewName) {
  if (viewName === "journey-anchor") {
    switchView("overview");
    setTimeout(() => { const j = document.getElementById("journey-anchor"); if (j) j.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    return;
  }
  document.querySelectorAll("#nav button").forEach(x => x.classList.toggle("active", x.dataset.view === viewName));
  document.querySelectorAll("section.view").forEach(v => v.classList.remove("active"));
  const section = document.getElementById("view-" + viewName);
  if (section) section.classList.add("active");
  window.scrollTo({ top: 0, behavior: "auto" });
  closeMobileSidebar();
  if (viewName !== "overview" && VIEW_LABELS[viewName]) lsSet(LAST_VIEW_KEY, JSON.stringify({ view: viewName, ts: Date.now() }));
  if (viewName === "overview") renderContinueBanner();
  if (viewName === "progress") refreshProgress();
  if (viewName === "editor" && typeof initEditor === "function") initEditor();
}
function renderContinueBanner() {
  const wrap = document.getElementById("continue-banner"); if (!wrap) return;
  let saved = null; try { saved = JSON.parse(lsGet(LAST_VIEW_KEY)); } catch (e) {}
  if (!saved || !saved.view || !VIEW_LABELS[saved.view]) { wrap.style.display = "none"; return; }
  wrap.style.display = "flex";
  wrap.innerHTML = `<span class="continue-text">↩️ Continue where you left off: <strong>${VIEW_LABELS[saved.view]}</strong></span>
    <div class="continue-actions"><button type="button" class="continue-go">Continue →</button><button type="button" class="continue-dismiss" title="Dismiss">✕</button></div>`;
  wrap.querySelector(".continue-go").addEventListener("click", () => switchView(saved.view));
  wrap.querySelector(".continue-dismiss").addEventListener("click", () => { wrap.style.display = "none"; });
}
function initNav() {
  document.querySelectorAll("#nav button").forEach(b => b.addEventListener("click", () => switchView(b.dataset.view)));
  document.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => switchView(b.dataset.goto)));
}
function closeMobileSidebar() {
  const sb = document.getElementById("sidebar"), sc = document.getElementById("scrim");
  if (sb) sb.classList.remove("open"); if (sc) sc.classList.remove("show");
}
function initMobileToggle() {
  const t = document.getElementById("mobile-toggle"), sb = document.getElementById("sidebar"), sc = document.getElementById("scrim");
  if (!t || !sb || !sc) return;
  t.addEventListener("click", () => { sb.classList.toggle("open"); sc.classList.toggle("show"); });
  sc.addEventListener("click", closeMobileSidebar);
}
function initSocial() {
  [["side-youtube", SOCIAL.youtube], ["side-medium", SOCIAL.medium], ["side-linkedin", SOCIAL.linkedin], ["social-youtube", SOCIAL.youtube],
   ["social-medium", SOCIAL.medium], ["social-linkedin", SOCIAL.linkedin], ["youtube-link", SOCIAL.youtube]].forEach(([id, url]) => { const e = document.getElementById(id); if (e && url) e.href = url; });
  const fl = document.querySelectorAll(".footer-links a"); if (fl[0]) fl[0].href = SOCIAL.linkedin; if (fl[1]) fl[1].href = SOCIAL.medium;
}

/* ---- Visitor counter (no external service) ---- */
let __visitorMemory = null;
function initVisitorCounter() {
  const e = document.getElementById("visitor-count"); if (!e) return;
  const SEED = "proxima_hr_visits_seed_v1", CNT = "proxima_hr_visits_count_v1";
  function tryStore(store) {
    let seed = parseInt(store.getItem(SEED) || "0", 10);
    if (!seed) { seed = 180 + Math.floor(Math.random() * 220); store.setItem(SEED, String(seed)); }
    let c = parseInt(store.getItem(CNT) || "0", 10) + 1; store.setItem(CNT, String(c)); return seed + c;
  }
  let total = null;
  try { total = tryStore(window.localStorage); } catch (er) {}
  if (total === null) { try { total = tryStore(window.sessionStorage); } catch (er) {} }
  if (total === null) { if (__visitorMemory === null) __visitorMemory = 180 + Math.floor(Math.random() * 220); total = ++__visitorMemory; }
  e.textContent = total.toLocaleString("en-IN");
}

function initSearch() {
  document.getElementById("kpi-search").addEventListener("input", (e) => { kpiSearch = e.target.value; renderKpiGrid(); });
  document.getElementById("qa-search").addEventListener("input", (e) => { qaSearch = e.target.value; renderQaList(); });
  document.getElementById("gl-search").addEventListener("input", (e) => renderGlossary(e.target.value));
  document.getElementById("dd-search").addEventListener("input", (e) => renderDataDictionary(e.target.value));
}

/* ============================================================
   Ask SIA — client-side search over the site's own content
   ============================================================ */
function buildChatIndex() {
  const idx = [];
  KPIS.forEach(k => idx.push({ type: "KPI", tab: "kpis", title: k.name, text: `${k.name} ${k.q} ${k.desc} ${k.plain} ${k.cat}`,
    answer: `<strong>${esc(k.name)}</strong> (${esc(k.cat)}): ${esc(k.q)}<br>${esc(k.desc)}<br><span class="src-tag">${esc(k.formula)}</span><br><em>CY2025 value: ${esc(k.v25)}</em>`,
    followups: ["Show the related SQL", "What's a common mistake here?"] }));
  QA.forEach(it => idx.push({ type: "Interview Q&A", tab: "interview", title: it.q, text: `${it.q} ${it.a} ${it.cat}`,
    answer: `<strong>${esc(it.q)}</strong><br>${it.a}<div class="chat-signal">Interviewer signal: ${esc(it.signal)}</div>`,
    followups: it.cat === "Scenario-Based" ? ["Give me another scenario question", "What's a common gotcha here?"] : ["Give me a scenario question", "What's a common mistake here?"] }));
  GLOSSARY.forEach(g => idx.push({ type: "Glossary", tab: "glossary", title: g.t, text: `${g.t} ${g.d}`, answer: `<strong>${esc(g.t)}</strong>: ${esc(g.d)}`, followups: ["Show the related KPI", "Any gotchas here?"] }));
  NULL_NOTES.forEach((n, i) => idx.push({ type: "Data Quality", tab: "quality", title: `Data quality note ${i + 1}`, text: `null blank quality quirk ${n}`, answer: `<strong>Data quality, expected blank / quirk</strong><br>${esc(n)}`, followups: ["What are the data model gotchas?"] }));
  GOTCHAS.forEach(g => idx.push({ type: "Gotcha", tab: "model", title: g.t, text: `gotcha trap mistake ${g.t} ${g.d}`, answer: `<strong>⚠️ Gotcha: ${esc(g.t)}</strong><br>${esc(g.d)}`, followups: ["What's another gotcha?", "Give me an interview question on this"] }));
  TIPS.forEach(t => idx.push({ type: "Student Tip", tab: "tips", title: t.h, text: `tip advice ${t.h} ${t.p}`, answer: `<strong>Tip: ${esc(t.h)}</strong><br>${esc(t.p)}`, followups: ["Give me another tip"] }));
  SQL_BLOCKS.forEach(b => idx.push({ type: "SQL", tab: "sql", title: b.title, text: `sql query ${b.title} ${b.desc}`, answer: `<strong>${esc(b.title)}</strong><br>${esc(b.desc)}<pre style="white-space:pre-wrap;font-size:11px;">${esc(b.sql.slice(0, 600))}${b.sql.length > 600 ? "…" : ""}</pre>`, followups: ["Open the SQL Lab"] }));
  return idx;
}
const STOPWORDS = new Set(["what","is","the","a","an","of","for","how","why","does","do","in","on","to","and","or","this","that","are","was","were","be","it","its","with","vs","versus","between","me","tell","explain","about","show","give"]);
function expandTokens(t) { const x = []; t.forEach(w => { if (SYNONYMS[w]) x.push(...SYNONYMS[w]); }); return t.concat(x.map(s => s.toLowerCase())); }
function tokenize(s) { return s.toLowerCase().replace(/[^a-z0-9%\s]/g, " ").split(/\s+/).filter(w => w && !STOPWORDS.has(w)); }
function findByExactTitle(title, index) { return index.find(e => e.title === title); }
function searchChatIndex(query, index) {
  const raw = tokenize(query); if (!raw.length) return [];
  const toks = expandTokens(raw); const ql = query.toLowerCase();
  return index.map(e => {
    const tl = e.title.toLowerCase(), xl = e.text.toLowerCase(); let s = 0;
    toks.forEach(t => { if (tl.includes(t)) s += 3; else if (xl.includes(t)) s += 1; });
    if (ql.length > 3 && tl.includes(ql)) s += 5; return { e, s };
  }).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 3).map(r => r.e);
}
let chatIndexCache = null, chatLastResults = [];
function chatAppendMessage(html, who) {
  const body = document.getElementById("chat-panel-body"); const row = el("div", "chat-msg " + who);
  row.innerHTML = `<div class="chat-bubble">${html}</div>`; body.appendChild(row); body.scrollTop = body.scrollHeight; return row;
}
function chatAppendFollowups(fu) {
  if (!fu || !fu.length) return; const body = document.getElementById("chat-panel-body"); const w = el("div", "chat-followups");
  fu.slice(0, 3).forEach(f => { const c = el("button", "chat-followup-chip", esc(f)); c.type = "button"; c.addEventListener("click", () => { chatAppendMessage(esc(f), "user"); setTimeout(() => chatAnswer(f), 150); }); w.appendChild(c); });
  body.appendChild(w); body.scrollTop = body.scrollHeight;
}
function chatTypingIndicator(show) {
  const body = document.getElementById("chat-panel-body"); let i = document.getElementById("chat-typing-indicator");
  if (show) { if (i) return; i = el("div", "chat-msg bot"); i.id = "chat-typing-indicator"; i.innerHTML = `<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>`; body.appendChild(i); body.scrollTop = body.scrollHeight; }
  else if (i) i.remove();
}
function chatFallback() {
  chatAppendMessage("I couldn't find a close match for that in the KPIs, interview prep, data model or glossary. Try a specific term, a KPI name or a table name, or one of these:", "bot");
  chatAppendFollowups(CHAT_POPULAR);
}
function chatAnswer(query) {
  if (!chatIndexCache) chatIndexCache = buildChatIndex();
  const bare = query.trim().toLowerCase().replace(/[?!.]/g, "");
  if (["why", "example", "give an example", "more"].includes(bare) && chatLastResults.length) query = chatLastResults[0].title;
  if (/open the sql lab/i.test(query)) { switchView("sql"); return; }
  if (/scenario question/i.test(query)) { const sc = QA.filter(q => q.cat === "Scenario-Based"); const p = sc[Math.floor(Math.random() * sc.length)]; query = p.q; }
  let forced = null;
  for (const r of INTENT_RULES) { if (r.re.test(query)) { forced = findByExactTitle(r.title, chatIndexCache); if (forced) break; } }
  const results = forced ? [forced] : searchChatIndex(query, chatIndexCache);
  if (!results.length) { chatFallback(); return; }
  chatLastResults = results;
  results.forEach(r => {
    const bid = "chat-a-" + Math.random().toString(36).slice(2, 9);
    const row = chatAppendMessage(`<div id="${bid}">${r.answer}</div><br><button type="button" class="chat-link-btn" data-tab="${r.tab}">Open ${VIEW_LABELS[r.tab] || r.tab} →</button><button type="button" class="chat-copy-btn">Copy</button>`, "bot");
    row.querySelector(".chat-link-btn").addEventListener("click", () => switchView(r.tab));
    const cb = row.querySelector(".chat-copy-btn"); cb.addEventListener("click", () => copyText(document.getElementById(bid).innerText, cb, "Copy"));
    chatAppendFollowups(r.followups);
  });
}
function initChatWidget() {
  const fab = document.getElementById("chat-fab"), panel = document.getElementById("chat-panel"), close = document.getElementById("chat-panel-close");
  const form = document.getElementById("chat-panel-form"), input = document.getElementById("chat-input"), label = document.getElementById("chat-fab-label");
  if (!fab || !panel || !form) return;
  fab.addEventListener("click", () => { panel.classList.toggle("open"); if (panel.classList.contains("open")) { input.focus(); if (label) label.classList.add("hide"); renderQuickReplies(); } });
  close.addEventListener("click", () => { panel.classList.remove("open"); if (label) label.classList.remove("hide"); });
  form.addEventListener("submit", (e) => { e.preventDefault(); const q = input.value.trim(); if (!q) return; chatAppendMessage(esc(q), "user"); input.value = ""; chatTypingIndicator(true); setTimeout(() => { chatTypingIndicator(false); chatAnswer(q); }, 450); });
}
function renderQuickReplies() {
  const w = document.getElementById("chat-quick-replies"); if (!w) return;
  const pick = [...QUICK_REPLY_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
  w.innerHTML = pick.map(q => `<button type="button" data-quick="${esc(q)}">${esc(q)}</button>`).join("");
  w.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { chatAppendMessage(esc(b.dataset.quick), "user"); setTimeout(() => chatAnswer(b.dataset.quick), 150); }));
}

/* ============================================================
   Bookmarks + deep links
   ============================================================ */
const BOOKMARK_KEY = "proxima_hr_bookmarks_v1";
function getBookmarks() { try { const r = JSON.parse(lsGet(BOOKMARK_KEY)); return r && r.kpi && r.qa ? r : { kpi: {}, qa: {} }; } catch (e) { return { kpi: {}, qa: {} }; } }
function toggleBookmark(type, key) { const b = getBookmarks(); b[type][key] = !b[type][key]; if (!b[type][key]) delete b[type][key]; lsSet(BOOKMARK_KEY, JSON.stringify(b)); }
function copyDeepLink(type, key) {
  const url = `${location.origin}${location.pathname}#${type}=${encodeURIComponent(key)}`;
  copyText(url); chatToastMini(`Link to this ${type === "kpi" ? "KPI" : "question"} copied. Paste it anywhere to jump straight here.`);
}
function chatToastMini(msg) {
  let t = document.getElementById("mini-toast");
  if (!t) { t = el("div"); t.id = "mini-toast"; t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 18px;border-radius:8px;font-size:12.5px;z-index:1000;box-shadow:0 8px 24px rgba(0,0,0,0.3);opacity:0;transition:opacity 0.25s;"; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = "1"; clearTimeout(t._t); t._t = setTimeout(() => { t.style.opacity = "0"; }, 2400);
}
function handleDeepLink() {
  const hash = location.hash.slice(1); if (!hash) return;
  const [type, raw] = hash.split("="); if (!type || !raw) return;
  const val = decodeURIComponent(raw); const tab = { kpi: "kpis", qa: "interview", gl: "glossary" }[type]; if (!tab) return;
  switchView(tab);
  if (type === "kpi") { kpiActiveCat = "All"; renderKpiPills(); renderKpiGrid(); }
  if (type === "qa") { const it = QA.find(q => q.q === val); if (it) { qaActiveCat = it.cat; renderQaTabs(); renderQaList(); } }
  setTimeout(() => {
    const target = document.getElementById((type === "kpi" ? "kpi-" : type === "qa" ? "qa-" : "gl-") + slugify(val)); if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" }); target.classList.add("deep-link-flash");
    if (type === "qa") { target.classList.add("open"); const a = target.querySelector(".qa-a"); if (a) a.style.maxHeight = a.scrollHeight + "px"; }
    setTimeout(() => target.classList.remove("deep-link-flash"), 1900);
  }, 120);
}

/* ============================================================
   Dark mode + streak
   ============================================================ */
const THEME_KEY = "proxima_hr_theme_v1";
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle"), icon = document.getElementById("theme-toggle-icon"), label = document.getElementById("theme-toggle-label");
  if (!btn) return;
  const apply = (dark) => { document.body.classList.toggle("dark-mode", dark); if (icon) icon.textContent = dark ? "☀️" : "🌙"; if (label) label.textContent = dark ? "Light mode" : "Dark mode"; };
  const saved = lsGet(THEME_KEY);
  apply(saved === "dark");   // light (DailySQL-style) is the default
  btn.addEventListener("click", () => { const d = !document.body.classList.contains("dark-mode"); apply(d); lsSet(THEME_KEY, d ? "dark" : "light"); });
}
const STREAK_KEY = "proxima_hr_visit_days_v1";
function updateStreak() {
  const badge = document.getElementById("streak-badge"); if (!badge) return;
  let days = []; try { days = JSON.parse(lsGet(STREAK_KEY)) || []; } catch (e) {}
  const today = new Date().toISOString().slice(0, 10);
  if (!days.includes(today)) { days.push(today); lsSet(STREAK_KEY, JSON.stringify(days)); }
  const set = new Set(days); let streak = 0; const cur = new Date();
  while (set.has(cur.toISOString().slice(0, 10))) { streak++; cur.setDate(cur.getDate() - 1); }
  badge.innerHTML = `<span class="flame">🔥</span> <b>${streak}</b>-day study streak · ${days.length} total visit${days.length === 1 ? "" : "s"}`;
}

/* ============================================================
   Flashcard quiz
   ============================================================ */
let quizDeck = [], quizDeckType = "qa", quizIndex = 0, quizScore = { good: 0, again: 0 };
function shuffleArray(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function startQuiz(type) {
  let deck;
  if (type === "kpi") deck = KPIS.map(k => ({ q: k.name, a: `${esc(k.q)}<br>${esc(k.desc)}<code style="display:block;margin-top:8px;font-size:12px;">${esc(k.plain)}</code>`, cat: k.cat }));
  else if (type === "glossary") deck = GLOSSARY.map(g => ({ q: g.t, a: esc(g.d), cat: "Glossary" }));
  else { const bm = getBookmarks(); const st = QA.filter(q => bm.qa[q.q]); deck = st.length >= 5 ? st : QA; }
  quizDeck = shuffleArray(deck); quizDeckType = type || "qa"; quizIndex = 0; quizScore = { good: 0, again: 0 };
  document.getElementById("quiz-overlay").classList.add("open"); renderQuizCard();
}
function renderQuizCard() {
  const body = document.getElementById("quiz-body");
  if (quizIndex >= quizDeck.length) {
    const total = quizScore.good + quizScore.again;
    body.innerHTML = `<div class="quiz-done"><div class="big-score">${quizScore.good} / ${total}</div><p style="color:var(--ink-muted);font-size:13px;margin-bottom:20px;">marked "Got it" this round.</p><button class="btn-dark" id="quiz-restart">Run again</button></div>`;
    document.getElementById("quiz-restart").addEventListener("click", () => startQuiz(quizDeckType)); return;
  }
  const it = quizDeck[quizIndex]; const pct = Math.round(quizIndex / quizDeck.length * 100);
  body.innerHTML = `<div class="quiz-progress-row"><span>Card ${quizIndex + 1} of ${quizDeck.length}</span><span>${esc(it.cat)}</span></div>
    <div class="quiz-bar-outer"><div class="quiz-bar-inner" style="width:${pct}%;"></div></div>
    <div class="quiz-card-flip" id="quiz-flip"><div class="quiz-card-inner"><div class="quiz-face"><span class="tag-mini">${esc(it.cat)}</span><div class="qtxt">${esc(it.q)}</div><div class="hint">Tap the card to reveal the answer</div></div>
    <div class="quiz-face quiz-face-back"><div class="atxt">${it.a}</div></div></div></div>
    <div class="quiz-grade-row" id="quiz-grade-row" style="visibility:hidden;"><button class="grade-again" id="quiz-again">↺ Review again</button><button class="grade-good" id="quiz-good">✓ Got it</button></div>
    <div class="quiz-nav-row"><button id="quiz-skip">Skip →</button><span>${quizScore.good} got it · ${quizScore.again} to review</span></div>`;
  const flip = document.getElementById("quiz-flip"), gr = document.getElementById("quiz-grade-row");
  flip.addEventListener("click", () => { flip.classList.toggle("flipped"); gr.style.visibility = flip.classList.contains("flipped") ? "visible" : "hidden"; });
  document.getElementById("quiz-again").addEventListener("click", (e) => { e.stopPropagation(); quizScore.again++; quizIndex++; renderQuizCard(); });
  document.getElementById("quiz-good").addEventListener("click", (e) => { e.stopPropagation(); quizScore.good++; quizIndex++; renderQuizCard(); });
  document.getElementById("quiz-skip").addEventListener("click", () => { quizIndex++; renderQuizCard(); });
}
function initQuiz() {
  const ov = document.getElementById("quiz-overlay");
  document.getElementById("quiz-launch-btn").addEventListener("click", () => startQuiz("qa"));
  document.getElementById("quiz-close").addEventListener("click", () => ov.classList.remove("open"));
  ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("open"); });
  document.getElementById("kpi-quiz-launch-btn").addEventListener("click", () => startQuiz("kpi"));
  document.getElementById("gl-quiz-launch-btn").addEventListener("click", () => startQuiz("glossary"));
}
function initStarredToggles() {
  const k = document.getElementById("kpi-starred-toggle"), q = document.getElementById("qa-starred-toggle");
  k.addEventListener("click", () => { kpiStarredOnly = !kpiStarredOnly; k.classList.toggle("active", kpiStarredOnly); renderKpiGrid(); });
  q.addEventListener("click", () => { qaStarredOnly = !qaStarredOnly; q.classList.toggle("active", qaStarredOnly); renderQaList(); });
}

/* ============================================================
   Command palette (Ctrl/Cmd + K)
   ============================================================ */
let cmdkIndex = null, cmdkActive = -1;
function buildCmdkIndex() {
  const idx = [{ type: "Page", label: "Go to Home & Roadmap", tab: "overview", action: "nav" }];
  Object.entries(VIEW_LABELS).forEach(([tab, label]) => idx.push({ type: "Page", label: "Go to " + label, tab, action: "nav" }));
  KPIS.forEach(k => idx.push({ type: "KPI", label: k.name, action: "kpi", key: k.name }));
  QA.forEach(q => idx.push({ type: "Q&A", label: q.q, action: "qa", key: q.q }));
  GLOSSARY.forEach(g => idx.push({ type: "Term", label: g.t, action: "gl", key: g.t }));
  assignments().forEach(a => idx.push({ type: "Assignment", label: a.t, tab: "assignments", action: "nav" }));
  return idx;
}
function openCmdk() { if (!cmdkIndex) cmdkIndex = buildCmdkIndex(); const ov = document.getElementById("cmdk-overlay"), inp = document.getElementById("cmdk-input"); ov.classList.add("open"); inp.value = ""; inp.focus(); renderCmdkResults(""); }
function closeCmdk() { document.getElementById("cmdk-overlay").classList.remove("open"); }
function renderCmdkResults(query) {
  const wrap = document.getElementById("cmdk-results"); const q = query.trim().toLowerCase();
  const results = !q ? cmdkIndex.filter(r => r.type === "Page") : cmdkIndex.filter(r => r.label.toLowerCase().includes(q)).slice(0, 30);
  cmdkActive = results.length ? 0 : -1;
  if (!results.length) { wrap.innerHTML = `<div class="cmdk-empty">No matches. Try a different term.</div>`; wrap._results = []; return; }
  wrap.innerHTML = results.map((r, i) => `<button class="cmdk-item${i === 0 ? " active" : ""}" data-idx="${i}"><span class="cmdk-type">${r.type}</span><span class="cmdk-label">${esc(r.label)}</span></button>`).join("");
  wrap.querySelectorAll(".cmdk-item").forEach(b => {
    b.addEventListener("click", () => selectCmdkResult(results[+b.dataset.idx]));
    b.addEventListener("mouseenter", () => { wrap.querySelectorAll(".cmdk-item").forEach(x => x.classList.remove("active")); b.classList.add("active"); cmdkActive = +b.dataset.idx; });
  });
  wrap._results = results;
}
function selectCmdkResult(r) {
  closeCmdk();
  if (r.action === "nav") { switchView(r.tab); return; }
  location.hash = r.action + "=" + encodeURIComponent(r.key); handleDeepLink();
}
function initCmdk() {
  const hint = document.getElementById("cmdk-fab-hint"), ov = document.getElementById("cmdk-overlay"), inp = document.getElementById("cmdk-input");
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const kl = document.getElementById("cmdk-kbd-label"); if (kl && isMac) kl.textContent = "⌘ K";
  if (hint) hint.addEventListener("click", openCmdk);
  ov.addEventListener("click", (e) => { if (e.target === ov) closeCmdk(); });
  document.addEventListener("keydown", (e) => {
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); ov.classList.contains("open") ? closeCmdk() : openCmdk(); return; }
    if (!ov.classList.contains("open")) return;
    const results = document.getElementById("cmdk-results")._results || [];
    if (e.key === "Escape") closeCmdk();
    else if (e.key === "ArrowDown") { e.preventDefault(); cmdkActive = Math.min(cmdkActive + 1, results.length - 1); hl(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); cmdkActive = Math.max(cmdkActive - 1, 0); hl(); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[cmdkActive]) selectCmdkResult(results[cmdkActive]); }
  });
  inp.addEventListener("input", () => renderCmdkResults(inp.value));
  function hl() { const w = document.getElementById("cmdk-results"); w.querySelectorAll(".cmdk-item").forEach((b, i) => b.classList.toggle("active", i === cmdkActive)); const a = w.querySelector(".cmdk-item.active"); if (a) a.scrollIntoView({ block: "nearest" }); }
}

/* ============================================================
   Printable starred cheat sheet
   ============================================================ */
function initCheatSheet() {
  const btn = document.getElementById("cheatsheet-btn"); if (!btn) return;
  btn.addEventListener("click", () => {
    const bm = getBookmarks(); const ks = KPIS.filter(k => bm.kpi[k.name]); const qs = QA.filter(q => bm.qa[q.q]);
    if (!ks.length && !qs.length) { chatToastMini("Star a few KPIs or questions first (tap ☆ on any card), then print your cheat sheet."); return; }
    document.getElementById("print-sheet").innerHTML = `<h1>Proxima HR Analytics: My Cheat Sheet</h1><p style="color:#666;font-size:11px;margin-bottom:16px;">Generated from starred items · ${new Date().toLocaleDateString()}</p>
      ${ks.length ? `<h3>KPIs (${ks.length})</h3>` + ks.map(k => `<div class="ps-item"><h4>${esc(k.name)}</h4><p>${esc(k.desc)}</p><code>${esc(k.plain)}</code></div>`).join("") : ""}
      ${qs.length ? `<h3 style="margin-top:16px;">Interview Questions (${qs.length})</h3>` + qs.map(q => `<div class="ps-item"><h4>${esc(q.q)}</h4><p>${q.a}</p></div>`).join("") : ""}`;
    setTimeout(() => window.print(), 80);
  });
}

/* ============================================================
   Boot — each step isolated so one failure doesn't stop the page
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const steps = [
    renderStats, renderJourney, () => renderChecklist("deliv-grid", DELIVERABLES, "deliv"), renderBeforeAfter, renderTools, renderDomainPrimer,
    renderDocuments, renderFlow, renderTimeline, renderProblem, renderRules, renderDataset, renderModel, renderDataDictionary, renderQuality,
    renderKpiPills, renderKpiGrid, renderSql, renderExcel, renderAnalysis, renderGallery, renderQA, renderAssignments, renderLab,
    renderQaTabs, renderQaList, renderPitch, renderCareer, renderGlossary, renderTips, renderLearningLinks, renderProgressPage,
    initNav, initMobileToggle, initSearch, initSocial, initChatWidget, initThemeToggle, updateStreak,
    initQuiz, initStarredToggles, initCmdk, initCheatSheet, initModal, renderSamples, renderQaRefs, initBrandHome, renderKpiTiers, renderTraps, refreshProgress, renderContinueBanner, handleDeepLink,
  ];
  steps.forEach(fn => { try { fn(); } catch (e) { console.error("Boot step failed:", fn.name || "(anonymous)", e); } });
  window.addEventListener("hashchange", handleDeepLink);
});
/* ============================================================
   One-page KPI cheat sheet (hub feature)
   ============================================================ */
function printKpiCheatSheet() {
  const rows = KPI_CATS.filter(c => c !== "All").map(cat => {
    const items = KPIS.filter(k => k.cat === cat).map(k => `
      <div class="cs-item"><div class="cs-name">${esc(k.name)} <span class="cs-tier">${k.prio}</span></div>
        <div class="cs-formula">${esc(k.formula)}</div><div class="cs-def">${esc(k.plain)} · <b>Answer: ${esc(k.v25)}</b></div></div>`).join("");
    return `<h2>${cat}</h2><div class="cs-col">${items}</div>`;
  }).join("");
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Proxima HR Analytics — KPI Cheat Sheet</title>
  <style>@page { size: A4; margin: 10mm; } * { box-sizing: border-box; } body { font-family: Arial, Helvetica, sans-serif; color: #1A1D21; margin: 0; }
  .cs-header { text-align: center; margin-bottom: 10px; } .cs-header h1 { font-size: 16px; margin: 0 0 2px; } .cs-header p { font-size: 10px; color: #666; margin: 0; }
  .cs-wrap { column-count: 2; column-gap: 18px; } h2 { font-size: 12px; text-transform: uppercase; border-bottom: 1.5px solid #333; padding-bottom: 3px; margin: 10px 0 6px; break-after: avoid; }
  .cs-item { break-inside: avoid; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dotted #ccc; } .cs-name { font-size: 10.5px; font-weight: 700; }
  .cs-tier { font-size: 8px; background: #E6F3FA; color: #0A5A87; padding: 1px 4px; border-radius: 3px; } .cs-formula { font-family: 'Courier New', monospace; font-size: 9px; color: #0E6E9E; margin: 1px 0; }
  .cs-def { font-size: 9px; color: #444; line-height: 1.3; }</style></head><body>
  <div class="cs-header"><h1>Proxima HR Analytics — KPI Cheat Sheet (${KPIS.length} measures)</h1><p>by Mahendra Singh · Data Analyst Trainer, ExcelR · headcount = Active + Serving Notice · attrition = exits ÷ average headcount · answer key = CY2025</p></div>
  <div class="cs-wrap">${rows}</div></body></html>`;
  const win = window.open("", "_blank");
  if (!win) { chatToastMini("Please allow pop-ups to print the cheat sheet."); return; }
  win.document.open(); win.document.write(html); win.document.close(); win.focus();
  setTimeout(() => win.print(), 300);
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("print-cheatsheet-btn");
  if (btn) btn.addEventListener("click", printKpiCheatSheet);
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img.zoomable").forEach(img => img.addEventListener("click", () => openModal(`<img class="zoom-img" src="${img.src}" alt="${esc(img.alt)}">`)));
});
/* ============================================================
   Live SQL Practice Editor (in-browser SQLite via sql.js) +
   "Today's 3 problems" daily challenge (DailySQL-style).
   ============================================================ */
const PRACTICE_PROBLEMS = [
 {
  "id": "e1",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Employees by status",
  "tables": [
   "employees"
  ],
  "task": "How many employee records are there in each employment_status? Return employment_status and n, biggest first.",
  "hint": "GROUP BY employment_status, COUNT(*).",
  "sol": "SELECT employment_status, COUNT(*) AS n\nFROM employees\nGROUP BY employment_status\nORDER BY n DESC;"
 },
 {
  "id": "e2",
  "topic": "Filtering",
  "level": "Easy",
  "mins": 3,
  "t": "Current headcount (the status trap)",
  "tables": [
   "employees"
  ],
  "task": "Return the current headcount as one number called headcount. People serving notice are still on the payroll, so they count.",
  "hint": "Active AND Serving Notice. Filtering only 'Active' silently drops 26 people.",
  "sol": "SELECT COUNT(*) AS headcount\nFROM employees\nWHERE employment_status IN ('Active', 'Serving Notice');"
 },
 {
  "id": "e3",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Current headcount by gender",
  "tables": [
   "employees"
  ],
  "task": "Current headcount (Active + Serving Notice) by gender. Return gender and n, biggest first.",
  "hint": "Same WHERE as the headcount problem, then GROUP BY gender.",
  "sol": "SELECT gender, COUNT(*) AS n\nFROM employees\nWHERE employment_status IN ('Active', 'Serving Notice')\nGROUP BY gender\nORDER BY n DESC;"
 },
 {
  "id": "e4",
  "topic": "Dates",
  "level": "Easy",
  "mins": 4,
  "t": "Hires per year",
  "tables": [
   "employees"
  ],
  "task": "How many people were hired in each year from 2021 onwards? Return hire_year and hires, oldest year first.",
  "hint": "Dates are stored as 'YYYY-MM-DD' text: SUBSTR(hire_date, 1, 4) gives the year.",
  "sol": "SELECT SUBSTR(hire_date, 1, 4) AS hire_year, COUNT(*) AS hires\nFROM employees\nWHERE hire_date >= '2021-01-01'\nGROUP BY hire_year\nORDER BY hire_year;"
 },
 {
  "id": "e5",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Exits by type",
  "tables": [
   "exits"
  ],
  "task": "Count exit records by exit_type. Return exit_type and n, biggest first.",
  "hint": "GROUP BY exit_type.",
  "sol": "SELECT exit_type, COUNT(*) AS n\nFROM exits\nGROUP BY exit_type\nORDER BY n DESC;"
 },
 {
  "id": "e6",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 4,
  "t": "Average rating by review cycle",
  "tables": [
   "performance_reviews"
  ],
  "task": "Average final_rating for each review_cycle, rounded to 2 decimals. Oldest cycle first.",
  "hint": "AVG(final_rating), ROUND(…, 2).",
  "sol": "SELECT review_cycle, ROUND(AVG(final_rating), 2) AS avg_rating\nFROM performance_reviews\nGROUP BY review_cycle\nORDER BY review_cycle;"
 },
 {
  "id": "e7",
  "topic": "Sorting & Limits",
  "level": "Easy",
  "mins": 3,
  "t": "Biggest approved headcount",
  "tables": [
   "departments"
  ],
  "task": "The 5 departments with the highest approved_headcount. Return department_name and approved_headcount.",
  "hint": "ORDER BY … DESC LIMIT 5.",
  "sol": "SELECT department_name, approved_headcount\nFROM departments\nORDER BY approved_headcount DESC\nLIMIT 5;"
 },
 {
  "id": "e8",
  "topic": "Filtering",
  "level": "Easy",
  "mins": 3,
  "t": "Open requisitions by priority",
  "tables": [
   "requisitions"
  ],
  "task": "How many requisitions are still Open, by priority? Return priority and n, biggest first.",
  "hint": "WHERE status = 'Open', then GROUP BY priority.",
  "sol": "SELECT priority, COUNT(*) AS n\nFROM requisitions\nWHERE status = 'Open'\nGROUP BY priority\nORDER BY n DESC, priority;"
 },
 {
  "id": "m1",
  "topic": "Joins",
  "level": "Medium",
  "mins": 5,
  "t": "Headcount by department",
  "tables": [
   "employees",
   "departments"
  ],
  "task": "Current headcount by department_name, biggest first.",
  "hint": "JOIN departments ON department_id, keep Active + Serving Notice.",
  "sol": "SELECT d.department_name, COUNT(*) AS headcount\nFROM employees e\nJOIN departments d ON d.department_id = e.department_id\nWHERE e.employment_status IN ('Active', 'Serving Notice')\nGROUP BY d.department_name\nORDER BY headcount DESC, d.department_name;"
 },
 {
  "id": "m2",
  "topic": "Joins",
  "level": "Medium",
  "mins": 5,
  "t": "Headcount by city",
  "tables": [
   "employees",
   "locations"
  ],
  "task": "Current headcount by city, biggest first.",
  "hint": "JOIN locations ON location_id.",
  "sol": "SELECT l.city, COUNT(*) AS headcount\nFROM employees e\nJOIN locations l ON l.location_id = e.location_id\nWHERE e.employment_status IN ('Active', 'Serving Notice')\nGROUP BY l.city\nORDER BY headcount DESC;"
 },
 {
  "id": "m3",
  "topic": "Conditional Logic",
  "level": "Medium",
  "mins": 6,
  "t": "Female % by department",
  "tables": [
   "employees",
   "departments"
  ],
  "task": "Female share of current headcount by department_name, as a % with 1 decimal. Highest first.",
  "hint": "SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) * 100.0 / COUNT(*).",
  "sol": "SELECT d.department_name,\n       ROUND(100.0 * SUM(CASE WHEN e.gender = 'Female' THEN 1 ELSE 0 END) / COUNT(*), 1) AS female_pct\nFROM employees e\nJOIN departments d ON d.department_id = e.department_id\nWHERE e.employment_status IN ('Active', 'Serving Notice')\nGROUP BY d.department_name\nORDER BY female_pct DESC, d.department_name;"
 },
 {
  "id": "m4",
  "topic": "Dates",
  "level": "Medium",
  "mins": 6,
  "t": "2025 voluntary exits by reason",
  "tables": [
   "exits",
   "employees"
  ],
  "task": "Voluntary exits whose exit date (employees.exit_date) falls in 2025, by exit_reason_category. Return exit_reason_category and n, biggest first.",
  "hint": "JOIN exits to employees on employee_id; filter exit_type = 'Voluntary' and exit_date BETWEEN '2025-01-01' AND '2025-12-31'.",
  "sol": "SELECT x.exit_reason_category, COUNT(*) AS n\nFROM exits x\nJOIN employees e ON e.employee_id = x.employee_id\nWHERE x.exit_type = 'Voluntary'\n  AND e.exit_date BETWEEN '2025-01-01' AND '2025-12-31'\nGROUP BY x.exit_reason_category\nORDER BY n DESC, x.exit_reason_category;"
 },
 {
  "id": "m5",
  "topic": "Joins",
  "level": "Medium",
  "mins": 6,
  "t": "Average CTC by job level",
  "tables": [
   "salary_current",
   "employees"
  ],
  "task": "Average current annual CTC in ₹ lakh (annual_ctc_inr ÷ 100,000, 2 decimals) by job_level, L1 first.",
  "hint": "JOIN salary_current to employees; AVG(annual_ctc_inr) / 100000.0.",
  "sol": "SELECT e.job_level, ROUND(AVG(s.annual_ctc_inr) / 100000.0, 2) AS avg_ctc_lakh\nFROM salary_current s\nJOIN employees e ON e.employee_id = s.employee_id\nGROUP BY e.job_level\nORDER BY e.job_level;"
 },
 {
  "id": "m6",
  "topic": "Aggregations",
  "level": "Medium",
  "mins": 5,
  "t": "Departments with 15+ exits in 2025",
  "tables": [
   "employees",
   "departments"
  ],
  "task": "Departments where 15 or more people exited in 2025 (employees.exit_date). Return department_name and exits_2025, biggest first.",
  "hint": "GROUP BY department, then HAVING COUNT(*) >= 15.",
  "sol": "SELECT d.department_name, COUNT(*) AS exits_2025\nFROM employees e\nJOIN departments d ON d.department_id = e.department_id\nWHERE e.exit_date BETWEEN '2025-01-01' AND '2025-12-31'\nGROUP BY d.department_name\nHAVING COUNT(*) >= 15\nORDER BY exits_2025 DESC, d.department_name;"
 },
 {
  "id": "m7",
  "topic": "Conditional Logic",
  "level": "Medium",
  "mins": 7,
  "t": "Age bands of the current workforce",
  "tables": [
   "employees"
  ],
  "task": "Current headcount by age band on 31-Dec-2025: 'Under 25', '25-34', '35-44', '45+'. Return age_band and n, in that band order.",
  "hint": "Age = (julianday('2025-12-31') - julianday(date_of_birth)) / 365.25, then CASE. Sort with a second CASE or MIN(age).",
  "sol": "WITH a AS (\n  SELECT (julianday('2025-12-31') - julianday(date_of_birth)) / 365.25 AS age\n  FROM employees e\n  WHERE e.employment_status IN ('Active', 'Serving Notice')\n)\nSELECT CASE WHEN age < 25 THEN 'Under 25' WHEN age < 35 THEN '25-34' WHEN age < 45 THEN '35-44' ELSE '45+' END AS age_band,\n       COUNT(*) AS n\nFROM a\nGROUP BY age_band\nORDER BY MIN(age);"
 },
 {
  "id": "m8",
  "topic": "Conditional Logic",
  "level": "Medium",
  "mins": 7,
  "t": "eNPS 2025",
  "tables": [
   "engagement_survey"
  ],
  "task": "Employee NPS for survey_year 2025 = % promoters (score 9-10) − % detractors (score 0-6), 1 decimal. Return one column, enps.",
  "hint": "Two SUM(CASE…) counts over COUNT(*). Passives (7-8) count in the total only.",
  "sol": "SELECT ROUND(100.0 * (SUM(CASE WHEN enps_score >= 9 THEN 1 ELSE 0 END)\n                     - SUM(CASE WHEN enps_score <= 6 THEN 1 ELSE 0 END)) / COUNT(*), 1) AS enps\nFROM engagement_survey\nWHERE survey_year = 2025;"
 },
 {
  "id": "a1",
  "topic": "CTEs & Unions",
  "level": "Advanced",
  "mins": 10,
  "t": "2025 attrition rate",
  "tables": [
   "employees"
  ],
  "task": "Attrition % for 2025 = exits in 2025 ÷ average headcount (31-Dec-2024 and 31-Dec-2025) × 100, 1 decimal. Headcount on a date d = hired on or before d AND (no exit_date OR exit_date after d). Return attrition_pct.",
  "hint": "Build both headcounts with SUM(CASE…) in a CTE, then divide exits by their average.",
  "sol": "WITH hc AS (\n  SELECT SUM(CASE WHEN hire_date <= '2024-12-31' AND (exit_date IS NULL OR exit_date > '2024-12-31') THEN 1 ELSE 0 END) AS hc_open,\n         SUM(CASE WHEN hire_date <= '2025-12-31' AND (exit_date IS NULL OR exit_date > '2025-12-31') THEN 1 ELSE 0 END) AS hc_close,\n         SUM(CASE WHEN exit_date BETWEEN '2025-01-01' AND '2025-12-31' THEN 1 ELSE 0 END) AS exits\n  FROM employees\n)\nSELECT ROUND(100.0 * exits / ((hc_open + hc_close) / 2.0), 1) AS attrition_pct\nFROM hc;"
 },
 {
  "id": "a2",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 10,
  "t": "Top 3 departments by 2025 exits",
  "tables": [
   "employees",
   "departments"
  ],
  "task": "Rank departments by number of 2025 exits (employees.exit_date) with RANK(). Return rnk, department_name and exits for ranks 1-3.",
  "hint": "Aggregate in a CTE, then RANK() OVER (ORDER BY exits DESC) and filter in an outer query.",
  "sol": "WITH x AS (\n  SELECT d.department_name, COUNT(*) AS exits\n  FROM employees e\n  JOIN departments d ON d.department_id = e.department_id\n  WHERE e.exit_date BETWEEN '2025-01-01' AND '2025-12-31'\n  GROUP BY d.department_name\n), r AS (\n  SELECT RANK() OVER (ORDER BY exits DESC) AS rnk, department_name, exits FROM x\n)\nSELECT rnk, department_name, exits\nFROM r\nWHERE rnk <= 3\nORDER BY rnk, department_name;"
 },
 {
  "id": "a3",
  "topic": "Joins",
  "level": "Advanced",
  "mins": 9,
  "t": "Managers with the most direct reports",
  "tables": [
   "employees"
  ],
  "task": "Top 5 managers by number of current direct reports. Return manager_id, manager_name and reports.",
  "hint": "Self-join: employees e JOIN employees m ON m.employee_id = e.manager_id. Count only current employees in e.",
  "sol": "SELECT m.employee_id AS manager_id, m.full_name AS manager_name, COUNT(*) AS reports\nFROM employees e\nJOIN employees m ON m.employee_id = e.manager_id\nWHERE e.employment_status IN ('Active', 'Serving Notice')\nGROUP BY m.employee_id, m.full_name\nORDER BY reports DESC, manager_id\nLIMIT 5;"
 },
 {
  "id": "a4",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 9,
  "t": "Running total of 2025 hires",
  "tables": [
   "employees"
  ],
  "task": "For each month of 2025 return hire_month ('YYYY-MM'), hires and running_hires (cumulative total). Oldest month first.",
  "hint": "Group by SUBSTR(hire_date, 1, 7), then SUM(hires) OVER (ORDER BY hire_month).",
  "sol": "WITH m AS (\n  SELECT SUBSTR(hire_date, 1, 7) AS hire_month, COUNT(*) AS hires\n  FROM employees\n  WHERE hire_date BETWEEN '2025-01-01' AND '2025-12-31'\n  GROUP BY hire_month\n)\nSELECT hire_month, hires, SUM(hires) OVER (ORDER BY hire_month) AS running_hires\nFROM m\nORDER BY hire_month;"
 },
 {
  "id": "a5",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 10,
  "t": "Payroll cost month on month",
  "tables": [
   "payroll_dept_monthly"
  ],
  "task": "Total employer cost per pay_month in 2025 (₹ crore = employer_cost_inr ÷ 10,000,000, 2 decimals) and the % change vs the previous month (1 decimal; NULL for January). Oldest first.",
  "hint": "Sum by month in a CTE, then LAG(cost) OVER (ORDER BY pay_month).",
  "sol": "WITH m AS (\n  SELECT pay_month, SUM(employer_cost_inr) AS cost\n  FROM payroll_dept_monthly\n  WHERE pay_month LIKE '2025-%'\n  GROUP BY pay_month\n)\nSELECT pay_month,\n       ROUND(cost / 10000000.0, 2) AS cost_cr,\n       ROUND(100.0 * (cost - LAG(cost) OVER (ORDER BY pay_month)) / LAG(cost) OVER (ORDER BY pay_month), 1) AS mom_pct\nFROM m\nORDER BY pay_month;"
 },
 {
  "id": "a6",
  "topic": "Subqueries",
  "level": "Advanced",
  "mins": 10,
  "t": "Paid above the department average",
  "tables": [
   "salary_current",
   "employees",
   "departments"
  ],
  "task": "For each department, how many employees have a current annual CTC above their own department's average? Return department_name and above_avg, biggest first.",
  "hint": "CTE with employee CTC + department, then compare with AVG(…) OVER (PARTITION BY department) or a correlated subquery.",
  "sol": "WITH s AS (\n  SELECT d.department_name, c.annual_ctc_inr,\n         AVG(c.annual_ctc_inr) OVER (PARTITION BY d.department_name) AS dept_avg\n  FROM salary_current c\n  JOIN employees e ON e.employee_id = c.employee_id\n  JOIN departments d ON d.department_id = e.department_id\n)\nSELECT department_name, COUNT(*) AS above_avg\nFROM s\nWHERE annual_ctc_inr > dept_avg\nGROUP BY department_name\nORDER BY above_avg DESC, department_name;"
 },
 {
  "id": "a7",
  "topic": "Conditional Logic",
  "level": "Advanced",
  "mins": 9,
  "t": "Regrettable share of voluntary exits",
  "tables": [
   "exits",
   "employees",
   "departments"
  ],
  "task": "For voluntary exits with an exit date in 2025, the % flagged regrettable_attrition = 'Yes' by department (1 decimal). Only departments with at least 10 such exits. Highest first.",
  "hint": "Join exits → employees → departments, CASE inside SUM, HAVING COUNT(*) >= 10.",
  "sol": "SELECT d.department_name, COUNT(*) AS vol_exits,\n       ROUND(100.0 * SUM(CASE WHEN x.regrettable_attrition = 'Yes' THEN 1 ELSE 0 END) / COUNT(*), 1) AS regrettable_pct\nFROM exits x\nJOIN employees e ON e.employee_id = x.employee_id\nJOIN departments d ON d.department_id = e.department_id\nWHERE x.exit_type = 'Voluntary' AND e.exit_date BETWEEN '2025-01-01' AND '2025-12-31'\nGROUP BY d.department_name\nHAVING COUNT(*) >= 10\nORDER BY regrettable_pct DESC, d.department_name;"
 },
 {
  "id": "a8",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 11,
  "t": "Second-highest paid in each department",
  "tables": [
   "salary_current",
   "employees",
   "departments"
  ],
  "task": "The employee(s) with the second-highest current annual CTC in each department. Return department_name, employee_id and ctc_lakh (2 decimals). Ties share the rank.",
  "hint": "DENSE_RANK() OVER (PARTITION BY department ORDER BY annual_ctc_inr DESC) = 2.",
  "sol": "WITH r AS (\n  SELECT d.department_name, e.employee_id, c.annual_ctc_inr,\n         DENSE_RANK() OVER (PARTITION BY d.department_name ORDER BY c.annual_ctc_inr DESC) AS rk\n  FROM salary_current c\n  JOIN employees e ON e.employee_id = c.employee_id\n  JOIN departments d ON d.department_id = e.department_id\n)\nSELECT department_name, employee_id, ROUND(annual_ctc_inr / 100000.0, 2) AS ctc_lakh\nFROM r\nWHERE rk = 2\nORDER BY department_name, employee_id;"
 }
];
const ED_KEY = "proxima_hr_editor_v1";
let edDb = null, edLoading = null, edCur = null, psLevel = "All", psTopic = "All", psTable = "All";
function edState() { try { const s = JSON.parse(lsGet(ED_KEY)); return s && s.solved ? s : { solved: {}, drafts: {} }; } catch (e) { return { solved: {}, drafts: {} }; } }
function edSave(s) { lsSet(ED_KEY, JSON.stringify(s)); }
const localDay = (d) => { const x = d || new Date(); return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
function todaysProblems() {
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  const pick = (lv, k) => { const L = PRACTICE_PROBLEMS.filter(p => p.level === lv); return L[(day * k) % L.length]; };
  return [pick("Easy", 1), pick("Medium", 3), pick("Advanced", 5)];
}
function solveDays() { const st = edState(); return new Set(Object.values(st.solved)); }
function solveStreak() {
  const set = solveDays(); let n = 0; const d = new Date();
  if (!set.has(localDay(d))) d.setDate(d.getDate() - 1);           // streak survives until today ends
  while (set.has(localDay(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function loadSqlEngine() {
  if (edDb) return Promise.resolve(edDb);
  if (edLoading) return edLoading;
  edLoading = new Promise((res, rej) => {
    const go = () => window.initSqlJs({}).then(SQL => {
      const db = new SQL.Database(); const T = window.PRACTICE_DB || {};
      db.run("BEGIN");
      Object.entries(T).forEach(([name, t]) => {
        const types = t.cols.map((c, i) => { const vals = t.rows.map(r => r[i]).filter(v => v !== null); if (!vals.length || typeof vals[0] !== "number") return "TEXT"; return vals.every(Number.isInteger) && !/inr|rate|pct/.test(c) ? "INTEGER" : "REAL"; });
        db.run(`CREATE TABLE ${name} (${t.cols.map((c, i) => `"${c}" ${types[i]}`).join(", ")})`);
        const st = db.prepare(`INSERT INTO ${name} VALUES (${t.cols.map(() => "?").join(",")})`);
        t.rows.forEach(r => st.run(r)); st.free();
      });
      db.run("COMMIT"); edDb = db; res(db);
    }).catch(rej);
    if (window.initSqlJs) go();
    else { const s = document.createElement("script"); s.src = "assets/vendor/sql-asm.js"; s.onload = go; s.onerror = () => rej(new Error("Could not load the SQL engine")); document.head.appendChild(s); }
  });
  return edLoading;
}
function edRun(sql) { const res = edDb.exec(sql); return res.length ? res[res.length - 1] : { columns: [], values: [] }; }
function edNorm(r, ordered) {
  const rows = r.values.map(row => row.map(v => v === null ? "∅" : (typeof v === "number" ? (Math.round(v * 100) / 100).toFixed(2) : String(v).trim())).join("¦"));
  return ordered ? rows : rows.slice().sort();
}
function edTable(r) {
  if (!r.columns.length) return `<div class="ed-empty">Query ran. No rows returned.</div>`;
  const head = `<tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr>`;
  const body = r.values.slice(0, 200).map(row => `<tr>${row.map(v => `<td>${v === null ? '<span class="ed-null">NULL</span>' : esc(typeof v === "number" ? (Number.isInteger(v) ? v.toLocaleString("en-IN") : (Math.round(v * 100) / 100).toLocaleString("en-IN")) : v)}</td>`).join("")}</tr>`).join("");
  return `<div class="ed-rowcount">${r.values.length} row${r.values.length === 1 ? "" : "s"}${r.values.length > 200 ? " (showing 200)" : ""}</div><div class="ed-table-wrap"><table class="dtable ed-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}
const lvlBadge = (l) => `<span class="lvl lvl-${l.toLowerCase()}">${l === "Medium" ? "Med." : l === "Advanced" ? "Hard" : l}</span>`;

/* ---------------- Problemset (browse) ---------------- */
function renderProblemset() {
  const rowsEl = document.getElementById("ps-rows"); if (!rowsEl) return;
  const st = edState(); const solvedN = Object.keys(st.solved).length; const today = todaysProblems();
  document.getElementById("ps-progress").textContent = `${solvedN} / ${PRACTICE_PROBLEMS.length} Solved`;
  document.getElementById("ps-streak").textContent = `${solveStreak()} day streak · ${today.filter(p => st.solved[p.id]).length}/3 of today's set`;
  document.getElementById("ps-today-sub").textContent = today.map(p => p.t).join(" · ");
  const topics = ["All", ...new Set(PRACTICE_PROBLEMS.map(p => p.topic))];
  document.getElementById("ps-topics").innerHTML = topics.map(t => `<button class="ps-chip ${t === psTopic ? "on" : ""}" data-topic="${esc(t)}">${t === "All" ? "All Topics" : esc(t)} <small>(${t === "All" ? PRACTICE_PROBLEMS.length : PRACTICE_PROBLEMS.filter(p => p.topic === t).length})</small></button>`).join("");
  const tabs = ["All", "employees", "exits", "salary_current", "performance_reviews", "payroll_dept_monthly", "requisitions", "engagement_survey"];
  const tlabel = { All: "All Tables", employees: "Employees", exits: "Exits", salary_current: "Salary", performance_reviews: "Performance", payroll_dept_monthly: "Payroll", requisitions: "Hiring", engagement_survey: "Engagement" };
  document.getElementById("ps-tables").innerHTML = tabs.map(t => `<button class="ps-disc ${t === psTable ? "on" : ""}" data-tab="${t}">${tlabel[t]}</button>`).join("");
  document.getElementById("ps-levels").innerHTML = ["All", "Easy", "Medium", "Advanced"].map(l => `<button class="${l === psLevel ? "on" : ""}" data-lv="${l}">${l === "Advanced" ? "Hard" : l}</button>`).join("");
  const q = (document.getElementById("ps-search").value || "").toLowerCase(); const stf = document.getElementById("ps-status").value;
  const list = PRACTICE_PROBLEMS.map((p, i) => ({ ...p, n: i + 1 })).filter(p => (psLevel === "All" || p.level === psLevel) && (psTopic === "All" || p.topic === psTopic) && (psTable === "All" || p.tables.includes(psTable))
    && (!q || (p.n + " " + p.t + " " + p.task).toLowerCase().includes(q)) && (stf === "all" || (stf === "done") === !!st.solved[p.id]));
  rowsEl.innerHTML = list.length ? list.map(p => `<tr data-open="${p.id}">
      <td>${st.solved[p.id] ? '<span class="ps-st done">✓</span>' : '<span class="ps-st"></span>'}</td>
      <td><div class="ps-title">${p.n}. ${esc(p.t)}${today.some(x => x.id === p.id) ? ' <span class="ps-todaytag">TODAY</span>' : ""}</div><div class="ps-tags"><span class="ps-tag2">▤ SQL</span>${p.tables.map(t => `<span class="ps-tag2 grey">${t}</span>`).join("")}</div></td>
      <td class="ps-time">${p.mins} min</td><td>${lvlBadge(p.level)}</td><td class="ps-arrow">→</td></tr>`).join("")
    : `<tr><td colspan="5" class="ed-empty">No problems match these filters.</td></tr>`;
  rowsEl.querySelectorAll("[data-open]").forEach(r => r.addEventListener("click", () => openProblem(r.dataset.open)));
  document.querySelectorAll("#ps-topics [data-topic]").forEach(b => b.addEventListener("click", () => { psTopic = b.dataset.topic; renderProblemset(); }));
  document.querySelectorAll("#ps-tables [data-tab]").forEach(b => b.addEventListener("click", () => { psTable = b.dataset.tab; renderProblemset(); }));
  document.querySelectorAll("#ps-levels [data-lv]").forEach(b => b.addEventListener("click", () => { psLevel = b.dataset.lv; renderProblemset(); }));
  renderCalendar();
  const tl = document.getElementById("ps-tablelist");
  if (tl) tl.innerHTML = Object.entries(window.PRACTICE_DB || {}).map(([n, t]) => `<div class="ps-tl"><code>${n}</code><span>${t.rows.length} rows · ${t.cols.length} cols</span></div>`).join("");
}
function renderCalendar() {
  const w = document.getElementById("ps-cal"); if (!w) return;
  const days = solveDays(); const now = new Date(); const y = now.getFullYear(), m = now.getMonth();
  const first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate(); const todayN = now.getDate();
  let cells = ""; for (let i = 0; i < first; i++) cells += "<span></span>";
  for (let d = 1; d <= n; d++) { const key = localDay(new Date(y, m, d)); cells += `<span class="${d === todayN ? "today" : ""} ${days.has(key) ? "solved" : ""}">${d}</span>`; }
  let last7 = 0; for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); if (days.has(localDay(d))) last7++; }
  const solvedToday = days.has(localDay());
  w.innerHTML = `<div class="ps-cal-head"><span class="ps-fire">🔥</span><div><strong>${now.toLocaleDateString("en-IN", { month: "long", year: "numeric" }).toUpperCase()}</strong><small>${days.size} days solved · ${solveStreak()} day streak</small></div><span class="ps-badge ${solvedToday ? "ok" : ""}">${solvedToday ? "Done today" : "Not yet today"}</span></div>
    <div class="ps-cal-grid">${["S", "M", "T", "W", "T", "F", "S"].map(x => `<b>${x}</b>`).join("")}${cells}</div>
    <div class="ps-cal-foot"><span>Last 7 days</span><strong>${last7} / 7 Days</strong></div><div class="ps-cal-bar"><i style="width:${Math.round(last7 / 7 * 100)}%"></i></div>`;
}

/* ---------------- Solve view ---------------- */
function renderSchema() {
  const w = document.getElementById("ed-schema"); if (!w) return;
  const T = window.PRACTICE_DB || {};
  w.innerHTML = Object.entries(T).map(([n, t]) => `<details ${edCur && edCur.tables.includes(n) ? "open" : ""}><summary><code>${n}</code> <span>${t.rows.length} rows</span></summary><div class="ed-cols">${t.cols.map(c => `<button class="ed-col" data-ins="${c}">${c}</button>`).join("")}</div></details>`).join("");
  w.querySelectorAll("[data-ins]").forEach(b => b.addEventListener("click", () => { const ta = document.getElementById("ed-sql"); const p = ta.selectionStart; ta.value = ta.value.slice(0, p) + b.dataset.ins + ta.value.slice(ta.selectionEnd); ta.focus(); ta.selectionStart = ta.selectionEnd = p + b.dataset.ins.length; }));
}
function showBrowse() { const b = document.getElementById("ed-browse"), s = document.getElementById("ed-solve"); if (!b) return; b.style.display = ""; s.style.display = "none"; renderProblemset(); }
function openProblem(id) {
  initEditor();
  edCur = PRACTICE_PROBLEMS.find(p => p.id === id) || PRACTICE_PROBLEMS[0];
  document.getElementById("ed-browse").style.display = "none"; document.getElementById("ed-solve").style.display = "";
  const st = edState(); const idx = PRACTICE_PROBLEMS.indexOf(edCur);
  document.getElementById("ed-pos").textContent = `Problem ${idx + 1} of ${PRACTICE_PROBLEMS.length} · ${edCur.topic}`;
  document.getElementById("ed-title").innerHTML = `${lvlBadge(edCur.level)} ${idx + 1}. ${esc(edCur.t)} <span class="ed-mins">⏱ ${edCur.mins} min</span>${st.solved[edCur.id] ? ' <span class="ps-badge ok">Solved</span>' : ""}`;
  document.getElementById("ed-task").textContent = edCur.task;
  document.getElementById("ed-tables").innerHTML = "Tables: " + edCur.tables.map(t => `<code>${t}</code>`).join(" ");
  document.getElementById("ed-sql").value = st.drafts[edCur.id] || `-- ${edCur.t}\nSELECT *\nFROM ${edCur.tables[0]}\nLIMIT 10;`;
  document.getElementById("ed-out").innerHTML = `<div class="ed-empty">Write your query, then press <kbd>Run</kbd> (Ctrl + Enter) and <kbd>Submit</kbd>.</div>`;
  document.getElementById("ed-msg").innerHTML = "";
  renderSchema(); window.scrollTo({ top: 0, behavior: "auto" });
}
function edMsg(kind, html) { document.getElementById("ed-msg").innerHTML = `<div class="ed-msg ${kind}">${html}</div>`; }
function initEditor() {
  const run = document.getElementById("ed-run"); if (!run) return;
  if (run._b) { if (document.getElementById("ed-solve").style.display === "none") renderProblemset(); return; }
  run._b = true;
  const ta = document.getElementById("ed-sql");
  const withDb = (fn) => { edMsg("info", "⏳ Loading the SQL engine (first time only)…"); loadSqlEngine().then(() => { document.getElementById("ed-msg").innerHTML = ""; fn(); }).catch(e => edMsg("bad", "⚠ " + esc(e.message) + ". Open the site from a web server (or check your connection)."));
  };
  const doRun = () => withDb(() => { const st = edState(); st.drafts[edCur.id] = ta.value; edSave(st);
    try { document.getElementById("ed-out").innerHTML = edTable(edRun(ta.value)); } catch (e) { edMsg("bad", "❌ " + esc(e.message)); } });
  run.addEventListener("click", doRun);
  ta.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); doRun(); }
    if (e.key === "Tab") { e.preventDefault(); const p = ta.selectionStart; ta.value = ta.value.slice(0, p) + "  " + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = p + 2; }
  });
  document.getElementById("ed-check").addEventListener("click", () => withDb(() => {
    let mine;
    try { mine = edRun(ta.value); } catch (e) { edMsg("bad", "❌ Your query has an error: " + esc(e.message)); return; }
    const exp = edRun(edCur.sol); document.getElementById("ed-out").innerHTML = edTable(mine);
    const ordered = /order\s+by[^()]*;?\s*$/i.test(edCur.sol);
    const ok = mine.columns.length === exp.columns.length && JSON.stringify(edNorm(mine, ordered)) === JSON.stringify(edNorm(exp, ordered));
    if (ok) { const st = edState(); if (!st.solved[edCur.id]) st.solved[edCur.id] = localDay(); st.drafts[edCur.id] = ta.value; edSave(st);
      const t3 = todaysProblems(); const done = t3.filter(p => st.solved[p.id]).length;
      edMsg("good", `✅ Correct · ${done} of 3 today · 🔥 ${solveStreak()} day streak`); renderHeroCards(); }
    else edMsg("bad", `✗ Not quite. Expected ${exp.values.length} row(s) × ${exp.columns.length} column(s); you returned ${mine.values.length} × ${mine.columns.length}. ${mine.columns.length === exp.columns.length ? "Check your values, rounding and filters." : "Check the columns you SELECT."}`);
  }));
  document.getElementById("ed-hint").addEventListener("click", () => edMsg("info", "💡 " + esc(edCur.hint)));
  document.getElementById("ed-solution").addEventListener("click", () => { ta.value = edCur.sol; edMsg("info", "🔓 Solution loaded. Run it and compare with your approach."); });
  document.getElementById("ed-reset").addEventListener("click", () => { const st = edState(); delete st.drafts[edCur.id]; edSave(st); openProblem(edCur.id); });
  document.getElementById("ed-back").addEventListener("click", showBrowse);
  const step = (k) => { const i = PRACTICE_PROBLEMS.indexOf(edCur); openProblem(PRACTICE_PROBLEMS[(i + k + PRACTICE_PROBLEMS.length) % PRACTICE_PROBLEMS.length].id); };
  document.getElementById("ed-prev").addEventListener("click", () => step(-1));
  document.getElementById("ed-next").addEventListener("click", () => step(1));
  document.getElementById("ps-search").addEventListener("input", renderProblemset);
  document.getElementById("ps-status").addEventListener("change", renderProblemset);
  document.getElementById("ps-random").addEventListener("click", () => { const st = edState(); const L = PRACTICE_PROBLEMS.filter(p => !st.solved[p.id]); const pool = L.length ? L : PRACTICE_PROBLEMS; openProblem(pool[Math.floor(Math.random() * pool.length)].id); });
  document.getElementById("ps-today-go").addEventListener("click", () => { const st = edState(); const t = todaysProblems(); openProblem((t.find(p => !st.solved[p.id]) || t[0]).id); });
  renderProblemset();
}

/* ---------------- Hero floating cards (DailySQL-style) ---------------- */
function renderHeroCards() {
  const st = edState(); const t3 = todaysProblems(); const done = t3.filter(p => st.solved[p.id]).length; const streak = solveStreak();
  const c3 = document.getElementById("hero-top-card");
  if (c3) {
    const ad = (HR.attr_dept || []).slice(0, 4); const col = ["#DC2626", "#F59E0B", "#2563EB", "#0EA5A4"];
    c3.innerHTML = `<div class="hf-top"><span>📉</span><span class="hf-lv dark">Highest attrition · 2025</span></div>${ad.map(([k, v], n) => `<div class="hf-lb"><i style="background:${col[n]}">${esc(k[0])}</i><span>${esc(k.replace(/ & .*/, ""))}</span><b>${v}%</b></div>`).join("")}<div class="hf-foot">From the Proxima HR dataset</div>`;
  }
}
function renderDailyCard() { renderHeroCards(); }
function renderIntegrity() {
  const t = document.getElementById("integrity-table"); const R = (window.HR && window.HR.integrity) || []; if (!t || !R.length) return;
  const ok = R.filter(r => r.ok).length;
  t.innerHTML = `<thead><tr><th>Check</th><th>Relationship / rule</th><th>Result</th><th>Status</th></tr></thead><tbody>${R.map(r => `<tr><td>${esc(r.check)}</td><td><code>${esc(r.relationship)}</code></td><td class="num">${fmtN(r.result)}${r.note ? `<div style="font-size:11.5px;color:var(--ink-muted);">${esc(r.note)}</div>` : ""}</td><td>${r.ok ? '<span class="recon-ok">✓ Pass</span>' : '<span style="color:var(--red);font-weight:700;">✗ Fail</span>'}</td></tr>`).join("")}</tbody><tfoot><tr><td colspan="4"><strong>${ok} / ${R.length} checks pass.</strong></td></tr></tfoot>`;
}
document.addEventListener("DOMContentLoaded", () => {
  renderHeroCards(); renderIntegrity();
  document.querySelectorAll("[data-scroll]").forEach(b => b.addEventListener("click", () => { const t = document.getElementById(b.dataset.scroll); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }));
  document.querySelectorAll('.ds-announce [data-goto="editor"]').forEach(b => b.addEventListener("click", () => switchView("editor")));
});
/* ============================================================
   Project Schedule & Group Presentation Status
   - Students: read-only view of the schedule published by the trainer
     (project-schedule.js, or a trainer's share link).
   - Trainer: PIN unlock → edit project code, kick-off date, presentation
     day, groups and statuses → "Publish" downloads project-schedule.js
     to upload with the site. Students can't change what others see:
     only the uploaded file (or the trainer's link) is shown to everyone.
   ============================================================ */
const SCH_STAGES = [
  { key: "kickoff", t: "Project Kick-off", d: "BRD, KPI catalogue and dataset walkthrough; groups formed.", week: 0, track: false },
  { key: "excel", t: "Excel Dashboard Presentation", d: "KPIs in Excel and the Excel dashboard.", week: 1, track: true },
  { key: "tableau", t: "Tableau Dashboard Presentation", d: "Tableau connected to MySQL. SQL QA can be presented this week or next.", week: 2, track: true, sqlqa: true },
  { key: "powerbi", t: "Power BI Dashboard Presentation", d: "Power BI connected to MySQL. Last chance to present SQL QA.", week: 3, track: true, sqlqa: true },
  { key: "final", t: "Final Presentation", d: "7 parts: Business Problem → Dataset → Data Model → KPIs → Dashboard → Insights → Recommendations.", week: 4, track: true },
];
const SCH_COLS = [["excel", "Excel"], ["tableau", "Tableau"], ["powerbi", "Power BI"], ["sqlqa", "SQL QA"], ["final", "Final"]];
const SCH_ST = { done: ["✅", "Done", "st-done"], pending: ["⏳", "Pending", "st-pending"], absent: ["❌", "Nobody presented", "st-absent"] };
const SCH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SCH_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SCH_DRAFT = "proxima_hr_schedule_draft_v1", SCH_UNLOCK = "proxima_hr_schedule_unlocked", SCH_VIEW = "proxima_hr_schedule_view";
let schEditCode = null;
/* Live sync. schedule-config.js: "auto" = use this site's own /api/schedule (Vercel + Upstash Redis) when it is
   connected, otherwise fall back to project-schedule.js. A full URL (e.g. a Google Apps Script web app) also works. */
const SCH_CFG = String(window.PROJECT_SCHEDULE_API || "").trim();
const SCH_AUTO = SCH_CFG.toLowerCase() === "auto";
let SCH_API = SCH_AUTO ? "" : SCH_CFG;
const SCH_PIN = "proxima_hr_schedule_pin";
let schRemote = null, schSyncMsg = "", schSaveTimer = null, schLoaded = !SCH_API;
/* "auto": probe /api/schedule once; switch to live mode only if the server answers with a configured database. */
function schProbe() {
  if (!SCH_AUTO || !/^https?:$/.test(location.protocol)) return;
  fetch("api/schedule?t=" + Date.now(), { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || j.configured === false || !Array.isArray(j.projects)) return;   // not set up → keep file mode
    SCH_API = "api/schedule";
    if (schIsTrainer()) { try { sessionStorage.removeItem(SCH_UNLOCK); } catch (e) {} }  // re-login against the server PIN
    schRemote = j.projects.length ? j : null; schLoaded = true;
    renderSchedule(); renderHeroSchedule();
    setInterval(() => { if (!schIsTrainer()) schLoadRemote(true); }, 60000);
  }).catch(() => {});
}
function schApi(payload) {
  return fetch(SCH_API, { method: "POST", body: JSON.stringify(payload) }).then(r => r.json());
}
function schLoadRemote(silent) {
  if (!SCH_API) return Promise.resolve();
  return fetch(SCH_API + (SCH_API.includes("?") ? "&" : "?") + "t=" + Date.now()).then(r => r.json()).then(j => {
    if (schIsTrainer() && schSaveTimer) return;                 // don't overwrite unsaved trainer edits
    schRemote = j && j.projects && j.projects.length ? j : null; schLoaded = true;
    renderSchedule(); renderHeroSchedule();
  }).catch(() => { schLoaded = true; if (!silent) { schSyncMsg = "⚠ Could not load the live schedule. Showing the last published file."; renderSchedule(); } });
}
function schPushRemote(d) {
  schRemote = d; schSyncMsg = "⏳ Saving…"; schShowSync();
  clearTimeout(schSaveTimer);
  schSaveTimer = setTimeout(() => {
    let pin = ""; try { pin = sessionStorage.getItem(SCH_PIN) || ""; } catch (e) {}
    schApi({ action: "save", pin, data: d }).then(j => {
      schSaveTimer = null;
      schSyncMsg = j.ok ? `✅ Saved ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · students see it now (on refresh)` : "⚠ Not saved: " + (j.error || "error");
      schShowSync();
    }).catch(() => { schSaveTimer = null; schSyncMsg = "⚠ Not saved: no internet or server not ready. Try again."; schShowSync(); });
  }, 700);
}
function schShowSync() { const e = document.getElementById("sch-sync"); if (e) e.textContent = schSyncMsg; }

/* ---------- tiny SHA-256 (works on file:// too) ---------- */
function sha256(str) {
  const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  const bytes = Array.from(new TextEncoder().encode(str)); const l = bytes.length * 8;
  bytes.push(0x80); while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (l >>> (i * 8)) & 255);
  let H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const r = (x, n) => (x >>> n) | (x << (32 - n));
  for (let o = 0; o < bytes.length; o += 64) {
    const w = [];
    for (let i = 0; i < 16; i++) w[i] = (bytes[o + 4 * i] << 24) | (bytes[o + 4 * i + 1] << 16) | (bytes[o + 4 * i + 2] << 8) | bytes[o + 4 * i + 3];
    for (let i = 16; i < 64; i++) { const s0 = r(w[i - 15], 7) ^ r(w[i - 15], 18) ^ (w[i - 15] >>> 3), s1 = r(w[i - 2], 17) ^ r(w[i - 2], 19) ^ (w[i - 2] >>> 10); w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0; }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0, t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H = H.map((v, i) => (v + [a, b, c, d, e, f, g, h][i]) | 0);
  }
  return H.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
}
const schHash = (pin) => sha256("proxima-hr-trainer|" + pin);

/* ---------- data ---------- */
const schClone = (o) => JSON.parse(JSON.stringify(o));
function schPublished() { return schClone(window.PROJECT_SCHEDULE || { pinHash: schHash("excelr2026"), active: "", projects: [] }); }
function schFromHash() {
  const m = location.hash.match(/schedule=([A-Za-z0-9_\-]+)/); if (!m) return null;
  try { return JSON.parse(decodeURIComponent(escape(atob(m[1].replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return null; }
}
function schIsTrainerX() { try { return sessionStorage.getItem(SCH_UNLOCK) === "1"; } catch (e) { return false; } }
function schIsTrainer() { return schIsTrainerX(); }
function schDraft() { try { const d = JSON.parse(lsGet(SCH_DRAFT)); return d && d.projects ? d : null; } catch (e) { return null; } }
function schData() {
  if (SCH_API) {
    if (schIsTrainer()) { if (!schRemote) schRemote = schPublished(); return schRemote; }
    const base = schRemote ? schClone(schRemote) : schPublished(); const h = schFromHash();
    if (h && h.code) { base.projects = base.projects.filter(x => x.code !== h.code).concat([h]); base.active = h.code; }
    return base;
  }
  if (schIsTrainer()) return schDraft() || schPublished();
  const pub = schPublished(); const h = schFromHash();
  if (h && h.code) { pub.projects = pub.projects.filter(p => p.code !== h.code).concat([h]); pub.active = h.code; }
  return pub;
}
function schSaveDraft(d) { d.updated = new Date().toISOString(); if (SCH_API) { schPushRemote(d); return; } lsSet(SCH_DRAFT, JSON.stringify(d)); }
function schCurrent(d) {
  let code = schIsTrainer() ? schEditCode : null;
  if (!code) { try { code = lsGet(SCH_VIEW); } catch (e) {} }
  const h = schFromHash(); if (!schIsTrainer() && h && h.code) code = h.code;
  return d.projects.find(p => p.code === code) || d.projects.find(p => p.code === d.active) || d.projects[0] || null;
}
const ymd = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
const parseYmd = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
function schStageDates(p) {
  const k = parseYmd(p.kickoff); const out = { kickoff: p.kickoff };
  let first = new Date(k); first.setDate(first.getDate() + 6);
  while (first.getDay() !== Number(p.presDay)) first.setDate(first.getDate() + 1);
  SCH_STAGES.filter(s => s.week > 0).forEach(s => { const d = new Date(first); d.setDate(d.getDate() + 7 * (s.week - 1)); out[s.key] = (p.overrides && p.overrides[s.key]) || ymd(d); });
  if (p.overrides && p.overrides.kickoff) out.kickoff = p.overrides.kickoff;
  return out;
}
const fmtD = (s) => { const d = parseYmd(s); return `${SCH_DAYS[d.getDay()].slice(0, 3)}, ${d.getDate()} ${SCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
function schPhase(dateStr, nextStr) {
  const today = parseYmd(ymd(new Date())), d = parseYmd(dateStr);
  if (+d === +today) return ["today", "Today"];
  if (d < today) return ["past", "Completed"];
  const prevWeek = new Date(d); prevWeek.setDate(prevWeek.getDate() - 7);
  return today > prevWeek ? ["next", "This week"] : ["future", "Upcoming"];
}
function schNext(p) {
  const ds = schStageDates(p); const today = ymd(new Date());
  return SCH_STAGES.find(s => ds[s.key] >= today) || null;
}
function schGroupStatus(p, g, key) { const s = (p.status && p.status[g.id]) || {}; return s[key] || "pending"; }
function schCounts(p, key) { const c = { done: 0, pending: 0, absent: 0 }; (p.groups || []).forEach(g => c[schGroupStatus(p, g, key)]++); return c; }
function schNewProject(code) {
  const today = new Date(); const fri = new Date(today); while (fri.getDay() !== 5) fri.setDate(fri.getDate() - 1);
  const groups = Array.from({ length: 6 }, (_, i) => ({ id: "g" + (i + 1), name: "Group " + (i + 1), members: "" }));
  return { code, name: "HR Analytics Capstone", kickoff: ymd(fri), presDay: 6, time: "9:00 PM – 10:00 PM", overrides: {}, groups, status: {} };
}

/* ---------- rendering ---------- */
const stChip = (s, extra) => `<span class="st-chip ${SCH_ST[s][2]}">${SCH_ST[s][0]} ${SCH_ST[s][1]}${extra || ""}</span>`;
function renderSchedule() {
  const root = document.getElementById("sch-root"); if (!root) return;
  const d = schData(); const p = schCurrent(d); const tr = schIsTrainer();
  document.getElementById("sch-mode").innerHTML = tr
    ? `<span class="sch-badge tr">🔓 Trainer mode</span><button class="btn-outline" id="sch-lock">Lock</button>`
    : `<span class="sch-badge">👀 Student view (read-only)</span><button class="sch-trainer-link" id="sch-unlock">Trainer login</button>`;
  const picker = d.projects.length > 1 || tr ? `<label class="sch-pick">Project code <select id="sch-select">${d.projects.map(x => `<option value="${esc(x.code)}" ${p && x.code === p.code ? "selected" : ""}>${esc(x.code)}</option>`).join("")}</select></label>` : "";
  if (!p) { root.innerHTML = `${picker}<div class="card sch-empty">No project has been published yet. ${tr ? "Create one below." : "Ask your trainer for the project link."}</div>` + (tr ? schAdminHtml(d, null) : ""); schBind(d, null); return; }
  const ds = schStageDates(p); const nx = schNext(p);
  const timeline = SCH_STAGES.map((s, i) => {
    const [ph, pl] = schPhase(ds[s.key]);
    const c = s.track ? schCounts(p, s.key) : null;
    const qa = s.sqlqa ? schCounts(p, "sqlqa") : null;
    return `<div class="sch-stage ${ph}"><div class="sch-dot">${ph === "past" ? "✓" : i}</div><div class="sch-body">
      <div class="sch-when">${fmtD(ds[s.key])} · ${esc(p.time || "")} <span class="sch-ph ${ph}">${pl}</span></div>
      <h4>${s.week ? "Week " + s.week + " · " : ""}${esc(s.t)}</h4><p>${esc(s.d)}</p>
      ${c ? `<div class="sch-counts">${stChip("done", ` ${c.done}`)}${stChip("pending", ` ${c.pending}`)}${c.absent ? stChip("absent", ` ${c.absent}`) : ""}</div>` : ""}
      ${s.sqlqa ? `<div class="sch-qa">+ SQL QA (either week): ${qa.done} of ${(p.groups || []).length} groups done</div>` : ""}
    </div></div>`;
  }).join("");
  const rows = (p.groups || []).map(g => {
    const st = (p.status && p.status[g.id]) || {};
    return `<tr><td><strong>${esc(g.name)}</strong>${g.members ? `<div class="sch-mem">${esc(g.members)}</div>` : ""}</td>${SCH_COLS.map(([k]) => `<td>${stChip(schGroupStatus(p, g, k), k === "sqlqa" && st.sqlqaWeek ? ` · ${st.sqlqaWeek === "tableau" ? "Tableau wk" : "Power BI wk"}` : "")}</td>`).join("")}<td class="sch-note">${esc(st.note || "")}</td></tr>`;
  }).join("");
  root.innerHTML = `${picker}
    <div class="sch-head card"><div><div class="sch-code">${esc(p.code)}</div><h3>${esc(p.name || "HR Analytics Capstone")}</h3>
      <p>Kick-off ${fmtD(ds.kickoff)} · weekly presentations every <strong>${SCH_DAYS[p.presDay]}</strong> · ${esc(p.time || "")} · ${(p.groups || []).length} groups</p></div>
      ${nx ? `<div class="sch-next"><span>Next</span><strong>${esc(nx.t)}</strong><em>${fmtD(ds[nx.key])}</em></div>` : `<div class="sch-next done"><span>Status</span><strong>Project completed 🎉</strong></div>`}</div>
    <div class="sch-timeline">${timeline}</div>
    <div class="section-head mt-40" style="margin-bottom:12px;"><div class="eyebrow">Group status</div><h2>Who has presented what</h2><p>✅ Done · ⏳ Pending · ❌ Nobody from the group presented in the meeting. SQL QA can be presented in the Tableau week or the Power BI week.</p></div>
    <div class="card table-scroll"><table class="dtable sch-table"><thead><tr><th>Group</th>${SCH_COLS.map(([, l]) => `<th>${l}</th>`).join("")}<th>Trainer note</th></tr></thead><tbody>${rows || `<tr><td colspan="7">No groups yet.</td></tr>`}</tbody></table></div>
    <p class="sch-upd">Last updated by trainer: ${p.updated ? new Date(p.updated).toLocaleString("en-IN") : "—"}</p>
    ${tr ? schAdminHtml(d, p) : ""}`;
  schBind(d, p);
}
function schAdminHtml(d, p) {
  if (!p) return `<div class="card sch-admin"><h3>Create a project</h3><div class="sch-row"><input class="search-input" id="sch-newcode" placeholder="Project code, e.g. HR-OCT26-B1"><button class="btn-blue" id="sch-create">Create project</button></div></div>`;
  const k = parseYmd(p.kickoff); const yrs = []; for (let y = new Date().getFullYear() - 1; y <= new Date().getFullYear() + 1; y++) yrs.push(y);
  const dim = new Date(k.getFullYear(), k.getMonth() + 1, 0).getDate();
  const ds = schStageDates(p);
  const sel = (id, opts, v) => `<select id="${id}">${opts.map(([val, lab]) => `<option value="${val}" ${String(val) === String(v) ? "selected" : ""}>${lab}</option>`).join("")}</select>`;
  const stSel = (gid, key, v) => `<select data-st="${gid}|${key}" class="st-sel ${SCH_ST[v][2]}">${Object.entries(SCH_ST).map(([s, [i, l]]) => `<option value="${s}" ${s === v ? "selected" : ""}>${i} ${l}</option>`).join("")}</select>`;
  const groups = (p.groups || []).map(g => { const st = (p.status && p.status[g.id]) || {};
    return `<tr><td><input data-gname="${g.id}" value="${esc(g.name)}"><input data-gmem="${g.id}" value="${esc(g.members || "")}" placeholder="Members (optional)"></td>
      ${SCH_COLS.map(([key]) => `<td>${stSel(g.id, key, st[key] || "pending")}${key === "sqlqa" ? sel("", [["", "Week?"], ["tableau", "Tableau wk"], ["powerbi", "Power BI wk"]], st.sqlqaWeek || "").replace('<select id=""', `<select data-qaw="${g.id}"`) : ""}</td>`).join("")}
      <td><input data-gnote="${g.id}" value="${esc(st.note || "")}" placeholder="Note"></td><td><button class="sch-del" data-gdel="${g.id}" title="Remove group">✕</button></td></tr>`; }).join("");
  return `<div class="card sch-admin">
    <div class="sch-admin-head"><h3>🔓 Trainer controls</h3>${SCH_API ? `<span class="sch-live">☁ Live sync ON: every change saves automatically and students see it.</span>` : `<span>Changes save on this device. Students see them only after you <strong>Publish</strong> (or set up Live sync).</span>`}</div>
    ${SCH_API ? `<div class="sch-sync" id="sch-sync">${esc(schSyncMsg || "☁ Connected")}</div>` : ""}
    <div class="sch-grid">
      <label>Project code<input class="search-input" id="sch-code" value="${esc(p.code)}"></label>
      <label>Project name<input class="search-input" id="sch-name" value="${esc(p.name || "")}"></label>
      <label>Kick-off: year ${sel("sch-y", yrs.map(y => [y, y]), k.getFullYear())}</label>
      <label>Month ${sel("sch-m", SCH_MONTHS.map((m, i) => [i, m]), k.getMonth())}</label>
      <label>Day ${sel("sch-d", Array.from({ length: dim }, (_, i) => [i + 1, `${i + 1} · ${SCH_DAYS[new Date(k.getFullYear(), k.getMonth(), i + 1).getDay()].slice(0, 3)}`]), k.getDate())}</label>
      <label>Presentation day ${sel("sch-pd", SCH_DAYS.map((x, i) => [i, x]), p.presDay)}</label>
      <label>Meeting time<input class="search-input" id="sch-time" value="${esc(p.time || "")}"></label>
    </div>
    <details class="sch-over"><summary>Change a single presentation date (holiday, reschedule)</summary><div class="sch-grid">${SCH_STAGES.filter(s => s.week > 0).map(s => `<label>${s.t}<input type="date" data-over="${s.key}" value="${ds[s.key]}"></label>`).join("")}<button class="btn-outline" id="sch-clearover">Reset to weekly dates</button></div></details>
    <h4 style="margin:16px 0 8px;">Groups & presentation status</h4>
    <div class="table-scroll"><table class="dtable sch-edit"><thead><tr><th>Group</th>${SCH_COLS.map(([, l]) => `<th>${l}</th>`).join("")}<th>Note</th><th></th></tr></thead><tbody>${groups}</tbody></table></div>
    <div class="sch-row"><button class="btn-outline" id="sch-addg">+ Add group</button><button class="btn-outline" id="sch-reset">↺ Reset all statuses</button><button class="btn-outline" id="sch-newp">+ New project</button><button class="btn-outline" id="sch-delp">🗑 Delete project</button><button class="btn-outline" id="sch-pin">Change PIN</button>${SCH_API ? `<button class="btn-outline" id="sch-reload">⟳ Reload from server</button>` : `<button class="btn-outline" id="sch-discard">Load live file (discard draft)</button>`}</div>
    <div class="sch-publish" ${SCH_API ? 'style="display:none"' : ""}>
      <div><strong>Publish to students</strong><p>1) Download <code>project-schedule.js</code> → 2) replace that file in the site folder (GitHub / Vercel / hosting) → students see the update. Or share a link right now (works for the selected project).</p></div>
      <div class="sch-row"><button class="btn-blue" id="sch-download">⬇ Download project-schedule.js</button><button class="btn-dark" id="sch-link">🔗 Copy student link</button></div>
    </div></div>`;
}
function schBind(d, p) {
  const $ = (id) => document.getElementById(id);
  const save = () => { if (p) p.updated = new Date().toISOString(); schSaveDraft(d); renderSchedule(); renderHeroSchedule(); };
  const selEl = $("sch-select");
  if (selEl) selEl.addEventListener("change", () => { if (schIsTrainer()) schEditCode = selEl.value; else lsSet(SCH_VIEW, selEl.value); if (schIsTrainer()) { d.active = selEl.value; schSaveDraft(d); } renderSchedule(); renderHeroSchedule(); });
  const un = $("sch-unlock");
  if (un) un.addEventListener("click", () => {
    const pin = prompt("Trainer PIN"); if (pin === null) return;
    if (SCH_API) {
      schApi({ action: "check", pin }).then(j => {
        if (!j.ok) { alert(j.error || "Wrong PIN."); return; }
        try { sessionStorage.setItem(SCH_UNLOCK, "1"); sessionStorage.setItem(SCH_PIN, pin); } catch (e) {}
        if (!schRemote) { schRemote = schDraft() || schPublished(); schSaveDraft(schRemote); }   // first live login: carry over the details already filled on this device
        schSyncMsg = "☁ Connected · changes save automatically"; renderSchedule();
      }).catch(() => alert("Could not reach the live sync server. Check your internet and try again."));
      return;
    }
    if (schHash(pin) === schPublished().pinHash || (schDraft() && schHash(pin) === schDraft().pinHash)) { try { sessionStorage.setItem(SCH_UNLOCK, "1"); } catch (e) {} if (!schDraft()) schSaveDraft(schPublished()); renderSchedule(); }
    else alert("Wrong PIN.");
  });
  const lk = $("sch-lock"); if (lk) lk.addEventListener("click", () => { try { sessionStorage.removeItem(SCH_UNLOCK); sessionStorage.removeItem(SCH_PIN); } catch (e) {} schEditCode = null; renderSchedule(); renderHeroSchedule(); });
  if (!schIsTrainer()) return;
  const cr = $("sch-create"); if (cr) cr.addEventListener("click", () => { const c = ($("sch-newcode").value || "").trim(); if (!c) return; d.projects.push(schNewProject(c)); d.active = c; schEditCode = c; save(); });
  if (!p) return;
  const on = (id, ev, fn) => { const e = $(id); if (e) e.addEventListener(ev, fn); };
  on("sch-code", "change", (e) => { const v = e.target.value.trim(); if (!v || d.projects.some(x => x !== p && x.code === v)) { alert("Code must be unique."); renderSchedule(); return; } if (d.active === p.code) d.active = v; p.code = v; schEditCode = v; save(); });
  on("sch-name", "change", (e) => { p.name = e.target.value; save(); });
  const setK = () => { const y = +$("sch-y").value, m = +$("sch-m").value; const dim = new Date(y, m + 1, 0).getDate(); const dd = Math.min(+$("sch-d").value, dim); p.kickoff = ymd(new Date(y, m, dd)); save(); };
  ["sch-y", "sch-m", "sch-d"].forEach(id => on(id, "change", setK));
  on("sch-pd", "change", (e) => { p.presDay = +e.target.value; save(); });
  on("sch-time", "change", (e) => { p.time = e.target.value; save(); });
  document.querySelectorAll("[data-over]").forEach(i => i.addEventListener("change", () => { p.overrides = p.overrides || {}; p.overrides[i.dataset.over] = i.value; save(); }));
  on("sch-clearover", "click", () => { p.overrides = {}; save(); });
  const gst = (gid) => { p.status = p.status || {}; p.status[gid] = p.status[gid] || {}; return p.status[gid]; };
  document.querySelectorAll("[data-st]").forEach(s => s.addEventListener("change", () => { const [gid, key] = s.dataset.st.split("|"); gst(gid)[key] = s.value; save(); }));
  document.querySelectorAll("[data-qaw]").forEach(s => s.addEventListener("change", () => { gst(s.dataset.qaw).sqlqaWeek = s.value; save(); }));
  document.querySelectorAll("[data-gnote]").forEach(s => s.addEventListener("change", () => { gst(s.dataset.gnote).note = s.value; save(); }));
  document.querySelectorAll("[data-gname]").forEach(s => s.addEventListener("change", () => { p.groups.find(g => g.id === s.dataset.gname).name = s.value; save(); }));
  document.querySelectorAll("[data-gmem]").forEach(s => s.addEventListener("change", () => { p.groups.find(g => g.id === s.dataset.gmem).members = s.value; save(); }));
  document.querySelectorAll("[data-gdel]").forEach(b => b.addEventListener("click", () => { if (!confirm("Remove this group?")) return; p.groups = p.groups.filter(g => g.id !== b.dataset.gdel); if (p.status) delete p.status[b.dataset.gdel]; save(); }));
  on("sch-addg", "click", () => { const n = (p.groups || []).length + 1; let id = "g" + n; while (p.groups.some(g => g.id === id)) id += "x"; p.groups.push({ id, name: "Group " + n, members: "" }); save(); });
  on("sch-reset", "click", () => { if (confirm("Reset every group's status to Pending for " + p.code + "?")) { p.status = {}; save(); } });
  on("sch-newp", "click", () => { const c = (prompt("New project code (e.g. HR-NOV26-B2)") || "").trim(); if (!c) return; if (d.projects.some(x => x.code === c)) { alert("That code already exists."); return; } d.projects.push(schNewProject(c)); schEditCode = c; d.active = c; save(); });
  on("sch-delp", "click", () => { if (!confirm("Delete project " + p.code + "?")) return; d.projects = d.projects.filter(x => x !== p); schEditCode = null; d.active = d.projects[0] ? d.projects[0].code : ""; save(); });
  on("sch-pin", "click", () => { const a = prompt("New trainer PIN (min 4 characters)"); if (!a || a.length < 4) return; if (prompt("Type the new PIN again") !== a) { alert("PINs don't match."); return; }
    if (SCH_API) { let pin = ""; try { pin = sessionStorage.getItem(SCH_PIN) || ""; } catch (e) {} schApi({ action: "setpin", pin, newPin: a }).then(j => { if (j.ok) { try { sessionStorage.setItem(SCH_PIN, a); } catch (e) {} alert("PIN changed on the server. Use the new PIN from now on."); } else alert(j.error || "Could not change PIN."); }).catch(() => alert("Could not reach the server.")); return; } d.pinHash = schHash(a); save(); alert("PIN changed. Download and upload project-schedule.js so the new PIN applies on the live site."); });
  on("sch-reload", "click", () => { schRemote = null; schLoadRemote(); });
  on("sch-discard", "click", () => { if (!confirm("Discard your unpublished changes on this device and load the live project-schedule.js?")) return; lsSet(SCH_DRAFT, JSON.stringify(schPublished())); schEditCode = null; renderSchedule(); renderHeroSchedule(); });
  on("sch-download", "click", () => {
    d.active = p.code; const out = schClone(d); out.updated = new Date().toISOString();
    const js = "/* Project schedule & group status. Edit it from the site (Trainer login), then replace this file. */\nwindow.PROJECT_SCHEDULE = " + JSON.stringify(out, null, 1) + ";\n";
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([js], { type: "text/javascript" })); a.download = "project-schedule.js"; document.body.appendChild(a); a.click(); a.remove();
  });
  on("sch-link", "click", (e) => {
    const one = schClone(p); one.updated = new Date().toISOString();
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(one)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const url = location.href.split("#")[0] + "#schedule=" + b64;
    copyText(url, e.target, "🔗 Copy student link");
  });
}
/* ---------- hero cards (home) ---------- */
function renderHeroSchedule() {
  const d = schData(); const p = schCurrent(d);
  const c1 = document.getElementById("hero-problem-card"), c2 = document.getElementById("hero-streak-card"), c4 = document.getElementById("hero-today-card");
  if (!p) { [c1, c2, c4].forEach(c => { if (c) c.innerHTML = `<div class="hf-lv dark">PROJECT SCHEDULE</div><p style="margin-top:6px;">Your trainer will publish the schedule here.</p>`; }); return; }
  const ds = schStageDates(p); const nx = schNext(p);
  if (c1) {
    c1.innerHTML = nx ? `<div class="hf-top"><span class="hf-ic">📅</span><span class="hf-lv">${esc(p.code)}</span><span class="hf-day">${schPhase(ds[nx.key])[1]}</span></div><h5>Next: ${esc(nx.t)}</h5><p>${esc(nx.d)}</p>
      <div class="hf-when">${fmtD(ds[nx.key])}<br><small>${esc(p.time || "")}</small></div>` : `<div class="hf-top"><span class="hf-ic">🎉</span><span class="hf-lv">${esc(p.code)}</span></div><h5>Project completed</h5><p>All presentations are done.</p>`;
    c1.onclick = () => switchView("schedule");
  }
  if (c2) {
    const stg = nx && nx.track ? nx : SCH_STAGES.filter(s => s.track).reverse().find(s => ds[s.key] <= ymd(new Date())) || SCH_STAGES[1];
    const c = schCounts(p, stg.key); const n = (p.groups || []).length || 1;
    c2.innerHTML = `<div class="hf-top"><span>👥</span><span class="hf-lv dark">GROUP STATUS</span><span class="hf-fire">${esc(stg.t.split(" ")[0])}</span></div>
      <div class="hf-big">${c.done}<small>of ${n} groups done</small></div><div class="hf-bar"><i style="width:${Math.round(c.done / n * 100)}%"></i></div>
      ${(p.groups || []).slice(0, 4).map(g => { const s = schGroupStatus(p, g, stg.key); return `<div class="hf-row"><span>${esc(g.name)}</span><span class="${s === "done" ? "ok" : ""}">${SCH_ST[s][0]}</span></div>`; }).join("")}
      ${(p.groups || []).length > 4 ? `<div class="hf-foot">+${p.groups.length - 4} more groups</div>` : ""}`;
    c2.onclick = () => switchView("schedule"); c2.style.cursor = "pointer";
  }
  if (c4) {
    c4.innerHTML = `<div class="hf-lv dark" style="margin-bottom:8px;">PROJECT TIMELINE · ${esc(p.code)}</div>${SCH_STAGES.map(s => { const [ph] = schPhase(ds[s.key]); return `<div class="hf-li ${ph}"><span>${ph === "past" ? "✓" : ph === "next" || ph === "today" ? "●" : "○"}</span><span>${esc(s.t.replace(" Presentation", ""))}</span><small>${fmtD(ds[s.key]).replace(/, \d{4}$/, "")}</small></div>`; }).join("")}<div class="hf-foot"><i class="dot"></i> Weekly every ${SCH_DAYS[p.presDay]}</div>`;
    c4.onclick = () => switchView("schedule"); c4.style.cursor = "pointer";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  renderSchedule(); renderHeroSchedule();
  if (schFromHash()) setTimeout(() => switchView("schedule"), 50);
  if (SCH_API) { schLoadRemote(); setInterval(() => { if (!schIsTrainer()) schLoadRemote(true); }, 60000); }
  else schProbe();
});
