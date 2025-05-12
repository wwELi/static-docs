配置缓存密码

`gpg-preset-passphrase` 是一个工具，用于将 GPG 密钥的密码预先加载到 GPG 的缓存中，从而避免在使用 GPG 时频繁输入密码。它通常用于自动化任务或需要频繁使用 GPG 的场景。

### 使用步骤：

#### 1. **确保 `gpg-preset-passphrase` 可用**
`gpg-preset-passphrase` 可能未默认安装。确保 GPG 版本支持该工具，并安装它（如果未安装）。

#### 2. **启用 `use-agent`**
确保 GPG 配置启用了 `gpg-agent`。编辑或创建 `~/.gnupg/gpg.conf` 文件，添加以下内容：
```plaintext
use-agent
```

然后，在 `~/.gnupg/gpg-agent.conf` 文件中启用 `allow-preset-passphrase`：
```plaintext
allow-preset-passphrase
```

重启 `gpg-agent`：
```bash
gpgconf --kill gpg-agent
gpgconf --launch gpg-agent
```

#### 3. **获取 GPG 密钥的 Keygrip**
Keygrip 是 GPG 密钥的唯一标识符，用于与 `gpg-preset-passphrase` 一起使用。运行以下命令获取 Keygrip：
```bash
gpg --list-secret-keys --with-keygrip
```

输出示例：
```plaintext
sec   rsa2048 2025-05-09 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
      Keygrip = 1234567890ABCDEF1234567890ABCDEF12345678
```
记下 `Keygrip` 的值（如 `1234567890ABCDEF1234567890ABCDEF12345678`）。

#### 4. **缓存密码**
使用 `gpg-preset-passphrase` 缓存密码：
```bash
gpg-preset-passphrase --passphrase <your-passphrase> --preset <keygrip>
```
将 `<your-passphrase>` 替换为密钥的密码，将 `<keygrip>` 替换为上一步获取的 Keygrip。

#### 5. **验证缓存**
运行以下命令，验证是否需要再次输入密码：
```bash
gpg --sign -u <your-key-id> test.txt
```
如果密码已缓存，则不会提示输入密码。

#### 6. **清除缓存**
如果需要清除缓存，可以运行以下命令：
```bash
gpg-connect-agent "clear-passphrase <keygrip>" /bye
```

### 注意事项：
- **安全性**：缓存密码可能会带来安全风险，尤其是在共享或不安全的环境中使用时。请确保环境安全。
- **自动化场景**：此工具非常适合自动化任务（如 CI/CD 管道）中使用，但应避免在生产环境中长期缓存密码。


`<your-key-id>` 是你的 GPG 密钥的标识符，可以是以下之一：

1. **完整的密钥指纹**（Key Fingerprint）：例如 `ABCDEF1234567890ABCDEF1234567890ABCDEF12`。
2. **密钥的短 ID**：例如 `ABCDEF12`。
3. **与密钥关联的邮箱地址**：例如 `your-email@example.com`。

### 如何找到你的 GPG 密钥 ID：
运行以下命令查看你的 GPG 密钥列表：
```bash
gpg --list-secret-keys --keyid-format=long
```

输出示例：
```plaintext
sec   rsa2048/ABCDEF12 2025-05-09 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Your Name <your-email@example.com>
```

- **`ABCDEF12`** 是短 ID。
- **`ABCDEF1234567890ABCDEF1234567890ABCDEF12`** 是完整的指纹。
- **`your-email@example.com`** 是与密钥关联的邮箱。

### 使用示例：
假设你的密钥短 ID 是 `ABCDEF12`，可以这样签名文件：
```bash
gpg --sign -u ABCDEF12 test.txt
```

或者使用邮箱：
```bash
gpg --sign -u your-email@example.com test.txt
```

如果你只有一个密钥，`-u` 参数可以省略，GPG 会默认使用该密钥。