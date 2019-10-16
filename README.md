# Crud node with express

## Routes

POST /projects: The route must be given id and title within the body of registering a new project within an array in the following format: {id: "1", title: 'New project', tasks: []};

GET '/projects' : Route that lists all projects and their tasks;

PUT '/projects/:id': The route should only change the project title with the id present in the route parameters;

DELETE '/projects/:id': The route must delete the project with the id present in the route parameters;

POST '/projects/:id/tasks': The route must be given a title field and store a new task in the task array of a specific project chosen through the id present in the route parameters;

## Middlewares

- Check if the project already exists for calls with the route ('project /: id')
- That has a count of how many requests have been made in the application so far;
