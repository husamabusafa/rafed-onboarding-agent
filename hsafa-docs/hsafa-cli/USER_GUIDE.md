# HSAFA CLI: Complete User Guide

Welcome to the HSAFA CLI! This guide provides a comprehensive walkthrough of the command-line interface, designed to help you build, manage, and scale AI Agents without ever leaving your terminal.

---

## 🚀 1. Installation & Setup

### Prerequisites
- Node.js (v18+)
- `pnpm` (recommended) or `npm`

### Installation
From the root of your repository:
```bash
cd hsafa/cli
pnpm install
pnpm run build
npm link
```
Now you can run the `hsafa` command from anywhere.

---

## 🌐 2. Environment & Profiles

The CLI supports multiple environment profiles, allowing you to switch between different server instances (local, staging, prod) instantly.

### Profile Management
```bash
# Add a production profile
hsafa profile add prod https://api.hsafa.com

# List all profiles (active profile is marked with *)
hsafa profile list

# Switch context to production
hsafa profile use prod

# Delete a profile
hsafa profile delete staging
```

---

## 🔐 3. Authentication

The CLI uses the same secure session-based authentication as the HSAFA Studio.

```bash
# Start interactive login (Email & Password)
hsafa auth login

# Check your current session status
hsafa auth status

# View your profile details (ID, Name, Email)
hsafa me

# Logout and clear local tokens
hsafa auth logout
```

---

## 📂 4. Workspaces

Navigate the hierarchy of your HSAFA account.

```bash
# List all workspaces you belong to
hsafa workspace list

# Get full JSON data for workspaces
hsafa workspace list --json
```

---

## 🤖 5. Agent Management

### Configuring Agents (Hot-swapping)
Update settings without opening the Flow editor. These changes take effect immediately.
```bash
# Change the model to GPT-4o
hsafa agent set-model <agent-id> gpt-4o

# Update the system prompt
hsafa agent set-prompt <agent-id> "You are a helpful coding assistant."
```

---

## 💬 6. Chat & Interaction

### Interactive Streaming Chat
The CLI handles NDJSON streams from the server, providing a real-time typing effect.
```bash
hsafa agent chat <agent-id>
```
**Chat Controls:**
- `exit` or `quit`: End the session.
- `Ctrl + C`: Force exit.

### Chat History & Persistence
All terminal chats are saved to the server and can be resumed later.
```bash
# List previous chat sessions
hsafa chat list

# Resume a specific session with full context
hsafa chat resume <chat-id>

# Delete old sessions
hsafa chat delete <chat-id>
```

### Headless Execution (Automation)
Run a single command and exit.
```bash
hsafa agent run <agent-id> "Summarize the latest trends in AI."
```

---

## 📚 7. RAG & Knowledge Bases

Management of the vector database and document indexing.

```bash
# List your knowledge bases
hsafa kb list

# Create a new KB
hsafa kb create "Legal Documents"

# Upload and index a document in one command
# Supported: .pdf, .docx, .txt, .md
hsafa kb doc-add <kb-id> ./contracts/privacy.pdf

# List documents and their indexing status (processed, failed, pending)
hsafa kb docs <kb-id>
```

---

## 🛠️ 8. MCP (Model Context Protocol)

Monitor tool integrations like Slack, GitHub, and Postgres.

```bash
# List all MCP server types supported by the current instance
hsafa mcp list-available

# Verify if an agent's tools are properly initialized and connected
hsafa mcp agent <agent-id>
```

---

## 🔑 9. API Key Management

Securely manage LLM provider keys.

```bash
# List your registered keys
hsafa key list

# Add a new key (e.g. OpenAI, Anthropic, Groq)
hsafa key add "Main OpenAI Key" openai sk-proj-xxxx...

# Delete a key
hsafa key delete <key-id>
```

---

## 📦 10. Portability (Export/Import)

The CLI makes it easy to version control your agents or move them across servers.

```bash
# Export an entire agent (nodes, edges, prompt) to a JSON file
hsafa agent export <agent-id> > backup-v1.json

# Import into a new workspace (even on a different profile)
hsafa agent import backup-v1.json --workspace <new-workspace-id>
```

---

## 🤖 11. Developer Automation (JQ Examples)

The CLI is designed to be "pipeable".

```bash
# Get the ID of the last agent you created
AGENT_ID=$(hsafa agent list --workspace <workspace-id> --json | jq -r '.[0].id')

# Batch delete all chat sessions older than 30 days
hsafa chat list --json | jq -r '.[] | select(.updatedAt < "2025-01-01") | .id' | xargs -I {} hsafa chat delete {}
```

---

## 🏥 12. Troubleshooting & Debugging

If the CLI or Server behaves unexpectedly:

1.  **Check Status**: Run `hsafa status` to verify database and server health.
2.  **Verify Token**: Run `hsafa auth status`. If expired, run `hsafa auth login`.
3.  **MCP Failures**: Run `hsafa mcp agent <id>`. If "disconnected", check server-side logs.
4.  **JSON Errors**: Most commands support `--json`. Use this to see the raw error message from the server.

---

*For more information, visit the [HSAFA Repository](https://github.com/husamabusafa/hsafa).*