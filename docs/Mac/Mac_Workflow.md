---
description: personlal prefer settings on Mac.
keywords: [git config, iterm2, homebrew, neovim, tmux, command tools]
---

# [Mac] WorkFlow

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

some persional perfer nerd fonts [nerd fonts](https://www.nerdfonts.com/font-downloads)

- [firacode](https://github.com/tonsky/FiraCode)
- [JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
- [MesloLGS NF](https://github.com/romkatv/powerlevel10k) – which is Recommended font for Powerlevel10k.
- [Recursive](https://www.recursive.design/) - ~~prefer fonts but no nerd font type, so need font patching~~

  - can be installed from [nerdfonts](https://www.nerdfonts.com/font-downloads)

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

Also can find in [my github](https://github.com/asang24/dotfiles)

- [iterm2](https://iterm2.com/) - install iterm2
- [color schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) - install color schemes
- install font
  - [firacode](https://github.com/tonsky/FiraCode)
  - [JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
  - ~~[MesloLGS NF](https://github.com/romkatv/powerlevel10k) - which is Recommended font for Powerlevel10k.~~
- import json file
  - [iterm2.json](https://github.com/asang24/dotfiles/blob/main/iterm2/iterm2.json)
  - personal theme [gruvbox-material-iterm2](https://github.com/AmmarCodes/gruvbox-material-iterm2)
- other useful settings

  - Appearance -> General -> Theme:Minimal & Tab bar:Bottom & Status bar:Top
  - Profiles

    - General -> Basic Colors:background:343232(rgb hex)
    - Text -> Font:~~MesloLGS NF Regular 16~~ RecMonoCasual Nerd Font 16
    - Window -> Transparency:2 & Backgroud Image:backgroud.jpeg & Blending:5
    - Keys -> set Report modifiers using CSI u -> not remove

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

## ~~oh-my-zsh~~

- install [ohmyzsh](https://mirrors.tuna.tsinghua.edu.cn/help/ohmyzsh.git/)
- plugins

  - zsh-syntax-highlighting

    ```bash
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    ```

  - zsh-autosuggestions

    ```bash
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```

  - autojump

    ```bash
      brew install autojump
    ```

- add to ~/.zshrc

```bash
 plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  autojump
 )
 [ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh
```

- powerlevel10

  - [install](https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#installation) and config style

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

ScreenShoot

![image](https://github.com/asang24/dotfiles/blob/main/tmux-powerline/Screenshot.png)

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

>   config refer to [dotfiles](https://github.com/asang24/dotfiles/blob/main/tmux/tmux.conf)

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
    set-option -g status-style "bg=#3a3a3a"
    
    set-option -g status-left "[#S] "
    #set-option -g status-left "#[bg=#0087ff] ❐ #S "  
    set-option -g status-left-length 400
    set-option -g status-left-style default
    
    set-option -g status-right "%Y-%m-%d %H:%M "
    #set -g status-right "#[bg=red] %Y-%m-%d %H:%M "
    set-option -g status-right-length 600 
    set-option -g status-right-style default
    
    set -wg window-status-current-format " #I:#W#F "
    set -wg window-status-current-style "fg=#cb231d,bg=#3a3a3a"
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

- ~~install `tmux-powerline`~~

  ```bash
  # add to ~/.config/tmux/tmux.confg under tpm
  set -g @plugin 'erikw/tmux-powerline'
  tmux source ~/.config/tmux/tmux.conf
  ```

- ~~also can install `themepack`~~

  ```bash
  # https://github.com/jimeh/tmux-themepack
  set -g @plugin 'jimeh/tmux-themepack'
  # Press prefix + I to install the plugin and source it.
  set -g @themepack 'basic'
  set -g @themepack 'powerline/block/cyan'
  ```

- ~~config file~~

  ```bash
  ~/.config/tmux/plugins/tmux-powerline/generate_rc.sh
  mv ~/.config/tmux-powerline/config.sh.default ~/.config/tmux-powerline/config.sh
  vim ~/.config/tmux-powerline/config.sh
  # update the config.sh by setting
  TMUX_POWERLINE_SEG_DATE_FORMAT="%m/%d/%Y"
  export TMUX_POWERLINE_THEME="theme"
  ```

- ~~config theme~~

  ```bash
  mkdir -p ~/.config/tmux-powerline/themes
  cp ~/.config/tmux/plugins/tmux-powerline/themes/default.sh ~/.config/tmux-powerline/themes/theme.sh
  vim ~/.config/tmux-powerline/themes/theme.sh
  # update the config.sh by setting
  TMUX_POWERLINE_DEFAULT_BACKGROUND_COLOR=${TMUX_POWERLINE_DEFAULT_BACKGROUND_COLOR:-'237'}
  
  if [ -z $TMUX_POWERLINE_LEFT_STATUS_SEGMENTS ]; then
   TMUX_POWERLINE_LEFT_STATUS_SEGMENTS=(
    "tmux_session_info 143 234" \
    #"hostname 33 0" \
    "vcs_branch 237 167" \
    #"vcs_compare 60 255" \
    #"vcs_staged 64 255" \
    "vcs_modified 9 255" \
    #"vcs_others 245 0" \
   )
  fi
  if [ -z $TMUX_POWERLINE_RIGHT_STATUS_SEGMENTS ]; then
   TMUX_POWERLINE_RIGHT_STATUS_SEGMENTS=(
    #"earthquake 3 0" \
    "pwd 237 167" \
    "date_day 237 255" \
    "date 237 255 ${TMUX_POWERLINE_SEPARATOR_LEFT_BOLD}" \
    "time 237 255 ${TMUX_POWERLINE_SEPARATOR_LEFT_BOLD}" \
    #"utc_time 235 136 ${TMUX_POWERLINE_SEPARATOR_LEFT_THIN}" \
   )
  fi
  tmux source ~/.config/tmux/tmux.conf
  ```

## Neovim

用到的使用场景

- 光标多选: 选中之后按 Ctrl+v 上下多选
- 按 ya( 复制()内内容
- 按 f 键向后搜索内容

## Golang

```bash
# brew
brew install go
#pkg
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

## Rust

```bash
# https://www.rust-lang.org/zh-CN/tools/install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## VsCode

- Plugins

  - 1

  - 2

- Settings

  ```json
  {
    // a part of my settings
    "workbench.colorTheme": "Everforest Dark",
    "editor.fontSize": 16,
    "terminal.integrated.fontSize": 14,
    "editor.fontFamily": "RecMonoCasual Nerd Font",
    "terminal.integrated.fontFamily": "RecMonoCasual Nerd Font",
    "editor.fontLigatures": true,
    "workbench.iconTheme": "material-icon-theme",
    "workbench.list.smoothScrolling": true,
    "window.dialogStyle": "custom",
    "everforest.italicKeywords": true,
    "everforest.italicComments": true,
    "window.density.editorTabHeight": "compact"
  }
  ```

- Keybinds

## Prefer command tools

refer to [Modern Unix](https://github.com/ibraheemdev/modern-unix)

- [bat](https://github.com/sharkdp/bat) -- cat clone with syntax highlighting and Git integration

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

- [fd](https://github.com/sharkdp/fd) -- a simple, fast and user-friendly alternative to 'find'

  ```bash
  brew install fd
  ```

- [fzf](https://github.com/junegunn/fzf) -- command-line fuzzy finder

- [fzf-tab](https://github.com/Aloxaf/fzf-tab) -- completion selection menu with fzf

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

- [bottom](https://github.com/ClementTsang/bottom) -- process/system monitor

  ```bash
  brew install bottom
  # use
  btm
  ```

- [lsd](https://github.com/lsd-rs/lsd) -- ls command

  ```bash
  brew install lsd

  # add to ~/.zshrc
  alias ls='lsd'cat
  alias la='ls -la'
  alias lt='ls --tree'
  ```

- [cheat.sh](https://github.com/chubin/cheat.sh) -- command line cheat sheet

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

- vimrc -- config vim

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

## Prefer apps

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

    >   if u forget your GitHub tokens, u cant find it in the blew file `data.json`
    
    ```json
    // the data.json saved all the uploaded imgs info
    // this is vscode settings
    "picgo.dataPath": "$home/Library/Application Support/picgo/data.json",
    ```
    
    If use typora & picgo app, when u pasted images in typora,it will cached images in the path`$home/Library/Application Support/typora-user-images$`,so u need clean it.
    
