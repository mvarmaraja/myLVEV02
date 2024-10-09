import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAlertDetails } from '@/services/alertService'
import { Container, Typography, Button, Card, CardContent, List, ListItem, ListItemText } from '@mui/material'
import Link from 'next/link'

export default function AlertDetail() {
  const router = useRouter()
  const { id } = router.query
  const [alert, setAlert] = useState<any>(null)

  useEffect(() => {
    if (id) {
      fetchAlertDetails()
    }
  }, [id])

  const fetchAlertDetails = async () => {
    const alertDetails = await getAlertDetails(id as string)
    setAlert(alertDetails)
  }

  if (!alert) return <Typography>Loading...</Typography>

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Alert Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {alert.title}
          </Typography>
          <Typography color="text.secondary">
            {alert.type} - {alert.location}
          </Typography>
          <Typography variant="body1" paragraph>
            {alert.description}
          </Typography>
          <Typography variant="h6">AI-Generated Summary</Typography>
          <Typography variant="body1" paragraph>
            {alert.aiSummary}
          </Typography>
          <Typography variant="h6">Related Data</Typography>
          <List>
            {alert.relatedData.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Referenced Items</Typography>
          <List>
            {alert.referencedItems.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Referenced People</Typography>
          <List>
            {alert.referencedPeople.map((person: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={person} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Link href="/alerts">
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Back to Alerts
        </Button>
      </Link>
    </Container>
  )
}