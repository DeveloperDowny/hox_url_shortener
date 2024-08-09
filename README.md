"# hox_url_shortener"

# Database Schema

## shortlinks table

```SQL
CREATE TABLE IF NOT EXISTS shortlinks (
    id int unsigned NOT NULL AUTO_INCREMENT,
    short_link varchar(255) NOT NULL,
    long_link text NOT NULL,
    qr text,
    PRIMARY KEY (id),
    UNIQUE KEY (short_link)
);
```

## analytics table

```
CREATE TABLE IF NOT EXISTS analytics (
    id int unsigned NOT NULL AUTO_INCREMENT,
    sid int unsigned NOT NULL,
    source varchar(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (sid) REFERENCES shortlinks(id)
);
```
