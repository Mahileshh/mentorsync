import { useState } from "react";

function MenteesList({ showAdd = true }) {
  const [mentees, setMentees] = useState([
    "Student A",
    "Student B",
    "Student C",
  ]);

  const addMentee = () => {
    const name = prompt("Enter mentee name:");
    if (name && name.trim() !== "") {
      setMentees([...mentees, name]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Mentees List</h3>

        {showAdd && (
          <button
            onClick={addMentee}
            className="w-8 h-8 flex items-center justify-center
                       bg-blue-500 text-white rounded-full
                       hover:bg-blue-600"
          >
            +
          </button>
        )}
      </div>

      <ul className="list-disc pl-5 space-y-2">
        {mentees.map((mentee, index) => (
          <li key={index}>{mentee}</li>
        ))}
      </ul>
    </div>
  );
}

export default MenteesList;
