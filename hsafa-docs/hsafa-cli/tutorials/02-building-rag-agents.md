# Tutorial 02: Building your first RAG Agent

Learn how to create a Knowledge Base, index documents, and bootstrap a specialized Research Agent using templates.

## 1. Create a Knowledge Base (KB)
A KB is where your documents are stored and indexed for semantic search.

```bash
hsafa kb create "AI Research Lab" --description "Internal docs about LLMs"
```
*Copy the ID returned by this command.*

## 2. Add Documents
Let's add a PDF or Text file to our new KB. The CLI handles both the upload and the indexing trigger in one step.

```bash
hsafa kb doc-add <kb-id> ./my-document.pdf
```
Check the status of your documents:
```bash
hsafa kb docs <kb-id>
```

## 3. Initialize a Researcher Agent
Instead of building an agent from scratch in the UI, use the `researcher` template. This template comes pre-configured with a Vector Search tool.

```bash
Create a new agent from the UI, then use the CLI to configure and run it.
```
*Copy the new Agent ID.*

## 4. Connect the KB to the Agent
*(Currently, connecting a specific KB to an agent via CLI is done by setting the `namespace` or `kbId` in the tool node data. For now, use the Agent ID to run a test).*

## 5. Test the RAG Workflow
Run a headless command to see if the agent can retrieve info from your documents:

```bash
hsafa agent run <agent-id> "Based on the uploaded documents, what is the main conclusion of the research?"
```

---
**Next Step:** [Tutorial 03: Automation and Scripting](./03-automation-and-scripting.md)
