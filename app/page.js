'use client';
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import ScoreChart from "./components/ScoreChart";
import Comments from "./components/Comments";
import AverageScore from "./components/AverageScore";

export default function Dashboard() {

  // Initial state for filters, makes resetting easier
  const initialState = {
    location: '',
    department: '',
    startYear: '',
    category: ''
  }

  // Store survey data
  const [ data, setData ] = useState([]);
  // Loading state for while data loads
  const [ loading, setLoading ] = useState(true);
  //Filter state to store users current selection
  const [ filters, setFilters] = useState(initialState);
  // Set temp filters for submit
  const [ tempFilters, setTempFilters] = useState(initialState)

  
  useEffect(() => {

    fetch('/data/survey-data.json')

    .then(res => res.json())

    .then(jsonData => {
      setData(jsonData);
      setLoading(false);
      console.log('Data loaded: ', jsonData.length, 'rows');
    })
    // handle errors if fetch fails
    .catch(error => {
      console.error('Error loading data:', error);
      setLoading(false);
    });
  }, []); // Empty array runs once only


  const filteredData = data.filter(row => {
    // If location filter is and row doesnt match, exclude it
    if (filters.location && row.Location !== filters.location) {
      return false;
    }

    // if department filter is set and row doesnt match, exclude
    if (filters.department && row.Dept !== filters.department) {
      return false;
    }

    // If startyear filter is set and row doesnt match, exclude
    if (filters.startYear && row.Start_Year !== filters.startYear) {
      return false;
    }
    // category = parent_question on survey OR QUESTION_TEXT!!!!! 
    if (filters.category && row.parent_question !== filters.category && row.question_text !== filters.category) {
      return false;
    }

    // All filters passed or no filters set
    return true;
  });


  // Count unique voter ids from filtered data
  const uniqueVoterIds = [];
  filteredData.forEach(row => {
    if (!uniqueVoterIds.includes(row.voter_id)) {
      uniqueVoterIds.push(row.voter_id);
    }
  });
  const uniqueResponses = uniqueVoterIds.length;


  // Calculate average score from filtered data
  let totalScore = 0;
  let scoreCount = 0

  filteredData.forEach(row => {
    if (row.score && row.score !== '') {
      totalScore += Number(row.score);
      scoreCount += 1
    }
  })
  // Return average to one decimal, 0 if scorecount is 0
  const averageScore = scoreCount > 0 ? (totalScore / scoreCount).toFixed(1) : 0;


  // Count rows with comments
  let commentCount = 0;

  filteredData.forEach(row => {
    if(row.comments && row.comments !== '') {
      commentCount += 1;
    }
  })

  //
  const applyFilters = () => {
    setFilters(tempFilters);
  }

  const resetFilters = () => {
    setFilters(initialState);
    setTempFilters(initialState);
  }


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Cultural Assessment Dashboard
      </h1>

      <Filter 
        data={data} 
        filters={tempFilters} 
        setFilters={setTempFilters} 
        applyFilters={applyFilters} 
        resetFilters={resetFilters} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
  
        
        <div className="lg:col-span-2">
          <ScoreChart filteredData={filteredData} />
        </div>
        
        
        <div className="lg:col-span-1 space-y-4">
          <AverageScore filteredData={filteredData} />
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-2">Number of survey participants:</p>
            <p className="text-3xl font-bold text-blue-600">{uniqueResponses}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-2">Total comments:</p>
            <p className="text-3xl font-bold text-blue-600">{commentCount}</p>
          </div>
        </div>
      </div>
      
      <Comments filteredData={filteredData} />
      
      
    </div>
  )
}