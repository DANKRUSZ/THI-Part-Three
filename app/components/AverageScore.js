'use client';
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";

export default function AverageScore({ filteredData}) {

    // Calculate average score from filtered data
    let totalScore = 0;
    let scoreCount = 0

    filteredData.forEach(row => {
        if (row.score && row.score !== '') {
        totalScore += Number(row.score);
        scoreCount += 1
        }
    })
    
    const averageScore = scoreCount > 0 ? (totalScore / scoreCount).toFixed(1) : 0;


    let scoreColour;
    const scoreValue = parseFloat(averageScore);

    if (scoreValue >= 8) {
        scoreColour = 'rgba(34, 197, 94, 1)';
    } else if (scoreValue >= 6) {
        scoreColour = 'rgba(250, 204, 21, 1)';
    } else {
        scoreColour = 'rgba(239, 68, 68, 1)';
    }

    const fadedColour = scoreColour.replace(', 1)', ', 0.2');

    // // Object to store counts
    // const scoreCounts = {
    //     1: 0,
    //     2: 0,
    //     3: 0,
    //     4: 0,
    //     5: 0,
    //     6: 0,
    //     7: 0,
    //     8: 0,
    //     9: 0,
    //     10: 0
    // }

    // // Loop through filtered data, increase count for scores
    // filteredData.forEach(row => {
    //     if (row.score && row.score !== '') {
    //         const score = Number(row.score);
    //         scoreCounts[score] += 1;
    //     }
    // });



    const chartData = {
        labels: ['Score', 'Remaining'],
        datasets: [{
            data: [
                scoreValue,
                10 - scoreValue
            ],
            backgroundColor: [
                scoreColour,
                fadedColour,
            ],
            borderWidth: 0,
        }]
    };


    const options = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            }
        },
        tooltip: {
            enabled: false
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-sm mb-2 text-center">Average Score</p>
          <div className="relative h-40">
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-gray-800">{averageScore}</p>
            </div>
          </div>
        </div>
      );
}

