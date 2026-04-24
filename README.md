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

**Figure One:** Showing the wireframe for the App Layout
    
The wireframe outlines the core layout of the SLA Calculator. A dropdown at the top allows the engineer to select the leak type, followed by two date and time input pairs for the call received and arrival times. The results section at the bottom dynamically displays the compliance status, time taken, and GSMR target deadline. A clear form button allows the engineer to reset all fields quickly.
    
### Prototype

Following the wireframe, a high-fidelity prototype was built in Figma to visualise the final look and feel of the application before development began. The prototype demonstrates the intended user flow, from selecting 
a leak type through to receiving a compliance result.

![Gif showing the flow through the prototype created in Figma](SLA_calculator_prototype.gif)

**Figure Two:** Showing the gif of the prototype for the App functionality
 
The prototype builds on the wireframe by applying visual styling and simulating interactions, including the dynamic display of the SLA result. This allowed the design to be reviewed and refined before writing any code, 
reducing the risk of layout changes during development.

### Design Decisions

- **Simplicity First:** The layout is intentionally minimal. Engineers use this tool quickly, often in the field, so a clean single-page design with no navigation was prioritised.
- **Clear result visibility:** The complicance result is displayed prominently below the inputs so the outcome is immediately obvious without scrolling.
- **Mobile Friendly layout:** The form is structured vertically to work naturally on both mobile and desktop devices.

## 3. Project Management

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

## 6. Testing and CI/CD

## 7. Version Control Strategy

## 8. Documentation

### User guide

### Technical guide

## 9. Ticket Maintenance

## 10. Evaluation
