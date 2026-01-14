# HSAFA CLI Documentation

The HSAFA CLI is a powerful command-line interface designed to provide full control over the HSAFA AI Agent Studio platform without requiring the web UI. It is built for developers and power users who want to automate workflows, manage agents, and interact with AI models directly from the terminal.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Configuration](#configuration)
4. [Authentication](#authentication)
5. [Workspace Management](#workspace-management)
6. [Agent Management & Chat](#agent-management--chat)
7. [Knowledge Base & Documents](#knowledge-base--documents)
8. [System Utilities](#system-utilities)

---

## Installation

The CLI is part of the HSAFA monorepo. To install and make the `hsafa` command available globally:

```bash
# Navigate to the CLI directory
cd hsafa/cli

# Install dependencies
pnpm install

# Build the CLI
pnpm run build

# Link the command globally
npm link
```

---

## Quick Start

1. **Set your server URL or add a profile:**
   ```bash
   hsafa profile add production https://api.hsafa.com
   hsafa profile use production
   ```
2. **Login to your account:**
   ```bash
   hsafa auth login
   ```
3. **List your workspaces (as JSON):**
   ```bash
   hsafa workspace list --json
   ```
4. **Start a chat or run a command:**
   ```bash
   hsafa agent chat <agent-id>
   hsafa agent run <agent-id> "Give me a status update."
   ```

---

## Configuration & Profiles

The CLI supports multiple environment profiles (e.g., dev, staging, prod).

| Command | Description |
|---------|-------------|
| `hsafa profile list` | List all available profiles. |
| `hsafa profile add <name> <url>` | Add a new environment. |
| `hsafa profile use <name>` | Switch to a specific profile. |
| `hsafa profile delete <name>` | Remove a profile. |

---

## Authentication
...
---

## Agent Management & Chat

Interact with AI Agents.

### Commands
| Command | Description |
|---------|-------------|
| `hsafa agent list --workspace <workspace-id>` | List all agents in a specific workspace. |
| `hsafa agent get <agent-id>` | Get full agent data (including flow nodes/edges/tool links/KB links). |
| `hsafa agent get <agent-id> --nodes` | Get only the agent flow nodes. |
| `hsafa agent get <agent-id> --edges` | Get only the agent flow edges. |
| `hsafa agent node get <agent-id> <node-id>` | Get a specific flow node by `nodeId`. |
| `hsafa agent node create <agent-id> --type <nodeType> [--nodeId <id>] [--label <label>] [--data <json>|--data-file <path>|--data-stdin]` | Create a flow node. |
| `hsafa agent node update <agent-id> <node-id> [--label <label>] [--x <x>] [--y <y>] [--data <json>|--data-file <path>|--data-stdin] [--merge]` | Update a node (optionally merge data). |
| `hsafa agent node delete <agent-id> <node-id>` | Delete a flow node. |
| `hsafa agent edge get <agent-id> <edge-id>` | Get a specific edge by `edgeId`. |
| `hsafa agent edge add <agent-id> --source <nodeId> --target <nodeId> [--edgeId <id>] [--type <edgeType>] [--data <json>|--data-file <path>|--data-stdin]` | Add/replace an edge (link nodes). |
| `hsafa agent edge delete <agent-id> <edge-id>` | Delete an edge (unlink nodes). |
| `hsafa agent flow apply <agent-id> --input <json>|--input-file <path>|--input-stdin` | Apply full flow `{nodes,edges}` (overwrites). |
| `hsafa agent update <agent-id> --input <json>|--input-file <path>|--input-stdin` | Update agent metadata using `UpdateAgentInput`. |
| `hsafa agent replace <agent-id> --input <json>|--input-file <path>|--input-stdin` | Replace agent metadata + flow from an exported agent JSON. |
| `hsafa agent chat <id>` | Start a persistent chat session. |
| `hsafa agent run <id> <message>` | Execute a single prompt and exit. |
| `hsafa agent set-model <id> <model>` | Change the LLM model (e.g. gpt-4o). |
| `hsafa agent set-prompt <id> <prompt>` | Update the system prompt. |
| `hsafa agent export <id>` | Export agent configuration to JSON (stdout). |
| `hsafa agent import <file.json>` | Create a new agent from an exported JSON. |

### Input patterns (AI-friendly)

Most advanced commands accept structured JSON in one of three ways:

| Option | When to use it |
|--------|----------------|
| `--input '<json>'` / `--data '<json>'` | Small payloads inline (best for scripting/AI). |
| `--input-file <path>` / `--data-file <path>` | Large payloads versioned on disk. |
| `--input-stdin` / `--data-stdin` | Pipe JSON from another command (`jq`, `cat`, AI tools). |

### Recipes

#### Read full agent state
```bash
hsafa agent get <agent-id>
```

#### Get only nodes / edges
```bash
hsafa agent get <agent-id> --nodes
hsafa agent get <agent-id> --edges
```

#### Update agent metadata from JSON
```bash
hsafa agent update <agent-id> --input '{"name":"New Name","description":"Updated"}'
```

#### Replace an agent from an exported JSON file (metadata + flow)
```bash
hsafa agent replace <agent-id> --input-file ./agent-export.json
```

#### Create a node
```bash
hsafa agent node create <agent-id> --type system_prompt --label "System" --data '{"systemPrompt":"You are helpful."}'
```

#### Update a node data (replace)
```bash
hsafa agent node update <agent-id> <node-id> --data '{"systemPrompt":"New prompt"}'
```

#### Update a node data (merge)
Use `--merge` to preserve existing keys.
```bash
hsafa agent node update <agent-id> <node-id> --merge --data '{"temperature":0.2}'
```

#### Delete a node
```bash
hsafa agent node delete <agent-id> <node-id>
```

#### Link nodes (add an edge)
```bash
hsafa agent edge add <agent-id> --source <source-node-id> --target <target-node-id>
```

#### Unlink nodes (delete an edge)
```bash
hsafa agent edge delete <agent-id> <edge-id>
```

#### Apply a full flow JSON (overwrites nodes+edges)
```bash
hsafa agent flow apply <agent-id> --input-file ./flow.json
```

---

## GraphQL Power Tools

The CLI includes a raw GraphQL runner intended for automation and AI tooling.

### Commands

| Command | Description |
|---------|-------------|
| `hsafa gql run --query <graphql> [--variables <json>]` | Run any query/mutation. |
| `hsafa gql run --query-file <path> --variables-file <path>` | Run from files. |
| `hsafa gql run --query-stdin --variables-stdin` | Pipe query/variables via stdin. |
| `hsafa gql introspect` | Minimal schema introspection (useful for debugging). |

### Recipes

#### Get agentWithFlow via raw GraphQL
```bash
hsafa gql run \
  --query 'query($id:ID!){ agentWithFlow(id:$id){ id name flowNodes{nodeId nodeType} flowEdges{edgeId sourceId targetId} } }' \
  --variables '{"id":"<agent-id>"}'
```

#### Run a mutation with variables from a file
```bash
hsafa gql run --query-file ./mutation.graphql --variables-file ./vars.json
```

---

## Chat Session Management

The CLI supports persistent chat history, synchronized with the server.

| Command | Description |
|---------|-------------|
| `hsafa chat list` | List all previous chat sessions. |
| `hsafa chat resume <id>` | Continue a previous conversation. |
| `hsafa chat delete <id>` | Remove a chat session and its history. |

---

## API Key Management
...
---

## MCP Management

Monitor and discover Model Context Protocol (MCP) integrations.

| Command | Description |
|---------|-------------|
| `hsafa mcp agent <id>` | List and check status of MCP nodes for an agent. |
| `hsafa mcp list-available` | Show all supported MCP server types on the platform. |

---

## Knowledge Base & Documents
...
## User Profile

| Command | Description |
|---------|-------------|
| `hsafa me` | Show details about the currently logged-in user. |

---

## Member Management

Manage users within a workspace.

| Command | Description |
|---------|-------------|
| `hsafa member list <workspace-id>` | List all members and their roles. |
| `hsafa member update <workspace-id> <member-id> --role <role>` | Change member permissions. |
| `hsafa member remove <workspace-id> <member-id>` | Remove a member from the workspace. |

---

## Invitation Management

| Command | Description |
|---------|-------------|
| `hsafa invite send <workspace-id> <email>` | Invite a new user to a workspace. |
| `hsafa invite list [workspace-id]` | List pending invitations (global or per workspace). |
| `hsafa invite accept <token>` | Accept an invitation token. |
| `hsafa invite cancel <id>` | Cancel a pending invitation. |

---

## Automation & Headless Mode

### JSON Output
All `list` commands support a global `--json` flag for scripting:
```bash
hsafa workspace list --json | jq '.[0].id'
```

### Headless Execution
Use `hsafa agent run` for CI/CD or automated reports.


## System Utilities

Tools for monitoring and maintenance.

| Command | Description |
|---------|-------------|
| `hsafa status` | Check health of the server, database, and connection. |
| `hsafa --version` | Display current CLI version. |
| `hsafa --help` | Display help for any command. |

---

## Developer Guide

### Architecture
- **Commander.js:** Handles command routing and arguments.
- **Axios:** Manages REST API communication.
- **GraphQL-Request:** Custom utility for complex data queries.
- **Inquirer.js:** Powers interactive prompts and chat input.

### Development Mode
To run the CLI in development with hot-reloading:
```bash
cd hsafa/cli
pnpm run dev
```
In another terminal, use the linked `hsafa` command to test your changes.
