import { useState, useEffect } from 'react'
import { auth } from '@/config/firebase'
import { Container, Typography, Box } from '@mui/material'

export default function UserProfile() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  if (!user) return <Typography>Loading...</Typography>

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">UID: {user.uid}</Typography>
      </Box>
    </Container>
  )
}