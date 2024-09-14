import ReactEcharts from 'echarts-for-react';

const TemperatureChart = ({ groupName, groupData }) => {
  const currentValue = groupData.length > 0 ? groupData[groupData.length - 1].value : 0;
  const yAxisMin = currentValue - 20 > 0 ? currentValue - 20 : 0;
  const yAxisMax = currentValue + 20;

  const options = {
    title: { text: `${groupName} Sıcaklık Grafiği` },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: groupData.map(d => d.timestamp),
    },
    yAxis: {
      type: 'value',
      min: yAxisMin,
      max: yAxisMax,
    },
    series: [{
      name: 'Sıcaklık',
      type: 'line',
      data: groupData.map(d => d.value),
      label: { show: true, position: 'top', formatter: '{c}' },
      itemStyle: { color: '#ff0000' },
    }],
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <ReactEcharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default TemperatureChart;
