# Tutorial 05: Debugging MCP & Tool Integrations

Model Context Protocol (MCP) servers enable your agents to talk to external tools (Slack, GitHub, Databases). Use the CLI to ensure these connections are healthy.

## 1. Discover Supported Tools
Before adding a tool to an agent, check what the server supports:

```bash
hsafa mcp list-available
```

## 2. Verify Agent Connectivity
If an agent fails to use a tool, the first step is to check its MCP status:

```bash
hsafa mcp agent <agent-id>
```
Look for the **Status** column. If it says `disconnected` or `error`, your server-side MCP configuration needs attention.

## 3. Test Tool Execution (Headless)
Run a specific command that triggers a tool and watch the terminal output:

```bash
hsafa agent run <agent-id> "List the files in my root GitHub repository"
```

## 4. Common Troubleshooting Steps
- **Auth Errors**: Run `hsafa key list` to ensure the required provider key (e.g., OpenAI) is active.
- **MCP Timeout**: Check `hsafa status` to ensure the core server hasn't crashed or lost database connectivity.
- **JSON Validation**: Run your command with `--json` to see the full raw error returned by the AI SDK.

## 5. Summary
The CLI provides a transparent view of the "plumbing" between your LLM and your tools, making it the preferred environment for debugging complex tool-use workflows.
