'use client';

export default function Filter({data, filters, setFilters, applyFilters, resetFilters}) {
    // Get unique locations from data
    const locations = [];
    data.forEach(row => {
        if (!locations.includes(row.Location)) {
            locations.push(row.Location)
        }
    });

    locations.sort();

    // Get unique departments
    const departments = [];
    data.forEach(row => {
        if (!departments.includes(row.Dept)) {
            departments.push(row.Dept)
        }
    });

    departments.sort();

    // Get start years
    const startYears = [];
    data.forEach(row => {
        if (!startYears.includes(row.Start_Year)) {
            startYears.push(row.Start_Year)
        }
    });

    startYears.sort();

    // Get categories ( parent_question ), check isnt empty
    const categories = [];
    data.forEach(row => {
        if(row.parent_question && !categories.includes(row.parent_question)) {
            categories.push(row.parent_question)
        }
    });

    categories.sort()


    // Functions to handle change 
    // Spread operator keeps existing filters
    const handleLocationChange = (e) => {
        setFilters({...filters, location: e.target.value});
    }

    const handleDepartmentChange = (e) => {
        setFilters({...filters, department: e.target.value});
    }

    const handleStartYearChange = (e) => {
        setFilters({...filters, startYear: e.target.value});
    }

    const handleCategoryChange = (e) => {
        setFilters({...filters, category: e.target.value});
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter Survey Data</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
                {/* Location Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                    </label>
                    <select
                    value={filters.location}
                    onChange={handleLocationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:cursor-pointer"
                    >
                    <option value="">All Locations</option>
                    {/* Learned: how to map through data in this style */}
                    {locations.map(location => (
                        <option key={location} value={location}>
                        {location}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Department Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                    </label>
                    <select
                    value={filters.department}
                    onChange={handleDepartmentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:cursor-pointer"
                    >
                    <option value="">All Departments</option>
                    {departments.map(department => (
                        <option key={department} value={department}>
                        {department}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Start Year Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Year
                    </label>
                    <select
                    value={filters.startYear}
                    onChange={handleStartYearChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:cursor-pointer"
                    >
                    <option value="">All Start Years</option>
                    {startYears.map(startYear => (
                        <option key={startYear} value={startYear}>
                        {startYear}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                    </label>
                    <select
                    value={filters.category}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:cursor-pointer"
                    >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                    ))}
                    </select>
                </div>

            </div>
            {/* Filter Buttons */}
            <div className="mt-4 flex justify-end gap-3">
                <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                >
                Reset Filters
                </button>
                <button
                    onClick={applyFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer"
                >
                    Apply Filters
                </button>
            </div>

        </div>
    )
}