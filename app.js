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
const P1_KPIS = new Set(["Headcount (Closing)", "Average Headcount", "New Hires", "Separations (Exits)", "Overall Attrition Rate %", "Voluntary Attrition %",
  "Regrettable Attrition %", "Retention Rate %", "Gender Diversity (Female %)", "Time to Fill (Days)", "Offer Acceptance Rate %", "Cost per Hire (INR)",
  "Total Employer Cost (INR Cr)", "Median Compa-Ratio", "Average Annual Hike %", "Gender Pay Gap % (Level-Adjusted)", "High Performer % (Rating 4-5)",
  "Promotion Rate %", "Training Hours per Employee", "Absenteeism Rate % (Unplanned)", "Employee Net Promoter Score (eNPS)", "Engagement Index %", "Early Attrition % (Tenure < 1 Year)"]);
const KPIS = (HR.kpis || []).map(k => ({
  id: k.id, name: k.name, cat: k.cat, q: k.q, desc: k.logic, plain: k.plain, formula: k.dax, table: k.tables,
  unit: k.unit, dir: k.dir, bench: k.bench, v24: k.v24, v25: k.v25, prio: P1_KPIS.has(k.name) ? "P1" : "P2",
}));
const KPI_CATS = ["All", "Workforce", "Attrition", "Recruitment", "Compensation & Payroll", "Performance", "Learning & Development", "Attendance & Leave", "Engagement"];

/* ---------------- STATS (hero strip) ---------------- */
const STATS = [
  { num: "2,299", lbl: "Employee records (2021–2025)" },
  { num: fmtN(HR.hc || 1338), lbl: "Active on 31-Dec-2025" },
  { num: "18", lbl: "Tables in the model" },
  { num: "67", lbl: "KPIs with DAX" },
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
    { n: "01", t: "Workforce Overview", aud: "CEO · CHRO", keys: ["Headcount", "Hires", "Exits", "Female %"],
      desc: "Who works here today, where, at what level, and how the workforce changed over five years.",
      mock: { title: "Workforce Overview — CY2025", sub: "As of 31-Dec-2025, computed from Employees + Dim tables",
        kpis: [{ v: fmtN(v.HC), l: "Headcount (closing)" }, { v: fmtN(v.HIRES), l: "New hires" }, { v: fmtN(v.EXITS), l: "Exits" }, { v: f1(v.FEM) + "%", l: "Female %" }, { v: Number(v.TEN).toFixed(2) + " yrs", l: "Avg tenure" }, { v: Number(v.SPAN).toFixed(1), l: "Span of control" }],
        donuts: [{ title: "Gender mix", data: H.hc_gender }, { title: "Work mode", data: H.hc_mode }],
        bars: [{ title: "Headcount by department", data: H.hc_dept }, { title: "Headcount by location", data: H.hc_loc }, { title: "Headcount by job level", data: H.hc_level }, { title: "Age band", data: H.hc_age }] },
      build: { tableau: ["Headcount as a calculated field with a date parameter: IF [HireDate] <= [p_AsOf] AND (ISNULL([ExitDate]) OR [ExitDate] > [p_AsOf]) THEN 1 END", "Year-end headcount trend: a scaffold of month-end dates, or one calc per year", "Dept / location bars sorted descending"],
               powerbi: ["Headcount measure with VAR d = MAX(Dim_Date[Date]) and FILTER(ALL(Employees))", "Line chart: Dim_Date[YearMonth] on axis + Headcount measure (no relationship needed)", "Card visuals with conditional formatting vs prior year"] } },
    { n: "02", t: "Attrition & Retention", aud: "CHRO · Department heads", keys: ["Attrition %", "Voluntary %", "Regrettable %", "Early attrition"],
      desc: "How many people leave, from where, why, and which drivers predict it.",
      mock: { title: "Attrition & Retention — CY2025", sub: "Exits by last working day · average-headcount method",
        kpis: [{ v: f1(v.ATTR) + "%", l: "Attrition" }, { v: f1(v.VOL) + "%", l: "Voluntary attrition" }, { v: f1(v.REGRET) + "%", l: "Regrettable (of voluntary)" }, { v: f1(v.EARLY) + "%", l: "Exits < 1 yr tenure" }, { v: f1(v.RET) + "%", l: "Retention rate" }],
        donuts: [{ title: "Exit type", data: H.exit_type_2025 }],
        bars: [{ title: "Exits by month (LWD, 2025)", data: H.exits_by_month_2025 }, { title: "Voluntary attrition % by department", data: H.vol_attr_dept, suffix: "%" }, { title: "Top voluntary exit reasons", data: H.reasons_2025 }, { title: "Attrition % by year", data: (H.attr_trend || []).map(r => [r[0], r[1]]), suffix: "%" }] },
      build: { tableau: ["LOD for average headcount per department: {FIXED [Department]: ...}", "Reference line at company attrition % on the department bar", "Driver bars: Compa band / Overtime band as dimensions"],
               powerbi: ["Exits measure with USERELATIONSHIP(Exit_Details[LastWorkingDate], Dim_Date[Date])", "Attrition % = DIVIDE([Exits], [Avg HC])", "Decomposition tree on voluntary exits"] } },
    { n: "03", t: "Talent Acquisition", aud: "TA Lead · Hiring managers", keys: ["Open reqs", "Time to fill", "Offer acceptance", "Cost per hire"],
      desc: "How fast and how efficiently Proxima hires, and which channels are worth the money.",
      mock: { title: "Talent Acquisition — CY2025", sub: "Job_Requisitions + Candidates (campus excluded from time metrics)",
        kpis: [{ v: fmtN(v.OPENREQ), l: "Open reqs (31-Dec)" }, { v: f1(v.TTF) + " d", l: "Time to fill" }, { v: f1(v.TTH) + " d", l: "Time to hire" }, { v: f1(v.OAR) + "%", l: "Offer acceptance" }, { v: "₹" + fmtN(Math.round(v.CPH)), l: "Cost per hire" }],
        donuts: [{ title: "Source of hire", data: (H.src_2025 || []).slice(0, 6) }],
        bars: [{ title: "Recruitment funnel (applications in 2025)", data: H.funnel_2025 }, { title: "Time to fill by level (days)", data: H.ttf_level }, { title: "Cost per hire by source (₹)", data: H.cost_by_source }, { title: "Offer decline reasons", data: H.decline_reasons }] },
      build: { tableau: ["Funnel: stage as dimension, COUNT of non-null stage dates", "TTF = DATEDIFF('day', [OpenDate], [ClosedDate])", "Filter RequisitionType <> Campus Hiring"],
               powerbi: ["Funnel visual with one measure per stage", "Relationship Candidates → Job_Requisitions (Many:1)", "Slicer on Source, Department"] } },
    { n: "04", t: "Compensation & Payroll", aud: "CFO · CHRO · Payroll", keys: ["Employer cost", "Avg CTC", "Compa-ratio", "Pay gap"],
      desc: "What people cost, whether pay is competitive and fair, and how the appraisal budget was spent.",
      mock: { title: "Compensation & Payroll — CY2025", sub: "Payroll_Monthly + Salary_History + Dim_Designation bands",
        kpis: [{ v: "₹" + Number(v.PAYCOST).toFixed(1) + " Cr", l: "Employer cost" }, { v: "₹" + Number(v.AVGCTC).toFixed(1) + " L", l: "Avg CTC (active)" }, { v: Number(v.COMPA).toFixed(2), l: "Median compa-ratio" }, { v: f1(v.HIKE) + "%", l: "Avg hike incl. promotions" }, { v: f1(v.GPG) + "%", l: "Gender pay gap (level-adj.)" }],
        donuts: [{ title: "Compa-ratio bands (active)", data: H.compa_dist }],
        bars: [{ title: "Employer cost by month (₹ Cr)", data: H.paycost_month_2025 }, { title: "Average CTC by level (₹ L)", data: H.ctc_level }, { title: "Annual hike % by rating (Apr-2025)", data: H.hike_by_rating, suffix: "%" }, { title: "Gender pay gap % by level", data: H.gap_level, suffix: "%" }] },
      build: { tableau: ["Use the SCD filter: EffectiveFrom <= date <= EffectiveTo", "Compa histogram with bins of 0.1", "Annotate June: bonus + arrears"],
               powerbi: ["Employer Cost = SUM(Payroll_Monthly[TotalEmployerCost]) on PayMonth", "Compa ratio in a matrix by Level × Department with conditional colours", "Format ₹ Cr via measure ÷ 1e7"] } },
    { n: "05", t: "Performance & L&D", aud: "CHRO · L&D Manager", keys: ["Rating mix", "9-box", "Promotion %", "Training hrs"],
      desc: "Are we differentiating performance, promoting the right people and investing in skills?",
      mock: { title: "Performance & L&D — FY2024-25 cycle / CY2025", sub: "Performance_Reviews, Job_History, Training_Records",
        kpis: [{ v: f1(v.HIPO) + "%", l: "Rated 4–5" }, { v: f1(v.PROMO) + "%", l: "Promotion rate" }, { v: Number(v.YSP).toFixed(2) + " yrs", l: "Avg yrs since promotion" }, { v: f1(v.TRHRS) + " h", l: "Training hrs / employee" }, { v: f1(v.COMPL) + "%", l: "Compliance completion" }],
        donuts: [{ title: "Rating distribution", data: H.rating_dist }],
        bars: [{ title: "9-box placement", data: H.ninebox }, { title: "Promotions by year", data: H.promos_year }, { title: "Training hours by category", data: H.trn_hours_cat }, { title: "Training record status", data: H.trn_status }] },
      build: { tableau: ["9-box: Performance band × PotentialRating highlight table", "Promotions from Job_History EventType", "Training hours on StartDate"],
               powerbi: ["Matrix visual for 9-box with counts", "Promotion % = promotions ÷ Avg HC", "Program slicer from Dim_TrainingProgram"] } },
    { n: "06", t: "Engagement & Attendance", aud: "HR Business Partners", keys: ["eNPS", "Engagement index", "Absenteeism", "WFO %"],
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
    return `<div class="card ds-card ${cls}"><div class="k">${esc(ty)}</div><h4>${t}</h4><div class="rows">${Number(rows[t] || 0).toLocaleString("en-IN")}</div><p>${esc(TABLE_GRAIN[t])}</p></div>`;
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
let kpiActiveCat = "All", kpiSearch = "", kpiStarredOnly = false;
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
  const list = KPIS.filter(k => (kpiActiveCat === "All" || k.cat === kpiActiveCat) && (!q || (k.name + k.q + k.desc + k.formula + k.table).toLowerCase().includes(q)) && (!kpiStarredOnly || bm.kpi[k.name]));
  if (!list.length) { wrap.appendChild(el("div", "empty-state", kpiStarredOnly ? "No starred KPIs yet. Tap the ★ on any card to save it here." : "No KPIs match that search.")); return; }
  list.forEach(k => {
    const starred = !!bm.kpi[k.name];
    const c = el("div", "card kpi-card"); c.id = "kpi-" + slugify(k.name);
    c.innerHTML = `
      <div class="top"><h4>${esc(k.name)}</h4>
        <div class="card-top-actions"><span class="tag ${k.prio === "P1" ? "p1" : "p2"}">${k.prio}</span>
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
let sqlCat = "All";
function sqlBlockHtml(b, idx, prefix) {
  return `<div class="card sql-block"><div class="hd"><div><h4>${esc(b.title)}</h4><p>${esc(b.desc)}</p></div><button class="copy-btn" data-copy="${prefix}${idx}">Copy</button></div><pre>${esc(b.sql)}</pre></div>`;
}
function renderSql() {
  const pills = document.getElementById("sql-pills");
  const cats = ["All", ...new Set(SQL_BLOCKS.map(b => b.cat))];
  pills.innerHTML = "";
  cats.forEach(c => { const b = el("button", "pill" + (c === sqlCat ? " active" : ""), c); b.addEventListener("click", () => { sqlCat = c; renderSql(); }); pills.appendChild(b); });
  const wrap = document.getElementById("sql-list");
  wrap.innerHTML = SQL_BLOCKS.map((b, i) => (sqlCat === "All" || b.cat === sqlCat) ? sqlBlockHtml(b, i, "s") : "").join("");
  wrap.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", () => copyText(SQL_BLOCKS[+btn.dataset.copy.slice(1)].sql, btn, "Copy")));
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
      <div class="gbody"><p>${esc(p.desc)}</p><div class="gaud">Audience: ${esc(p.aud)}</div><button class="btn-blue" data-dash="${i}">View Dashboard →</button></div>
    </div>`).join("");
  document.querySelectorAll("[data-dash]").forEach(b => b.addEventListener("click", () => {
    const p = pages[+b.dataset.dash];
    openModal(renderDashMock(p.mock) + `<div class="build-notes">
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
    const card = el("div", "qa-item"); card.id = "qa-" + slugify(item.q);
    card.innerHTML = `
      <div class="qa-q"><span class="num">${esc(item.cat)}</span><span class="qtext">${esc(item.q)}</span>
        <button class="link-btn" title="Copy link to this question">🔗</button>
        <button class="star-btn ${starred ? "starred" : ""}" title="Star this question">${starred ? "★" : "☆"}</button><span class="chev">⌄</span></div>
      <div class="qa-a"><div class="qa-a-inner">
        <div class="answer-text ${isLong ? "clamped" : ""}"><p>${item.a}</p></div>
        ${isLong ? '<button type="button" class="show-full-btn">Show full answer ▾</button>' : ""}
        <div class="signal">Interviewer signal: ${esc(item.signal)}</div>
        <button class="mark-btn ${done ? "done" : ""}" style="margin-top:12px;">${done ? "✓ Reviewed" : "Mark reviewed"}</button></div></div>`;
    const aDiv = card.querySelector(".qa-a");
    card.querySelector(".qa-q").addEventListener("click", (ev) => {
      if (ev.target.closest(".star-btn") || ev.target.closest(".link-btn")) return;
      const open = card.classList.toggle("open"); aDiv.style.maxHeight = open ? aDiv.scrollHeight + "px" : "0px";
    });
    const sf = card.querySelector(".show-full-btn");
    if (sf) sf.addEventListener("click", (ev) => { ev.stopPropagation(); const t = card.querySelector(".answer-text"); const c = t.classList.toggle("clamped"); sf.textContent = c ? "Show full answer ▾" : "Show less ▴"; if (card.classList.contains("open")) aDiv.style.maxHeight = aDiv.scrollHeight + "px"; });
    const mb = card.querySelector(".mark-btn");
    mb.addEventListener("click", (ev) => { ev.stopPropagation(); const s2 = loadState(); s2.qa[id] = !s2.qa[id]; saveState(s2); mb.classList.toggle("done", s2.qa[id]); mb.textContent = s2.qa[id] ? "✓ Reviewed" : "Mark reviewed"; updateQaProgressBar(); refreshProgress(); });
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
/* ============================================================
   Navigation
   ============================================================ */
const LAST_VIEW_KEY = "proxima_hr_last_view_v1";
const VIEW_LABELS = {
  progress: "My Progress", problem: "Problem & Business Questions", rules: "Rules & Regulations", dataset: "Dataset", model: "Data Model",
  datadict: "Data Dictionary", quality: "Data Quality", kpis: "KPI Library", sql: "SQL Lab", excel: "Excel Analysis", analysis: "Business Analysis",
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
  if (saved === "dark") apply(true);
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
  hint.addEventListener("click", openCmdk);
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
    initNav, initMobileToggle, initSearch, initSocial, initVisitorCounter, initChatWidget, initThemeToggle, updateStreak,
    initQuiz, initStarredToggles, initCmdk, initCheatSheet, initModal, refreshProgress, renderContinueBanner, handleDeepLink,
  ];
  steps.forEach(fn => { try { fn(); } catch (e) { console.error("Boot step failed:", fn.name || "(anonymous)", e); } });
  window.addEventListener("hashchange", handleDeepLink);
});
