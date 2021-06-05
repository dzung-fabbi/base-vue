<script>
import { Line } from "vue-chartjs";
export default {
  name: "LineChart",
  extends: Line,
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderLineChart: function() {
      this.renderChart(
        {
          labels: ['1', '5', '10', '15', '20', '25', '30'],
          datasets: [
            {
              label: '',
              fill: false,
              stack: 'line',
              lineTension: 0,
              borderColor: '#3b3b3b',
              data: this.chartData
            }
          ]
        },
        { 
          responsive: true, 
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }
      );
    }
  },
  watch: {
    data: function() {
      this.renderLineChart();
    }
  }
};
</script>

<style scoped>
#line-chart {
  height: 500px !important;
}
</style>
