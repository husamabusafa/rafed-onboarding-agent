# HSAFA CLI: Real-World Use Cases

This guide explores practical, real-world scenarios where the HSAFA CLI provides a significant advantage over using the web UI.

---

## 1. Automated Agent Deployment (CI/CD)
**Scenario:** You have perfected an agent's flow and prompt in your local development environment and need to deploy it to the production server without manual clicks.

```bash
# 1. Export from local
hsafa profile use local
hsafa agent export <agent-id> > v1-agent-config.json

# 2. Switch to production
hsafa profile use prod

# 3. Import to production
hsafa agent import v1-agent-config.json --workspace <prod-workspace-id>
```

---

## 2. Bulk User Onboarding & Migration
**Scenario:** A new department of 50 people is joining. Manually inviting them one by one is impossible.

```bash
# Script to invite from a list
cat team_emails.txt | while read EMAIL; do
  hsafa invite send <workspace-id> "$EMAIL" --role EDITOR
done
```

---

## 3. Knowledge Base Maintenance & Pruning
**Scenario:** Your Knowledge Base is cluttered with old documentation. You need to identify and delete documents uploaded before a certain date.

```bash
KB_ID="your-kb-id"
OLD_DATE="2024-12-31"

# Identify old docs and print their names
hsafa kb docs "$KB_ID" --json | jq -r ".[] | select(.uploadedAt < \"$OLD_DATE\") | .fileName"
```

---

## 4. Prompt Versioning & A/B Testing
**Scenario:** You want to compare how two different system prompts affect an agent's performance.

```bash
# Save current prompt
hsafa agent export <id> > current_v1.json

# Apply new experimental prompt
hsafa agent set-prompt <id> "You are an extremely concise technical expert."
hsafa agent run <id> "Explain quantum entanglement." > result_experimental.txt

# Revert to original
hsafa agent import current_v1.json
```

---

## 5. Daily Automated Health Reports
**Scenario:** You need a high-level summary of your workspace's technical debt or status every morning.

```bash
# Add to crontab
0 9 * * 1-5 hsafa agent run <id> "Review the current workspace and provide a status update on active agents." >> ~/logs/status_reports.txt
```

---

## 6. Real-time Security & Access Auditing
**Scenario:** Compliance requires a weekly report of everyone with "OWNER" permissions.

```bash
# Generate a CSV of all Owners across all workspaces
WORKSPACES=$(hsafa workspace list --json | jq -r '.[].id')

echo "Workspace,Name,Email" > audit_report.csv
for WS in $WORKSPACES; do
  WS_NAME=$(hsafa workspace list --json | jq -r ".[] | select(.id == \"$WS\") | .name")
  hsafa member list "$WS" --json | jq -r ".[] | select(.role == \"OWNER\") | \"$WS_NAME,\(.user.name),\(.user.email)\"" >> audit_report.csv
done
```

---

## 7. Model Cost & Performance Benchmarking
**Scenario:** You are using `gpt-4o` but want to see if `groq/llama3-70b` is fast and accurate enough for your specific use case.

```bash
# Benchmark GPT-4
hsafa agent set-model <id> gpt-4o
time hsafa agent run <id> "Analyze this data: [DATA]"

# Benchmark Groq
hsafa agent set-model <id> llama3-70b-8192
time hsafa agent run <id> "Analyze this data: [DATA]"
```

---

## 8. Multi-Region Profile Syncing
**Scenario:** You manage HSAFA instances in multiple regions (US, EU, Middle East) and need to ensure they all have the same "Customer Support" agent configuration.

```bash
# Export from Master
hsafa profile use us-east
hsafa agent export <agent-id> > master-agent.json

# Import to other regions
for REGION in eu-west middle-east; do
  hsafa profile use $REGION
  hsafa agent import master-agent.json
done
```

---

## 9. Local Development & MCP Testing
**Scenario:** You are developing a custom MCP server locally and want to test it against your remote agents without constant UI refreshes.

```bash
# 1. Update MCP node in agent flow
# 2. Check connection status instantly
hsafa mcp agent <agent-id>

# 3. Trigger a test run
hsafa agent run <agent-id> "Fetch data from my local database"
```

---

## 10. Bulk Content Summarization (Headless)
**Scenario:** You have 100 meeting transcripts and need a summary for each one.

```bash
for TRANSCRIPT in ./transcripts/*.txt; do
  SUMMARY_FILE="./summaries/$(basename $TRANSCRIPT)"
  hsafa agent run <agent-id> "Summarize this: $(cat $TRANSCRIPT)" > "$SUMMARY_FILE"
done
```

---

*Found a new use case? Contribute to the [HSAFA community](https://github.com/husamabusafa/hsafa).*