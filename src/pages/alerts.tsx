import { useState, useEffect } from 'react'
import { getAlerts } from '@/services/alertService'
import { generateNextBestActions } from '@/services/aiService'
import { Container, Typography, Card, CardContent, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'

export default function AlertList() {
  const [alerts, setAlerts] = useState([])
  const [filteredAlerts, setFilteredAlerts] = useState([])
  const [filter, setFilter] = useState('')
  const [prompt, setPrompt] = useState('')
  const [actions, setActions] = useState([])

  useEffect(() => {
    fetchAlerts()
  }, [])

  useEffect(() => {
    setFilteredAlerts(
      alerts.filter((alert: any) =>
        alert.title.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter, alerts])

  const fetchAlerts = async () => {
    const fetchedAlerts = await getAlerts()
    setAlerts(fetchedAlerts)
    setFilteredAlerts(fetchedAlerts)
  }

  const handleGenerateActions = async () => {
    if (filteredAlerts.length > 0) {
      const currentAlert = filteredAlerts[0]
      const newActions = await generateNextBestActions('alert', currentAlert.id, prompt)
      setActions([...actions, ...newActions])
    }
  }

  const handleDeleteAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index))
  }

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Alerts
      </Typography>
      <TextField
        fullWidth
        label="Filter Alerts"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
      />
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {filteredAlerts.map((alert: any) => (
          <SwiperSlide key={alert.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {alert.title}
                </Typography>
                <Typography color="text.secondary">
                  {alert.type} - {alert.location}
                </Typography>
                <Link href={`/alerts/${alert.id}`}>
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <TextField
        fullWidth
        label="Enter prompt for next best actions"
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleGenerateActions}>
        Generate Next Best Actions
      </Button>
      <List>
        {actions.map((action, index) => (
          <ListItem key={index}>
            <ListItemText primary={action} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAction(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}