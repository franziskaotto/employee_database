Here are the corrected and refined versions of the exam tasks:

## Task 1:

- Enhance the storage/data model by incorporating a 'Company' object. This object should minimally store the company's name as a string.
- Pre-populate the database with 3-4 companies, provided as JSON data.
- Implement functionality to create new companies via a form accessible from the frontend.
- Add a 'Create Company' link to the navigation bar for easy access to the company creation page.
- When editing an employee's details, provide an option to associate them with an existing company from a dropdown list.
- Ensure that this additional information (company association) is persistently saved in the database upon form submission.

## Task 2:

- Modify the database to accommodate a “positions” document model. Each position should include a name, a salary, and an auto-generated MongoDB ID. Use the provided JSON structure for reference.
```json
[
  { "name": "Main Actor", "salary": 1200 },
  { "name": "Comic Relief", "salary": 1000 },
  { "name": "Love Interests", "salary": 1500 },
  { "name": "Protagonist", "salary": 2000 },
  { "name": "Antagonist", "salary": 2100 },
  { "name": "Operatour", "salary": 1000 },
  { "name": "Director", "salary": 3200 },
  { "name": "Joker", "salary": 600 },
  { "name": "Superhero", "salary": 1500 }
]
```
- Update the 'populate.js' file to include these positions in the MongoDB.
- Create a new page in the React frontend for displaying the stored positions.
- Modify employee forms, replacing the position text field with a dropdown menu for position selection.
- The employee document d*oesn't need to store the salary, just the position name. Optionally, the entire position document can be included in the employee document.

## Task 3:

- Introduce a work log array in the employee documents, comprising two fields: working hours (number) and a work label (string), e.g., acting, resting, filling the worklog.
- Update 'populate.js' to initialize an empty work log array for each employee.
- Develop a page for adding work log entries for a chosen employee. This can be a modification of an existing route or a new route.
- Implement a page to display work log entries for a selected employee. This component or view can be integrated into the update view or a previous view.


## Task 4:

- Alter the 'level' field in the employee document to accept numerical values instead of strings. The levels are represented as follows: `{ "Junior": 1, "Medior": 2, "Senior": 3, "Expert": 4, "Godlike": 5 }`.
- Revise the 'populate.js' file to generate levels as numbers, not strings.
- Enhance the EmployeesList on the frontend with a sorting feature to organize employees by their level.
- Add a filter to the EmployeesList enabling users to search for employees by a specific level. Display levels as text to the user, not numbers.
- Note: Modifying and creating employee forms with the new number-based level field is not required for this task.

## Task 5:

- Add a 'Notes' button to each employee's profile. Clicking this button should redirect to a new route: “/employee/:employeeId/notes/”. This route will display all notes associated with a specific employee, where each note is text-based.

- Ensure the employee document in the database includes a field to store notes.

- Manually add a note to the database using a tool like MongoDB Compass.


- Incorporate a text input field and a button on the notes page to facilitate the creation of new notes for the employee. Implement a separate server endpoint for adding notes. Newly added notes should automatically appear in the list.