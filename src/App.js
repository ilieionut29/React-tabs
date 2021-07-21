import React, { useEffect, useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [userJobs, setUserJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getUserJobs();
  }, []);

  const getUserJobs = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setUserJobs(jsonData);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <section className="section loading">
        <h1>jobs loading ...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = userJobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {userJobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => {
                  setValue(index);
                }}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaChevronCircleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
}

export default App;
