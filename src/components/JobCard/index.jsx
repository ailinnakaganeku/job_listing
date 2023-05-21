import PropTypes from "prop-types";

const JobCard = ({ job }) => {
  return (
    <div className="bg-gray-700 bg-opacity-40 rounded-lg shadow-md p-6 text-white space-y-2">
      <div className="flex items-center space-x-2">
        <div className="bg-transparent text-green-500 border border-green-500 rounded-full py-1 px-3 text-sm">
          {job.seniority}
        </div>
        <div className="bg-transparent text-blue-500 border border-blue-500 rounded-full py-1 px-3 text-sm">
          {job.category}
        </div>
      </div>
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-400">{job.company}</p>
      <div className="flex items-center justify-end space-x-4">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500	py-2 px-4 rounded-lg font-medium text-white"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    seniority: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }),
};

export default JobCard;
