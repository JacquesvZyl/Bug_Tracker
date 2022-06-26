import React from "react";

function Team() {
  return (
    <table className={styles.projects}>
      <tr>
        <th>NAME</th>
        <th>EMAIL</th>
      </tr>
      {props.data.map((project) => {
        return (
          <tr key={project.id}>
            <td>{project.projectName}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default Team;
