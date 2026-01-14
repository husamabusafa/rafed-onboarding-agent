# Tutorial 03: Mastering Automation with JSON & JQ

The HSAFA CLI is designed for Unix-style pipelining. By using the `--json` flag and `jq`, you can automate complex administrative tasks.

## 1. Extracting IDs for Scripts
Manually copying IDs is slow. Use `jq` to grab the first workspace ID:

```bash
WS_ID=$(hsafa workspace list --json | jq -r '.[0].id')
echo "Operating in workspace: $WS_ID"
```

## 2. Bulk Inviting Users
Create a file named `emails.txt` with one email per line, then run this loop:

```bash
while read EMAIL; do
  hsafa invite send "$WS_ID" "$EMAIL" --role EDITOR
done < emails.txt
```

## 3. Auditing Permissions
Generate a quick report of all Owners in a workspace:

```bash
hsafa member list "$WS_ID" --json | \
jq -r '.[] | select(.role == "OWNER") | "\(.user.name) <\(.user.email)>"'
```

## 4. Batch Deleting Old Chats
Clean up your workspace by deleting chats created before a certain date:

```bash
hsafa chat list --json | \
jq -r '.[] | select(.createdAt < "2025-01-01") | .id' | \
xargs -I {} hsafa chat delete {}
```

## 5. Summary
The combination of `hsafa --json` + `jq` allows you to treat your HSAFA platform as a programmable API, enabling high-scale management without the UI.

---
**Next Step:** [Tutorial 04: DevOps and Profiles](./04-devops-and-profiles.md)

```