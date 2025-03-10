export default async function handler(req, res) {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Fetch user data based on the session token
  const user = await getUserFromSession(sessionToken);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Return user data
  res.status(200).json({ user });
}
