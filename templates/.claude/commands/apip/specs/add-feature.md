# Prompt: Add a feature to the API Platform Spec Repository

## Purpose

Create a feature-specific README.md and quickstart guide in the API Platform spec repository, linking them to the existing documentation map.

These documents serve multiple audiences:

- **Developers** - Understand feature context to work on related features, improvements, or extensions. Track unimplemented parts that can be completed later.
- **AI Agents** - Understand the context of a given feature to provide better assistance to developers during coding tasks.
- **Product Managers and Engineering Managers** - Understand the current state of the feature, what's completed, and what remains to be done.

## Context

Generate a comprehensive feature overview document that captures the current state of a feature implementation.

## Initial Questions

If the user hasn't provided sufficient information, ask:

1. **What feature needs to be documented?**
   - Feature name or identifier

2. **Where is the feature documentation located?** (Optional)
   - Folder path containing specification documents
   - If not provided, search for relevant documentation based on feature name

3. **What is the current implementation status?** (Optional)
   - Are there task lists or completion tracking documents available?
   - If the documentation folder contains files that indicate status (task lists, completion tracking, etc.), this question can be skipped

## Workflow

1. **Gather Context**
   - Go through all documents in the provided folder to understand the feature
   - Look for specification documents, design documents, task lists, completion tracking, etc.
   - If documentation points to source code files, review them to understand implementation context
   - Extract user stories, functional requirements, and completion status

2. **Map Information**
   - Identify distinct capabilities
   - Map capabilities to user stories
   - Link user stories to functional requirements
   - Determine completion state for each requirement

3. **Generate Overview**
   - Use the template below
   - Save to the appropriate location

## Document Template

Use this exact template structure:

```markdown
# Feature Overview: {title}

## Overview

<!--
Provide a concise, single-paragraph overview of the feature
- Focus on WHAT the feature does and its high-level capabilities
- DO NOT break into multiple topics or sections
- DO NOT include technical implementation details
- Keep it business-focused and value-oriented
-->

## Capabilities

<!-- Document each distinct capability of the feature -->

### [STATE] Capability XX: [Capability Name]
   
- [STATE] **User Story [XX]** — [Title]
  - **As a** [role]
  - **I want to** [goal]
  - **So that** [benefit]

- **Functional Requirements:**
  - [STATE] **FR-XXX** [Summary]
  - [STATE] **FR-XXX** [Summary]
  - [STATE] **FR-XXX** [Summary]

- **Key Implementation Highlights:**
  - Reference to file or directory
  - Reference to configuration location
  - Reference to specific package or module

**Notes:**
> Optional remarks about dependencies, limitations, or future considerations

---
```

## State Indicators

You MUST use these state markers to indicate completion status:

- `[✓]` - Fully complete and tested
- `[~]` - Partially complete (some functionality implemented)
- `[ ]` - Not started or planned for future

## Strict Rules

**MUST follow these rules:**

1. **Implementation Highlights**
   - Reference ONLY file paths and directory names
   - Use folder-level references when possible
   - NEVER include function names, method names, or class names
   - NEVER include variable names or DTO names
   - NEVER include actual code snippets

2. **Overview Section**
   - Keep as a single, cohesive paragraph
   - Focus on business value and capabilities
   - Avoid technical implementation details
   - Do not break into bullet points or sub-sections

3. **Capabilities**
   - Each capability should map to a user story
   - Include all related functional requirements with their IDs
   - Maintain traceability from user story to requirements to implementation

4. **Code References**
   - Actual code can be retrieved from files on demand
   - Documentation should guide readers to locations, not duplicate code

## Output Location

1. **Load Repository Settings**
   - Open `{repo_root}/.apip/settings.yaml`
   - Retrieve the repository path from `settings.specRepo` and store it as {spec_repo_root}

2. **Archive Feature Documents**
   - Store the feature documents in the `{spec_repo_root}/change-log` folder
   - Suggest a folder name using the format: `YYYYMMDD-feature-name`
   - If a folder with this format already exists, add an incremental number to the name: `YYYYMMDD-N-feature-name`
   - Copy `plan.md`, `data-model.md`, and `spec.md` from the original folder path the user provides

3. **Locate Component Documentation Directory**
   - Determine which component this feature belongs to
     - Example: A platform-api feature uses the `platform-api` folder. Store this as {component}
   - Access the directory at `{spec_repo_root}/{component}/docs/features`. Store it as {feature-dir}

4. **Check for Existing Feature Documentation**
   - Search for any existing folder related to this feature
   - If found, ask the user for confirmation before proceeding

5. **Determine Feature Folder Name**
   - If no existing folder exists, suggest a folder name using the format: `feature-name`
     - Example: `gateway-management`
   - Create the suggested folder: `{feature-dir}/feature-name`. Store it as {feature-folder}

6. **Save Generated Documentation**
   - Save the generated feature overview document as `README.md` in {feature-folder}

7. **Include Quickstart Guide**
   - Check if `quickstart.md` exists in the feature specification folder
   - If found, copy it to {feature-folder}
   - If not found, generate a quickstart guide based on the implementation plan, validation documents, and test client examples
   - The quickstart should provide step-by-step instructions for local development and testing

8. **Update Component Documentation Map**
   - Open `{spec_repo_root}/{component}/docs/features/README.md`
   - Add a new entry linking to the feature documentation using this format:
     ```markdown
     ### [Feature Name](./docs/features/feature-name/README.md)
     [2-3 line overview of the feature, focusing on what it does, the problem it solves, and key capabilities]
     ```
   - Example:
     ```markdown
     ### [Gateway WebSocket Connections](./docs/features/gateway-websocket-connections/README.md)
     Implements a real-time event notification system that enables the platform API to communicate with gateway instances through persistent WebSocket connections. Gateways establish authenticated connections and receive immediate notifications for API deployments, undeployments, or configuration changes, eliminating polling and ensuring real-time synchronization with platform state.
     ```
   - Place the entry in the appropriate section (if sections exist) or append to the features list
