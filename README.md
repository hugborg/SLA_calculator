# SLA calculator for gas engineers 🛠️

This repository contains code and documentation for Summative One assessment in Software Engineering. 
Created by Hugborg Hudson.

---
## 1. Product Proposal ✨
The SLA Calculator is a lightweight, browser-based tool designed to help gas engineers quickly determine whether they attended a gas leak callout within their required Service Level Agreement (SLA) window.

When attending a gas leak callouts, engineers are required to arrive within a set timeframe determined by the nature of the leak. These timeframes, defined under GSMR (Gas Safety Management Regulations), vary depending on whether the leak is classified as Controlled, Unccontrolled, or Priority. Currently, determining SLA compliance requires manually calculating the difference between the time a call was received and the time of arrival, then comparing it against the relevant target. This process is error-prone, time consuming, and adds unnecessary pressure in an already high stakes environment.

The SLA Calculator removes the mental arithmetic entirely. Then engineer selects the leak, type, inputs the time the call was received, and inputs their arrival time. The app instantly calculates whether they arrived within the SLA timeframe, displays the time taken to arrive onsite, and shows the exact deadline they are working towards for turning off the leak. The result is a clear, unambiguous compliance status, either within or outside the SLA.

This tool is intended for gas engineers and their supervisors who need a fast, reliable way to check or record SLA compliance during or after attending a callout. It is designed to work on any device, phone, tablet or desktop with no installation required.

The app is built using HTML, CSS, and JavaScript. This keeps it entierly dependency-free, accessible from any browser, and simple to maintain. No backend or database is needed for the MVP, as the tool performs all calculations client side.

## 2. Design and Prototype 🎨

### Wireframe

Before any code was written, an initial wireframe was produced to map out the structure and layout of the SLA Calculator. This helped clarify the user flow and identify the key inputs and outputs needed for the MVP.

![Image showing the wireframe for the project](SLA_calculator_wireframe.png)

*Figure One: Showing the wireframe for the App Layout*
    
The wireframe outlines the core layout of the SLA Calculator. A dropdown at the top allows the engineer to select the leak type, followed by two date and time input pairs for the call received and arrival times. The results section at the bottom dynamically displays the compliance status, time taken, and GSMR target deadline. A clear form button allows the engineer to reset all fields quickly.
    
### Prototype

Following the wireframe, a high-fidelity prototype was built in Figma to visualise the final look and feel of the application before development began. The prototype demonstrates the intended user flow, from selecting 
a leak type through to receiving a compliance result.

![Gif showing the flow through the prototype created in Figma](SLA_calculator_prototype.gif)

*Figure Two: Showing the gif of the prototype for the App functionality*
 
The prototype builds on the wireframe by applying visual styling and simulating interactions, including the dynamic display of the SLA result. This allowed the design to be reviewed and refined before writing any code, 
reducing the risk of layout changes during development.

### Design Decisions

- **Simplicity First:** The layout is intentionally minimal. Engineers use this tool quickly, often in the field, so a clean single-page design with no navigation was prioritised.
- **Clear result visibility:** The complicance result is displayed prominently below the inputs so the outcome is immediately obvious without scrolling.
- **Mobile Friendly layout:** The form is structured vertically to work naturally on both mobile and desktop devices.

## 3. Project Management📅

This project was managed using an Agile methodology, broken down into three sprints. Each sprint had a defined set of goals, allowing the project to be built incrementally and reviewed at each stage before moving forward. This approach kept development focused and made it easier to identify and address issues early before progressing to the next phase.

### Tool - GitHub Projects

GitHub Projects was used as the project management tool throughout development. It was chosen because it integrates directly with the repository, meaning issues, branches, and pull requests are all visible in one place without needing to switch between tools. 

The board was structured using the following columns:
| Column | Purpose |
|---|---|
| Backlog | Tasks identified but not yet ready to start |
| Ready | Tasks fully defined and ready to be picked up |
| In Progress | Tasks actively being worked on |
| Done | Fully completed and merged tasks |

The screenshot below shows the board at the start of Sprint 2, with Sprint 1 completed and all build tickets loaded into the Ready column.

![Project Board](SLA_calculator_project_board.png)

*Image Three: Showing a screenshot of the project board*

### Sprints

**Sprint 1 — Discovery & Design**

The first sprint focused on understanding the problem, defining the 
requirements, and producing the visual design before any code was written.

- #1 Define Requirements — inputs, outputs, SLA rules
- #2 Sketch wireframe of the UI layout in Figma
- #3 Design the UI with CSS layout, colours, pass/fail indicators in Figma

**Sprint 2 — Build**

The second sprint covered the full development of the MVP, building the 
HTML structure first, then applying styling, and finally implementing all 
interactive functionality.

- #4 Set up HTML structure — form inputs and results panel
- #5 Style the UI with CSS
- #10 Implement leak type dropdown
- #11 Add date and time pickers
- #12 Write SLA calculation logic
- #13 Display results dynamically
- #14 Implement clear form button

**Sprint 3 — Testing, CI/CD & Documentation**

The third sprint focused on quality assurance, automated testing, and 
completing all documentation.

- #15 Write unit tests for SLA logic
- #16 Set up GitHub Actions CI/CD
- #17 Write user documentation
- #18 Write technical documentation

## 4. Requirements / Tickets 🎫

### Functional Requirements 

The following table captures the functional requirements for the SLA Calculator MVP. Each requirement describes what the application must do from the user's perspective.

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The user must be able to select a gas leak type (Controlled, Uncontrolled, Priority) | High |
| FR-02 | The user must be able to input the date and time the call was received | High |
| FR-03 | The user must be able to input the date and time they arrived on site | High |
| FR-04 | The app must calculate the time difference between call received and arrival | High |
| FR-05 | The app must compare the calculated time against the GSMR target for the selected leak type | High |
| FR-06 | The app must display whether the engineer arrived within or outside the SLA | High |
| FR-07 | The app must display the time taken and the GSMR target deadline | Medium |
| FR-08 | The user must be able to clear all inputs and reset the form | Medium |
| FR-09 | The app must be usable on both mobile and desktop devices | Medium |

### Non-Functional Requirement

The following table captures the non-functional requirements.

| ID | Requirement |
|---|---|
| NFR-01 | The app must run entirely in the browser with no backend or installation required |
| NFR-02 | The app must produce a result instantly upon all inputs being completed |
| NFR-03 | The codebase must include unit tests for the core calculation logic |
| NFR-04 | The project must use CI/CD to run tests automatically on every push |

### SLA Rule Reference

| Leak Type | GSMR Target |
|---|---|
| Priority | 1 hour |
| Uncontrolled | 1 hour |
| Controlled | 2 hours |

### Tickets

All tickets are managed on the [GitHub Projects board](https://github.com/users/hugborg/projects/2/views/1). Each ticket represents a single feature or task, correspond to branches that are merged via pull requests. The tickets are organised into the following types:

| Prefix | Type | Description |
|---|---|---|
| `[Discovery]` | Discovery | Research, planning and design tasks |
| `[Design]` | Design | UI and visual design tasks |
| `[Build]` | Build | Development and implementation tasks |
| `[Test]` | Test | Testing and quality assurance tasks |
| `[DevOps]` | DevOps | CI/CD and infrastructure tasks |
| `[Docs]` | Documentation | User and technical documentation tasks |

## 5. Build Narrative

This section documents the step by step process of building the SLA Calculator MVP, from the initial HTML structure through to a fully functional application.

### Step 1 - HTML Structure

The build began with the HTML skeleton, establishing the core structure of the application before any styling or logic was added. This included the header, the calculator card, all form inputs, the results panel, and the clear form button. The results panel was given a 'hidden' attribute by default so it would only appear once a valid calculation has been made. Separate files for style.css and script.js were also scaffolded at this stage, with section comments mapping to each upcoming ticket to keep development organised.

### Step 2 - CSS Styling

With the structure in place, styling was applied to match the Figma prototype. CSS variables were defined at the root level for the colour palette, making future changes straightforward. The dark navy was used for the header and clear button, with a light blue border on the calculator card and a light grey page background, all taken from the Figma design.

IBM Plex Mono was chosen as the font via Google Fonts, matching the monospace style used in the prototype while being more legible on screen than a default system monospace font.

Colour blind accessibility was considered at this stage, the SLA result status uses orange-red rather than pure red for the fail state, ensuring it is distinguishable for users with red/green colour blindness. Both pass and fail states also use a ✔ or ✖ icon alongside the colour so the result is never conveyed by colour alone.

### Step 3 - Leak Type Dropdown

The first piece of JavaScript functionality added the leak type dropdown. The SLA_RULES object was defined to map each leak type to its SLA limit in minutes, Priority and Uncontrolled at 60 minutes and Controlled at 120 minutes. All DOM references were established at this stage so they would be available to all subsequent functions without repetition.

### Step 4 - Date and Time Pickers

Date and time inputs were wired up for both the call received and arrival fields. A central checkAndCalculate() function was introduced as the controller for the entire form, called whenever any input changes. The function checks whether all fields are filled before triggering validation and calculation. Validation was added to handle two error states: arrival time earlier than call received time, and arrival time identical to call received time. Both display a clear error message in the results panel.

### Step 5 - SLA Calculation Logic

The core calculation logic was implemented across three helper functions. getTimeDifferenceInMinutes() calculates the gap between two timestamps. formatMinutesToHHMM() converts the result into a readable hh:mm format. formatDateToDDMMYYYY() formats the GSMR deadline ito the dd/mm/yyyy hh:mm format shown in the wireframe. The calculateSLA() function ties these together, determining compliance and packaging the results for display.

### Step 6 — Display Results Dynamically

The displayResults() function was added to update the DOM with the calculated results. The results panel is revealed, the status element is given either a within or outside CSS class to apply the appropriate styling, and the time taken and GSMR deadline are populated. The result updates automatically whenever any input changes without requiring the user to submit the form.

### Step 7 — Clear Form Button

Two bugs were identified during testing and resolved before the end of 
Sprint 2.

**Bug — SLA equality check and incorrect GSMR target**
A controlled leak with an arrival time of exactly 120 minutes was incorrectly returning Outside SLA due to floating point precision. Math.floor was replaced with Math.round to resolve this. The GSMR target deadline was also found to be using the SLA limit (1 or 2 hours) rather than the correct 12-hour GSMR window, which was corrected.

**Bug — Dropdown not triggering recalculation**
Changing the leak type dropdown after a result had been displayed was not refreshing the result. A missing checkAndCalculate() call was added to the dropdown event listener to resolve this.

### Prototype vs Final Build

The screenshot below shows the Figma prototype alongside the final built application. The layout, colour scheme, typography, and card structure are consistent across both. The main visual difference is that the built version uses native browser date and time input fields rather than the icon-based pickers shown in the prototype, which is expected given the MVP scope.

![Prototype vs Build](SLA_calculator_comparison.png)

*Image Four: Figma prototype (left) alongside the final built application (right)*

## 6. Testing and CI/CD

## 7. Version Control Strategy

### Branching Strategy

This project followed a feature branch workflow. All development was carried out on dedicated branches rather than directly on main, ensuring the main branch always contained stable, tested code.

Each branch was named using a consistent convention that reflected its 
purpose

### Pull Requests

Every branch was merged into main via a pull request. No direct commits were made to main during the build phase. Each pull request was then linked to the corresponding ticket on the GitHub project board.

### Repository Structure

```
SLA_calculator/
├── index.html      # Application structure
├── style.css       # Styling and layout
├── script.js       # Application logic
└── README.md       # Project documentation
```

## 8. Documentation

### User guide

### Technical guide

## 9. Ticket Maintenance

### Conventions

This project followed these ticketing conventions throughout development:

- **One ticket → one branch → one pull request**
- Feature tickets are prefixed with [Discovery], [Design], [Build], [Test], [DevOps] or [Docs]
- Bug tickets are prefixed with [Bug] and documented separately from feature tickets, including steps to reproduce, expected behaviour, actual behaviour, and the fix applied


## 10. Evaluation
