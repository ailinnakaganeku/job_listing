import { useState, useEffect } from "react";
import { read, utils } from "xlsx";
import JobList from "./components/JobList";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Jobs.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        const jobData = jsonData.slice(1).map((row, index) => ({
          id: index + 1,
          title: row[0],
          company: row[1],
          category: row[2],
          url: row[3],
          seniority: row[4],
          logo: row[5],
        }));

        setJobs(jobData);
        setFilteredJobs(jobData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading job data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    const filtered = jobs.filter((job) =>
      [job.title, job.company, job.category, job.seniority].some((field) =>
        field.toLowerCase().includes(searchTerm)
      )
    );

    setFilteredJobs(filtered);
  };

  return (
    <div className="mx-auto p-4 min-h-screen text-white bg-gray-900 w-full space-y-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-gray-500 rounded-md py-2 px-4 w-full bg-gray-800 text-white"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredJobs.length > 0 ? (
        <JobList jobs={filteredJobs} />
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default App;
