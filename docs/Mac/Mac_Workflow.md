---
description: personal prefer settings on Mac.
keywords:
  [git, homebrew, nerdfonts, iterm2, starship, neovim, tmux, golang, rust]
---

# [Mac] WorkFlow

> This is a collection of configurations that includes all on my Mac.

## Clash

- Cloud service [flower](https://flower.yt/cart.php)
- install & config [clash](https://help.huacloud.dev)

## Enhance terminal

```bash
#  终端下执行以下几个命令，然后重新登出当前账户并登入（或者重启）
#  Disable press-and-hold for keys in favor of key repeat
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false
# Set a blazingly fast keyboard repeat rate
defaults write NSGlobalDomain KeyRepeat -int 1  # 默认值 2，设置成 1 合适，设置成 0 就太快了
defaults write NSGlobalDomain InitialKeyRepeat -int 10
```

## Git Config

- refer to [new SSH key](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

  ```bash
  git config --global user.email "xxx@foxmail.com"
  git config --global user.name "xxx"

  # ssh-key
  brew install openssh
  ssh-keygen -t ed25519 -C "your_email@example.com"

  touch ~/.ssh/config

  # add
  Host github.com
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_ed25519

  ssh-add ~/.ssh/id_ed25519

  pbcopy < ~/.ssh/id_ed25519.pub
  # then add to your github settings->ssh key

  # set proxy
  git config --global http.proxy 127.0.0.1:7890
  git config --global https.proxy 127.0.0.1:7890

  #unset
  git config --global --unset http.proxy
  git config --global --unset https.proxy

  # pretty git log
  # add to ~/.zshrc
  alias glog='git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --abbrev-commit -n 20'
  ```

- gitignore global

  ```bash
  echo .DS_Store >> ~/.gitignore_global
  git config --global core.excludesfile ~/.gitignore_global
  ```

## Homebrew

Use pkg to install [homebrew](https://github.com/Homebrew/brew/releases/), but need to config ~/.zshrc

```bash
# add blew to ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"

# set ustc mirrors
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
# export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
# then
source ~/.zshrc

brew update
# if unistall
# then brew autoremove
# brew cleanup
```

## Font

perfer nerd fonts [nerd fonts](https://www.nerdfonts.com/font-downloads)

- [firacode](https://github.com/tonsky/FiraCode)

- [JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)

- [Recursive](https://www.recursive.design/) - prefer fonts, installed from [nerdfonts](https://www.nerdfonts.com/font-downloads)

  ```bash
  # https://github.com/ryanoasis/nerd-fonts#option-8-patch-your-own-font
  # Usage
  cd FontPatcher
  # then
  fontforge -script font-patcher PATH_TO_FONT
  # e.g: fontforge -script font-patcher ~/Documents/Fonts/RecMonoCasual/RecMonoCasual-Italic-1.085.ttf --complete
  # then u can find xxxNerdFont.ttf in current path
  ```

## Iterm2

Also can find in [my github](https://github.com/dev24hrs/dotfiles/tree/main/iterm2)

- [iterm2](https://iterm2.com/) - install iterm2

- [color schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) - install color schemes

- install font

  - [firacode](https://github.com/tonsky/FiraCode)
  - [JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
  - [Recursive](https://www.recursive.design/) - prefer fonts, installed from [nerdfonts](https://www.nerdfonts.com/font-downloads)

- import json file

  - [iterm2.json](https://github.com/dev24hrs/dotfiles/blob/main/iterm2/iterm2.json)
  - personal theme [gruvbox-material-iterm2](https://github.com/AmmarCodes/gruvbox-material-iterm2)

- other useful settings

  - Appearance -> General -> Theme:Minimal & Tab bar:Bottom & Status bar:Top

  - Profiles

    - General -> Basic Colors:background:3e3d3d(rgb hex)

    - Text -> Font: RecMonoCasual Nerd Font 16

    - Window -> Transparency:2 & Backgroud Image:backgroud.jpeg & Blending:5

    - Keys -> set Report modifiers using CSI u -> not remove

      > Setting for tmux, because of using `Ctrl+/` `Ctrl+,` `Ctrl+;` as keymap in neovim.

  - Advanced

    - set `Scroll wheel sends arrow keys when in alternate screen mode` to **Yes**

      > no more scrolling up or down the entire screen in neovim/vim mode.

## starship

- install [starship](https://starship.rs/guide/)

  ```bash
  # brew install starship
  vim ~/.zshrc
  # add
  eval "$(starship init zsh)"

  # config
  # use prsent & restart terminal
  starship preset nerd-font-symbols -o ~/.config/starship.toml
  ```

- Zsh plugins

  ```bash
  # zsh-autosuggestions
  brew install zsh-autosuggestions
  # zsh-syntax-highlighting
  brew install zsh-syntax-highlighting
  # autojump
  brew install autojump
  # add to ~/.zshrc
    source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
    source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
    [ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh

  # by default zsh is case sensitive
  # Ignore Case Sensitive
  autoload -Uz +X compinit && compinit
  zstyle ':completion:' matcher-list 'm:{a-zA-Z}={A-Za-z}'
  zstyle ':completion:' menu select

  # then source ~/.zshrc
  ```

- last directory

  ```bash
  # add to ~/.zshrc
  chpwd() {
   # Save the current directory to a file
   echo $PWD > ~/.last_directory
  }
  [ -f ~/.last_directory ] && cd $(cat ~/.last_directory)
  ```

## Tmux

keybindings refer to [tmux_cheatsheet](https://tmuxcheatsheet.com/)

|     key      | binding |        description        |
| :----------: | :-----: | :-----------------------: |
| `Ctrl+Space` |         |     set **`prefix`**      |
|   `prefix`   |    r    |       reload config       |
|   `prefix`   |    ,    |       rename window       |
|   `prefix`   |    q    |        kill window        |
|   `prefix`   |    -    |  split window vertically  |
|   `prefix`   |    =    | split window horizontally |
|    `Ctrl`    |    p    |      previous window      |
|    `Ctrl`    |    n    |        next window        |
|    `Ctrl`    |    h    |      select pane -L       |
|    `Ctrl`    |    l    |      select pane -R       |
|    `Ctrl`    |    k    |      select pane -U       |
|    `Ctrl`    |    j    |      select pane -D       |
|   `prefix`   |    c    |        new window         |

> config refer to [dotfiles](https://github.com/dev24hrs/dotfiles/blob/main/tmux/tmux.conf)

- install `tmux`

  ```bash
  brew install tmux

  # config
  mkdir -p ~/.config/tmux
  vim ~/.config/tmux/tmux.conf
  # all settings refer to dotfiles
  ```

- status bar

  ```bash
  # Status bar
  set-option -g status on
  set-option -g status-interval 1
  set-option -g status-justify centre
  set-option -g status-style "bg=#3e3d3d"

  set-option -g status-left "[#S] "
  #set-option -g status-left "#[bg=#0087ff] ❐ #S "
  set-option -g status-left-length 400
  set-option -g status-left-style default

  set-option -g status-right "%Y-%m-%d %H:%M "
  #set -g status-right "#[bg=red] %Y-%m-%d %H:%M "
  set-option -g status-right-length 600
  set-option -g status-right-style default

  set -wg window-status-current-format " #I:#W#F "
  set -wg window-status-current-style "fg=#cb231d,bg=#3e3d3d"
  #set -wg window-status-current-style "bg=red" # red
  #set -wg window-status-last-style "fg=red"
  set -wg window-status-separator ""
  ```

- install `tpm`

  - `prefix` + `I` to installs new plugins
  - `prefix` + `U` to update plugins
  - `prefix` + `alt` + `u` to uninstall/remove

  ```bash
  tmux
  git clone https://github.com/tmux-plugins/tpm ~/.config/tmux/plugins/tpm
  # at the bottom of ~/.config/tmux/tmux.conf
  # List of plugins
  set -g @plugin 'tmux-plugins/tpm'
  set -g @plugin 'tmux-plugins/tmux-sensible'
  # Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
  run '~/.tmux/plugins/tpm/tpm'
  # type this in terminal if tmux is already running
  tmux source ~/.config/tmux/tmux.conf
  ```

## Golang

### Setup

```bash
# brew install
brew install go
go version
brew upgrade go

# pkg install
https://go.dev/dl/

# set env
mkdir -p $HOME/Documents/Code/Project_Go/src
mkdir -p $HOME/Documents/Code/Project_Go/pkg
mkdir -p $HOME/Documents/Code/Project_Go/bin

go env -w GOPROXY=https://goproxy.cn,direct
go env -w GO111MODULE=on
go env -w GOPATH=$HOME/Documents/Code/Path_Go

# gofumpt
go install mvdan.cc/gofumpt@latest
```

### Books

- Go 语言圣经 https://golang-china.github.io/gopl-zh/index.html
- Go 语言设计与实现 https://draveness.me/golang/
- Go 语言高级编程 https://chai2010.cn/advanced-go-programming-book/index.html

## Rust

### Setup

Refer to [set up](https://www.rust-lang.org/learn/get-started)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

其他命令：

```bash
rustc --version
cargo --version
rustup update
```

- 官方文档中文 https://rustwiki.org/

- Rust 程序设计语言 https://rustwiki.org/zh-CN/book/

- Rust 程序设计语言 https://doc.rust-lang.org/book/ch01-01-installation.html

- Rust Cookbook 中文版 https://rustwiki.org/zh-CN/rust-cookbook/

### Vscode settings

Install extensions

- [rust-analyzer](https://github.com/rust-lang/rust-analyzer) - Rust language support for Visual Studio Code
- [Even Better TOML](https://github.com/tamasfe/taplo#readme) - TOML support()
- [crates](https://github.com/serayuzgur/crates) - manage dependencies with Cargo.toml

### Neovim

Requrie [mason.nvim](https://github.com/williamboman/mason.nvim) & [mason-lspconfig](https://github.com/williamboman/mason-lspconfig.nvim) & [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

- `MasonInstall taplo` - named Even Better TOML in vscode

- `MasonInstall rust_analyzer` - lsp servers

- `TSInstall rust` & `TSInstall toml` - supported by `nvim-treesitter`

- install [mrcjkb/rustaceanvim](https://github.com/mrcjkb/rustaceanvim) - powerful rust extension, out of box

  ```bash
  {
    'mrcjkb/rustaceanvim',
    version = '^4', -- Recommended
    ft = { 'rust' },
  }
  ```

- install [crates.nvim](https://github.com/Saecki/crates.nvim) - managing crates.io dependencies

  ```bash
  {
      'saecki/crates.nvim',
      event = { "BufRead Cargo.toml" },
      config = function()
          require('crates').setup()
      end,
  }
  ```

### Awesome Rust

- awesome rust https://github.com/rust-unofficial/awesome-rust

- Rust 嵌入式 https://github.com/rust-embedded/awesome-embedded-rust

## Neovim

### Itroduction

This repo hosts my Nvim configuration for macOS, `init.lua` is the config entry point for terminal Neovim.
It's a simple but satisfying configuration for me, with `lua bash json yaml sql markdown golang rust` yet.
Always update and keep it more usefully.

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/go/202404151334838.png" alt="dashboard" />

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/go/202404151335169.png" alt="telescope" />

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/go/202404151337040.png" alt="outline" />

### Feautures

```bash
~/.config/nvim
❯ tree .
.
├── README.md
├── cd-project.nvim.json
├── init.lua
├── lazy-lock.json
├── lua
│   ├── core
│   │   ├── basic.lua
│   │   ├── keymap.lua
│   │   └── lazy.lua
│   └── plugins
│       ├── languages
│       │   ├── n-golang.lua
│       │   ├── n-neotest.lua
│       │   └── n-rust.lua
│       ├── lspconfig
│       │   ├── n-cmp.lua
│       │   ├── n-fidget.lua
│       │   ├── n-lspconfig.lua
│       │   └── n-mason.lua
│       ├── n-autopairs.lua
│       ├── n-codeium.lua
│       ├── n-colorizer.lua
│       ├── n-comment.lua
│       ├── n-conform.lua
│       ├── n-dashboard.lua
│       ├── n-diffview.lua
│       ├── n-flash.lua
│       ├── n-gitsigns.lua
│       ├── n-hlslens.lua
│       ├── n-indent.lua
│       ├── n-lint.lua
│       ├── n-lualine.lua
│       ├── n-markdown.lua
│       ├── n-noice.lua
│       ├── n-project.lua
│       ├── n-replace.lua
│       ├── n-telescope.lua
│       ├── n-theme.lua
│       ├── n-toggleterm.lua
│       ├── n-tree.lua
│       └── n-treesitter.lua
└── stylua.toml
```

- [lazy.nvim](https://github.com/folke/lazy.nvim) - Plugin management

- [gruvbox.nvim](https://github.com/ellisonleao/gruvbox.nvim) - Color scheme

- [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) - LSP and completion

- [mason.nvim](https://github.com/williamboman/mason.nvim) - Mason plugin

  ```bash
  # if cant install some lsp or formatter e.g u should set npm config set strict-ssl false
  npm config set strict-ssl false
  ```

- [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) - Auto-completion

- [friendly-snippets](https://github.com/rafamadriz/friendly-snippets) - Snippets

- [luasnip](https://github.com/L3MON4D3/LuaSnip) - Snippets

- [nvim-tree.nvim](https://github.com/nvim-tree/nvim-tree.lua) - File explorer

- [nvim-lualine](https://github.com/nvim-lualine/lualine.nvim) - Statusline

- [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim) - Fuzzy finder

- [toggleterm.nvim](https://github.com/akinsho/toggleterm.nvim) - Terminal

- [gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim) - Git

- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) - Code highlighting

- [markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim) - Markdown

- [dashboard-nvim](https://github.com/nvimdev/dashboard-nvim) - Dashboard

- [conform.nvim](https://github.com/stevearc/conform.nvim) - Code format

- [nvim-autopairs](https://github.com/windwp/nvim-autopairs) - Auto-pair

- [Comment.nvim](https://github.com/numToStr/Comment.nvim) - Comment

- [diffview.nvim](https://github.com/sindrets/diffview.nvim) - Diffview

- [mini indentscope](https://github.com/echasnovski/mini.indentscope) - Indent scope

- ~~[Navigator.nvim](https://github.com/numToStr/Navigator.nvim) - Navigator~~

- ~~[scrollbar](https://github.com/petertriho/nvim-scrollbar) - Scroball~~

- [nvim-lint](https://github.com/mfussenegger/nvim-lint) - Linter plugin

- [noice.nvim](https://github.com/folke/noice.nvim) - UI plugin for `messages`, `cmdline` and the `popupmenu`

- [cd-project.nvim](https://github.com/LintaoAmons/cd-project.nvim) - `Project Management` plugins

- [search-replace.nvim](https://github.com/roobert/search-replace.nvim) - search and replace

- [nvim-hlslens](https://github.com/kevinhwang91/nvim-hlslens) - Hlsearch

- [flash](https://github.com/folke/flash.nvim) - enhanced search

- [go.nvim](https://github.com/ray-x/go.nvim) - Go plugin

- [rustaceanvim](https://github.com/mrcjkb/rustaceanvim) - Supercharge your Rust experience

- [crates.nvim](https://github.com/Saecki/crates.nvim) - managing crates.io dependencies

- [Codeium](https://github.com/Exafunction/codeium.vim) - Codeium autocompletes

### Requirements

- Neovim 0.9+

- [ripgrep](https://github.com/BurntSushi/ripgrep)

- [jsregexp](https://github.com/kmarius/jsregexp)

- [luarocks](https://github.com/luarocks/luarocks/wiki/Installation-instructions-for-macOS)

  ```bash
  #  for luasnip
  brew install luarocks
  luarocks install jsregexp
  ```

- [Recursive](https://www.recursive.design/) - prefer fonts, installed from [nerdfonts](https://www.nerdfonts.com/font-downloads)

### Recommended

Also can find in [my github](https://github.com/dev24hrs/dotfiles/tree/main/iterm2)

- [iterm2](https://iterm2.com/) - install iterm2

- [color schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) - install color schemes

- install font

  - [firacode](https://github.com/tonsky/FiraCode)
  - [JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
  - [Recursive](https://www.recursive.design/) - prefer fonts, installed from [nerdfonts](https://www.nerdfonts.com/font-downloads)

- import json file

  - [iterm2.json](https://github.com/dev24hrs/dotfiles/blob/main/iterm2)
  - personal theme [gruvbox-material-iterm2](https://github.com/AmmarCodes/gruvbox-material-iterm2)

- other useful settings

  - Appearance -> General -> Theme:Minimal & Tab bar:Bottom & Status bar:Top

  - Profiles

    - General -> Basic Colors:background:3e3d3d(rgb hex)
    - Text -> Font: RecMonoCasual Nerd Font 16
    - Window -> Transparency:2 & Backgroud Image:backgroud.jpeg & Blending:5
    - Keys -> set Report modifiers using CSI u -> not remove

      > Setting for tmux, because of using `Ctrl+/` `Ctrl+,` `Ctrl+;` as keymap in neovim.

  - Advanced

    - set `Scroll wheel sends arrow keys when in alternate screen mode` to **Yes**

      > no more scrolling up or down the entire screen in neovim/vim mode.

## VsCode

### plugins

#### Common plugins

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

#### Golang plugins

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
  "gopls": {
    "formatting.gofumpt": true,
    "ui.completion.usePlaceholders": true,
    "ui.semanticTokens": true,
    "ui.diagnostic.analyses": {
      "unusedvariable": true,
      "unusedwrite": true
    }
  },
  ```

#### Rust plugins

- `rust-analyzer`
- `Even Better TOML`
- `crates`

### Settings

Other commons settings ,excluding the above plugins configurations

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

## Command tools

refer to [Modern Unix](https://github.com/ibraheemdev/modern-unix)

- [bat](https://github.com/sharkdp/bat) - cat clone with syntax highlighting and Git integration

  ```bash
  brew install bat
  # config
  bat --generate-config-file
  # add to ~/.config/bat/config
  --paging=never
  --theme="gruvbox-dark"
  --style="numbers,changes,header,snip,rule"
  # add to ~/.zshrc
  alias cat='bat'
  ```

- [delta](https://github.com/dandavison/delta) -- git diff

  ```bash
  # Install
  brew install git-delta
  # config
  # add this to ~/.gitconfig
  [core]
      pager = delta
  [interactive]
      diffFilter = delta --color-only
  [delta]
      syntax-theme = gruvbox-dark
      # this config auto set line-numbers=true
      side-by-side = true
  [merge]
      conflictstyle = diff3
  # Using Delta with tmux add to tmux.conf
  # set -ga terminal-overrides ",xterm-256color:Tc"-
  ```

- [fd](https://github.com/sharkdp/fd) - a simple, fast and user-friendly alternative to 'find'

  ```bash
  brew install fd
  ```

- [fzf](https://github.com/junegunn/fzf) - command-line fuzzy finder

- [fzf-tab](https://github.com/Aloxaf/fzf-tab) - completion selection menu with fzf

  ```bash
  brew install fzf
  # config

  # fzf
  eval "$(fzf --zsh)"
  export FZF_DEFAULT_OPTS='--height 40% --layout=reverse'

  git clone https://github.com/Aloxaf/fzf-tab ~/.zsh
  source ~/.zsh/fzf-tab/fzf-tab.plugin.zsh
  ```

- [ripgrep](https://github.com/BurntSushi/ripgrep)

  ```bash
  brew install ripgrep
  ```

- [bottom](https://github.com/ClementTsang/bottom) - process/system monitor

  ```bash
  brew install bottom
  # use
  btm
  ```

- [lsd](https://github.com/lsd-rs/lsd) - ls command

  ```bash
  brew install lsd

  # add to ~/.zshrc
  alias ls='lsd'cat
  alias la='ls -la'
  alias lt='ls --tree'
  ```

- [cheat.sh](https://github.com/chubin/cheat.sh) - command line cheat sheet

  ```bash
  mkdir -p $HOME/Documents/Tools/Cheat/bin
  curl https://cht.sh/:cht.sh > "$HOME/Documents/Tools/Cheat/bin/cht.sh"
  chmod +x "$HOME/Documents/Tools/Cheat/bin/cht.sh"

  # config ~/.zshrc
  # cheat.sh
  export CHEAT_DIR=$HOME/Documents/Tools/Cheat
  export PATH=$PATH:$CHEAT_DIR/bin
  source ~/.zshrc

  #use like
  cht.sh go chan
  # prefer use
  cht.sh --shell [LANG]
  ```

- [httpie](https://github.com/httpie/cli) - command-line HTTP client

  ```bash
  # use  https://httpie.io/docs/cli/redirected-input
  ```

- vimrc - config vim

  ```bash
  vim ~/.vimrc

  set clipboard=unnamed
  set nocompatible
  set backspace=eol,start,indent
  syntax on
  set showmode
  set mouse=a
  set t_Co=256
  filetype indent on
  set number
  set tabstop=4
  set shiftwidth=4
  set softtabstop=4
  set expandtab
  set smarttab
  set autoindent
  set showmatch
  set hlsearch
  set incsearch
  set ignorecase
  set smartcase
  set showcmd
  set wildmenu
  set wildmode=list:longest,full
  set encoding=utf-8
  set nobackup
  set nowritebackup
  set noswapfile
  ```

## Apps

- [AlDente](https://apphousekitchen.com/) -- charge limiter app

- [lemon](https://lemon.qq.com/) -- mac clean app

- [iTerm2](https://iterm2.com/) -- Terminal app

- ~~[Rectangle](https://github.com/rxhanson/Rectangle) -- window management~~

  ```bash
  # set
  # 右半屏 Ctrl+Cmd+H
  # 左半屏 Ctrl+Cmd+L
  # 上半屏 Ctrl+Cmd+K
  # 下半屏 Ctrl+Cmd+J
  # 中半屏 Ctrl+Cmd+C
  # 最大化 Ctrl+Cmd+M
  # 扩大   Ctrl+cmd+=
  # 扩大   Ctrl+cmd+-
  # 恢复 Ctrl+Cmd+backSpace
  ```

- [Sequel Ace](https://github.com/Sequel-Ace/Sequel-Ace) -- mysql management

- [Vimium](https://github.com/philc/vimium) -- Chrome & Arc extension for Vim

  ```bash
  # config Custom key
  unmap /
  map <c-/> enterFindMode
  # Custom search engines
  # so u can press o and enter g/bd/gh to search something
  bd: http://www.baidu.com/s?wd=%s+-csdn Baidu
  g: https://www.google.com/search?q=%s Google
  gh: https://github.com/search?q=%s GitHub
  ```

- [sublime text](https://www.sublimetext.com/) -- buy license from taobao

  ```bash
  {
   "ignored_packages":
   [
    "Vintage",
   ],
   "color_scheme": "ayu-light.sublime-color-scheme",
   "theme": "ayu-light.sublime-theme",
   "always_prompt_for_file_reload": true,
   "font_size": 16,
   "remember_open_files": true,
   "update_check": false,
   "font_face": "RecMonoCasual Nerd Font",
  }
  ```

- [PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/) -- upload images to GitHub

  > if u forget your GitHub tokens, u cant find it in the blew file `data.json`

  ```json
  // the data.json saved all the uploaded imgs info
  // this is vscode settings
  "picgo.dataPath": "$home/Library/Application Support/picgo/data.json",
  ```

  If use typora & picgo app, when u pasted images in typora,it will cached images in the path`$home/Library/Application Support/typora-user-images`,so u need clean it.
