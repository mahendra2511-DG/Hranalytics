/* Job Simulator content: every number comes from this project's own answer keys and gotchas. */
window.SIM_CONTENT = {
 "site": "Proxima Business Services · HR Analytics",
 "intro": {
  "incident": "A stakeholder has found a number that looks wrong and needs a decision today. Pick the evidence that matters, name the root cause and choose the fix.",
  "broken": "A junior analyst built the CY2025 workforce dashboard for the leadership review. Flag every number you would not present, then check the chart.",
  "stakeholder": "HR and Finance leaders often ask for a dashboard in one vague line. Choose the clarifying questions that define the decision, metric, period, scope and rules before you build."
 },
 "incidents": [
  {
   "id": "i1",
   "lvl": "Easy",
   "title": "“Headcount is 1,312, HRMS says 1,338”",
   "from": "Raghav Malhotra · Finance Head",
   "time": "Mon 9:20 AM",
   "msg": "Your Power BI card shows 1,312 employees on 31-Dec-2025. The HRMS report says 1,338. I'm building next year's salary budget on this. Which number is right?",
   "metric": [
    [
     "Headcount on the dashboard",
     "1,312"
    ],
    [
     "Headcount in HRMS",
     "1,338"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "Employees by EmploymentStatus",
     "sql": "SELECT EmploymentStatus, COUNT(*)\nFROM Employees\nGROUP BY EmploymentStatus;",
     "res": [
      [
       "Active",
       "1,312"
      ],
      [
       "Serving Notice",
       "26"
      ],
      [
       "Exited",
       "961"
      ],
      [
       "Total",
       "2,299"
      ]
     ],
     "note": "1,338 − 1,312 = 26, exactly the Serving Notice group."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "Headcount rule on 31-Dec-2025",
     "sql": "SET @d = '2025-12-31';\nSELECT COUNT(*) AS headcount\nFROM Employees\nWHERE HireDate <= @d\n  AND (ExitDate IS NULL OR ExitDate > @d);",
     "res": [
      [
       "headcount",
       "1,338"
      ],
      [
       "Active + Serving Notice",
       "1,312 + 26"
      ]
     ],
     "note": "The HireDate / ExitDate rule keeps everyone who is still on the rolls on that date."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Exit_Details by ExitStatus",
     "sql": "SELECT ExitStatus, COUNT(*)\nFROM Exit_Details\nGROUP BY ExitStatus;",
     "res": [
      [
       "Exited",
       "961"
      ],
      [
       "Serving Notice",
       "26 (last working day in 2026)"
      ]
     ],
     "note": "The 26 resigned in 2025 but are still working. They are on the rolls until their last day."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "New hires per month, 2025",
     "sql": "SELECT MONTH(HireDate), COUNT(*) FROM Employees\nWHERE YEAR(HireDate) = 2025 GROUP BY 1;",
     "res": [
      [
       "total 2025 hires",
       "252"
      ],
      [
       "pattern",
       "11 to 34 a month, no spike"
      ]
     ],
     "note": "Hiring was normal. It doesn't explain a gap of 26."
    }
   ],
   "causes": [
    [
     "c1",
     "HRMS double-counts some employees"
    ],
    [
     "c2",
     "26 new joiners were not loaded into Power BI"
    ],
    [
     "c3",
     "The measure filters EmploymentStatus = 'Active', so the 26 Serving Notice employees, who are still on the rolls, were dropped",
     true
    ],
    [
     "c4",
     "Contract employees were excluded"
    ],
    [
     "c5",
     "The dataset was not refreshed"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Rewrite the measure with the headcount rule (HireDate ≤ date AND ExitDate blank or after the date) → 1,338, and add a QA test that SQL and Power BI match",
     true
    ],
    [
     "f2",
     "Hard-code 1,338 into the card"
    ],
    [
     "f3",
     "Tell Finance the HRMS report is wrong"
    ],
    [
     "f4",
     "Add 26 to the measure as a manual adjustment"
    ]
   ],
   "answer": "Root cause: the card counted only EmploymentStatus = 'Active' (1,312) and dropped the 26 Serving Notice employees, who resigned but are still working. Using the HireDate / ExitDate rule, headcount on 31-Dec-2025 is <b>1,338</b>.",
   "tell": "“Use 1,338. Our card only counted 'Active' status and missed 26 people who are serving notice but are still on payroll. I've fixed the measure so it uses joining and exit dates, and it now matches HRMS.”"
  },
  {
   "id": "i2",
   "lvl": "Easy",
   "title": "“Our attrition is only 7.6%”",
   "from": "Sanjay Kulkarni · VP Operations",
   "time": "Tue 11:05 AM",
   "msg": "My team calculated 2025 attrition as 7.6%. That's well below the Indian IT range of 12–18%. I want to show this in the quarterly review. Can you confirm it?",
   "metric": [
    [
     "Attrition reported by the team",
     "7.6%"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "What the team divided by",
     "sql": "SELECT COUNT(*) FROM Employees;   -- the team's denominator",
     "res": [
      [
       "rows in Employees",
       "2,299"
      ],
      [
       "175 ÷ 2,299",
       "7.6%"
      ]
     ],
     "note": "Employees holds everyone on the rolls at any time since 01-Jan-2021, including 961 people who have already left."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "Opening and closing headcount, 2025",
     "sql": "-- headcount rule on 31-Dec-2024 and on 31-Dec-2025\nSELECT SUM(HireDate <= '2024-12-31' AND (ExitDate IS NULL OR ExitDate > '2024-12-31')) AS opening_hc,\n       SUM(HireDate <= '2025-12-31' AND (ExitDate IS NULL OR ExitDate > '2025-12-31')) AS closing_hc\nFROM Employees;",
     "res": [
      [
       "opening_hc",
       "1,261"
      ],
      [
       "closing_hc",
       "1,338"
      ],
      [
       "average headcount",
       "1,299.5"
      ]
     ],
     "note": "The people who could have left during 2025 are around 1,300, not 2,299."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Attrition trend by year",
     "sql": "-- exits ÷ average headcount, per calendar year",
     "res": [
      [
       "2023",
       "17.5%"
      ],
      [
       "2024",
       "12.2%"
      ],
      [
       "2025 (team's number)",
       "7.6%"
      ]
     ],
     "note": "7.6% would be far below every earlier year, even though 2025 had more exits (175) than 2024 (150)."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "Top voluntary exit reasons, 2025",
     "sql": "SELECT ExitReason, COUNT(*) FROM Exit_Details\nWHERE ExitType = 'Voluntary' AND ExitStatus = 'Exited'\n  AND YEAR(LastWorkingDate) = 2025\nGROUP BY ExitReason ORDER BY 2 DESC LIMIT 3;",
     "res": [
      [
       "Better Compensation",
       "38"
      ],
      [
       "Career Growth / Promotion",
       "26"
      ],
      [
       "Personal / Family Reasons",
       "20"
      ]
     ],
     "note": "Useful for the 'why', but it doesn't change the rate."
    }
   ],
   "causes": [
    [
     "c1",
     "Many exits were not recorded in Exit_Details"
    ],
    [
     "c2",
     "Involuntary exits were left out"
    ],
    [
     "c3",
     "The denominator was every employee ever in the table (2,299) instead of the average headcount for 2025",
     true
    ],
    [
     "c4",
     "Serving Notice employees were counted as exits"
    ],
    [
     "c5",
     "Attrition really fell sharply in 2025"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Exits ÷ average headcount: 175 ÷ ((1,261 + 1,338) ÷ 2) = 175 ÷ 1,299.5 = 13.5%, and write the definition on the KPI card",
     true
    ],
    [
     "f2",
     "Divide by closing headcount 1,338 instead"
    ],
    [
     "f3",
     "Divide exits by new hires"
    ],
    [
     "f4",
     "Keep 7.6% because leadership will like it"
    ]
   ],
   "answer": "Root cause: wrong denominator. 175 exits were divided by all 2,299 employees ever in the table. The correct base is average headcount (1,261 + 1,338) ÷ 2 = 1,299.5, so 2025 attrition is <b>13.5%</b>.",
   "tell": "“The real figure is 13.5%, not 7.6%. The team divided by everyone who has worked here since 2021, including people who left years ago. 13.5% is still inside the Indian IT range, but it's up from 12.2% in 2024.”"
  },
  {
   "id": "i3",
   "lvl": "Medium",
   "title": "“Did we pay salaries twice in June?”",
   "from": "Meera Iyer · CFO",
   "time": "Wed 3:40 PM",
   "msg": "The payroll dashboard shows June 2025 employer cost at ₹31.36 Cr. Every other month is between ₹14.12 Cr and ₹16.52 Cr. Did the payroll vendor pay everyone twice?",
   "metric": [
    [
     "June 2025 employer cost",
     "₹31.36 Cr"
    ],
    [
     "Other months",
     "₹14.12–16.52 Cr"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "Employer cost by month, 2025",
     "sql": "SELECT PayMonth, ROUND(SUM(TotalEmployerCost) / 1e7, 2) AS cost_cr\nFROM Payroll_Monthly\nWHERE YEAR(PayMonth) = 2025\nGROUP BY PayMonth;",
     "res": [
      [
       "Apr",
       "₹15.12 Cr"
      ],
      [
       "May",
       "₹14.34 Cr"
      ],
      [
       "Jun",
       "₹31.36 Cr"
      ],
      [
       "Jul",
       "₹16.52 Cr"
      ],
      [
       "Aug",
       "₹15.53 Cr"
      ]
     ],
     "note": "Only June jumps. July is already back to normal, and a little higher than before April."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "Data dictionary: Payroll_Monthly",
     "sql": "-- Data Dictionary → Payroll_Monthly",
     "res": [
      [
       "BonusType",
       "Annual Performance Bonus (June)"
      ],
      [
       "Arrears",
       "Increment arrears for Apr-May paid in June"
      ]
     ],
     "note": "Increments are effective 1-April but paid in June, together with the April–May arrears and the annual bonus."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Duplicate payroll rows",
     "sql": "SELECT EmployeeID, PayMonth, COUNT(*)\nFROM Payroll_Monthly\nGROUP BY EmployeeID, PayMonth\nHAVING COUNT(*) > 1;",
     "res": [
      [
       "Payroll_Monthly rows",
       "45,807"
      ],
      [
       "duplicate (EmployeeID, PayMonth) rows",
       "0"
      ]
     ],
     "note": "No employee has two payroll rows for the same month, so nobody was paid twice."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "New hires per month, 2025",
     "sql": "SELECT MONTH(HireDate), COUNT(*) FROM Employees\nWHERE YEAR(HireDate) = 2025 GROUP BY 1;",
     "res": [
      [
       "May",
       "17"
      ],
      [
       "Jun",
       "21"
      ],
      [
       "Jul",
       "34"
      ]
     ],
     "note": "June hiring was normal. It doesn't explain a doubled cost."
    }
   ],
   "causes": [
    [
     "c1",
     "The payroll vendor paid every employee twice"
    ],
    [
     "c2",
     "Headcount doubled in June"
    ],
    [
     "c3",
     "June carries the annual performance bonus plus April–May increment arrears, because increments effective 1-April are paid in June",
     true
    ],
    [
     "c4",
     "Serving Notice employees were paid their full and final settlement in June"
    ],
    [
     "c5",
     "The June file was loaded twice"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Keep June as it is, show employer cost split by component (fixed pay vs Bonus_Incentive vs Arrears), and add a note on the June bar",
     true
    ],
    [
     "f2",
     "Delete June from the chart"
    ],
    [
     "f3",
     "Replace June with the average of the other months"
    ],
    [
     "f4",
     "Escalate to the payroll vendor for a refund"
    ]
   ],
   "answer": "Root cause: not an error. June includes the annual performance bonus and the April–May increment arrears, and no employee has two payroll rows for any month. The <b>₹31.36 Cr June cost is real</b> and should be explained, not removed.",
   "tell": "“Nobody was paid twice. June always carries the annual bonus and two months of increment arrears, because April increments are paid in June. I've added a component view and a note on the chart so this is clear next time.”"
  },
  {
   "id": "i4",
   "lvl": "Advanced",
   "title": "“7,322 employees in the pay view?”",
   "from": "Pooja Banerjee · Compensation & Benefits Lead",
   "time": "Thu 6:15 PM",
   "msg": "Your new compensation view has 7,322 rows, but we only have 1,338 people. I'm sending average CTC and compa-ratio from it to the appraisal committee on Monday. Can I trust it?",
   "metric": [
    [
     "Rows in the new view",
     "7,322"
    ],
    [
     "Headcount on 31-Dec-2025",
     "1,338"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "Row counts of the tables involved",
     "sql": "SELECT COUNT(*) FROM Employees;        -- every employee since 2021\nSELECT COUNT(*) FROM Salary_History;   -- every salary revision\nSELECT COUNT(*) FROM vw_comp;          -- the new view",
     "res": [
      [
       "Employees",
       "2,299"
      ],
      [
       "Salary_History",
       "7,322"
      ],
      [
       "vw_comp",
       "7,322"
      ]
     ],
     "note": "The view has exactly one row per salary revision, about 3.2 per employee."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "The new view's SQL",
     "sql": "SELECT e.EmployeeID, e.JobLevel, s.AnnualCTC, g.BandMidCTC\nFROM Employees e\nJOIN Salary_History s ON s.EmployeeID = e.EmployeeID\nJOIN Dim_Designation g ON g.DesignationID = s.DesignationID;",
     "res": [
      [
       "date filter on Salary_History",
       "none"
      ],
      [
       "headcount filter on Employees",
       "none"
      ]
     ],
     "note": "Salary_History is SCD Type 2: Joining, Opening Balance, Annual Increment and Promotion Increment rows all join back to the same person."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Salary record valid on 31-Dec-2025",
     "sql": "SET @d = '2025-12-31';\nSELECT COUNT(*), AVG(s.AnnualCTC)\nFROM Employees e\nJOIN Salary_History s\n  ON s.EmployeeID = e.EmployeeID\n AND s.EffectiveFrom <= @d\n AND (s.EffectiveTo IS NULL OR s.EffectiveTo >= @d)\nWHERE e.HireDate <= @d AND (e.ExitDate IS NULL OR e.ExitDate > @d);",
     "res": [
      [
       "rows",
       "1,338"
      ],
      [
       "average CTC",
       "₹15.88 lakh"
      ]
     ],
     "note": "One row per person on the rolls, using the salary that was valid on that date."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "Dimension row counts",
     "sql": "SELECT COUNT(*) FROM Dim_Designation;\nSELECT COUNT(*) FROM Dim_Department;",
     "res": [
      [
       "Dim_Designation",
       "137"
      ],
      [
       "Dim_Department",
       "13"
      ]
     ],
     "note": "Each designation has one row and one band. The dimensions are fine and don't create extra rows."
    }
   ],
   "causes": [
    [
     "c1",
     "Employees has duplicate EmployeeIDs"
    ],
    [
     "c2",
     "Dim_Designation has several bands per designation"
    ],
    [
     "c3",
     "SCD Type 2 fan-out: every salary revision of every employee ever was joined, with no as-of-date filter, so each person repeats once per revision",
     true
    ],
    [
     "c4",
     "Serving Notice employees were loaded twice"
    ],
    [
     "c5",
     "Payroll_Monthly rows were mixed into the view"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Join only the salary record valid on the date (EffectiveFrom ≤ d AND EffectiveTo blank or ≥ d) for people on the rolls that day → 1,338 rows, average CTC ₹15.88 lakh, plus a QA check that view rows = headcount",
     true
    ],
    [
     "f2",
     "Filter Salary_History on IsCurrent = 'Yes' only"
    ],
    [
     "f3",
     "Use SELECT DISTINCT on the view"
    ],
    [
     "f4",
     "Divide every total by the average number of revisions"
    ]
   ],
   "answer": "Root cause: SCD Type 2 fan-out. Salary_History keeps one row per revision (7,322 rows), and the view joined all of them with no date filter. The correct view has <b>1,338 rows</b> and average CTC <b>₹15.88 lakh</b>. IsCurrent = 'Yes' is not enough, because the 26 Serving Notice employees have IsCurrent = 'No'.",
   "tell": "“Please don't use the current numbers. The view picked up every past salary revision, not just today's salary. I've fixed it to use the salary valid on 31-Dec-2025: 1,338 people, average CTC ₹15.88 lakh. I've also added a check that the view's row count equals headcount.”"
  }
 ],
 "broken": {
  "from": "CHRO",
  "brief": "“A junior analyst built this for tomorrow's leadership review. Something feels off. Flag every number you would NOT present, then submit.”",
  "title": "Proxima · Workforce & Attrition · CY2025",
  "tiles": [
   {
    "id": "t1",
    "label": "Headcount (31-Dec-2025)",
    "val": "1,312",
    "bad": true,
    "why": "Counts only EmploymentStatus = 'Active' and drops 26 Serving Notice employees who are still on the rolls. Correct (HireDate / ExitDate rule): 1,338."
   },
   {
    "id": "t2",
    "label": "New Hires",
    "val": "252",
    "bad": false,
    "why": "Correct: employees with HireDate in 2025."
   },
   {
    "id": "t3",
    "label": "Exits",
    "val": "987",
    "bad": true,
    "why": "COUNTROWS(Exit_Details) with no date or ExitStatus filter: every exit since 2021 (961) plus the 26 Serving Notice rows. Correct (ExitStatus = 'Exited', LastWorkingDate in 2025): 175."
   },
   {
    "id": "t4",
    "label": "Attrition %",
    "val": "13.1%",
    "bad": true,
    "why": "Exits ÷ closing headcount (175 ÷ 1,338). This understates attrition in a growing company. Correct: 175 ÷ average headcount 1,299.5 = 13.5%."
   },
   {
    "id": "t5",
    "label": "Voluntary Attrition %",
    "val": "11.5%",
    "bad": false,
    "why": "Correct: 150 voluntary exits ÷ average headcount 1,299.5."
   },
   {
    "id": "t6",
    "label": "Female %",
    "val": "35.8%",
    "bad": false,
    "why": "Correct: 479 women ÷ closing headcount 1,338."
   },
   {
    "id": "t7",
    "label": "Average Annual CTC",
    "val": "₹15.88 L",
    "bad": false,
    "why": "Correct: average AnnualCTC from the Salary_History record valid on 31-Dec-2025, for people on the rolls."
   },
   {
    "id": "t8",
    "label": "Employees in Pay Analysis",
    "val": "7,322",
    "bad": true,
    "why": "Salary_History (SCD Type 2) was joined without a date filter, so every salary revision became a row. Correct: 1,338, one salary record per person on 31-Dec-2025."
   },
   {
    "id": "t9",
    "label": "Top Voluntary Exit Reason",
    "val": "Better Compensation (23.4%)",
    "bad": true,
    "why": "This is the 2024 value: the visual was not filtered to 2025. Correct for CY2025: Better Compensation, 38 of 150 voluntary exits = 25.3%."
   },
   {
    "id": "t10",
    "label": "eNPS (2025 survey)",
    "val": "+16.1",
    "bad": false,
    "why": "Correct: % promoters (score 9–10) − % detractors (score 0–6) of the 2025 survey responses."
   }
  ],
  "chart": {
   "title": "Attrition hotspots: exits by department, 2025",
   "bars": [
    [
     "Engineering",
     "61",
     90
    ],
    [
     "Customer Success & Support",
     "29",
     43
    ],
    [
     "Sales & Business Development",
     "19",
     28
    ],
    [
     "Data & Analytics",
     "16",
     24
    ],
    [
     "Quality Assurance",
     "16",
     24
    ]
   ],
   "bad": true,
   "why": "Raw exit counts follow department size. Engineering has 481 of the 1,338 employees, so it will always top a count chart. A hotspot needs a rate: exits ÷ the department's average headcount. Correct: Customer Success & Support leads at 18.5% (17.3% voluntary), then Sales & Business Development at 16.5%. Engineering is 13.0%."
  }
 },
 "stakeholders": [
  {
   "id": "s1",
   "who": "Anita Deshpande · CHRO",
   "ask": "I need an attrition dashboard.",
   "qs": [
    [
     "What decision will this dashboard help you make?",
     "obj",
     18,
     "Where to focus next year's retention budget: which departments and which groups of people."
    ],
    [
     "Who else will use it: you, the department heads, or the board?",
     "scope",
     14,
     "Me and the department heads. The board gets a one-page summary."
    ],
    [
     "Which attrition do you care about most: total, voluntary or regrettable?",
     "metric",
     18,
     "Voluntary first, and regrettable next to it. Involuntary only for context."
    ],
    [
     "Which departments and employee types are in scope?",
     "scope",
     10,
     "All departments, Full-Time and Contract, but let me filter by department, level and location."
    ],
    [
     "Which period, and do you want a comparison?",
     "time",
     16,
     "Calendar 2025 compared with 2024, by month."
    ],
    [
     "Should Serving Notice employees count as exits?",
     "rules",
     14,
     "No. They count as exits only after their last working day."
    ],
    [
     "Should attrition use average headcount as the base?",
     "rules",
     12,
     "Yes, (opening + closing) ÷ 2, as in the KPI document."
    ],
    [
     "How often should it refresh?",
     "time",
     6,
     "Monthly, after payroll closes."
    ],
    [
     "Which colour theme do you like?",
     "bad",
     -8,
     "Whatever is readable. (A question for later, not for scoping.)"
    ],
    [
     "Should I show each leaver's name and salary?",
     "bad",
     -8,
     "No. HR data is sensitive. Keep it aggregated."
    ],
    [
     "Can I use last year's Excel file instead of the database?",
     "bad",
     -6,
     "Use the database, so QA can reconcile."
    ]
   ]
  },
  {
   "id": "s2",
   "who": "Vikram Choudhary · Head of Talent Acquisition",
   "ask": "Why is our hiring so slow? I need an answer by Friday.",
   "qs": [
    [
     "What would you change depending on the answer?",
     "obj",
     18,
     "Whether to add recruiters, change sources, or push hiring managers to finish interviews faster."
    ],
    [
     "Does 'slow' mean time to fill, time to hire or time to join?",
     "metric",
     18,
     "Time to fill first: requisition opened to closed. Time to join is mostly notice period."
    ],
    [
     "Should I compare by department, level or recruiter?",
     "scope",
     14,
     "Level and department first. Recruiter only inside my team."
    ],
    [
     "Do you also want cost per hire by source?",
     "metric",
     12,
     "Yes. Speed alone can make an expensive source look good."
    ],
    [
     "Which period: last quarter, last year, or both years?",
     "time",
     16,
     "2025 compared with 2024."
    ],
    [
     "Should Campus Hiring requisitions be included in time to fill?",
     "rules",
     14,
     "No. They open months before students join, so they distort the average."
    ],
    [
     "Which requisitions count: only Filled, or Open and On Hold too?",
     "rules",
     8,
     "Time to fill on Filled only. Show Open and On Hold separately as the backlog."
    ],
    [
     "Should I break it down by location?",
     "scope",
     6,
     "Only if one office stands out."
    ],
    [
     "Can I add a word cloud of candidate feedback?",
     "bad",
     -8,
     "Not needed for this decision."
    ],
    [
     "Should I build it in Excel, Tableau and Power BI?",
     "bad",
     -6,
     "One tool is enough for this question."
    ],
    [
     "Do you want a 3D funnel chart?",
     "bad",
     -8,
     "No."
    ]
   ]
  },
  {
   "id": "s3",
   "who": "Meera Iyer · CFO",
   "ask": "Tell me what our people cost.",
   "qs": [
    [
     "Is this for next year's budget or for reporting?",
     "obj",
     18,
     "Budget: we're setting next year's salary and hiring budget."
    ],
    [
     "Which cost: CTC, gross pay, or total employer cost?",
     "metric",
     18,
     "Total employer cost from payroll. CTC only as a reference."
    ],
    [
     "Should employer PF, ESI and gratuity be included?",
     "metric",
     12,
     "Yes. Show them as a separate statutory line."
    ],
    [
     "Do you need it by department and level, or company total only?",
     "scope",
     14,
     "By department and level, with the company total on top."
    ],
    [
     "Calendar year or financial year?",
     "time",
     16,
     "Financial year (April to March), plus calendar 2025 for comparison."
    ],
    [
     "How should the June bonus and arrears be shown?",
     "rules",
     14,
     "Keep them, but split them out so the June spike is explained."
    ],
    [
     "Should cost come from payroll actually paid, or from CTC?",
     "rules",
     10,
     "Actually paid, from Payroll_Monthly. Finance reconciles to that."
    ],
    [
     "Should I include people who left during the year?",
     "scope",
     8,
     "Yes, for the months they were paid."
    ],
    [
     "Can I round everything to crores?",
     "bad",
     -4,
     "Crores for totals, lakhs for averages."
    ],
    [
     "Should I include training hours in people cost?",
     "bad",
     -8,
     "Hours aren't money. Keep them out."
    ],
    [
     "Can I skip QA to deliver faster?",
     "bad",
     -10,
     "No. Finance numbers must reconcile."
    ]
   ]
  }
 ]
};
