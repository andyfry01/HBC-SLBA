function buildChart() {
	var ctx = document.getElementById('comprehensiveReviewChart').getContext('2d');

	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'doughnut',
		// The data for our dataset
		data: {
			labels: chartLabels,
			datasets: [{
				label: "Program Components",
				backgroundColor: chartColors,
				data: chartSectionSizes,
			}]
		},

		// Configuration options go here
		options: {
			resonsive: true,
			// legend: {
			// 	display: true,
			// 	labels: {
			// 		fontColor: 'black',
			// 		fontSize: 20
			// 	}
			// },
      // tooltips: {
      //   bodyFontSize: 20
      // }
		}
	});

}
