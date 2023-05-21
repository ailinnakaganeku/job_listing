import PropTypes from "prop-types";
import JobCard from "../JobCard";

const JobList = ({ jobs }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      seniority: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    })
  ),
};

export default JobList;
