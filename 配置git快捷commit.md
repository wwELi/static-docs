<h3>合并多个git命令</h3>
<p>1 创建alias.zsh</p>
<pre><code class="language-bash">touch alias.zsh
</code></pre>
<p>2 增加commit 命令</p>
<pre><code class="language-bash">#!/bin/bash

# git
alias gl='git log --oneline'
alias gpr='git pull -r'
alias gs='git status'
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
</code></pre>
<p>3 将执行文件配置到.zshrc</p>
<pre><code class="language-bash">source ./alias.zsh
</code></pre>
<p>4 执行source 命令后可以使用commit 命令提交commit eg: commit &quot;test commit&quot;</p>
<pre><code class="language-bash">source .zshrc
</code></pre>
