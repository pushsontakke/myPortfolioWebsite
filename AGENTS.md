<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Git checkpoint rules

- After completing and verifying each approved phase, stage only the files changed for that phase and create a descriptive commit.
- Keep commits small and scoped so each checkpoint is easy to review or revert.
- Before staging, review `git status`, the relevant diff, and `git diff --check`. Never include unrelated user changes in a commit.
- Do not amend, rebase, merge, push, force-push, reset, or discard changes unless the owner explicitly requests that operation.
- Report the commit hash, changed files, and validation results after each checkpoint.
