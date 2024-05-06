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



## Iterm2

config refer to  [iterm2 dotfiles](https://github.com/dev24hrs/dotfiles/tree/main/iterm2)

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/blog/202405061712703.png" alt="iterm2" />



## Tmux

config refer to [tmux dotfiles](https://github.com/dev24hrs/dotfiles/blob/main/tmux/tmux.conf)

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/blog/202405061729031.png" alt="tmux" />



## Neovim

config refer to [nvim dotfiles](https://github.com/dev24hrs/dotfiles/tree/main/nvim)

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/go/202404151334838.png" alt="dashboard" />

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/go/202404151335169.png" alt="telescope" />

<img src="https://cdn.jsdelivr.net/gh/dev24hrs/blog-img/go/202404151337040.png" alt="outline" width="100%" />



## vimrc

config vim

```bash
vim ~/.vimrc

" basic
syntax on
set t_Co=256
" set termguicolors
set background=dark
set nocompatible
set number
set nowrap
set mouse=a
set clipboard=unnamed

" tab
set tabstop=4
set shiftwidth=4
set expandtab
set smarttab
set autoindent
set backspace=eol,start,indent

" search
set showmatch
set hlsearch
set incsearch
set ignorecase
set smartcase
set regexpengine=0

" menu
set showcmd
set showmode
set wildmenu

" other
set nobackup
set nowb
set nowritebackup
set noswapfile

set noerrorbells

" encoding
" set spell spelllang=en_us
set encoding=utf-8
set fileencoding=utf-8
set termencoding=utf-8

filetype indent on

" auto tag
inoremap ( ()<ESC>i  
inoremap [ []<ESC>i 
inoremap { {}<ESC>i
inoremap < <><ESC>i
inoremap ' ''<ESC>i
inoremap " ""<ESC>i

let g:indentLine_enabled = 1

" move to beginning/end of line
nnoremap H ^
nnoremap L $

" $/^ doesn't do anything
nnoremap $ <nop>
nnoremap ^ <nop>
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



### Awesome Rust

- awesome rust https://github.com/rust-unofficial/awesome-rust

- Rust 嵌入式 https://github.com/rust-embedded/awesome-embedded-rust



## VsCode

config refer to [vscode dotfiles](https://github.com/dev24hrs/dotfiles/tree/main/vscode)



## Command tools

refer to [Modern Unix](https://github.com/ibraheemdev/modern-unix)

### [bat](https://github.com/sharkdp/bat)

cat clone with syntax highlighting and Git integration

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

### [delta](https://github.com/dandavison/delta) 

git diff

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

### [fd](https://github.com/sharkdp/fd) - a simple, fast and user-friendly alternative to 'find'

```bash
brew install fd
```

### [fzf](https://github.com/junegunn/fzf) 

command-line fuzzy finder

### [fzf-tab](https://github.com/Aloxaf/fzf-tab) 

completion selection menu with fzf

```bash
brew install fzf
# config

# fzf
eval "$(fzf --zsh)"
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse'

git clone https://github.com/Aloxaf/fzf-tab ~/.zsh
source ~/.zsh/fzf-tab/fzf-tab.plugin.zsh
```

### [ripgrep](https://github.com/BurntSushi/ripgrep)

```bash
brew install ripgrep
```

### [bottom](https://github.com/ClementTsang/bottom) - process/system monitor

```bash
brew install bottom
# use
btm
```

### [lsd](https://github.com/lsd-rs/lsd) 

 ls command

```bash
brew install lsd

# add to ~/.zshrc
alias ls='lsd'cat
alias la='ls -la'
alias lt='ls --tree'
```

### [cheat.sh](https://github.com/chubin/cheat.sh) 

command line cheat sheet

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

### [httpie](https://github.com/httpie/cli) 

command-line HTTP client

```bash
# use  https://httpie.io/docs/cli/redirected-input
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
