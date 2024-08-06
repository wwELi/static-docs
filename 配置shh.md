<h2>本地如何配置SSH</h2>
<p>1 如果本地还没有配置SSH执行如下代码生成</p>
<pre><code class="language-bash">ssh-keygen -t rsa -b 4096 -C &quot;your_email@example.com&quot;
</code></pre>
<p>2 本地需要配置多个</p>
<pre><code>ssh-keygen -t rsa -b 4096 -C &quot;another_email@example.com&quot; -f ~/.ssh/id_rsa_another
</code></pre>
<ul>
<li>-f 参数指定密钥文件的保存路径和名称。对于每个密钥对，都要使用不同的文件名（例如 id_rsa_another、id_rsa_service 等）。</li>
</ul>
<p>本地配置config</p>
<pre><code>touch ~/.ssh/config
</code></pre>
<p>使用如下配置</p>
<pre><code># 默认配置
Host github.com
  User git
  Hostname github.com
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes

# 第二个配置
Host github-another
  User git
  Hostname github.com
  IdentityFile ~/.ssh/id_rsa_another
  IdentitiesOnly yes

# 对于其他服务
Host myserver
  User yourusername
  Hostname example.com
  IdentityFile ~/.ssh/id_rsa_myserver
  IdentitiesOnly yes
</code></pre>
<ul>
<li>Host 是你用来引用这个配置的别名。</li>
<li>Hostname 是实际的服务器地址。</li>
<li>IdentityFile 是密钥文件的路径。</li>
<li>IdentitiesOnly yes 确保只使用指定的密钥进行身份验证。</li>
</ul>
