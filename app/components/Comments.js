'use client';

export default function Comments({ filteredData}) {
    
    // Filter to only rows that have comments
    const commentsData = filteredData.filter(row => {
        if (row.comments && row.comments !== '') {
            return true;
        }
        return false;
    })



    return (
        <div className="bg-white p-7 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Comments ({commentsData.length})
            </h3>

            <div className="max-h-96 overflow-y-auto space-y-3">
                {commentsData.map((row, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3">
                        <p className="text-gray-800">
                            {row.comments}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {/* This was tricky to figure out, should show parent question first for "Open Questions",
                            Otherwise it should get the category from wuestion text for the parent class. */}
                            Category: {row.parent_question || row.question_text} 
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}