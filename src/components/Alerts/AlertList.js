import React, { useState, useEffect } from 'react';
import { getAlerts } from '../../services/alertService';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    highValue: false,
    dueDate: '',
  });

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

  const fetchAlerts = async () => {
    const fetchedAlerts = await getAlerts(filters);
    setAlerts(fetchedAlerts);
  };

  return (
    <div>
      <h2>Alerts</h2>
      {/* Add filter controls here */}
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>
            {alert.title} - {alert.type} - {alert.location}
            {/* Add more alert details and action buttons */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;