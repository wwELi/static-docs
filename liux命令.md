<h2>xargs</h2>
<p>将标准输入作为命令行入参</p>
<h5>参数：</h5>
<ul>
<li>-p 参数打印出要执行的命令，询问用户是否要执行</li>
<li>-t 参数则是打印出最终要执行的命令，然后直接执行，不需要用户确认。</li>
</ul>
<h5>例子</h5>
<pre><code>git branch | grep &quot;xxx&quot; | xargs git checkout
</code></pre>
