'use client';
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

export default function ScoreChart({ filteredData }) {

    // Object to store counts
    const scoreCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0
    }

    // Loop through filtered data, increase count for scores
    filteredData.forEach(row => {
        if (row.score && row.score !== '') {
            const score = Number(row.score);
            scoreCounts[score] += 1;
        }
    });


    // Prepare data for chart
    const labels =[1,2,3,4,5,6,7,8,9,10];
    const data = [];
    labels.forEach(num => {
        data.push(scoreCounts[num])
    }  );


    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Number of Responses',
            data: data,
            backgroundColour: 'rgba(59, 130, 246, 0.5)',
        }]
    }

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Number of Responses'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Score (1-10)'
                }
            }
        }
    };

    return (
        <div>
            <Bar data={chartData} options={options}/>
        </div>
    );
}