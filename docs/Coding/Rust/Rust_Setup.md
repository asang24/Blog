---
description: study notes about rust.
keywords: [rust]
---

# [Rust] Getting Started

## Install rust

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

官方文档中文 https://rustwiki.org/

Rust 程序设计语言 https://rustwiki.org/zh-CN/book/

Rust 程序设计语言 https://doc.rust-lang.org/book/ch01-01-installation.html

Rust Cookbook 中文版 https://rustwiki.org/zh-CN/rust-cookbook/

## Vscode settings

Install extensions

- [rust-analyzer](https://github.com/rust-lang/rust-analyzer) - Rust language support for Visual Studio Code
- [Even Better TOML](https://github.com/tamasfe/taplo#readme) - TOML support
- [crates](https://github.com/serayuzgur/crates) - manage dependencies with Cargo.toml

## Neovim

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

## Awesome Rust

awesome rust https://github.com/rust-unofficial/awesome-rust

Rust 嵌入式 https://github.com/rust-embedded/awesome-embedded-rust
