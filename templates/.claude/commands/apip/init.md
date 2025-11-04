# Initialize APIP Configuration

## Purpose

Initialize the API Platform configuration by setting up the specification repository as a git worktree. This configuration is required for features like documentation generation, feature logging, and cross-repository operations.

## Workflow

1. **Check for Existing Spec Repository**
   - Ask the user: "Have you already cloned the api-platform-specs repository, or would you like me to help you set it up?"
   - If already cloned, ask for the path and skip to step 4
   - If not cloned, proceed to step 2

2. **Verify Git Remote**
   - Check if the `upstream` remote exists: `git remote -v`
   - If `upstream` doesn't exist, inform the user they need to add it first

3. **Set Up Git Worktree**
   - Fetch from upstream: `git fetch upstream`
   - Create the worktree at the same level as the current api-platform repo:
     ```bash
     git worktree add ../api-platform-specs specs
     ```
   - This creates the spec repository at: `{parent_dir}/api-platform-specs`
   - The worktree will be tracking the `specs` branch

4. **Create Configuration File**
   - Create the `.apip` directory in the repository root if it doesn't exist
   - Generate `settings.yaml` with the following structure:

```yaml
settings:
  specRepo: {absolute-path-to-spec-repo}
```

5. **Verify Configuration**
   - Confirm the worktree was created successfully (if applicable)
   - Confirm the configuration file was created successfully
   - Display the configuration to the user for verification

## Example

For a repository at `/home/user/workspace/api-platform`, the worktree will be created at `/home/user/workspace/api-platform-specs`:

**Commands executed:**
```bash
git fetch upstream
git worktree add /home/user/workspace/api-platform-specs specs
```

**File:** `{repo_root}/.apip/settings.yaml`

```yaml
settings:
  specRepo: /home/user/workspace/api-platform-specs
```

## Success Output

Display a confirmation message:
```
✓ APIP configuration initialized successfully
  Spec repository worktree: {path}
  Configuration file: {repo_root}/.apip/settings.yaml
```

## Error Handling

- If `upstream` remote doesn't exist, provide instructions to add it
- If the worktree already exists, skip creation and use the existing path
- If the `specs` branch doesn't exist, inform the user
- If `.apip/settings.yaml` already exists, ask if the user wants to overwrite it
- Ensure proper YAML formatting in the generated file
