export async function getNotifications() {
  // Mocked notifications data
  return [
    { id: 1, message: "New investor match: Acme Ventures" },
    { id: 2, message: "Completed module: 'Perfecting Your Pitch'" },
    { id: 3, message: "Received funding: $50K from Seed Fund" },
    { id: 4, message: "Milestone achieved: 1,000 users" },
  ]
}
