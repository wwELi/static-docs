<p>配置缓存密码</p>
<p><code>gpg-preset-passphrase</code> 是一个工具，用于将 GPG 密钥的密码预先加载到 GPG 的缓存中，从而避免在使用 GPG 时频繁输入密码。它通常用于自动化任务或需要频繁使用 GPG 的场景。</p>
<h3>使用步骤：</h3>
<h4>1. <strong>确保 <code>gpg-preset-passphrase</code> 可用</strong></h4>
<p><code>gpg-preset-passphrase</code> 可能未默认安装。确保 GPG 版本支持该工具，并安装它（如果未安装）。</p>
<h4>2. <strong>启用 <code>use-agent</code></strong></h4>
<p>确保 GPG 配置启用了 <code>gpg-agent</code>。编辑或创建 <code>~/.gnupg/gpg.conf</code> 文件，添加以下内容：</p>
<pre><code class="language-plaintext">use-agent
</code></pre>
<p>然后，在 <code>~/.gnupg/gpg-agent.conf</code> 文件中启用 <code>allow-preset-passphrase</code>：</p>
<pre><code class="language-plaintext">allow-preset-passphrase
</code></pre>
<p>重启 <code>gpg-agent</code>：</p>
<pre><code class="language-bash">gpgconf --kill gpg-agent
gpgconf --launch gpg-agent
</code></pre>
<h4>3. <strong>获取 GPG 密钥的 Keygrip</strong></h4>
<p>Keygrip 是 GPG 密钥的唯一标识符，用于与 <code>gpg-preset-passphrase</code> 一起使用。运行以下命令获取 Keygrip：</p>
<pre><code class="language-bash">gpg --list-secret-keys --with-keygrip
</code></pre>
<p>输出示例：</p>
<pre><code class="language-plaintext">sec   rsa2048 2025-05-09 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
      Keygrip = 1234567890ABCDEF1234567890ABCDEF12345678
</code></pre>
<p>记下 <code>Keygrip</code> 的值（如 <code>1234567890ABCDEF1234567890ABCDEF12345678</code>）。</p>
<h4>4. <strong>缓存密码</strong></h4>
<p>使用 <code>gpg-preset-passphrase</code> 缓存密码：</p>
<pre><code class="language-bash">gpg-preset-passphrase --passphrase &lt;your-passphrase&gt; --preset &lt;keygrip&gt;
</code></pre>
<p>将 <code>&lt;your-passphrase&gt;</code> 替换为密钥的密码，将 <code>&lt;keygrip&gt;</code> 替换为上一步获取的 Keygrip。</p>
<h4>5. <strong>验证缓存</strong></h4>
<p>运行以下命令，验证是否需要再次输入密码：</p>
<pre><code class="language-bash">gpg --sign -u &lt;your-key-id&gt; test.txt
</code></pre>
<p>如果密码已缓存，则不会提示输入密码。</p>
<h4>6. <strong>清除缓存</strong></h4>
<p>如果需要清除缓存，可以运行以下命令：</p>
<pre><code class="language-bash">gpg-connect-agent &quot;clear-passphrase &lt;keygrip&gt;&quot; /bye
</code></pre>
<h3>注意事项：</h3>
<ul>
<li><strong>安全性</strong>：缓存密码可能会带来安全风险，尤其是在共享或不安全的环境中使用时。请确保环境安全。</li>
<li><strong>自动化场景</strong>：此工具非常适合自动化任务（如 CI/CD 管道）中使用，但应避免在生产环境中长期缓存密码。</li>
</ul>
<p><code>&lt;your-key-id&gt;</code> 是你的 GPG 密钥的标识符，可以是以下之一：</p>
<ol>
<li><strong>完整的密钥指纹</strong>（Key Fingerprint）：例如 <code>ABCDEF1234567890ABCDEF1234567890ABCDEF12</code>。</li>
<li><strong>密钥的短 ID</strong>：例如 <code>ABCDEF12</code>。</li>
<li><strong>与密钥关联的邮箱地址</strong>：例如 <code>your-email@example.com</code>。</li>
</ol>
<h3>如何找到你的 GPG 密钥 ID：</h3>
<p>运行以下命令查看你的 GPG 密钥列表：</p>
<pre><code class="language-bash">gpg --list-secret-keys --keyid-format=long
</code></pre>
<p>输出示例：</p>
<pre><code class="language-plaintext">sec   rsa2048/ABCDEF12 2025-05-09 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Your Name &lt;your-email@example.com&gt;
</code></pre>
<ul>
<li><strong><code>ABCDEF12</code></strong> 是短 ID。</li>
<li><strong><code>ABCDEF1234567890ABCDEF1234567890ABCDEF12</code></strong> 是完整的指纹。</li>
<li><strong><code>your-email@example.com</code></strong> 是与密钥关联的邮箱。</li>
</ul>
<h3>使用示例：</h3>
<p>假设你的密钥短 ID 是 <code>ABCDEF12</code>，可以这样签名文件：</p>
<pre><code class="language-bash">gpg --sign -u ABCDEF12 test.txt
</code></pre>
<p>或者使用邮箱：</p>
<pre><code class="language-bash">gpg --sign -u your-email@example.com test.txt
</code></pre>
<p>如果你只有一个密钥，<code>-u</code> 参数可以省略，GPG 会默认使用该密钥。</p>
