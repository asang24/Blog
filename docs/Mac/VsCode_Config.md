---
description: personlal prefer vscode settings.
keywords: [git config, iterm2, homebrew, neovim, tmux, command tools]
---

# [VsCode] Config

## Plugins

### Common plugins

- `Everforest` -- theme

    ```json
    "workbench.colorTheme": "Everforest Dark",
    "everforest.italicKeywords": true,
    "everforest.italicComments": true,
    ```

- `Code Runner` -- run code

- `Github Copilot` -- autocomplete code

- `GitLens` -- Supercharge Git in vscode

- `Material Icon Theme`

    ```json
    "workbench.iconTheme": "material-icon-theme",
    ```

- `Project Manager`

    ```json
    // settings.json
    "projectManager.git.baseFolders": ["$home/Documents/Code/"],
    "projectManager.sortList": "Recent",
    
    // keybindings.json
    {
    "command": "projectManager.listGitProjects#sideBarGit",
    "key": "cmd+o"
    }
    ```

- `YAML` -- YAML Language Suppor

    ```json
    "[yaml]": {
      "editor.defaultFormatter": "redhat.vscode-yaml",
      "editor.formatOnSave": true
    },
    "yaml.format.enable": true,
    "yaml.completion": true,
    ```

- `Prettier` -- Formatter

- `picgo` -- upload images

    > if u forget your GitHub tokens, u cant find it in the blew file `data.json`

    ```json
    // picgo
    // the data.json saved all the uploaded imgs info
    "picgo.dataPath": "$home/Library/Application Support/picgo/data.json",
    "picgo.picBed.current": "github",
    "picgo.picBed.github.repo": "<your name>/<repo>",
    "picgo.picBed.github.branch": "main",
    "picgo.picBed.github.path": "<fold>/",
    "picgo.picBed.github.customUrl": "https://cdn.jsdelivr.net/gh/<your name>/<repo>",
    "picgo.picBed.github.token": "<your token>",
    ```

- `Markdown All in One` -- Markdown Support

    ```json
    "markdown.preview.fontFamily": "RecMonoCasual Nerd Font",
    "[markdown]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
      "editor.formatOnPaste": true
    },
    ```

- `IntelliCode` -- AI assisted development

- `Thunder Client` -- lightweight Rest API Client

- `Vim`

    ```json
    // vim
    "vim.easymotion": true,
    "vim.incsearch": true,
    "vim.useSystemClipboard": true,
    "vim.useCtrlKeys": true,
    "vim.hlsearch": true,
    "vim.foldfix": true,
    "vim.leader": "<space>",
    // To improve performance
    "extensions.experimental.affinity": {
      "vscodevim.vim": 1
    },
    "vim.visualModeKeyBindingsNonRecursive": [
      {
        "before": ["p"],
        "after": ["p", "g", "v", "y"]
      },
      {
        "before": [">"],
        "commands": ["editor.action.indentLines"]
      },
      {
        "before": ["<"],
        "commands": ["editor.action.outdentLines"]
      }
    ],
    "vim.insertModeKeyBindingsNonRecursive": [
      { "before": ["<C-h>"], "after": ["<Left>"] },
      { "before": ["<C-j>"], "after": ["<Down>"] },
      { "before": ["<C-k>"], "after": ["<Up>"] },
      { "before": ["<C-l>"], "after": ["<Right>"] }
    ],
    "vim.normalModeKeyBindingsNonRecursive": [
      {
        "before": ["<leader>nh"],
        "commands": [":nohl"]
      },
      {
        "before": ["leader", "r"],
        "commands": ["editor.action.rename"]
      },
      {
        "before": ["leader", "w"],
        "commands": [":w"]
      },
      {
        "before": ["<leader>", "c", "a"],
        "commands": ["editor.action.quickFix"]
      },
      {
        "after": ["^"],
        "before": ["H"]
      },
      {
        "after": ["$"],
        "before": ["L"]
      },
      {
        "before": ["]", "d"],
        "commands": ["editor.action.diagnostic.prev"]
      },
      {
        "before": ["[", "d"],
        "commands": ["editor.action.diagnostic.next"]
      },
      {
        "before": ["g", "r"],
        "commands": ["editor.action.referenceSearch.trigger"]
      },
      {
        "before": ["g", "i"],
        "commands": ["editor.action.peekImplementation"]
      },
      {
        "before": ["g", "p"],
        "commands": ["editor.action.peekDefinition"]
      }
    ],
    "vim.handleKeys": {
      "<C-a>": false,
      "<C-f>": false
    },
    ```

### Golang plugins

- `Go`

    ```bash
    # press cmd+shift+p in vscode and select
    # go Install/Update Tolls
    
    # install gofumpt
    go install mvdan.cc/gofumpt@latest
    ```

    ```json
    // golang
    "[go]": {
      "editor.defaultFormatter": "golang.go",
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.organizeImports": "explicit",
        "source.fixAll": "explicit"
      }
    },
    "go.formatTool": "gofumpt",
    "go.lintTool": "golangci-lint",
    "go.lintFlags": ["--fast"],
    "go.toolsManagement.autoUpdate": true,
    "go.inlayHints.constantValues": true,
    "go.inlayHints.parameterNames": true,
    "gopls": {
      "formatting.gofumpt": true,
      "ui.completion.usePlaceholders": true,
      "ui.semanticTokens": true,
      "ui.diagnostic.analyses": {
        "unusedvariable": true,
        "unusedwrite": true,
        "unusedwrite": true
      }
    },
    ```

### Rust plugins

- [rust-analyzer](https://github.com/rust-lang/rust-analyzer) - Rust language support for Visual Studio Code
- [Even Better TOML](https://github.com/tamasfe/taplo#readme) - TOML support()
- [crates](https://github.com/serayuzgur/crates) - manage dependencies with Cargo.toml

## Settings

Other commons settings ,excluding Go/Rust plugins configurations

```json
{
  // theme & font
  "workbench.colorTheme": "Everforest Dark",
  "everforest.italicKeywords": true,
  "everforest.italicComments": true,
  "editor.fontSize": 16,
  "terminal.integrated.fontSize": 14,
  "editor.fontFamily": "RecMonoCasual Nerd Font",
  "terminal.integrated.fontFamily": "RecMonoCasual Nerd Font",
  "editor.fontLigatures": true,
  "workbench.iconTheme": "material-icon-theme",
  "workbench.list.smoothScrolling": true,
  "window.dialogStyle": "custom",
  "window.density.editorTabHeight": "compact",
  // extensions
  "extensions.autoCheckUpdates": false,
  "extensions.autoUpdate": "onlySelectedExtensions",
  // search
  "search.smartCase": true,
  "search.showLineNumbers": true,
  // files
  "files.autoSave": "afterDelay",
  "files.autoGuessEncoding": true,
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true,
  // explorer
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.compactFolders": false,
  "explorer.incrementalNaming": "smart",
  // editor
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.stickyTabStops": true,
  "editor.tabSize": 4,
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.formatOnType": true,
  "editor.insertSpaces": true,
  "editor.snippetSuggestions": "top",
  "editor.suggest.localityBonus": true,
  "editor.smoothScrolling": true,
  "editor.cursorBlinking": "smooth",
  "editor.inlineSuggest.enabled": true,
  "editor.linkedEditing": true,
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.inlayHints.enabled": "on",
  "editor.renderWhitespace": "none",
  "editor.acceptSuggestionOnEnter": "smart",
  "editor.suggestOnTriggerCharacters": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": "explicit",
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.suggestSelection": "first",
  "editor.semanticTokenColorCustomizations": {
    "enabled": true
  },
  // debug
  "debug.showBreakpointsInOverviewRuler": true,
  "debug.console.acceptSuggestionOnEnter": "on",
  // lua
  "[lua]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // json
  "json.format.enable": true,
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Keybinds

all keybindings settings in vscode

```json
[
  {
    "command": "projectManager.listGitProjects#sideBarGit",
    "key": "cmd+o"
  },
  {
    "command": "workbench.action.toggleSidebarVisibility",
    "key": "ctrl+e"
  },
  {
    "command": "workbench.files.action.focusFilesExplorer",
    "key": "ctrl+e",
    "when": "editorTextFocus"
  },
  {
    "command": "workbench.files.action.focusFilesExplorer",
    "key": "ctrl+e",
    "when": "editorTextFocus"
  },
  {
    "command": "explorer.newFile",
    "key": "a",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "command": "renameFile",
    "key": "r",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "command": "filesExplorer.copy",
    "key": "c",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "command": "filesExplorer.paste",
    "key": "p",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "command": "deleteFile",
    "key": "d",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "key": "shift+cmd+/",
    "command": "editor.action.blockComment",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    //  disable the default block comment keybinding
    "key": "shift+alt+a",
    "command": "-editor.action.blockComment",
    "when": "editorTextFocus && !editorReadonly"
  }
]
```

