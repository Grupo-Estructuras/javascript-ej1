
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: abcisa,
    datasets: [{
      label: 'Apariciones por lenguage',
      data: ordenada,
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }]
  },
  options: {scales: {y: {beginAtZero: true}}}
});
