import { useEffect, useState } from 'react';
import axios from 'axios';
import TemperatureChart from '../components/TemperatureChart';

const groupNames = ['A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20', 'A21', 'A22', 'GRS BACA'];

export default function Home() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        const html = new DOMParser().parseFromString(response.data, 'text/html');
        const rows = html.querySelectorAll('tr');
        const newData = Array.from(rows).map(row => {
          const name = row.querySelector('span')?.innerText;
          const value = parseFloat(row.cells[1]?.innerText);
          return { name, value, timestamp: new Date().toLocaleTimeString() };
        }).filter(d => d.name && !isNaN(d.value));

        const updatedData = { ...data };

        newData.forEach(({ name, value, timestamp }) => {
          if (!updatedData[name]) {
            updatedData[name] = [];
          }
          updatedData[name].push({ value, timestamp });

          if (updatedData[name].length > 100) { 
            updatedData[name].shift();
          }
        });

        setData(updatedData);
      } catch (error) {
        setError('Error fetching data.');
      }
    };

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <div>
      <h1>Fırın Sıcaklık Değerleri</h1>
      {error ? <p>{error}</p> : groupNames.map(groupName => (
        <TemperatureChart key={groupName} groupName={groupName} groupData={data[groupName] || []} />
      ))}
    </div>
  );
}
