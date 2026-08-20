export const fetchDashboardData = async () => {
  // TODO: Replace with actual Spring Boot API call later
  // return await axios.get('/api/v1/rm/dashboard');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        kpis: {
          totalClients: { value: 128, change: 8, isPositive: true },
          totalAum: { value: "₹245.67 Cr", change: "5.4%", isPositive: true },
          totalInvested: { value: "₹210.35 Cr", change: "6.1%", isPositive: true },
          totalReturns: { value: "₹35.32 Cr", change: "7.3%", isPositive: true }
        },
        assetAllocation: [
          { label: 'Equity', percentage: 56, color: '#2563eb' },
          { label: 'Debt', percentage: 24, color: '#8b5cf6' },
          { label: 'Mutual Funds', percentage: 12, color: '#3b82f6' },
          { label: 'Fixed Deposits', percentage: 6, color: '#f59e0b' },
          { label: 'Others', percentage: 2, color: '#9ca3af' }
        ],
        holdingsSummary: {
          highestHolding: "₹18.75 Cr",
          avgHolding: "₹1.92 Cr",
          newClientsThisMonth: 7,
          clientsNeedingAttention: 12
        },
        topClients: [
          { id: 'C001', name: 'Amit Verma', aum: '₹18.75 Cr', returns: '6.2%', isPositive: true },
          { id: 'C002', name: 'Priya Shah', aum: '₹12.40 Cr', returns: '5.1%', isPositive: true },
          { id: 'C003', name: 'Neha Iyer', aum: '₹10.10 Cr', returns: '4.9%', isPositive: true }
        ],
        actionItems: [
          "12 clients have upcoming FD maturity",
          "8 clients need portfolio review",
          "5 pending statements to send"
        ]
      });
    }, 500); // Simulate network delay
  });
};
