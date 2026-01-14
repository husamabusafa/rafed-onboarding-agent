# Tutorial 01: Getting Started with HSAFA CLI

This tutorial will take you from installation to your first interactive AI chat session in under 5 minutes.

## 1. Installation
The CLI is part of the HSAFA monorepo. Ensure you have Node.js and `pnpm` installed.

```bash
cd hsafa/cli
pnpm install
pnpm run build
npm link
```

## 2. Setting the Target Server
By default, the CLI looks for a server at `http://localhost:3900`. If your server is elsewhere, configure it:

```bash
hsafa config -s http://your-server-ip:3900
```

## 3. Authentication
Login using your HSAFA email and password. This will store a session token locally.

```bash
hsafa auth login
```
Check your status to verify:
```bash
hsafa auth status
```

## 4. Finding an Agent
To chat, you need an Agent ID. Let's find one by navigating your workspaces:

```bash
# 1. List workspaces
hsafa workspace list

# 2. List agents in a workspace (use ID from step 1)
hsafa agent list --workspace <workspace-id>
```

## 5. Your First Chat
Once you have an `<agent-id>`, start a streaming chat:

```bash
hsafa agent chat <agent-id>
```
Try asking: *"Hello! What tools do you have access to?"*

---
**Next Step:** [Tutorial 02: Building RAG Agents](./02-building-rag-agents.md)
