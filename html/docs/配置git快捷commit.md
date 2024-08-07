### 合并多个git命令

1 创建alias.zsh
```bash
touch alias.zsh
```
2 增加commit 命令
```bash
#!/bin/bash

# git
alias gl='git log --oneline'
alias gpr='git pull -r'
alias gs='git status'
alias gca="git checkout ."

commit() {
  git add .;
  git status;
  echo "Confirm commit bellow files? (y/n)"
  read answer
  if [ "$answer" != "${answer#[Yy]}" ] ;then
    git commit -m $1;
  else
    git restore --staged .
    echo "exit commit"
  fi
}
```
3 将执行文件配置到.zshrc
```bash
source ./alias.zsh
```
4 执行source 命令后可以使用commit 命令提交commit eg: commit "test commit"
```bash
source .zshrc
```