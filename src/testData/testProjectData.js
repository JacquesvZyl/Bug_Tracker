export const testProjectData = [
  {
    projectName: "TestName",
    projectDescription:
      "This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description",
    projectContributers: ["John Daly", "Jacques van Zyl"],
    id: 0,
    tickets: [
      {
        id: 0,
        title: "test ticket",
        description: "Test ticket description",
        author: "Jacques van Zyl",
        status: "resolved", //resolved, pending, new, in progress,
        type: "issue", //issue, bug
        priority: 1, //1,2,3
        timeEstimate: 8, //in hours
        assigned: ["jacques van Zyl", "John Daly"], //who is it assigned to
        comments: [
          {
            author: "Jacques van Zyl",
            comment: "This is a test comment",
            date: "19 Jun 2022",
          },
        ],
      },
    ],
  },
  {
    projectName: "Portfolio website",
    projectDescription: "Portfolio website for Jacques van Zyl",
    projectContributers: ["Jacques van Zyl"],
    id: 1,
    tickets: [
      {
        id: 0,
        title: "Add clippy",
        description: "Clippy needs to be implemented",
        author: "Jacques van Zyl",
        status: "pending", //resolved, pending, new, in progress,
        type: "issue", //issue, bug
        priority: 1, //1,2,3
        timeEstimate: 8, //in hours
        assigned: ["jacques van Zyl", "John Daly"], //who is it assigned to
        comments: [
          {
            author: "Jacques van Zyl",
            comment: "This is a test comment",
            date: "19 Jun 2022",
          },
          {
            author: "John Doe",
            comment:
              "This is another test comment, but longer than the rest because I want to test spacing on longer sentences. Let's hope it looks OK",
            date: "19 Jun 2022",
          },
        ],
      },
      {
        id: 1,
        title: "BG color",
        description: "BG color needs to be changed from blue to black",
        author: "Jacques van Zyl",
        status: "pending", //resolved, pending, new, in progress,
        type: "issue", //issue, bug
        priority: 1, //1,2,3
        timeEstimate: 8, //in hours
        assigned: ["jacques van Zyl", "John Daly"], //who is it assigned to
        comments: [
          {
            author: "Jacques van Zyl",
            comment: "This is a test comment",
            date: "19 Jun 2022",
          },
        ],
      },
    ],
  },
];
