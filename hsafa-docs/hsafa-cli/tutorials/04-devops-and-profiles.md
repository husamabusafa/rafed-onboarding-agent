# Tutorial 04: DevOps & Multi-Environment Management

Learn how to safely move agents from local development to production using Profiles and Export/Import.

## 1. Set Up Your Profiles
Avoid hardcoding URLs. Define named environments for your team.

```bash
# Add development server
hsafa profile add dev http://localhost:3900

# Add production server
hsafa profile add prod https://api.hsafa.com
```

## 2. The Development Cycle
Start working in your local environment:

```bash
hsafa profile use dev
hsafa auth login
# ... build and test your agent ...
```

## 3. Exporting for Production
Once your agent is ready, export its entire configuration (nodes, edges, prompt) to a JSON file.

```bash
hsafa agent export <dev-agent-id> > customer-bot-v1.json
```

## 4. Deploying to Production
Switch your context and import the file.

```bash
hsafa profile use prod
hsafa auth login

# Import the agent
hsafa agent import customer-bot-v1.json --workspace <prod-workspace-id>
```

## 5. Hot-fixing in Production
Need to change a model or prompt quickly without redeploying?

```bash
hsafa agent set-model <prod-id> gpt-4o
hsafa agent set-prompt <prod-id> "You are a production-ready assistant."
```

---
**Next Step:** [Tutorial 05: Debugging MCP](./05-debugging-mcp.md)
