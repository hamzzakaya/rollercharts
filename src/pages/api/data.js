import axios from 'axios';

export default async function handler(req, res) {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.123/RemoteMon',
  });

  // Yeni PHPSESSID her oturumda oluşturuluyor
  axiosInstance.defaults.headers.common['Cookie'] = 'PHPSESSID=a208c549a28ffeadfec4a81e0abad08e'; // Bu değer login sonrası değişebilir

  try {
    const response = await axiosInstance.get('/Data/1.php', {
      params: { _: new Date().getTime() },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
}
