<pre><code class="language-bash">#!/bin/bash

# git
alias gl='git log --oneline'
alias gpr='git pull -r'
alias gs='git status'
alias cgl=&quot;gl | grep -o \&quot;[^ ]wangwei[^\n]*\&quot; | head -n 1| pbcopy&quot;
alias gca=&quot;git checkout .&quot;

commit() {
  git add .;
  git status;
  echo &quot;Confirm commit bellow files? (y/n)&quot;
  read answer
  if [ &quot;$answer&quot; != &quot;${answer#[Yy]}&quot; ] ;then
    git commit -m $1;
  else
    git restore --staged .
    echo &quot;exit commit&quot;
  fi
}

project() {
  cd ~/workeSpace/
  directories=($(find . -maxdepth 1  -type d))
  echo $1
  if [ -z $1 ]; then
    echo &quot;请输入项目名称&quot;
    return 1
  fi
  PS3=&quot;请输入选项编号: &quot;
  select dir in &quot;${directories[@]}&quot;; do
    if [ -n &quot;$dir&quot; ]; then
      echo &quot;你选择的目录是: $dir&quot;
      dir_path=&quot;$dir/$1&quot;
      mkdir $dir_path
      cd $dir_path
      code 。
      break
    else
      echo &quot;无效的选择，请重新选择。&quot;
    fi
  done
}
</code></pre>
