```bash
#!/bin/bash

# git
alias gl='git log --oneline'
alias gpr='git pull -r'
alias gs='git status'
alias cgl="gl | grep -o \"[^ ]wangwei[^\n]*\" | head -n 1| pbcopy"
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

project() {
  cd ~/workeSpace/
  directories=($(find . -maxdepth 1  -type d))
  echo $1
  if [ -z $1 ]; then
    echo "请输入项目名称"
    return 1
  fi
  PS3="请输入选项编号: "
  select dir in "${directories[@]}"; do
    if [ -n "$dir" ]; then
      echo "你选择的目录是: $dir"
      dir_path="$dir/$1"
      mkdir $dir_path
      cd $dir_path
      code 。
      break
    else
      echo "无效的选择，请重新选择。"
    fi
  done
}
```