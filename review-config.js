/* Mahendra Dashboard Evaluation Feedback — settings for this project.
   weights: points per category (they are scaled to total 100). focus: extra review rules the AI must check. */
window.REVIEW_CONFIG = {
  "siteKey": "proxima_hr",
  "weights": {
    "visual": 20,
    "kpi": 20,
    "model": 20,
    "insight": 20,
    "usability": 20
  },
  "focus": [
    "KPI formulas must match the definitions on this project's KPI page (name, numerator, denominator, filters).",
    "Each dashboard should answer the project's business questions and required views, not just show charts.",
    "Known data traps listed on the site (blank rows, duplicates, nulls, mismatched keys) must be handled before calculating KPIs.",
    "Attrition: leavers in the period ÷ average headcount of the same period, counting only eligible employees as defined on the KPI page.",
    "Check the reporting / as-of date used for headcount, tenure and age bands.",
    "Check aggregation grain: employee-level vs snapshot or history rows must not be double-counted.",
    "Filters and slicers must apply consistently to KPI cards and charts."
  ]
};
