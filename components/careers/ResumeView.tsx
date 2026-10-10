import type { ResumeData } from "@/lib/sampleResumes";

export default function ResumeView({ resume }: { resume: ResumeData }) {
  return (
    <div className="resume-page">
      <h1 className="resume-name">{resume.name}</h1>
      <p className="resume-contact">
        {resume.contact.map((part) => (
          <span key={part}>{part}</span>
        ))}
      </p>

      <h2>Summary</h2>
      <p className="resume-summary">{resume.summary}</p>

      <h2>Skills</h2>
      <ul className="resume-skills">
        {resume.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      {resume.tools && (
        <p className="resume-tools">
          <strong>Tools: </strong>
          {resume.tools}
        </p>
      )}

      {resume.sections.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          {section.entries.map((entry, i) => (
            <div className="resume-entry" key={entry.left ?? entry.lead ?? i}>
              {entry.lead && <p className="resume-lead">{entry.lead}</p>}
              {entry.left && (
                <p className="resume-entry-line">
                  <span>{entry.left}</span>
                  {entry.right && <span className="resume-date">{entry.right}</span>}
                </p>
              )}
              {entry.sub && <p className="resume-entry-sub">{entry.sub}</p>}
              {entry.bullets && entry.bullets.length > 0 && (
                <ul className="resume-bullets">
                  {entry.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
