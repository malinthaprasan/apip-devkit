# API Platform Dev Kit

A CLI tool for API platform development that integrates with Claude Code to provide intelligent assistance for working with the [WSO2 API Platform](https://github.com/wso2/api-platform).

## Prerequisites

You need to have the [wso2/api-platform](https://github.com/wso2/api-platform) repository cloned on your local machine.

```bash
git clone https://github.com/wso2/api-platform.git
cd api-platform
```

## Installation

Install globally via npm:

```bash
npm install -g @malinthaprasan/apip-devkit@latest
```

## Usage

### Step 1: Initialize Claude Code Files

Navigate to your cloned api-platform repository root and run:

```bash
apip-devkit init --here
```

This will generate Claude Code related files in the `.claude` directory with the following structure:
- `.claude/agents/atlas.md` - Atlas agent for documentation search
- `.claude/commands/apip/init.md` - APIP initialization command
- `.claude/commands/apip/specs/add-feature.md` - Feature addition helper

### Step 2: Start Claude Agent

From the api-platform root directory, start Claude Code:

```bash
claude
```

### Step 3: Run APIP Initialization

Once Claude Code is running, execute the `/apip:init` slash command:

```
/apip:init
```

This will help you set up the api-platform-specs repository as a git worktree and configure the necessary settings.

#### Example Output:

```
> /apip:init is running…

● I'll help you initialize the APIP configuration. Let me start by checking if you already have the api-platform-specs repository set up.

● User answered Claude's questions:
  ⎿  · Have you already cloned the api-platform-specs repository, or would you like me to help you set it up? → Set it up

● Great! I'll help you set up the spec repository as a git worktree. Let me first verify that the upstream remote exists.

● Bash(git remote -v)
  ⎿  origin     https://github.com/malinthaprasan/api-platform (fetch
     origin     https://github.com/malinthaprasan/api-platform (push)

● I see that you don't have an upstream remote configured. You'll need to add the upstream remote first before I can create the worktree.

  Could you provide the upstream repository URL for the api-platform project? It's typically the main/original repository that your fork is based on. Once you
  provide it, I can add the remote and proceed with setting up the worktree.

  Alternatively, if you'd like to add it yourself, you can run:
  git remote add upstream <upstream-repo-url>

> git remote add upstream https://github.com/wso2/api-platform

● Perfect! Let me add the upstream remote and proceed with setting up the git worktree.

● Bash(git remote add upstream https://github.com/wso2/api-platform)
  ⎿  (No content)

● Bash(git fetch upstream)
  ⎿  From https://github.com/wso2/api-platform
      * [new branch]      main       -> upstream/main
      * [new branch]      specs      -> upstream/specs

● Great! Now let me create the git worktree for the specs repository.

● Bash(git worktree add ../api-platform-specs specs)
  ⎿  branch 'specs' set up to track 'upstream/specs'.
     HEAD is now at 750401f remove specific features from docs_map.md
     Preparing worktree (new branch 'specs')

● Excellent! Now let me create the configuration file. First, I'll determine the absolute path to the spec repository.

● Bash(readlink -f ../api-platform-specs)
  ⎿  /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs

● Bash(mkdir -p .apip)
  ⎿  (No content)

● Now let me create the settings.yaml configuration file:

● Write(.apip/settings.yaml)
  ⎿  Wrote 2 lines to .apip/settings.yaml
     settings:
       specRepo: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs

● Perfect! Let me verify the configuration:

● Bash(git worktree list)
  ⎿  /home/malintha/wso2apim/gitworkspace/temp/api-platform        2a0076a [main]
     /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs  750401f [specs]

● Read(.apip/settings.yaml)
  ⎿  Read 2 lines

● ✓ APIP configuration initialized successfully

  Spec repository worktree: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs

  Configuration file: /home/malintha/wso2apim/gitworkspace/temp/api-platform/.apip/settings.yaml

  The configuration has been set up with:
  - Git worktree created at the specs repository location
  - Tracking the specs branch from upstream
  - Configuration file created with the absolute path to the spec repository

  You're now ready to use APIP features that require access to the specification repository!
```

### Step 4: Ask Atlas Agent for Help

Now you can ask the Atlas agent to help you find relevant documentation for your work:

```
> atlas, I need to write a new feature to platform-api to undeploy apis from gateways. From which documents I can get the context to work on this?
```

#### Example Atlas Output:

```
● atlas(Find relevant docs for undeploying APIs)
  ⎿  Done (14 tool uses · 40.5k tokens · 36.2s)

● Relevant Documentation for API Undeployment Feature

  Here are the key documents you should review to implement the API undeployment feature in platform-api:

  Core Architecture & Implementation References

  1. Platform API Overview
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/platform-api/docs/README.md
    - Why: Documents the Deployment Service component that orchestrates API deployments across gateway infrastructure, architecture, service components, and
  integration points
  2. Gateway WebSocket Connections Feature
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/platform-api/docs/features/gateway-websocket-connections/README.md
    - Why: Critical - Documents the real-time event notification system for communicating with gateways. Undeployment requires sending api.undeployed events via
  WebSocket. Shows multi-event type support architecture.
  3. Gateway WebSocket Connections Quickstart
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/platform-api/docs/features/gateway-websocket-connections/quickstart.md
    - Why: Provides practical implementation examples for event delivery, including how deployment events are triggered and the event message format structure needed
   for undeployment

  Gateway Management & Lifecycle

  4. Gateway Management Service
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/platform-api/docs/features/gateway-management/README.md
    - Why: Documents gateway lifecycle management, validation checks, and safety measures for active deployments (shows patterns for checking deployments before
  operations)
  5. Gateway Management Quickstart
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/platform-api/docs/features/gateway-management/quickstart.md
    - Why: Shows practical examples of gateway registration and token generation for authentication

  API Lifecycle Patterns

  6. Developer Portal Publishing Feature
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/platform-api/docs/features/devportal-publishing/README.md
    - Why: Documents API unpublishing capability (Capability 04) which provides patterns for removing APIs from systems - similar to undeployment. Includes error
  handling and retry logic patterns

  Supporting References

  7. API.yaml Specification
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/specs/api-yaml.md
    - Why: Defines API format structure for correctly identifying which APIs to undeploy
  8. CLI Documentation
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/cli/docs/README.md
    - Why: Documents deployment operations and design principles for user-facing interface design
  9. Gateway Documentation
    - File: /home/malintha/wso2apim/gitworkspace/temp/api-platform-specs/gateway/docs/README.md
    - Why: Explains how gateways receive and process deployments

  ---
  Recommended Reading Order

  High Priority (Read First):
  1. Gateway WebSocket feature docs (#2, #3) - real-time event delivery mechanism
  2. Platform API README (#1) - Deployment Service section
  3. Gateway management docs (#4) - safety checks and validation

  Medium Priority:
  4. Developer Portal publishing (#6) - unpublishing patterns
  5. API.yaml spec (#7) - API identification
  6. Gateway management quickstart (#5)

  Reference As Needed:
  7. CLI and Gateway documentation (#8, #9)
```

Atlas will search through the documentation and provide you with relevant files and context to complete your task.

## Development

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Test locally:
   ```bash
   npm link
   apip-devkit init --here
   ```

### Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm run prepublishOnly` - Build before publishing

## Project Structure

```
apip-devkit/
├── bin/
│   └── apip-devkit.js      # CLI entry point
├── src/
│   ├── cli/
│   │   └── index.ts        # Command routing
│   ├── commands/
│   │   └── init.ts         # Init command implementation
│   └── utils/
│       └── logo.ts         # Logo display utility
├── templates/
│   └── .claude/            # Claude Code configuration templates
│       ├── agents/
│       │   └── atlas.md    # Documentation search agent
│       └── commands/
│           └── apip/
│               ├── init.md              # APIP initialization command
│               └── specs/
│                   └── add-feature.md   # Feature addition helper
├── package.json
└── tsconfig.json
```

## License

MIT
