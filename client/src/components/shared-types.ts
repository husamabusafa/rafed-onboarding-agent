// Shared type definitions for custom UI components
export interface ToolResultProps {
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: {
    tool: string
    toolCallId: string
    output: Record<string, unknown>
  }) => void
}
