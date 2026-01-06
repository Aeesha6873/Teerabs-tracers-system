// src/data/proposalsData.js
export const proposalsData = [
  {
    id: "PR-001",
    user: "Aisha Abdullahi",
    userId: "U-101",
    email: "aisha@gmail.com",
    businessName: "Teerabs Venture",
    businessType: "Agriculture",
    amountRequested: 200000,
    submittedDate: "2025-11-10",
    status: "pending",
    summary:
      "Smallholder support program to buy seedlings and tools. Aim to scale to 200 farmers within 6 months.",
    attachments: [
      { name: "Proposal.pdf", url: "#" },
      { name: "Budget.xlsx", url: "#" },
    ],
    notes: "",
    location: { lat: 9.06, lng: 7.48 },
  },
  {
    id: "PR-002",
    user: "John Doe",
    userId: "U-120",
    email: "john@domain.com",
    businessName: "Green Energy Co.",
    businessType: "Renewables",
    amountRequested: 500000,
    submittedDate: "2025-11-13",
    status: "reviewed",
    summary:
      "Solar kiosk pilot for 5 communities. Expected ROI in 18 months and local jobs creation.",
    attachments: [{ name: "BusinessPlan.pdf", url: "#" }],
    notes: "Send technical evaluator",
    location: { lat: 9.08, lng: 7.45 },
  },
];
